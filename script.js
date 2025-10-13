
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const themeLink = document.getElementById("themeLink");
  const checkbox = document.getElementById("themeCheckbox");

  // При завантаженні сторінки
  const savedTheme = localStorage.getItem("theme") || "light";
  themeLink.href = savedTheme + ".css";
  if (checkbox) checkbox.checked = savedTheme === "dark";

  // Перемикання теми
  if (checkbox) {
    checkbox.addEventListener("change", () => {
      const newTheme = checkbox.checked ? "dark" : "light";
      themeLink.href = newTheme + ".css";
      localStorage.setItem("theme", newTheme);
    });
  }
});
