document.addEventListener("DOMContentLoaded", function() {
  // Elementos principais
  const slideSection = document.querySelector('.section--descricao-problema');
  const slideBgs = [
    './src/assets/images/home/slide1.png',
    './src/assets/images/home/slide2.png',
    './src/assets/images/home/slide3.png'
  ];

  // Conteúdos dos slides
  const slideContents = [
    {
      title: 'SUBTÍTULO 1',
      text: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in felis finibus, bibendum leo eget, condimentum eros. Duis nec lobortis.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in felis finibus, bibendum leo eget, condimentum eros. Duis nec lobortis.'
      ]
    },
    {
      title: 'SUBTÍTULO 2',
      text: [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
        'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
      ]
    },
    {
      title: 'SUBTÍTULO 3',
      text: [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
        'Deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
      ]
    }
  ];

  // Elementos do slide
  const slideImg = slideSection.querySelector('.section--descricao-problema__bg');
  const slideTitle = slideSection.querySelector('.subtitulo h3');
  const slideTextPs = slideSection.querySelectorAll('.content-text p');
  const slideNavPrev = slideSection.querySelector('.slide-nav img:first-child');
  const slideNavNext = slideSection.querySelector('.slide-nav img:last-child');
  const slideStatus = slideSection.querySelector('.slide-status');

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
    slideImg.style.opacity = '0';
    setTimeout(() => {
      slideImg.src = slideBgs[currentSlide];
      slideImg.style.opacity = '0.6';
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
  slideNavPrev.addEventListener('click', prevSlide);
  slideNavNext.addEventListener('click', nextSlide);

  // Adicionar transição suave para a imagem
  slideImg.style.transition = 'opacity 0.3s ease';

  // Iniciar slideshow
  resetAutoSlide();
});
