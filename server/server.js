const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const app = express();
app.use(express.json());

const PORT = 3000;
const MASTER_ASSETS_PATH = "/srv/vcc/assets";
const REPOSITORY_PATH = "/srv/vcc/site/vcc-classroom-launcher";
const PUBLISHED_ASSETS_PATH = path.join(REPOSITORY_PATH, "assets");

app.get("/api/ping", (req, res) => {
  res.json({
    status: "ok",
    version: "0.1",
  });
});

app.get("/api/project", (req, res) => {
  const filePath = path.join("/srv/vcc/assets/data", "data.js");

  const fileContents = fs.readFileSync(filePath, "utf8");

  const marker = "window.CLASSROOM_SITE =";

  const start = fileContents.indexOf(marker);

  if (start === -1) {
    return res.status(500).json({
      error: "Invalid project file.",
    });
  }

  const jsonText = fileContents
    .substring(start + marker.length)
    .trim()
    .replace(/;$/, "");

  const project = JSON.parse(jsonText);

  res.json(project);
});

app.put("/api/project", (req, res) => {
  const projectData = req.body;

  if (!projectData || typeof projectData !== "object" || Array.isArray(projectData)) {
    return res.status(400).json({
      error: "Project data must be an object.",
    });
  }

  const filePath = path.join("/srv/vcc/assets/data", "data.js");

  const fileContents = `"use strict";\n\nwindow.CLASSROOM_SITE = ${JSON.stringify(projectData, null, 2)};\n`;

  fs.writeFileSync(filePath, fileContents, "utf8");

  res.json({
    status: "saved",
  });
});

app.post("/api/catalog-assets", (req, res) => {
  try {
    const catalogs = {
      images: writeCatalog("images"),
      pdfs: writeCatalog("pdfs"),
      powerpoints: writeCatalog("powerpoints"),
      videos: writeCatalog("videos"),
    };

    res.json({
      status: "ok",
      catalogs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/api/publish", (req, res) => {
  try {
    writeCatalog("images");
    writeCatalog("pdfs");
    writeCatalog("powerpoints");
    writeCatalog("videos");

    fs.rmSync(PUBLISHED_ASSETS_PATH, {
      recursive: true,
      force: true,
    });

    fs.mkdirSync(PUBLISHED_ASSETS_PATH, {
      recursive: true,
    });

    fs.cpSync(MASTER_ASSETS_PATH, PUBLISHED_ASSETS_PATH, {
      recursive: true,
    });

    execFileSync("git", ["add", "assets"], {
      cwd: REPOSITORY_PATH,
      encoding: "utf8",
    });

    const stagedAssetChanges = execFileSync(
      "git",
      ["diff", "--cached", "--name-only", "--", "assets"],
      {
        cwd: REPOSITORY_PATH,
        encoding: "utf8",
      },
    ).trim();

    if (!stagedAssetChanges) {
      return res.json({
        status: "no-changes",
      });
    }

    const timestamp = new Date().toISOString();

    execFileSync("git", ["commit", "-m", `Publish classroom content ${timestamp}`], {
      cwd: REPOSITORY_PATH,
      encoding: "utf8",
    });

    execFileSync("git", ["push"], {
      cwd: REPOSITORY_PATH,
      encoding: "utf8",
    });

    res.json({
      status: "published",
    });
  } catch (error) {
    console.error("Publish failed.", error);

    res.status(500).json({
      error: error.stderr?.toString() || error.message || "Publish failed.",
    });
  }
});

function buildCatalog(folderPath) {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== "catalog.js" && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function writeCatalog(folderName) {
  const folderPath = path.join("/srv/vcc/assets", folderName);
  const files = buildCatalog(folderPath);
  const globalName = `CLASSROOM_${folderName.toUpperCase()}`;

  const contents = `"use strict";

window.${globalName} = ${JSON.stringify(files, null, 2)};
`;

  fs.writeFileSync(path.join(folderPath, "catalog.js"), contents, "utf8");

  return files;
}

app.listen(PORT, () => {
  console.log(`VCC Server listening on port ${PORT}`);
});
