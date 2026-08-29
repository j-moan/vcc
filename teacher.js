"use strict";

import { loadProject } from "./project/project-loader.js";
import { ProjectModel } from "./models/project-model.js";
import {
  loadWorkingProjectData,
  saveWorkingProjectData,
  catalogAssets,
  publishProject,
} from "./project/project-storage.js";
import { getImagePath, getDefaultTileImagePath } from "./utilities/asset-paths.js";

const publishButton = document.querySelector("#publish-button");
const previewButton = document.querySelector("#preview-button");
const toolbarButtons = document.querySelectorAll(".teacher-tool-button");
const containerTreeElement = document.querySelector("#containerTree");
const addSubpageButton = document.querySelector("#add-subpage-button");
const addSubpageDialog = document.querySelector("#add-subpage-dialog");
const addSubpageForm = document.querySelector("#add-subpage-form");
const subpageNameInput = document.querySelector("#subpage-name-input");
const subpageImageInput = document.querySelector("#subpage-image-input");
const subpageImagePreview = document.querySelector("#subpage-image-preview");
const changeSubpageImageButton = document.querySelector("#change-subpage-image-button");
const cancelAddSubpageButton = document.querySelector("#cancel-add-subpage-button");
const deletePageButton = document.querySelector("#delete-page-button");
const messageDialog = document.querySelector("#message-dialog");
const messageDialogTitle = document.querySelector("#message-dialog-title");
const messageDialogText = document.querySelector("#message-dialog-text");
const messageDialogOkButton = document.querySelector("#message-dialog-ok-button");
const messageDialogCancelButton = document.querySelector("#message-dialog-cancel-button");
const addTileButton = document.querySelector("#add-tile-button");
const editItemButton = document.getElementById("edit-item-button");
const addTileDialog = document.querySelector("#add-tile-dialog");
const addTileForm = document.querySelector("#add-tile-form");
const addTileDialogTitle = addTileDialog.querySelector("h2");
const addTileSubmitButton = addTileForm.querySelector('button[type="submit"]');
const tileNameInput = document.querySelector("#tile-name-input");
const tileTypeSelect = document.querySelector("#tile-type-select");
const tileThumbnailInput = document.querySelector("#tile-thumbnail-input");
const tileDestinationGroup = document.querySelector("#tile-destination-group");
const tileDestinationLabel = document.querySelector("#tile-destination-label");
const tileDestinationInput = document.querySelector("#tile-destination-input");
const cancelAddTileButton = document.querySelector("#cancel-add-tile-button");
const addSeparatorButton = document.querySelector("#add-separator-button");
const addSeparatorDialog = document.querySelector("#add-separator-dialog");
const addSeparatorForm = document.querySelector("#add-separator-form");
const addSeparatorDialogTitle = addSeparatorDialog.querySelector("h2");
const addSeparatorSubmitButton = addSeparatorForm.querySelector('button[type="submit"]');
const separatorNameInput = document.querySelector("#separator-name-input");
const cancelAddSeparatorButton = document.querySelector("#cancel-add-separator-button");
const deleteItemButton = document.querySelector("#delete-item-button");
const moveItemUpButton = document.querySelector("#move-item-up-button");
const moveItemDownButton = document.querySelector("#move-item-down-button");
const tileThumbnailPreview = document.querySelector("#tile-thumbnail-preview");
const changeTileThumbnailButton = document.querySelector("#change-tile-thumbnail-button");
const imagePickerDialog = document.querySelector("#image-picker-dialog");
const imagePickerForm = document.querySelector("#image-picker-form");
const imageSearchInput = document.querySelector("#image-search-input");
const imagePickerList = document.querySelector("#image-picker-list");
const imagePickerPreview = document.querySelector("#image-picker-preview");
const imagePickerFileName = document.querySelector("#image-picker-file-name");
const cancelImagePickerButton = document.querySelector("#cancel-image-picker-button");
const selectImageButton = document.querySelector("#select-image-button");
const pdfPickerDialog = document.querySelector("#pdf-picker-dialog");
const pdfPickerForm = document.querySelector("#pdf-picker-form");
const pdfSearchInput = document.querySelector("#pdf-search-input");
const pdfPickerList = document.querySelector("#pdf-picker-list");
const cancelPdfPickerButton = document.querySelector("#cancel-pdf-picker-button");
const selectPdfButton = document.querySelector("#select-pdf-button");
const videoPickerDialog = document.querySelector("#video-picker-dialog");
const videoPickerForm = document.querySelector("#video-picker-form");
const videoSearchInput = document.querySelector("#video-search-input");
const videoPickerList = document.querySelector("#video-picker-list");
const cancelVideoPickerButton = document.querySelector("#cancel-video-picker-button");
const selectVideoButton = document.querySelector("#select-video-button");
const catalogAssetsButton = document.querySelector("#catalog-assets-button");

let project = null;
let selectedContainerId = null;
let selectedLayoutIndex = null;
let editingTile = false;
let editingSeparator = false;
let editingNavigation = false;
let editingNavigationContainerId = null;
let selectedImagePath = null;
let imagePickerTarget = "tile";
let selectedPdf = null;
let selectedVideo = null;

async function initializeTeacherView() {
  try {
    const workingProjectData = await loadWorkingProjectData();

    if (workingProjectData) {
      project = new ProjectModel(workingProjectData);
    } else {
      project = await loadProject();

      await saveWorkingProjectData(project.toObject());
    }

    const tree = project.getContainerTree();

    if (!tree) {
      showTreeMessage("The project does not contain a root page.");
      return;
    }

    renderContainerTree(tree);
  } catch (error) {
    console.error("Teacher View could not load the project.", error);
    showTreeMessage("The classroom project could not be loaded.");
  }
  selectContainer(project.startContainerId);
}

function renderContainerTree(tree) {
  containerTreeElement.replaceChildren();

  const treeList = document.createElement("ul");
  treeList.className = "container-tree-list container-tree-root";

  treeList.appendChild(createTreeNode(tree));

  containerTreeElement.appendChild(treeList);
}

function createTreeNode(node) {
  const listItem = document.createElement("li");
  listItem.className = "container-tree-item";

  const row = document.createElement("div");
  row.className = "container-tree-row";
  row.dataset.containerId = node.id;

  const hasChildren = node.children.length > 0;

  const toggleButton = document.createElement("button");
  toggleButton.className = "container-tree-toggle";
  toggleButton.type = "button";
  toggleButton.setAttribute(
    "aria-label",
    hasChildren ? `Collapse ${node.title}` : `${node.title} has no child pages`,
  );
  toggleButton.disabled = !hasChildren;
  toggleButton.textContent = hasChildren ? "▼" : "•";

  const selectButton = document.createElement("button");
  selectButton.className = "container-tree-select";
  selectButton.type = "button";
  selectButton.textContent = node.title || "Untitled Page";
  selectButton.dataset.containerId = node.id;

  if (!node.active) {
    row.classList.add("container-tree-row-inactive");
    selectButton.textContent += " (Inactive)";
  }

  selectButton.addEventListener("click", () => {
    selectContainer(node.id);
  });

  row.append(toggleButton, selectButton);
  listItem.appendChild(row);

  if (hasChildren) {
    const childList = document.createElement("ul");
    childList.className = "container-tree-list";

    node.children.forEach((childNode) => {
      childList.appendChild(createTreeNode(childNode));
    });

    listItem.appendChild(childList);

    toggleButton.addEventListener("click", () => {
      const isCollapsed = childList.hidden;

      childList.hidden = !isCollapsed;
      toggleButton.textContent = isCollapsed ? "▼" : "▶";

      toggleButton.setAttribute(
        "aria-label",
        `${isCollapsed ? "Collapse" : "Expand"} ${node.title}`,
      );
    });
  }

  return listItem;
}

function selectContainer(containerId) {
  selectedContainerId = containerId;

  document.querySelectorAll(".container-tree-row-selected").forEach((row) => {
    row.classList.remove("container-tree-row-selected");
  });

  const selectedRow = containerTreeElement.querySelector(
    `[data-container-id="${CSS.escape(containerId)}"]`,
  );

  selectedRow?.classList.add("container-tree-row-selected");

  showSelectedContainer(containerId);
}

function showSelectedContainer(containerId) {
  const container = project.getContainer(containerId);

  if (!container) {
    return;
  }

  const pagePanel = document.querySelector(".teacher-page-panel .teacher-panel-content");

  pagePanel.replaceChildren();

  const heading = document.createElement("h3");
  heading.className = "selected-page-title";
  heading.textContent = container.title || "Untitled Page";

  const layoutList = document.createElement("ol");
  layoutList.className = "teacher-layout-list";

  const layout = project.getLayout(containerId);

  selectedLayoutIndex = null;

  if (layout.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "teacher-layout-empty";
    emptyMessage.textContent = "This page has no sections or tiles.";

    pagePanel.append(heading, emptyMessage);
    return;
  }

  layout.forEach((entry, entryIndex) => {
    layoutList.appendChild(createLayoutRow(entry, entryIndex));
  });

  pagePanel.append(heading, layoutList);
}

function createLayoutRow(entry, entryIndex) {
  const row = document.createElement("li");
  row.className = "teacher-layout-row";
  row.dataset.layoutIndex = entryIndex;
  row.tabIndex = 0;

  const thumbnail = createLayoutThumbnail(entry);

  const icon = document.createElement("span");
  icon.className = "teacher-layout-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = getLayoutIcon(entry.type);

  const name = document.createElement("span");
  name.className = "teacher-layout-name";
  name.textContent = getLayoutName(entry);

  row.append(thumbnail, icon, name);

  row.addEventListener("click", () => {
    selectLayoutEntry(entryIndex);
  });

  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectLayoutEntry(entryIndex);
    }
  });

  return row;
}

function createLayoutThumbnail(entry) {
  const frame = document.createElement("div");
  frame.className = "teacher-layout-thumbnail-frame";

  if (entry.type === "section") {
    frame.classList.add("teacher-layout-thumbnail-section");
    frame.textContent = "Section";
    return frame;
  }

  const imageFileName = entry.image;

  const image = document.createElement("img");
  image.className = "teacher-layout-thumbnail";
  image.src = imageFileName ? getImagePath(imageFileName) : getDefaultTileImagePath();
  image.alt = "";

  image.addEventListener("error", () => {
    image.src = getDefaultTileImagePath();
  });

  frame.appendChild(image);

  return frame;
}

function getLayoutIcon(type) {
  const icons = {
    section: "────",
    navigation: "🧭",
    video: "▶️",
    localVideo: "▶️",
    image: "🖼️",
    website: "🌐",
    pdf: "📄",
    powerpoint: "📊",
    information: "ℹ️",
  };

  return icons[type] || "•";
}

function getLayoutName(entry) {
  if (entry.type === "navigation") {
    const targetContainer = project.getContainer(entry.container);

    return targetContainer?.title || "Missing Page";
  }

  return entry.label || "Untitled Item";
}

function selectLayoutEntry(entryIndex) {
  selectedLayoutIndex = entryIndex;

  document.querySelectorAll(".teacher-layout-row-selected").forEach((row) => {
    row.classList.remove("teacher-layout-row-selected");
  });

  const selectedRow = document.querySelector(
    `.teacher-layout-row[data-layout-index="${entryIndex}"]`,
  );

  selectedRow?.classList.add("teacher-layout-row-selected");
}

function showTreeMessage(message) {
  containerTreeElement.replaceChildren();

  const messageElement = document.createElement("p");
  messageElement.className = "teacher-tree-message";
  messageElement.textContent = message;

  containerTreeElement.appendChild(messageElement);
}

function openAddSeparatorDialog() {
  if (!selectedContainerId) {
    showTeacherMessage("Select a page before adding a secetion heading.");
    return;
  }

  editingSeparator = false;

  addSeparatorDialogTitle.textContent = "Add Section";
  addSeparatorSubmitButton.textContent = "Add Section";

  separatorNameInput.value = "";
  addSeparatorDialog.showModal();

  window.requestAnimationFrame(() => {
    separatorNameInput.focus();
  });
}

function openEditSeparatorDialog(entry) {
  editingSeparator = true;

  addSeparatorDialogTitle.textContent = "Edit Section";
  addSeparatorSubmitButton.textContent = "Save Changes";

  separatorNameInput.value = entry.label || "";

  addSeparatorDialog.showModal();

  window.requestAnimationFrame(() => {
    separatorNameInput.select();
  });
}

function closeAddSubpageDialog() {
  editingNavigation = false;
  editingNavigationContainerId = null;

  subpageNameInput.value = "";
  subpageImageInput.value = "";
  subpageImagePreview.src = getDefaultTileImagePath();

  if (addSubpageDialog.open) {
    addSubpageDialog.close();
  }
}

async function createSubpage(event) {
  event.preventDefault();

  const pageName = subpageNameInput.value.trim();

  if (!pageName || !selectedContainerId) {
    return;
  }

  if (editingNavigation) {
    if (editingNavigationContainerId === null || selectedLayoutIndex === null) {
      showTeacherMessage("The selected navigation item could not be found.");
      return;
    }

    const editedIndex = selectedLayoutIndex;

    project.renameContainer(editingNavigationContainerId, pageName);

    project.updateLayoutEntry(selectedContainerId, selectedLayoutIndex, {
      image: subpageImageInput.value.trim(),
    });

    await saveWorkingProjectData(project.toObject());

    renderContainerTree(project.getContainerTree());

    showSelectedContainer(selectedContainerId);
    selectLayoutEntry(editedIndex);

    closeAddSubpageDialog();
    return;
  }

  try {
    const newContainerId = project.createContainer({
      title: pageName,
      parentId: selectedContainerId,
      navigationImage: subpageImageInput.value.trim(),
    });

    await saveWorkingProjectData(project.toObject());

    renderContainerTree(project.getContainerTree());
    selectContainer(newContainerId);

    closeAddSubpageDialog();
  } catch (error) {
    console.error("Subpage could not be created.", error);
    window.alert(error.message || "The subpage could not be created.");
  }
}

async function deleteSelectedPage() {
  if (!selectedContainerId) {
    return;
  }

  const container = project.getContainer(selectedContainerId);

  if (!container) {
    return;
  }

  try {
    // Run the ProjectModel checks without deleting yet.
    if (selectedContainerId === project.startContainerId) {
      throw new Error("The Home page cannot be deleted.");
    }

    if (project.getChildIds(selectedContainerId).length > 0) {
      throw new Error("This page cannot be deleted because it has subpages.");
    }

    if (project.getLayout(selectedContainerId).length > 0) {
      throw new Error("This page cannot be deleted because it is not empty.");
    }

    const confirmed = await showTeacherConfirmation(
      `Delete page "${container.title}"?`,
      "Confirm Delete",
    );

    if (!confirmed) {
      return;
    }

    const parentId = project.deleteContainer(selectedContainerId);

    await saveWorkingProjectData(project.toObject());

    renderContainerTree(project.getContainerTree());
    selectContainer(parentId);
  } catch (error) {
    console.error("Page could not be deleted.", error);

    showTeacherMessage(error.message || "The page could not be deleted.", "Unable to Delete Page");
  }
}

function openAddTileDialog() {
  editingTile = false;

  addTileDialogTitle.textContent = "Add Tile";
  addTileSubmitButton.textContent = "Add Tile";

  tileNameInput.value = "";
  tileTypeSelect.value = "placeholder";
  tileTypeSelect.disabled = false;

  tileThumbnailInput.value = "";
  tileThumbnailPreview.src = getDefaultTileImagePath();

  tileDestinationInput.value = "";

  updateTileDestinationField();

  addTileDialog.showModal();

  window.requestAnimationFrame(() => {
    tileNameInput.focus();
  });
}

function openEditItemDialog() {
  if (selectedContainerId === null || selectedLayoutIndex === null) {
    showTeacherMessage("Select a tile to edit.");
    return;
  }

  const layout = project.getLayout(selectedContainerId);
  const entry = layout[selectedLayoutIndex];

  if (!entry) {
    showTeacherMessage("The selected item could not be found.");
    return;
  }

  if (entry.type === "section") {
    openEditSeparatorDialog(entry);
    return;
  }

  if (entry.type === "navigation") {
    openEditNavigationDialog(entry);
    return;
  }

  editingTile = true;

  addTileDialogTitle.textContent = "Edit Tile";
  addTileSubmitButton.textContent = "Save Changes";

  tileNameInput.value = entry.label || "";
  tileTypeSelect.value = entry.type;
  tileTypeSelect.disabled = true;

  tileThumbnailInput.value = entry.image || "";

  tileThumbnailPreview.src = entry.image ? getImagePath(entry.image) : getDefaultTileImagePath();

  tileDestinationInput.value = entry.target || "";

  updateTileDestinationField();

  addTileDialog.showModal();

  window.requestAnimationFrame(() => {
    tileNameInput.select();
  });
}

function openAddSubpageDialog() {
  editingNavigation = false;
  editingNavigationContainerId = null;

  if (!selectedContainerId) {
    showTeacherMessage("Select a page before adding a subpage.");
    return;
  }

  document.getElementById("add-subpage-title").textContent = "Add Subpage";
  subpageNameInput.value = "";
  subpageImageInput.value = "";
  subpageImagePreview.src = getDefaultTileImagePath();

  addSubpageDialog.showModal();

  window.requestAnimationFrame(() => {
    subpageNameInput.focus();
  });
}

function openEditNavigationDialog(entry) {
  const targetContainer = project.getContainer(entry.container);

  if (!targetContainer) {
    showTeacherMessage("The page connected to this navigation item could not be found.");
    return;
  }

  editingNavigation = true;
  editingNavigationContainerId = entry.container;

  document.getElementById("add-subpage-title").textContent = "Edit Navigation";

  subpageNameInput.value = targetContainer.title || "";
  subpageImageInput.value = entry.image || "";

  subpageImagePreview.src = entry.image ? getImagePath(entry.image) : getDefaultTileImagePath();

  addSubpageDialog.showModal();

  window.requestAnimationFrame(() => {
    subpageNameInput.select();
  });
}

function closeAddSeparatorDialog() {
  editingSeparator = false;
  separatorNameInput.value = "";

  if (addSeparatorDialog.open) {
    addSeparatorDialog.close();
  }
}

async function createSeparator(event) {
  event.preventDefault();

  if (!selectedContainerId) {
    showTeacherMessage("Select a page before adding a section heading.");
    return;
  }

  const label = separatorNameInput.value.trim();

  if (!label) {
    showTeacherMessage("Enter a name for the section.");
    separatorNameInput.focus();
    return;
  }

  if (editingSeparator) {
    if (selectedLayoutIndex === null) {
      showTeacherMessage("The selected section heading could not be found.");
      return;
    }

    project.updateLayoutEntry(selectedContainerId, selectedLayoutIndex, {
      label,
    });

    const editedIndex = selectedLayoutIndex;

    await saveWorkingProjectData(project.toObject());

    showSelectedContainer(selectedContainerId);
    selectLayoutEntry(editedIndex);

    closeAddSeparatorDialog();
    return;
  }

  const separator = {
    id: createSeparatorId(),
    type: "section",
    label,
    active: true,
  };

  const newLayoutIndex = project.addLayoutEntry(
    selectedContainerId,
    separator,
    selectedLayoutIndex,
  );

  await saveWorkingProjectData(project.toObject());

  showSelectedContainer(selectedContainerId);
  selectLayoutEntry(newLayoutIndex);

  closeAddSeparatorDialog();
}

function createSeparatorId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `section-${crypto.randomUUID()}`;
  }

  return `section-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function createTile(event) {
  event.preventDefault();

  if (!selectedContainerId) {
    showTeacherMessage("Select a page before adding a tile.");
    return;
  }

  const label = tileNameInput.value.trim();
  const type = tileTypeSelect.value;
  const image = tileThumbnailInput.value.trim();
  const target = type === "placeholder" ? "" : tileDestinationInput.value.trim();

  if (!label) {
    showTeacherMessage("Enter a name for the tile.");
    tileNameInput.focus();
    return;
  }

  if (type !== "placeholder" && !target) {
    showTeacherMessage("Enter a destination for the tile.");
    tileDestinationInput.focus();
    return;
  }

  if (editingTile) {
    if (selectedLayoutIndex === null) {
      showTeacherMessage("The selected tile could not be found.");
      return;
    }

    const layout = project.getLayout(selectedContainerId);
    const existingTile = layout[selectedLayoutIndex];

    if (!existingTile) {
      showTeacherMessage("The selected tile could not be found.");
      return;
    }

    project.updateLayoutEntry(selectedContainerId, selectedLayoutIndex, {
      label,
      image,
      target,
    });

    await saveWorkingProjectData(project.toObject());

    const editedIndex = selectedLayoutIndex;

    showSelectedContainer(selectedContainerId);
    selectLayoutEntry(editedIndex);

    closeAddTileDialog();
    return;
  }

  const tile = {
    id: createTileId(),
    type,
    label,
    image,
    target,
    active: true,
  };

  const newLayoutIndex = project.addLayoutEntry(selectedContainerId, tile, selectedLayoutIndex);

  await saveWorkingProjectData(project.toObject());

  showSelectedContainer(selectedContainerId);
  selectLayoutEntry(newLayoutIndex);

  closeAddTileDialog();
}

function createTileId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `tile-${crypto.randomUUID()}`;
  }

  return `tile-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function closeAddTileDialog() {
  editingTile = false;
  tileTypeSelect.disabled = false;

  if (addTileDialog.open) {
    addTileDialog.close();
  }
}

function openSubpageImagePickerDialog() {
  imagePickerTarget = "subpage";
  selectedImagePath = subpageImageInput.value || null;
  imageSearchInput.value = "";

  renderImagePickerList();

  if (selectedImagePath) {
    updateImagePickerSelection(selectedImagePath);
  } else {
    imagePickerPreview.src = getDefaultTileImagePath();
    imagePickerFileName.textContent = "No image selected";
    selectImageButton.disabled = true;
  }

  imagePickerDialog.showModal();

  window.requestAnimationFrame(() => {
    imageSearchInput.focus();
  });
}

function openImagePickerDialog() {
  selectedImagePath = tileThumbnailInput.value || null;
  imageSearchInput.value = "";
  imagePickerTarget = "tile";

  renderImagePickerList();

  if (selectedImagePath) {
    updateImagePickerSelection(selectedImagePath);
  } else {
    imagePickerPreview.src = getDefaultTileImagePath();
    imagePickerFileName.textContent = "No image selected";
    selectImageButton.disabled = true;
  }

  imagePickerDialog.showModal();

  window.requestAnimationFrame(() => {
    imageSearchInput.focus();
  });
}

function openTileDestinationImagePickerDialog() {
  imagePickerTarget = "destination";
  selectedImagePath = tileDestinationInput.value || null;
  imageSearchInput.value = "";

  renderImagePickerList();

  if (selectedImagePath) {
    updateImagePickerSelection(selectedImagePath);
  } else {
    imagePickerPreview.src = getDefaultTileImagePath();
    imagePickerFileName.textContent = "No image selected";
    selectImageButton.disabled = true;
  }

  imagePickerDialog.showModal();

  window.requestAnimationFrame(() => {
    imageSearchInput.focus();
  });
}

function renderImagePickerList() {
  imagePickerList.replaceChildren();

  const catalog = Array.isArray(window.CLASSROOM_IMAGES) ? window.CLASSROOM_IMAGES : [];

  const searchText = imageSearchInput.value.trim().toLowerCase();

  const filteredImages = catalog.filter((imagePath) => {
    const fileName = getImageFileName(imagePath).toLowerCase();

    return fileName.includes(searchText);
  });

  if (filteredImages.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "image-picker-empty";
    emptyMessage.textContent = "No matching images found.";

    imagePickerList.appendChild(emptyMessage);
    return;
  }

  filteredImages.forEach((imagePath) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "image-picker-list-item";
    button.dataset.imagePath = imagePath;
    button.textContent = getImageFileName(imagePath);

    if (imagePath === selectedImagePath) {
      button.classList.add("image-picker-list-item-selected");
    }

    button.addEventListener("click", () => {
      updateImagePickerSelection(imagePath);
    });

    button.addEventListener("dblclick", () => {
      updateImagePickerSelection(imagePath);
      applySelectedImage();
    });

    imagePickerList.appendChild(button);
  });
}

function updateImagePickerSelection(imagePath) {
  selectedImagePath = imagePath;

  imagePickerPreview.src = getImagePath(imagePath);
  imagePickerFileName.textContent = getImageFileName(imagePath);
  selectImageButton.disabled = false;

  imagePickerList.querySelectorAll(".image-picker-list-item-selected").forEach((item) => {
    item.classList.remove("image-picker-list-item-selected");
  });

  const selectedItem = imagePickerList.querySelector(
    `[data-image-path="${CSS.escape(imagePath)}"]`,
  );

  selectedItem?.classList.add("image-picker-list-item-selected");
}

function getImageFileName(imagePath) {
  return imagePath.split("/").pop() || imagePath;
}

function closeImagePickerDialog() {
  selectedImagePath = null;

  if (imagePickerDialog.open) {
    imagePickerDialog.close();
  }
}

function renderPdfPickerList() {
  pdfPickerList.replaceChildren();

  const catalog = Array.isArray(window.CLASSROOM_PDFS) ? window.CLASSROOM_PDFS : [];

  const searchText = pdfSearchInput.value.trim().toLowerCase();

  const filteredPdfs = catalog.filter((fileName) => fileName.toLowerCase().includes(searchText));

  if (filteredPdfs.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "pdf-picker-empty";
    emptyMessage.textContent = "No matching PDF files found.";

    pdfPickerList.appendChild(emptyMessage);
    return;
  }

  filteredPdfs.forEach((fileName) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "pdf-picker-list-item";
    button.dataset.pdfFileName = fileName;
    button.textContent = fileName;

    if (fileName === selectedPdf) {
      button.classList.add("pdf-picker-list-item-selected");
    }

    button.addEventListener("click", () => {
      updatePdfPickerSelection(fileName);
    });

    button.addEventListener("dblclick", () => {
      updatePdfPickerSelection(fileName);
      applySelectedPdf();
    });

    pdfPickerList.appendChild(button);
  });
}

function updatePdfPickerSelection(fileName) {
  selectedPdf = fileName;

  selectPdfButton.disabled = false;

  pdfPickerList.querySelectorAll(".pdf-picker-list-item-selected").forEach((item) => {
    item.classList.remove("pdf-picker-list-item-selected");
  });

  const selectedItem = pdfPickerList.querySelector(
    `[data-pdf-file-name="${CSS.escape(fileName)}"]`,
  );

  selectedItem?.classList.add("pdf-picker-list-item-selected");
}

function closePdfPickerDialog() {
  selectedPdf = null;

  if (pdfPickerDialog.open) {
    pdfPickerDialog.close();
  }
}

function openPdfPickerDialog() {
  selectedPdf = tileDestinationInput.value || null;
  pdfSearchInput.value = "";

  renderPdfPickerList();

  if (selectedPdf) {
    updatePdfPickerSelection(selectedPdf);
  } else {
    selectPdfButton.disabled = true;
  }

  pdfPickerDialog.showModal();

  window.requestAnimationFrame(() => {
    pdfSearchInput.focus();
  });
}

function applySelectedPdf() {
  if (!selectedPdf) {
    return;
  }

  tileDestinationInput.value = selectedPdf;

  closePdfPickerDialog();
}

function renderVideoPickerList() {
  videoPickerList.replaceChildren();

  const catalog = Array.isArray(window.CLASSROOM_VIDEOS) ? window.CLASSROOM_VIDEOS : [];

  const searchText = videoSearchInput.value.trim().toLowerCase();

  const filteredVideos = catalog.filter((fileName) => fileName.toLowerCase().includes(searchText));

  if (filteredVideos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "pdf-picker-empty";
    emptyMessage.textContent = "No matching video files found.";

    videoPickerList.appendChild(emptyMessage);
    return;
  }

  filteredVideos.forEach((fileName) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "pdf-picker-list-item";
    button.dataset.videoFileName = fileName;
    button.textContent = fileName;

    if (fileName === selectedVideo) {
      button.classList.add("pdf-picker-list-item-selected");
    }

    button.addEventListener("click", () => {
      updateVideoPickerSelection(fileName);
    });

    button.addEventListener("dblclick", () => {
      updateVideoPickerSelection(fileName);
      applySelectedVideo();
    });

    videoPickerList.appendChild(button);
  });
}

function updateVideoPickerSelection(fileName) {
  selectedVideo = fileName;

  selectVideoButton.disabled = false;

  videoPickerList.querySelectorAll(".pdf-picker-list-item-selected").forEach((item) => {
    item.classList.remove("pdf-picker-list-item-selected");
  });

  const selectedItem = videoPickerList.querySelector(
    `[data-video-file-name="${CSS.escape(fileName)}"]`,
  );

  selectedItem?.classList.add("pdf-picker-list-item-selected");
}

function closeVideoPickerDialog() {
  selectedVideo = null;

  if (videoPickerDialog.open) {
    videoPickerDialog.close();
  }
}

function openVideoPickerDialog() {
  selectedVideo = tileDestinationInput.value || null;
  videoSearchInput.value = "";

  renderVideoPickerList();

  if (selectedVideo) {
    updateVideoPickerSelection(selectedVideo);
  } else {
    selectVideoButton.disabled = true;
  }

  videoPickerDialog.showModal();

  window.requestAnimationFrame(() => {
    videoSearchInput.focus();
  });
}

function applySelectedVideo() {
  if (!selectedVideo) {
    return;
  }

  tileDestinationInput.value = selectedVideo;

  closeVideoPickerDialog();
}

function applySelectedImage() {
  if (!selectedImagePath) {
    return;
  }

  if (imagePickerTarget === "subpage") {
    subpageImageInput.value = selectedImagePath;
    subpageImagePreview.src = getImagePath(selectedImagePath);
  } else if (imagePickerTarget === "destination") {
    tileDestinationInput.value = selectedImagePath;
  } else {
    tileThumbnailInput.value = selectedImagePath;
    tileThumbnailPreview.src = getImagePath(selectedImagePath);
  }

  closeImagePickerDialog();
}

async function deleteSelectedItem() {
  if (selectedContainerId === null || selectedLayoutIndex === null) {
    showTeacherMessage("Select a section heading or tile to delete.");

    return;
  }

  const layout = project.getLayout(selectedContainerId);
  const entry = layout[selectedLayoutIndex];

  if (!entry) {
    showTeacherMessage("The selected item could not be found.");

    return;
  }

  if (entry.type === "navigation") {
    showTeacherMessage(
      "Navigation tiles cannot be deleted. They will be removed when the page is deleted.",
      "Navigation Tile",
    );
    return;
  }

  const confirmed = await showTeacherConfirmation(
    `Delete "${getLayoutName(entry)}"?`,
    "Confirm Delete",
  );

  if (!confirmed) {
    return;
  }

  const deletedIndex = selectedLayoutIndex;

  project.deleteLayoutEntry(selectedContainerId, deletedIndex);

  await saveWorkingProjectData(project.toObject());

  const updatedLayout = project.getLayout(selectedContainerId);

  showSelectedContainer(selectedContainerId);

  if (updatedLayout.length === 0) {
    return;
  }

  const nextSelectedIndex = Math.min(deletedIndex, updatedLayout.length - 1);

  selectLayoutEntry(nextSelectedIndex);
}

function updateTileDestinationField() {
  const type = tileTypeSelect.value;

  if (type === "placeholder") {
    tileDestinationGroup.hidden = true;
    tileDestinationInput.required = false;
    return;
  }

  tileDestinationGroup.hidden = false;
  tileDestinationInput.required = true;

  const usesLocalPicker = type === "pdf" || type === "image" || type === "localVideo";

  tileDestinationInput.readOnly = usesLocalPicker;

  tileDestinationInput.placeholder =
    type === "pdf"
      ? "Click to choose a PDF"
      : type === "image"
        ? "Click to choose an image"
        : type === "localVideo"
          ? "Click to choose a video"
          : type === "video"
            ? "Paste a YouTube URL"
            : "";

  const labels = {
    video: "YouTube URL:",
    localVideo: "Video File:",
    website: "Website URL:",
    pdf: "PDF File or URL:",
    image: "Image:",
  };

  tileDestinationLabel.textContent = labels[type] || "Destination:";
}

async function moveSelectedItem(direction) {
  if (selectedContainerId === null || selectedLayoutIndex === null) {
    showTeacherMessage("Select a section heading, tile, or navigation item to move.");

    return;
  }

  const layout = project.getLayout(selectedContainerId);
  const destinationIndex = selectedLayoutIndex + direction;

  if (destinationIndex < 0 || destinationIndex >= layout.length) {
    return;
  }

  const result = project.moveLayoutEntry(
    selectedContainerId,
    selectedLayoutIndex,
    destinationIndex,
  );

  await saveWorkingProjectData(project.toObject());

  showSelectedContainer(selectedContainerId);
  selectLayoutEntry(result.newIndex);

  if (result.treeChanged) {
    renderContainerTree(project.getContainerTree());

    const selectedRow = containerTreeElement.querySelector(
      `[data-container-id="${CSS.escape(selectedContainerId)}"]`,
    );

    selectedRow?.classList.add("container-tree-row-selected");
  }
}

function showTeacherMessage(message, title = "Message") {
  messageDialogTitle.textContent = title;
  messageDialogText.textContent = message;

  messageDialogCancelButton.hidden = true;
  messageDialogOkButton.textContent = "OK";

  messageDialog.showModal();
}

function showTeacherConfirmation(message, title = "Confirm") {
  return new Promise((resolve) => {
    messageDialogTitle.textContent = title;
    messageDialogText.textContent = message;

    messageDialogCancelButton.hidden = false;
    messageDialogCancelButton.textContent = "Do Not Delete";
    messageDialogOkButton.textContent = "Delete";

    function finish(result) {
      messageDialogOkButton.removeEventListener("click", confirmDelete);
      messageDialogCancelButton.removeEventListener("click", cancelDelete);

      if (messageDialog.open) {
        messageDialog.close();
      }

      resolve(result);
    }

    function confirmDelete() {
      finish(true);
    }

    function cancelDelete() {
      finish(false);
    }

    messageDialogOkButton.addEventListener("click", confirmDelete);
    messageDialogCancelButton.addEventListener("click", cancelDelete);

    messageDialog.showModal();
  });
}

/* =========================================================
   Event Listeners
   ========================================================= */

previewButton.addEventListener("click", async () => {
  await saveWorkingProjectData(project.toObject());
  window.location.href = "student.html?preview=true";
});
addSubpageButton.addEventListener("click", openAddSubpageDialog);
addSubpageForm.addEventListener("submit", createSubpage);
cancelAddSubpageButton.addEventListener("click", closeAddSubpageDialog);
addSubpageDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeAddSubpageDialog();
});
deletePageButton.addEventListener("click", deleteSelectedPage);
messageDialogOkButton.addEventListener("click", () => {
  if (!messageDialogCancelButton.hidden) {
    return;
  }

  messageDialog.close();
});
addTileButton.addEventListener("click", openAddTileDialog);
editItemButton.addEventListener("click", openEditItemDialog);
tileTypeSelect.addEventListener("change", updateTileDestinationField);
addSeparatorButton.addEventListener("click", openAddSeparatorDialog);
addSeparatorForm.addEventListener("submit", createSeparator);
cancelAddSeparatorButton.addEventListener("click", closeAddSeparatorDialog);
addSeparatorDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeAddSeparatorDialog();
});
changeSubpageImageButton.addEventListener("click", openSubpageImagePickerDialog);
cancelAddTileButton.addEventListener("click", closeAddTileDialog);
addTileDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeAddTileDialog();
});
addTileForm.addEventListener("submit", createTile);
deleteItemButton.addEventListener("click", deleteSelectedItem);
moveItemUpButton.addEventListener("click", () => {
  moveSelectedItem(-1);
});
moveItemDownButton.addEventListener("click", () => {
  moveSelectedItem(1);
});
changeTileThumbnailButton.addEventListener("click", openImagePickerDialog);
imageSearchInput.addEventListener("input", renderImagePickerList);
cancelImagePickerButton.addEventListener("click", closeImagePickerDialog);
imagePickerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applySelectedImage();
});
imagePickerDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeImagePickerDialog();
});
tileDestinationInput.addEventListener("click", () => {
  if (tileTypeSelect.value === "pdf") {
    openPdfPickerDialog();
  } else if (tileTypeSelect.value === "image") {
    openTileDestinationImagePickerDialog();
  } else if (tileTypeSelect.value === "localVideo") {
    openVideoPickerDialog();
  }
});
tileDestinationInput.addEventListener("keydown", (event) => {
  if (tileTypeSelect.value === "pdf" && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openPdfPickerDialog();
  } else if (tileTypeSelect.value === "image" && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openTileDestinationImagePickerDialog();
  } else if (
    tileTypeSelect.value === "localVideo" &&
    (event.key === "Enter" || event.key === " ")
  ) {
    event.preventDefault();
    openVideoPickerDialog();
  }
});
pdfSearchInput.addEventListener("input", renderPdfPickerList);
cancelPdfPickerButton.addEventListener("click", closePdfPickerDialog);
pdfPickerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applySelectedPdf();
});
pdfPickerDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closePdfPickerDialog();
});
videoSearchInput.addEventListener("input", renderVideoPickerList);
cancelVideoPickerButton.addEventListener("click", closeVideoPickerDialog);
videoPickerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applySelectedVideo();
});
videoPickerDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeVideoPickerDialog();
});
publishButton.addEventListener("click", async () => {
  try {
    await saveWorkingProjectData(project.toObject());

    const result = await publishProject();

    if (result.status === "no-changes") {
      showTeacherMessage("The classroom is already up to date.", "Nothing to Publish");
      return;
    }

    showTeacherMessage("The classroom has been published successfully.", "Publish Complete");
  } catch (error) {
    console.error("Publish failed.", error);

    showTeacherMessage("The classroom could not be published. Please try again.", "Publish Failed");
  }
});
toolbarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("active");

    window.setTimeout(() => {
      button.classList.remove("active");
    }, 1000);
  });
});

catalogAssetsButton.addEventListener("click", async () => {
  try {
    const result = await catalogAssets();

    window.CLASSROOM_IMAGES = result.catalogs.images;
    window.CLASSROOM_PDFS = result.catalogs.pdfs;
    window.CLASSROOM_POWERPOINTS = result.catalogs.powerpoints;
    window.CLASSROOM_VIDEOS = result.catalogs.videos;

    showTeacherMessage("The classroom library has been updated successfully.", "Library Updated");
  } catch (error) {
    console.error("Library update failed.", error);

    showTeacherMessage(
      error.message || "The classroom library could not be updated.",
      "Library Update Failed",
    );
  }
});

void initializeTeacherView();
