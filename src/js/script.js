document.addEventListener("DOMContentLoaded", function () {
  // Pegar todos os mains do documento
  const allMains = document.querySelectorAll("main");

  // Criar dots para navegação
  const tracker = document.createElement("div");
  tracker.className = "tracker";
  document.body.appendChild(tracker);

  // Criar dots baseados no número de seções no primeiro main
  const firstMainSections = allMains[0].querySelectorAll("section");
  const dots = [];

  for (let i = 0; i < firstMainSections.length; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    tracker.appendChild(dot);
    dots.push(dot);
  }

  // Função para atualizar os dots baseada apenas no main ativo
  function updatePageDots() {
    // Limpar todos os dots ativos primeiro
    dots.forEach((dot) => dot.classList.remove("active"));

    // Encontrar o main ativo
    const activeMain = document.querySelector('main[style*="display: flex"]') || allMains[0];

    // Obter todas as seções visíveis do main ativo
    const visibleSections = Array.from(activeMain.querySelectorAll("section"));

    // Determinar qual seção está visível na viewport
    visibleSections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      // Se a seção estiver pelo menos 50% visível
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        // Ativar o dot correspondente (se existir)
        if (dots[index]) {
          dots[index].classList.add("active");
        }
      }
    });
  }

  // Inicialmente mostrar apenas o primeiro main e esconder os outros
  allMains.forEach((main, index) => {
    if (index === 0) {
      main.style.display = "flex"; // Mantém o primeiro visível
    } else {
      main.style.display = "none"; // Esconde os outros
    }
  });

  // Variável para rastrear qual main está ativo
  let currentMainIndex = 0;

  // Adicionar eventos de clique em todos os elementos .proxima-secao
  const nextButtons = document.querySelectorAll(".proxima-secao");
  nextButtons.forEach((button) => {
    button.style.cursor = "pointer";

    button.addEventListener("click", function () {
      // Obter o main atual e o próximo
      const currentMain = allMains[currentMainIndex];

      // Adicionar classe para animar a saída
      currentMain.classList.add("main-exiting");

      // Aguardar a animação terminar antes de trocar
      setTimeout(() => {
        // Esconder o main atual
        currentMain.style.display = "none";
        currentMain.classList.remove("main-exiting");

        // Calcular o próximo índice (com loop circular)
        currentMainIndex = (currentMainIndex + 1) % allMains.length;

        // Rolar para o topo com animação suave
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        // Obter o próximo main
        const nextMain = allMains[currentMainIndex];

        // Preparar o próximo main para animação
        nextMain.classList.add("main-entering");
        nextMain.style.display = "flex";

        // Forçar um reflow para garantir que a transição ocorra
        void nextMain.offsetHeight;

        // Remover a classe para animar a entrada
        requestAnimationFrame(() => {
          nextMain.classList.remove("main-entering");
        });

        // Atualizar dots para o novo main
        updateDotsForCurrentMain();

        // Configurar o IntersectionObserver para o novo main
        setupIntersectionObserver();
      }, 300); // Metade da duração da transição para um efeito suave
    });
  });

  // Função para atualizar dots baseado no número de seções do main atual
  function updateDotsForCurrentMain() {
    // Limpar dots existentes
    tracker.innerHTML = "";
    dots.length = 0;

    // Criar novos dots baseados no número de seções no main atual
    const currentMainSections = allMains[currentMainIndex].querySelectorAll("section");

    for (let i = 0; i < currentMainSections.length; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      tracker.appendChild(dot);
      dots.push(dot);
    }

    // Atualizar o estado dos dots
    updatePageDots();
  }

  // Ajustar evento de clique nas setas home para funcionar com o novo sistema
  const homeArrows = document.querySelectorAll(".section--home__cta img");
  homeArrows.forEach((arrow) => {
    arrow.style.cursor = "pointer";

    arrow.addEventListener("click", function () {
      // Encontra a seção pai atual
      const currentSection = this.closest("section");

      // Encontra a próxima seção dentro do mesmo main
      const nextSection = currentSection.nextElementSibling;

      if (nextSection) {
        // Scroll suave para a próxima seção
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Atualizar os dots conforme o scroll
  window.addEventListener("scroll", updatePageDots);

  // Configurar o IntersectionObserver para animar elementos quando ficarem visíveis
  function setupIntersectionObserver() {
    // Limpar observadores existentes
    if (window.currentObserver) {
      window.currentObserver.disconnect();
    }

    // Encontrar o main ativo
    const activeMain = allMains[currentMainIndex];

    // Selecionar elementos a serem animados
    const linhas = activeMain.querySelectorAll(".linha");
    const marca_texto = activeMain.querySelectorAll(".marca-texto");

    // Configurar o observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar os elementos
    linhas.forEach((linha) => observer.observe(linha));

    if (marca_texto.length > 0) {
      marca_texto.forEach((marca) => observer.observe(marca));
    }

    // Armazenar o observer para limpeza futura
    window.currentObserver = observer;
  }

  // Inicialização
  allMains.forEach((main, index) => {
    if (index === 0) {
      // Primeiro main já visível, remover qualquer classe de transição
      main.classList.remove("main-entering");
      main.style.display = "flex";
    } else {
      // Outros mains escondidos
      main.style.display = "none";
    }
  });
  updateDotsForCurrentMain();
  setupIntersectionObserver();
});
