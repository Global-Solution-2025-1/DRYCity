document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todas as linhas que devem ser animadas
  const linhas = document.querySelectorAll('.linha');
  const marca_texto = document.querySelectorAll('.marca-texto');

  // Configuração do Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Quando a linha entra na viewport, adiciona a classe animate
        entry.target.classList.add('animate');

        // Opcional: para observar apenas uma vez
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Quando 50% do elemento estiver visível
  });

  // Observa cada linha
  linhas.forEach(linha => {
    observer.observe(linha);
  });
  marca_texto.forEach(marca => {
    observer.observe(marca);
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os elementos com classe home-bg
  const homeBgs = document.querySelectorAll('.home-bg');
  // Seleciona todos os elementos com classe home-text-group
  const homeTextGroups = document.querySelectorAll('.home-text-group');

  // Configurações do parallax
  const parallaxSettings = {
    homeBg: {
      speed: 0.5 // Velocidade mais rápida (rola mais devagar que o conteúdo)
    },
    homeText: {
      speed: 0.3 // Velocidade mais lenta (rola mais rápido que o background)
    }
  };

  // Função de parallax
  function applyParallax() {
    const scrollPosition = window.pageYOffset;

    // Aplica parallax aos backgrounds
    homeBgs.forEach(bg => {
      const offset = scrollPosition * parallaxSettings.homeBg.speed;
      bg.style.transform = `translateY(-${offset}px)`;
    });

    // Aplica parallax aos textos
    homeTextGroups.forEach(textGroup => {
      const offset = scrollPosition * parallaxSettings.homeText.speed;
      textGroup.style.transform = `translateY(${offset}px)`;
    });
  }

  // Adiciona o event listener para scroll
  window.addEventListener('scroll', applyParallax);

  // Executa uma vez ao carregar para posicionar corretamente
  applyParallax();
});

const sections = document.querySelectorAll('.sec');
const tracker = document.querySelector(".tracker");

// Cria os dots uma vez só com base nas seções
sections.forEach(() => {
  const span = document.createElement('span');
  span.classList.add("dot"); // Corrigido aqui
  tracker.appendChild(span);
});

const dots = document.querySelectorAll('.dot');

window.addEventListener('scroll', () => {
  let current = 0;

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 2) {
      current = index;
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  dots[current].classList.add('active');
});

// const container = document.querySelector('.tecnologias');
// let timeout;

// container.addEventListener('scroll', () => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => {
//     const scrollTop = container.scrollTop;
//     const viewportHeight = window.innerHeight;
//     const nearestSection = Math.round(scrollTop / viewportHeight);

//     container.scrollTo({
//       top: nearestSection * viewportHeight,
//       behavior: 'smooth'
//     });
//   }, 80); // Pequeno delay após parar de scrollar
// });

