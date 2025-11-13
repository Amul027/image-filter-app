const upload = document.getElementById("upload");
const preview = document.getElementById("preview");

const grayscale = document.getElementById("grayscale");
const sepia = document.getElementById("sepia");
const blur = document.getElementById("blur");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");

const reset = document.getElementById("reset");
const download = document.getElementById("download");

let filters = {
  grayscale: 0,
  sepia: 0,
  blur: 0,
  brightness: 100,
  contrast: 100,
};

// Load image preview
upload.addEventListener("change", () => {
  const file = upload.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

// Update filters in real-time
document.querySelectorAll("input[type='range']").forEach((slider) => {
  slider.addEventListener("input", applyFilters);
});

function applyFilters() {
  filters.grayscale = grayscale.value;
  filters.sepia = sepia.value;
  filters.blur = blur.value;
  filters.brightness = brightness.value;
  filters.contrast = contrast.value;

  preview.style.filter = `
    grayscale(${filters.grayscale}%)
    sepia(${filters.sepia}%)
    blur(${filters.blur}px)
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
  `;
}

// Reset filters
reset.addEventListener("click", () => {
  grayscale.value = 0;
  sepia.value = 0;
  blur.value = 0;
  brightness.value = 100;
  contrast.value = 100;
  applyFilters();
});

// Download image with filters applied
download.addEventListener("click", () => {
  if (!preview.src) return alert("Please upload an image first!");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.crossOrigin = "anonymous";
  img.src = preview.src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.filter = preview.style.filter;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "filtered-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };
});
