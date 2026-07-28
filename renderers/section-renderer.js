"use strict";

export function renderSectionEntry(entry) {
  const section = document.createElement("div");

  section.className = "page-section";

  const heading = document.createElement("span");
  heading.className = "page-section-title";
  heading.textContent = entry.label || "";

  section.appendChild(heading);

  return section;
}
