// --- CONFIGURAÇÃO ---
const SENHA_CORRETA = "2025"; // MUDEI A SENHA PARA '2025'
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

// --- FUNÇÃO 2: LOGAR E MOSTRAR ENVELOPE ---
function verificarSenha() {
    const senhaDigitada = inputSenha.value.trim(); // Não converte para minúsculo, pois é numérico/padrão
    
    if (senhaDigitada === SENHA_CORRETA) {
        // Sucesso: Esconde a senha, mostra o envelope
        overlaySenha.classList.add('hidden');
        telaEnvelope.style.display = 'flex';
        
        // Tenta tocar a música
        musica.volume = 0.5;
        musica.play().catch(error => {
            controleMusica.textContent = '🔇';
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
            el.style.setProperty('--delay', `${index * 0.15}s`);
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

// 4. Efeito inicial de carregamento do Body
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
                                 
