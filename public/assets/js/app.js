const courseCells = document.querySelectorAll(".course");

const colors = {
  design: "#f5dfff",
  webdevelopment: "#d3f8dd",
  data: "#e0f1ff",
  security: "#ffecc9",
};

courseCells.forEach((cell) => {
  const code = (cell.getAttribute("data-course") || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  if (colors[code]) {
    cell.style.backgroundColor = colors[code];
    cell.style.color = "#222";
    cell.style.borderRadius = "4px";
    cell.style.padding = "4px 8px";
  }
});
