document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const currentTheme = document.body.classList.contains("dark-mode") ? "Dark Theme" : "Light Theme";
  document.getElementById("themeToggle").textContent = currentTheme;
});
