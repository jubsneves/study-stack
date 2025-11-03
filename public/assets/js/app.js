//Adding background colour to courses
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

//Setting 10s for messages
setTimeout(() => {
  const alerts = document.querySelectorAll(".alert");

  alerts.forEach((alert) => {
    alert.style.transition = "opacity 0.5s ease";
    alert.style.opacity = "0";
    setTimeout(() => alert.remove(), 500);
  });
}, 5000);
