document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const totalQuestions = 10; 
    let score = 0;
    let allAnswered = true;

    for (let i = 1; i <= totalQuestions; i++) {
      const selectedOption = form.querySelector(`input[name="opcao${i}"]:checked`);
      if (!selectedOption) {
        allAnswered = false;
        alert(`Por favor, responda a pergunta ${i}.`);
        break;
      } else {
        const optionId = selectedOption.id;
        const value = parseInt(optionId.split('-')[1]);
        score += value;
      }
    }

    if (allAnswered) {
      let resultadoTexto = '';
      if (score <= 15) {
        resultadoTexto = 'Sua avaliação geral indica que há pouca efetividade ou preocupação com enchentes.';
      } else if (score <= 30) {
        resultadoTexto = 'Sua avaliação indica uma preocupação moderada e conhecimento sobre o tema.';
      } else {
        resultadoTexto = 'Você demonstra um bom conhecimento e preocupação sobre enchentes na sua região.';
      }

      let resultadoDiv = document.getElementById('resultadoQuiz');
      if (!resultadoDiv) {
        resultadoDiv = document.createElement('div');
        resultadoDiv.id = 'resultadoQuiz';
        resultadoDiv.style.marginTop = '20px';
        resultadoDiv.style.padding = '15px';
        resultadoDiv.style.border = '2px solid #333';
        resultadoDiv.style.backgroundColor = '#f9f9f9';
        form.appendChild(resultadoDiv);
      }

      resultadoDiv.innerHTML = `
        <h3>Resultado do Quiz</h3>
        <p>Sua pontuação total é: <strong>${score}</strong> pontos.</p>
        <p>${resultadoTexto}</p>
      `;

      resultadoDiv.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
