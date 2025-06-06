document.addEventListener("DOMContentLoaded", function () {
  // Verificar se o modo escuro está habilitado no localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    document.body.classList.add("dark-mode");
  }

  // Criar container para dark mode toggle se não existir
  let darkModeContainer = document.querySelector(".dark-mode-container");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (!darkModeContainer) {
    darkModeContainer = document.createElement("div");
    darkModeContainer.className = "dark-mode-container";
    darkModeToggle.parentNode.insertBefore(darkModeContainer, darkModeToggle);
    darkModeContainer.appendChild(darkModeToggle);
  }

  // Limpar conteúdo atual do toggle
  darkModeToggle.innerHTML = "";

  // Adicionar ícones SVG ao toggle
  const sunIcon = document.createElement("div");
  sunIcon.className = "theme-icon light-icon";

  const moonIcon = document.createElement("div");
  moonIcon.className = "theme-icon dark-icon";

  // Determinar o caminho correto para os ícones
  const basePath = window.location.pathname.includes("/pages/") ? "../assets/icons/" : "./src/assets/icons/";

  sunIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>`;

  moonIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>`;

  darkModeToggle.appendChild(sunIcon);
  darkModeToggle.appendChild(moonIcon);

  // Criar menu de temas
  const themeMenu = document.createElement("div");
  themeMenu.className = "theme-menu";

  // Adicionar item para tema claro
  const lightThemeItem = document.createElement("div");
  lightThemeItem.className = "theme-item";
  lightThemeItem.dataset.theme = "light";
  lightThemeItem.innerHTML = sunIcon.innerHTML;
  themeMenu.appendChild(lightThemeItem);

  // Adicionar item para tema escuro
  const darkThemeItem = document.createElement("div");
  darkThemeItem.className = "theme-item";
  darkThemeItem.dataset.theme = "dark";
  darkThemeItem.innerHTML = moonIcon.innerHTML;
  themeMenu.appendChild(darkThemeItem);

  darkModeContainer.appendChild(themeMenu);

  // Evento de clique no toggle para mostrar/esconder menu
  darkModeToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    darkModeContainer.classList.toggle("active");
  });

  // Evento de clique para tema claro
  lightThemeItem.addEventListener("click", function () {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", null);
    darkModeContainer.classList.remove("active");
  });

  // Evento de clique para tema escuro
  darkThemeItem.addEventListener("click", function () {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    darkModeContainer.classList.remove("active");
  });

  // Fechar o menu ao clicar fora dele
  document.addEventListener("click", function (e) {
    if (!darkModeContainer.contains(e.target)) {
      darkModeContainer.classList.remove("active");
    }
  });
});
