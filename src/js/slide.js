document.addEventListener("DOMContentLoaded", function () {
  // Elementos principais
  const slideSection = document.querySelector(".section--descricao-problema");
  const slideBgs = ["./src/assets/images/home/slide1.png", "./src/assets/images/home/slide2.png", "./src/assets/images/home/slide3.png"];

  // Conteúdos dos slides
  const slideContents = [
    {
      title: "A CRISE DAS ENCHENTES",
      text: ["Enchentes urbanas afetam milhões de pessoas no Brasil, causando perdas e danos severos.", "A DRYCity oferece alertas, orientação e medidas preventivas para áreas de risco."],
    },
    {
      title: "IMPACTO SOCIOECONÔMICO",
      text: ["Enchentes causam prejuízos de bilhões anualmente e afetam diretamente a economia local.", "Famílias perdem moradias, empresas fecham e infraestruturas públicas são danificadas permanentemente."],
    },
    {
      title: "TECNOLOGIA E PREVENÇÃO",
      text: ["Sistemas de monitoramento avançados podem reduzir impactos de enchentes em até 70%.", "Alertas antecipados e planejamento urbano adequado salvam vidas e protegem comunidades vulneráveis."],
    },
  ];

  // Elementos do slide
  const slideImg = slideSection.querySelector(".section--descricao-problema__bg");
  const slideTitle = slideSection.querySelector(".subtitulo h3");
  const slideTextPs = slideSection.querySelectorAll(".content-text p");
  const slideNavPrev = slideSection.querySelector(".slide-nav img:first-child");
  const slideNavNext = slideSection.querySelector(".slide-nav img:last-child");
  const slideStatus = slideSection.querySelector(".slide-status");

  let currentSlide = 0;
  let totalSlides = slideContents.length;
  let autoSlideInterval;

  // Atualizar número do slide
  slideStatus.innerHTML = `
    <p>1</p>
    <p>/</p>
    <p>${totalSlides}</p>
  `;

  // Função para atualizar o conteúdo do slide
  function updateSlide() {
    // Atualizar imagem de fundo com fade
    slideImg.style.opacity = "0";
    setTimeout(() => {
      slideImg.src = slideBgs[currentSlide];
      slideImg.style.opacity = "0.6";
    }, 300);

    // Atualizar título e textos
    slideTitle.textContent = slideContents[currentSlide].title;
    slideTextPs.forEach((p, index) => {
      p.textContent = slideContents[currentSlide].text[index];
    });

    // Atualizar contador
    slideStatus.firstElementChild.textContent = currentSlide + 1;
  }

  // Funções de navegação
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
    resetAutoSlide();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
    resetAutoSlide();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos
  }

  // Configurar eventos de clique para navegação
  slideNavPrev.addEventListener("click", prevSlide);
  slideNavNext.addEventListener("click", nextSlide);

  // Adicionar transição suave para a imagem
  slideImg.style.transition = "opacity 0.15s ease";

  // Iniciar slideshow
  resetAutoSlide();
});
