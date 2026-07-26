const express = require("express");

const app = express();
app.use(express.json());
const PORT = 3000;
const fs = require("fs");
const path = require("path");

app.get("/api/ping", (req, res) => {
    res.json({
        status: "ok",
        version: "0.1"
    });
});

app.get("/api/project", (req, res) => {
    const filePath = path.join("/srv/vcc/assets/data", "data.js");

    const fileContents = fs.readFileSync(filePath, "utf8");

    const marker = "window.CLASSROOM_SITE =";

const start = fileContents.indexOf(marker);

if (start === -1) {
    return res.status(500).json({
        error: "Invalid project file."
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
      error: "Project data must be an object."
    });
  }

  const filePath = path.join("/srv/vcc/assets/data", "data.js");

  const fileContents =
    `"use strict";\n\nwindow.CLASSROOM_SITE = ${JSON.stringify(projectData, null, 2)};\n`;

  fs.writeFileSync(filePath, fileContents, "utf8");

  res.json({
    status: "saved"
  });
});

app.listen(PORT, () => {
    console.log(`VCC Server listening on port ${PORT}`);
});