// --- CONFIGURAÇÃO ---
const SENHA_CORRETA = "2025"; // Senha numérica
const DATA_FINAL_CONTRATO = new Date("2025-11-15T00:00:00").getTime();

// --- VARIÁVEIS DE ELEMENTOS ---
const overlaySenha = document.getElementById('password-overlay');
const inputSenha = document.getElementById('password-input');
const btnSenha = document.getElementById('password-button');
const msgErro = document.getElementById('error-message');
const telaEnvelope = document.getElementById('envelope-screen');
const envelope = document.querySelector('.envelope-wrapper');
const conteudoCarta = document.getElementById('content');
const rodapé = document.getElementById('page-footer');
const musica = document.getElementById('love-song');
const controleMusica = document.getElementById('music-control');
const elementosFadeIn = document.querySelectorAll('.fade-in-section');
let musicaTocando = false; // Estado inicial da música

// --- FUNÇÃO 1: INICIAR O CONTADOR ---
function iniciarContador() {
    const elementoContador = document.getElementById("countdown");
    if (!elementoContador) return; 

    const intervaloContador = setInterval(function() {
        const agora = new Date().getTime();
        const distancia = DATA_FINAL_CONTRATO - agora;
        
        // Cálculos de tempo
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        
        if (distancia > 0) {
            elementoContador.innerHTML = dias + "d " + horas + "h " + minutos + "m " + segundos + "s ";
        } else {
            clearInterval(intervaloContador);
            elementoContador.innerHTML = "CONTRATO FINALIZADO!";
        }
    }, 1000);
}

// --- FUNÇÃO 2: LOGAR E MOSTRAR ENVELOPE (Ajustado para Fade Mais Lento) ---
function verificarSenha() {
    const senhaDigitada = inputSenha.value.trim();
    
    if (senhaDigitada === SENHA_CORRETA) {
        // Sucesso: Esconde a senha, mostra o envelope
        
        // Adiciona um pequeno atraso (0.3s) antes de iniciar a transição 
        // para dar uma pausa antes de ir para o envelope.
        setTimeout(() => {
            overlaySenha.classList.add('hidden'); // Inicia o CSS fade-out (0.5s)
            telaEnvelope.style.display = 'flex';
        }, 300); 

        // Tenta tocar a música assim que a tela de senha estiver sumindo
        musica.volume = 0.5;
        musica.play().then(() => {
            musicaTocando = true;
            controleMusica.textContent = '🔊'; // Mostra ícone de som ligado
        }).catch(error => {
            musicaTocando = false;
            controleMusica.textContent = '🔇'; // Mostra ícone de mudo se o autoplay falhar
            console.log("Auto-play bloqueado.");
        });

    } else {
        // Erro: Mostra a mensagem e limpa o campo
        msgErro.classList.add('visible');
        inputSenha.value = '';
        inputSenha.focus();
        setTimeout(() => msgErro.classList.remove('visible'), 2000);
    }
}

// --- FUNÇÃO 3: ABRIR CARTA E FADE-IN ---
function abrirCarta() {
    // 1. Abre visualmente o envelope
    envelope.classList.add('open');
    telaEnvelope.style.pointerEvents = 'none';
    document.getElementById('envelope-text').textContent = 'Abrindo...';

    // 2. Transição após a animação do envelope (0.5s)
    setTimeout(() => {
        telaEnvelope.style.display = 'none';
        conteudoCarta.style.display = 'block';
        rodapé.style.display = 'block';
        iniciarContador();

        // 3. Aplica o efeito Fade-In escalonado
        elementosFadeIn.forEach((el, index) => {
            // Atraso de 0.3s entre cada parágrafo
            el.style.setProperty('--delay', `${index * 0.3}s`); 
            el.classList.add('visible');
        });
        
    }, 800); 
}

// --- FUNÇÃO 4: TOGGLE DE MÚSICA ---
function toggleMusica() {
    if (musica.paused) {
        musica.play();
        controleMusica.textContent = '🔊';
    } else {
        musica.pause();
        controleMusica.textContent = '🔇';
    }
}

// --- ESCUTADORES DE EVENTOS (LISTENERS) ---

// 1. Entrar com o botão de senha ou tecla Enter
btnSenha.addEventListener('click', verificarSenha);
inputSenha.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarSenha();
    }
});

// 2. Abrir o envelope
telaEnvelope.addEventListener('click', abrirCarta);

// 3. Controle de música
controleMusica.addEventListener('click', toggleMusica);

// 4. Efeito inicial de carregamento do Body (PÁGINA INICIA VISÍVEL)
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    // Ícone inicial da música deve ser mudo, pois o play é tentado após o login
    controleMusica.textContent = '🔇'; 
});
