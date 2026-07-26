"use strict";

const WORKING_PROJECT_STORAGE_KEY = "vcc.workingProject";
const PUBLISHED_PROJECT_STORAGE_KEY = "vcc.publishedProject";

export async function loadWorkingProjectData() {
  const response = await fetch("/api/project");

  if (!response.ok) {
    throw new Error("Unable to load the working project.");
  }

  return await response.json();
}

export async function saveWorkingProjectData(projectData) {
  const response = await fetch("/api/project", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Unable to save the working project.");
  }
}

export function clearWorkingProjectData() {
  window.localStorage.removeItem(WORKING_PROJECT_STORAGE_KEY);
}

export function hasWorkingProjectData() {
  return window.localStorage.getItem(WORKING_PROJECT_STORAGE_KEY) !== null;
}

export function loadPublishedProjectData() {
  const publishedProject = window.localStorage.getItem(PUBLISHED_PROJECT_STORAGE_KEY);

  return publishedProject ? JSON.parse(publishedProject) : null;
}

export async function publishProject() {
  const response = await fetch("/api/publish", {
    method: "POST",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.error || "Unable to publish the classroom site.");
  }

  return response.json();
}

export async function catalogAssets() {
  const response = await fetch("/api/catalog-assets", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Unable to catalog assets.");
  }

  return await response.json();
}
