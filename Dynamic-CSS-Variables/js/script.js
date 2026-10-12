const spacingInput = document.getElementById("spacing");
const blurInput = document.getElementById("blur");
const radiusInput = document.getElementById("radius");
const baseInput = document.getElementById("base");

const spacingValue = document.getElementById("spacing-value");
const blurValue = document.getElementById("blur-value");
const radiusValue = document.getElementById("radius-value");

const cssOutput = document.getElementById("css-output");
const copyButton = document.getElementById("copy-button");
const copyStatus = document.getElementById("copy-status");
const resetButton = document.getElementById("reset-button");

const root = document.documentElement;

function updateCSS() {
  // Obtém os valores atuais dos controles.
  const spacing = Number(spacingInput.value);
  const blur = Number(blurInput.value);
  const radius = Number(radiusInput.value);
  const base = baseInput.value;

  // Atualiza as variáveis CSS da página.
  root.style.setProperty("--spacing", `${spacing}px`);
  root.style.setProperty("--blur", `${blur}px`);
  root.style.setProperty("--radius", `${radius}px`);
  root.style.setProperty("--base-color", base);

  // Atualiza os valores exibidos nos controles.
  spacingValue.textContent = `${spacing}px`;
  blurValue.textContent = `${blur}px`;
  radiusValue.textContent = `${radius}px`;

  // Gera o código CSS correspondente aos valores atuais.
  cssOutput.textContent = `.preview-image {
  padding: ${spacing}px;
  filter: blur(${blur}px);
  border-radius: ${radius}px;
  background-color: ${base};
}`;

  // Limpa mensagens antigas de cópia.
  copyStatus.textContent = "";
}

// Atualiza a pré-visualização e o código ao alterar os controles.
[spacingInput, blurInput, radiusInput, baseInput].forEach((input) => {
  input.addEventListener("input", updateCSS);
});

// Copia o CSS gerado para a área de transferência.
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(cssOutput.textContent);
    copyStatus.textContent = "CSS copiado com sucesso!";
  } catch (error) {
    copyStatus.textContent =
      "Não foi possível copiar automaticamente. Selecione e copie o código manualmente.";
  }
});

// Restaura os valores iniciais.
resetButton.addEventListener("click", () => {
  spacingInput.value = 10;
  blurInput.value = 0;
  radiusInput.value = 12;
  baseInput.value = "#ffc600";

  updateCSS();
});

// Inicializa a página com os valores padrão.
updateCSS();
