const palavras = [
    "javascript",
    "html",
    "css",
    "internet",
    "navegador",
    "programacao",
    "computador",
    "Lady gaga",
    "SOPHIE",
    "Madonna"
];

let palavraSecreta;
let tentativas = 6;
let letrasCorretas = [];
let letrasUsadas = [];

// Elementos HTML
const elementoPalavra = document.getElementById("palavra");
const elementoTentativas = document.getElementById("tentativas");
const inputLetra = document.getElementById("letra");
const mensagem = document.getElementById("mensagem");
const elementoLetrasUsadas = document.getElementById("letras-usadas");
const botaoTentar = document.getElementById("btn-tentar");
const botaoReiniciar = document.getElementById("btn-reiniciar");

// Iniciar o jogo
function iniciarJogo() {
    const indice = Math.floor(
        Math.random() * palavras.length
    );

    palavraSecreta = palavras[indice].toLowerCase();
    tentativas = 6;
    letrasCorretas = [];
    letrasUsadas = [];

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = "";
    inputLetra.value = "";

    atualizarPalavra();

    mensagem.textContent = "Novo jogo iniciado!";
    botaoTentar.disabled = false;
}

// Atualizar palavra exibida
function atualizarPalavra() {
    let exibicao = "";

    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letra === " ") {
            exibicao += "  ";
        } else if (letrasCorretas.includes(letra)) {
            exibicao += letra + " ";
        } else {
            exibicao += "_ ";
        }
    }

    elementoPalavra.textContent = exibicao;
}

// Verificar letra digitada
function verificarLetra() {
    const letra = inputLetra.value.toLowerCase().trim();

    if (letra === "") {
        mensagem.textContent = "Digite uma letra.";
        return;
    }

    if (!/^[a-zá-ú]$/i.test(letra)) {
        mensagem.textContent = "Digite apenas uma letra.";
        return;
    }

    if (letrasUsadas.includes(letra)) {
        mensagem.textContent = "Letra já utilizada.";
        return;
    }

    letrasUsadas.push(letra);

    if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
        mensagem.textContent = "Você acertou!";
    } else {
        tentativas--;
        mensagem.textContent = "Você errou!";
    }

    atualizarPalavra();

    elementoTentativas.textContent = tentativas;
    elementoLetrasUsadas.textContent = letrasUsadas.join(", ");

    inputLetra.value = "";

    // Verificar vitória ou derrota
    if (venceu()) {
        mensagem.textContent = "Parabéns! Você venceu!";
        botaoTentar.disabled = true;

    } else if (tentativas === 0) {
        mensagem.textContent =
            "Você perdeu! A palavra era " + palavraSecreta;
        botaoTentar.disabled = true;
    }
}

// Verificar se o jogador venceu
function venceu() {
    for (let i = 0; i < palavraSecreta.length; i++) {
        const letra = palavraSecreta[i];

        if (letra !== " " && !letrasCorretas.includes(letra)) {
            return false;
        }
    }

    return true;
}

// Eventos dos botões
botaoTentar.addEventListener(
    "click",
    verificarLetra
);

botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
);

// Iniciar jogo automaticamente
iniciarJogo();