const DEFAULT_TILE_IMAGE_PATH = "resources/default-tile.jpg";
const DEFAULT_HEADER_IMAGE_PATH = "resources/default-header.jpg";

function isTeacherMode() {
  return (
    window.location.pathname.endsWith("/teacher.html") ||
    window.location.pathname.endsWith("teacher.html")
  );
}

function getAssetRoot() {
  return isTeacherMode() ? "/master-assets" : "assets";
}

export function getDefaultTileImagePath() {
  return DEFAULT_TILE_IMAGE_PATH;
}

export function getDefaultHeaderImagePath() {
  return DEFAULT_HEADER_IMAGE_PATH;
}

export function getImagePath(filename) {
  return `${getAssetRoot()}/images/${filename}`;
}

export function getPdfPath(filename) {
  return `${getAssetRoot()}/pdfs/${filename}`;
}

export function getVideoPath(filename) {
  return `${getAssetRoot()}/videos/${filename}`;
}

export function getPowerPointPath(filename) {
  return `${getAssetRoot()}/powerpoints/${filename}`;
}
