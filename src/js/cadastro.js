document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Função para mostrar erro
  const showError = (input, message) => {
    input.style.borderColor = "red";

    // Verificar se já existe uma mensagem de erro
    let errorDiv = input.parentNode.querySelector(".error-message");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.classList.add("error-message");
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.marginTop = "5px";

      if (input.type === "radio") {
        const fieldset = input.closest("fieldset");
        fieldset.style.borderColor = "red";
        fieldset.appendChild(errorDiv);
      } else {
        input.parentNode.appendChild(errorDiv);
      }
    }

    errorDiv.textContent = message;
  };

  // Função para remover erro
  const removeError = (input) => {
    input.style.borderColor = "";

    let container = input.parentNode;
    if (input.type === "radio") {
      container = input.closest("fieldset");
      container.style.borderColor = "";
    }

    const errorDiv = container.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
  };

  // Validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validar nome completo
  const validateName = (name) => {
    return name.trim().split(" ").length >= 2;
  };

  // Validar CEP
  const validateCEP = (cep) => {
    return /^\d{8}$/.test(cep);
  };

  // Validar telefone
  const validatePhone = (phone) => {
    return /^\d{10,11}$/.test(phone);
  };

  // Validar senha
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Validar campos individualmente
  const validateField = (input) => {
    switch (input.id) {
      case "email":
        if (!validateEmail(input.value)) {
          showError(input, "Por favor, insira um email válido.");
          return false;
        } else {
          removeError(input);
          return true;
        }
      case "name":
        if (!validateName(input.value)) {
          showError(input, "Por favor, insira seu nome completo (nome e sobrenome).");
          return false;
        } else {
          removeError(input);
          return true;
        }
      case "cep":
        if (!validateCEP(input.value)) {
          showError(input, "O CEP deve conter exatamente 8 dígitos numéricos.");
          return false;
        } else {
          removeError(input);
          return true;
        }
      case "tel":
        if (!validatePhone(input.value)) {
          showError(input, "O telefone deve conter entre 10 e 11 dígitos incluindo o DDD.");
          return false;
        } else {
          removeError(input);
          return true;
        }
      case "estado":
        if (input.value === "") {
          showError(input, "Por favor, selecione um estado.");
          return false;
        } else {
          removeError(input);
          return true;
        }
      case "senha":
        if (!validatePassword(input.value)) {
          showError(input, "A senha deve ter pelo menos 8 caracteres.");
          return false;
        } else {
          removeError(input);

          // Verifica se a confirmação de senha corresponde
          const confirmSenha = document.querySelectorAll('input[type="password"]')[1];
          if (confirmSenha.value && confirmSenha.value !== input.value) {
            showError(confirmSenha, "As senhas não coincidem.");
          } else if (confirmSenha.value) {
            removeError(confirmSenha);
          }
          return true;
        }
      default:
        return true;
    }
  };

  // Função para validar todo o formulário
  const validateForm = () => {
    let isValid = true;

    // Validar campos de texto e select
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="password"], select');
    textInputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Validar confirmação de senha
    const senhas = document.querySelectorAll('input[type="password"]');
    if (senhas[0].value !== senhas[1].value) {
      showError(senhas[1], "As senhas não coincidem.");
      isValid = false;
    }

    // Validar tipo de cadastro
    const tipoInputs = document.querySelectorAll('input[name="tipo"]');
    const tipoSelecionado = Array.from(tipoInputs).some((input) => input.checked);
    if (!tipoSelecionado) {
      showError(tipoInputs[0], "Por favor, selecione um tipo de cadastro.");
      isValid = false;
    } else {
      removeError(tipoInputs[0]);
    }

    // Validar tipo de notificação
    const msgInputs = document.querySelectorAll('input[name="msg"]');
    const msgSelecionado = Array.from(msgInputs).some((input) => input.checked);
    if (!msgSelecionado) {
      showError(msgInputs[0], "Por favor, selecione um tipo de notificação.");
      isValid = false;
    } else {
      removeError(msgInputs[0]);
    }

    return isValid;
  };

  // Adicionar validação em tempo real para campos de texto e select
  const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="password"], select');
  textInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
  });

  // Validação especial para confirmação de senha
  const senhas = document.querySelectorAll('input[type="password"]');
  senhas[1].addEventListener("blur", () => {
    if (senhas[0].value !== senhas[1].value) {
      showError(senhas[1], "As senhas não coincidem.");
    } else {
      removeError(senhas[1]);
    }
  });

  // Validação para radio buttons
  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      const name = radio.getAttribute("name");
      const radios = document.querySelectorAll(`input[name="${name}"]`);
      removeError(radios[0]);
    });
  });

  // Prevenir envio do formulário se houver erros
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      alert("Cadastro realizado com sucesso!");
      form.reset();
    }
  });
});
