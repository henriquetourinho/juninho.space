// A senha que você vai usar para desbloquear a carta
// MUDE 'amor' PELA SENHA QUE VOCÊ DESEJA
const SENHA_CORRETA = "amor"; 

// --- FUNÇÃO DE LOGIN ---
function verificarSenha() {
    const input = document.getElementById('senha-input');
    const senhaDigitada = input.value.trim().toLowerCase();
    const mensagemErro = document.getElementById('login-message');
    
    // Verifica a senha
    if (senhaDigitada === SENHA_CORRETA) {
        // Login bem-sucedido:
        document.getElementById('login-screen').style.display = 'none'; // Esconde a tela de login
        document.getElementById('carta-content').style.display = 'block'; // Mostra a carta
        
        // Tenta tocar a música automaticamente (pode ser bloqueado pelo navegador)
        const audio = document.getElementById('musica-fundo');
        if (audio) {
            audio.play().catch(error => {
                console.log("Auto-play bloqueado. O usuário precisa interagir com o player.");
            });
        }
        
        // Inicia o contador apenas após o login
        iniciarContador();
        
    } else {
        // Login falhou:
        mensagemErro.textContent = "Senha incorreta. Tente novamente.";
        input.value = ''; // Limpa o campo
        input.focus(); // Coloca o cursor no campo
    }
}

// --- FUNÇÃO DO CONTADOR REGRESSIVO ---
function iniciarContador() {
    // Data final para 15 de Novembro de 2025, à meia-noite
    const dataFinalContrato = new Date("2025-11-15T00:00:00").getTime();

    // Atualiza o contador a cada 1 segundo
    const intervaloContador = setInterval(function() {

        const agora = new Date().getTime();
        const distancia = dataFinalContrato - agora;
        
        // Cálculos de tempo para dias, horas, minutos e segundos
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        
        const elementoContador = document.getElementById("contador-contrato");

        if (elementoContador) {
          
            if (distancia > 0) {
                // Exibe o resultado formatado
                elementoContador.innerHTML = dias + "d " + horas + "h " + minutos + "m " + segundos + "s ";
            } else {
                // Se o contador acabar
                clearInterval(intervaloContador);
                elementoContador.innerHTML = "CONTRATO FINALIZADO!";
            }
        }

    }, 1000); // 1000ms = 1 segundo
}

// O contador só será iniciado após o login bem-sucedido (dentro da função verificarSenha)
// O que significa que nada acontece até o usuário digitar a senha certa.
