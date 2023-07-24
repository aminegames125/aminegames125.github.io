// Theme Toggle Function
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const currentTheme = document.body.classList.contains("dark-mode") ? "Light Theme" : "Dark Theme";
  document.getElementById("themeToggle").textContent = currentTheme;
});
