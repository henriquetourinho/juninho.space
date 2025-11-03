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

// --- FUNÇÃO 1: INICIAR O CONTADOR ---
function iniciarContador() {
    const elementoContador = document.getElementById("countdown");
    if (!elementoContador) return; 

    const intervaloContador = setInterval(function() {
        const agora = new Date().getTime();
        const distancia = DATA_FINAL_CONTRATO - agora;
        
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

// --- FUNÇÃO PARA CHUVA DE CORAÇÕES (DURAÇÃO AJUSTADA PARA 30 SEGUNDOS) ---
function iniciarChuvaDeCoracoes() {
    const heartShower = document.getElementById('heart-shower');
    // Cores rosa e vermelho que combinam com o design
    const heartColors = ['#E91E63', '#FF4081', '#FF80AB', '#D81B60', '#FF99AA']; 

    function criarCoracao() {
        const coracaoContainer = document.createElement('div');
        coracaoContainer.className = 'heart';
        coracaoContainer.style.left = `${Math.random() * 100}vw`; 
        coracaoContainer.style.animationDuration = `${Math.random() * 2 + 4}s`; 
        coracaoContainer.style.animationDelay = `${Math.random() * 0.5}s`; 
        coracaoContainer.style.color = heartColors[Math.floor(Math.random() * heartColors.length)]; 

        // CRIAÇÃO DA FORMA DE CORAÇÃO USANDO O CSS
        const heartShape = document.createElement('div');
        heartShape.className = 'heart-shape';
        coracaoContainer.appendChild(heartShape);

        heartShower.appendChild(coracaoContainer);

        // Remove o coração após a animação (tempo máximo de 6s) para limpar o DOM
        setTimeout(() => {
            coracaoContainer.remove();
        }, 6000); 
    }

    // Geração por 30 segundos (AJUSTE AQUI: 30000ms)
    const intervaloGeracao = setInterval(criarCoracao, 150); 

    // Para a geração após 30 segundos (duração total da chuva - AJUSTE AQUI: 30000ms)
    setTimeout(() => {
        clearInterval(intervaloGeracao);
    }, 30000); 
}


// --- FUNÇÃO PARA REVELAR O TEXTO AO ROLAR (SCROLL-REVEAL) ---
function iniciarObservadorTexto() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Verifica se o elemento é o subtítulo "Para Terminar..."
                const textoSubtitulo = entry.target.textContent.trim();
                
                if (textoSubtitulo === 'Para Terminar...') {
                    // Impede que a ação seja disparada mais de uma vez
                    observer.unobserve(entry.target); 
                    
                    // 2 segundos de atraso antes de começar a chuva (AJUSTE AQUI: 2000ms)
                    setTimeout(() => {
                        iniciarChuvaDeCoracoes(); 
                    }, 2000); 
                }

                // Para o fade-in de outros elementos logo após aparecerem
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 
    });

    elementosFadeIn.forEach(el => {
        observer.observe(el);
    });
}

// --- FUNÇÃO 2: LOGAR E MOSTRAR ENVELOPE ---
function verificarSenha() {
    const senhaDigitada = inputSenha.value.trim();
    
    if (senhaDigitada === SENHA_CORRETA) {
        setTimeout(() => {
            overlaySenha.classList.add('hidden');
            telaEnvelope.style.display = 'flex';
        }, 300); 

    } else {
        msgErro.classList.add('visible');
        inputSenha.value = '';
        inputSenha.focus();
        setTimeout(() => msgErro.classList.remove('visible'), 2000);
    }
}

// --- FUNÇÃO 3: ABRIR CARTA E FADE-IN ---
function abrirCarta() {
    // 1. INICIA A REPRODUÇÃO DA MÚSICA IMEDIATAMENTE NO CLIQUE DO ENVELOPE
    musica.volume = 0.5;
    musica.play().then(() => {
        controleMusica.textContent = '🔊'; 
    }).catch(error => {
        console.error("Erro ao tentar tocar a música (autoplay bloqueado):", error);
        controleMusica.textContent = '🔇';
    });

    // 2. Abre visualmente o envelope
    envelope.classList.add('open');
    telaEnvelope.style.pointerEvents = 'none';
    document.getElementById('envelope-text').textContent = 'Abrindo...';

    // 3. Transição após a animação do envelope (0.5s)
    setTimeout(() => {
        telaEnvelope.style.display = 'none';
        conteudoCarta.style.display = 'block';
        rodapé.style.display = 'block';
        iniciarContador();
        
        // 4. Inicia o observador para revelar o texto ao rolar!
        iniciarObservadorTexto();
        
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
btnSenha.addEventListener('click', verificarSenha);
inputSenha.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verificarSenha();
    }
});

telaEnvelope.addEventListener('click', abrirCarta);
controleMusica.addEventListener('click', toggleMusica);

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    controleMusica.textContent = '🔇'; 
});
