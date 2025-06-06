document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const body = document.body;

  // Verificar se há preferência salva
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    body.classList.add("dark-mode");
  }

  // Alternar o modo escuro
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Salvar preferência
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
});
