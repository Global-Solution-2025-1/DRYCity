document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
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
        const value = parseInt(optionId.split("-")[1]);
        score += value;
      }
    }

    if (allAnswered) {
      let resultadoTexto = "";
      if (score <= 15) {
        resultadoTexto = "Sua avaliação geral indica que há pouca efetividade ou preocupação com enchentes.";
      } else if (score <= 30) {
        resultadoTexto = "Sua avaliação indica uma preocupação moderada e conhecimento sobre o tema.";
      } else {
        resultadoTexto = "Você demonstra um bom conhecimento e preocupação sobre enchentes na sua região.";
      }

      let resultadoDiv = document.getElementById("resultadoQuiz");
      if (!resultadoDiv) {
        resultadoDiv = document.createElement("div");
        resultadoDiv.id = "resultadoQuiz";
        resultadoDiv.style.marginTop = "20px";
        resultadoDiv.style.padding = "15px";
        resultadoDiv.style.border = "2px solid #333";
        resultadoDiv.style.backgroundColor = "#f9f9f9";
        form.appendChild(resultadoDiv);
      }

      resultadoDiv.innerHTML = `
        <h3>Resultado do Quiz</h3>
        <p>Sua pontuação total é: <strong>${score}</strong> pontos.</p>
        <p>${resultadoTexto}</p>
      `;

      resultadoDiv.scrollIntoView({ behavior: "smooth" });
    }
  });

  const quizForm = document.querySelector(".section--quiz__form");
  const resultadoDiv = document.getElementById("quizResultado");
  const submitButton = document.getElementById("submitQuiz");
  const reiniciarButton = document.getElementById("reiniciarQuiz");

  // Função para verificar se todas as perguntas foram respondidas
  function todasPerguntasRespondidas() {
    const perguntas = document.querySelectorAll(".section--quiz__pergunta");
    for (let i = 0; i < perguntas.length; i++) {
      const opcoesSelecionadas = perguntas[i].querySelectorAll("input:checked");
      if (opcoesSelecionadas.length === 0) {
        return false;
      }
    }
    return true;
  }

  // Função para calcular a pontuação do quiz
  function calcularResultado() {
    let pontuacao = 0;
    const totalPerguntas = document.querySelectorAll(".section--quiz__pergunta").length;

    for (let i = 1; i <= totalPerguntas; i++) {
      const opcoesSelecionadas = document.querySelectorAll(`input[name="opcao${i}"]:checked`);
      if (opcoesSelecionadas.length > 0) {
        // Obter o valor da opção selecionada (1-5)
        const valorSelecionado = parseInt(opcoesSelecionadas[0].id.split("-")[1]);
        pontuacao += valorSelecionado;
      }
    }

    return pontuacao;
  }

  // Função para mostrar a tela de resultado
  function mostrarResultado() {
    if (!todasPerguntasRespondidas()) {
      alert("Por favor, responda todas as perguntas antes de ver o resultado.");
      return;
    }

    const pontuacao = calcularResultado();

    // Ocultar o formulário e mostrar o resultado
    quizForm.style.display = "none";
    resultadoDiv.style.display = "block";

    // Rolar para o topo da seção de resultado
    resultadoDiv.scrollIntoView({ behavior: "smooth" });
  }

  // Evento de clique no botão de envio
  if (submitButton) {
    submitButton.addEventListener("click", mostrarResultado);
  }

  // Evento de clique no botão de reiniciar
  if (reiniciarButton) {
    reiniciarButton.addEventListener("click", function () {
      // Limpar todas as seleções
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach((input) => {
        input.checked = false;
      });

      // Mostrar o formulário e ocultar o resultado
      quizForm.style.display = "block";
      resultadoDiv.style.display = "none";

      // Rolar para o topo do formulário
      quizForm.scrollIntoView({ behavior: "smooth" });
    });
  }
});
