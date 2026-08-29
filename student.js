"use strict";

import { renderLayout } from "./renderers/layout-renderer.js";
import { validateProject } from "./validators/project-validator.js";
import { validateAssets } from "./validators/asset-validator.js";
import { loadProject, ProjectLoadError } from "./project/project-loader.js";
import { openVideo, closeVideo } from "./actions/video-action.js";
import { openPdf, closePdf } from "./actions/pdf-action.js";
import { getImagePath, getVideoPath } from "./utilities/asset-paths.js";
import { ProjectModel } from "./models/project-model.js";
import { loadWorkingProjectData } from "./project/project-storage.js";

const TEACHER_PASSWORD = "class";
const DEFAULT_COLUMNS = 8;
const PASSWORD_ERROR_DURATION = 1000;
const DATA_CHECK_INTERVAL = 60000;
const DATA_URL = "assets/data/data.js";
const isPreview = new URLSearchParams(window.location.search).get("preview") === "true";

let project = null;
let currentContainerId = null;
let messageTimerId = null;
let passwordErrorTimerId = null;
let publishedDataVersion = null;

const elements = {
  pageTitle: document.getElementById("pageTitle"),
  pageSubtitle: document.getElementById("pageSubtitle"),
  pageSections: document.getElementById("pageSections"),

  homeButton: document.getElementById("homeButton"),
  backButton: document.getElementById("backButton"),
  teacherButton: document.getElementById("teacherButton"),

  teacherPasswordDialog: document.getElementById("teacherPasswordDialog"),
  teacherPasswordForm: document.getElementById("teacherPasswordForm"),
  teacherPasswordInput: document.getElementById("teacherPasswordInput"),
  teacherPasswordFeedback: document.getElementById("teacherPasswordFeedback"),
  cancelTeacherPasswordButton: document.getElementById("cancelTeacherPasswordButton"),

  videoModal: document.getElementById("videoModal"),
  videoTitle: document.getElementById("videoTitle"),
  youtubePlayerElement: document.getElementById("youtubePlayer"),
  closeVideoButton: document.getElementById("closeVideoButton"),

  localVideoModal: document.getElementById("localVideoModal"),
  localVideoTitle: document.getElementById("localVideoTitle"),
  localVideoPlayer: document.getElementById("localVideoPlayer"),
  closeLocalVideoButton: document.getElementById("closeLocalVideoButton"),

  pdfModal: document.getElementById("pdfModal"),
  pdfTitle: document.getElementById("pdfTitle"),
  pdfFrame: document.getElementById("pdfFrame"),
  closePdfButton: document.getElementById("closePdfButton"),

  imageModal: document.getElementById("imageModal"),
  imageTitle: document.getElementById("imageTitle"),
  fullScreenImage: document.getElementById("fullScreenImage"),
  closeImageButton: document.getElementById("closeImageButton"),

  messageBox: document.getElementById("messageBox"),
};

async function initialize() {
  try {
    const isPreview = new URLSearchParams(window.location.search).get("preview") === "true";
    const workingProjectData = isPreview ? await loadWorkingProjectData() : null;

    project = workingProjectData ? new ProjectModel(workingProjectData) : await loadProject();
  } catch (error) {
    handleProjectLoadFailure(error);
    return;
  }

  const projectData = project.toObject();
  const projectValidation = validateProject(projectData);

  reportValidation(projectValidation);

  if (!projectValidation.valid) {
    showMessage(
      `The classroom project contains ${projectValidation.errors.length} validation error${
        projectValidation.errors.length === 1 ? "" : "s"
      }.`,
    );

    elements.pageTitle.textContent = "Classroom unavailable";
    elements.pageSections.replaceChildren();

    return;
  }

  navigateToContainer(project.startContainerId);

  const assetValidation = await validateAssets(projectData);
  reportAssetValidation(assetValidation);
}

function reportValidation(validation) {
  if (validation.errors.length > 0) {
    console.group(`VCC validation errors (${validation.errors.length})`);

    validation.errors.forEach((issue) => {
      console.error(`[${issue.code}] ${issue.message}`, issue.context);
    });

    console.groupEnd();
  }

  if (validation.warnings.length > 0) {
    console.group(`VCC validation warnings (${validation.warnings.length})`);

    validation.warnings.forEach((issue) => {
      console.warn(`[${issue.code}] ${issue.message}`, issue.context);
    });

    console.groupEnd();
  }

  if (validation.errors.length === 0 && validation.warnings.length === 0) {
    console.info("VCC project validation passed.");
  }
}

function reportAssetValidation(validation) {
  if (validation.warnings.length > 0) {
    console.group(`VCC asset validation warnings (${validation.warnings.length})`);

    validation.warnings.forEach((issue) => {
      console.warn(`[${issue.code}] ${issue.message}`, issue.context);
    });

    console.groupEnd();

    return;
  }

  console.info(
    `VCC asset validation passed. ${validation.checkedCount} image asset${
      validation.checkedCount === 1 ? "" : "s"
    } checked.`,
  );
}

function navigateToContainer(containerId) {
  const container = getContainer(containerId);

  if (!container) {
    showMessage(`The classroom page "${containerId}" could not be found.`);
    return;
  }

  if (!isContainerAccessible(containerId)) {
    showMessage("That classroom page is not currently available.");
    return;
  }

  currentContainerId = containerId;

  updateHeader(container);
  updateNavigationButtons(container);
  renderCurrentContainer(container);
}

function renderCurrentContainer(container) {
  elements.pageSections.setAttribute("aria-busy", "true");
  elements.pageSections.replaceChildren();

  const renderedLayout = renderLayout({
    container,
    containerId: currentContainerId,
    defaultColumns: DEFAULT_COLUMNS,
    getContainer,
    isContainerAccessible,
    onNavigate: navigateToContainer,
    onAction: handleContentAction,
  });

  elements.pageSections.appendChild(renderedLayout);
  elements.pageSections.setAttribute("aria-busy", "false");
}

function updateHeader(container) {
  elements.pageTitle.textContent = container.title || "Classroom";
  document.title = `${container.title || "Classroom"} | VCC Classroom Launcher`;

  elements.pageSubtitle.textContent = container.subtitle || "";
  elements.pageSubtitle.hidden = true;
}

function updateNavigationButtons(container) {
  const isHome = currentContainerId === project.startContainerId;

  elements.teacherButton.hidden = !isHome || !isLocalTeacherAccess();
  elements.homeButton.hidden = isHome;
  elements.backButton.hidden = isHome || !container.parent;
}

function navigateHome() {
  if (project?.startContainerId) {
    navigateToContainer(project.startContainerId);
  }
}

function navigateBack() {
  const currentContainer = getContainer(currentContainerId);

  if (currentContainer?.parent) {
    navigateToContainer(currentContainer.parent);
  }
}

/* =========================================================
   Teacher Mode authentication
   ========================================================= */

function openTeacherPasswordDialog() {
  clearPasswordErrorTimer();
  resetTeacherPasswordDialog();

  elements.teacherPasswordDialog.showModal();

  window.requestAnimationFrame(() => {
    elements.teacherPasswordInput.focus();
  });
}

function closeTeacherPasswordDialog() {
  clearPasswordErrorTimer();
  resetTeacherPasswordDialog();

  if (elements.teacherPasswordDialog.open) {
    elements.teacherPasswordDialog.close();
  }
}

function submitTeacherPassword(event) {
  event.preventDefault();

  const enteredPassword = elements.teacherPasswordInput.value.trim();

  const passwordMatches =
    enteredPassword.toLocaleLowerCase() === TEACHER_PASSWORD.toLocaleLowerCase();

  if (passwordMatches) {
    window.location.href = "http://192.168.1.15/teacher.html";
    return;
  }

  showIncorrectPassword();
}

function showIncorrectPassword() {
  clearPasswordErrorTimer();

  elements.teacherPasswordForm.classList.add("dialog-error");
  elements.teacherPasswordFeedback.hidden = false;
  elements.teacherPasswordInput.value = "";
  elements.teacherPasswordInput.disabled = true;

  passwordErrorTimerId = window.setTimeout(() => {
    passwordErrorTimerId = null;

    resetTeacherPasswordDialog();

    if (elements.teacherPasswordDialog.open) {
      elements.teacherPasswordDialog.close();
    }

    navigateHome();
  }, PASSWORD_ERROR_DURATION);
}

function resetTeacherPasswordDialog() {
  elements.teacherPasswordForm.classList.remove("dialog-error");
  elements.teacherPasswordFeedback.hidden = true;
  elements.teacherPasswordInput.disabled = false;
  elements.teacherPasswordInput.value = "";
}

function clearPasswordErrorTimer() {
  if (!passwordErrorTimerId) {
    return;
  }

  window.clearTimeout(passwordErrorTimerId);
  passwordErrorTimerId = null;
}

function isLocalTeacherAccess() {
  const hostname = window.location.hostname.toLowerCase();

  return (
    hostname === "192.168.1.15" ||
    hostname === "vcc-server" ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  );
}

/* =========================================================
   Content actions
   ========================================================= */

function handleContentAction(entry) {
  switch (entry.type) {
    case "video":
      openVideo(entry, elements).catch((error) => {
        showMessage(error.message);
      });
      break;
    case "localVideo":
      openLocalVideo(entry);
      break;
    case "website":
      openWebsite(entry);
      break;
    case "pdf":
      try {
        openPdf(entry, elements);
      } catch (error) {
        showMessage(error.message);
      }
      break;
    case "image":
      openImage(entry);
      break;
    case "placeholder":
      break;
    default:
      showMessage(`Unsupported content type: ${entry.type}`);
  }
}

function openWebsite(entry) {
  const url = entry.target?.trim();

  if (!url) {
    showMessage("This website is not available.");
    return;
  }

  const normalizedUrl =
    url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

  window.open(normalizedUrl, "_blank", "noopener,noreferrer");
}

function openImage(entry) {
  if (!entry.target) {
    showMessage("This image is not available.");
    return;
  }

  const label = getEntryLabel(entry);

  elements.imageTitle.textContent = label;
  elements.fullScreenImage.src = getImagePath(entry.target);
  elements.fullScreenImage.alt = label;
  elements.imageModal.hidden = false;
}

function closeImage() {
  elements.imageModal.hidden = true;
  elements.fullScreenImage.src = "";
  elements.fullScreenImage.alt = "";
}

function openLocalVideo(entry) {
  if (!entry.target) {
    showMessage("This video is not available.");
    return;
  }

  const label = getEntryLabel(entry);

  elements.localVideoTitle.textContent = label;
  elements.localVideoPlayer.src = getVideoPath(entry.target);
  elements.localVideoModal.hidden = false;

  elements.localVideoPlayer.play().catch(() => {
    // The browser may require the user to press Play.
  });

  elements.closeLocalVideoButton.focus();
}

function closeLocalVideo() {
  elements.localVideoPlayer.pause();
  elements.localVideoPlayer.removeAttribute("src");
  elements.localVideoPlayer.load();
  elements.localVideoModal.hidden = true;
}

function getEntryLabel(entry) {
  return entry.label || entry.title || "Untitled";
}

function getContainer(containerId) {
  return project?.getContainer(containerId) || null;
}

function isContainerAccessible(containerId) {
  return project?.isContainerAccessible(containerId) || false;
}

function showMessage(message) {
  if (messageTimerId) {
    window.clearTimeout(messageTimerId);
  }

  elements.messageBox.textContent = message;
  elements.messageBox.hidden = false;

  messageTimerId = window.setTimeout(() => {
    elements.messageBox.hidden = true;
    messageTimerId = null;
  }, 4000);
}

/* =========================================================
   ETag into published data
   ========================================================= */

async function getPublishedProjectData() {
  const response = await fetch(`${DATA_URL}?check=${Date.now()}`, {
    cache: "no-cache",
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to check classroom updates (${response.status}).`);
  }

  const fileContents = await response.text();
  const marker = "window.CLASSROOM_SITE =";
  const markerIndex = fileContents.indexOf(marker);

  if (markerIndex === -1) {
    throw new Error("Published classroom data is invalid.");
  }

  const jsonText = fileContents
    .substring(markerIndex + marker.length)
    .trim()
    .replace(/;$/, "");

  return {
    fileContents,
    projectData: JSON.parse(jsonText),
  };
}

async function watchForPublishedUpdates() {
  if (isPreview) {
    return;
  }

  let publishedFileContents;

  try {
    const initialResult = await getPublishedProjectData();
    publishedFileContents = initialResult.fileContents;
  } catch (error) {
    console.warn("Classroom update watcher could not start.", error);
    return;
  }

  window.setInterval(async () => {
    try {
      const latestResult = await getPublishedProjectData();

      if (latestResult.fileContents === publishedFileContents) {
        return;
      }

      publishedFileContents = latestResult.fileContents;

      project = new ProjectModel(latestResult.projectData);

      const destinationContainerId = project.getContainer(currentContainerId)
        ? currentContainerId
        : project.startContainerId;

      navigateToContainer(destinationContainerId);

      console.info("Updated classroom content loaded.");
      showMessage("Classroom Updated");
    } catch (error) {
      console.warn("Classroom update check failed.", error);
    }
  }, DATA_CHECK_INTERVAL);
}

/* =========================================================
   Event Listeners
   ========================================================= */

elements.homeButton.addEventListener("click", navigateHome);
elements.backButton.addEventListener("click", navigateBack);
elements.teacherButton.addEventListener("click", () => {
  if (!isLocalTeacherAccess()) {
    return;
  }

  if (isPreview) {
    window.location.href = "http://192.168.1.15/teacher.html";
    return;
  }

  openTeacherPasswordDialog();
});
elements.teacherPasswordForm.addEventListener("submit", submitTeacherPassword);
elements.cancelTeacherPasswordButton.addEventListener("click", closeTeacherPasswordDialog);
elements.teacherPasswordDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeTeacherPasswordDialog();
});

elements.closeVideoButton.addEventListener("click", () => {
  closeVideo(elements);
});

elements.videoModal.addEventListener("click", (event) => {
  if (event.target === elements.videoModal) {
    closeVideo(elements);
  }
});

elements.closeLocalVideoButton.addEventListener("click", () => {
  closeLocalVideo();
});

elements.localVideoModal.addEventListener("click", (event) => {
  if (event.target === elements.localVideoModal) {
    closeLocalVideo();
  }
});

elements.closePdfButton.addEventListener("click", () => {
  closePdf(elements);
});

elements.pdfModal.addEventListener("click", (event) => {
  if (event.target === elements.pdfModal) {
    closePdf(elements);
  }
});

elements.closeImageButton.addEventListener("click", closeImage);

elements.imageModal.addEventListener("click", (event) => {
  if (event.target === elements.imageModal) {
    closeImage();
  }
});

void initialize();
void watchForPublishedUpdates();
