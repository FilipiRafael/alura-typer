$(document).ready(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').on('click', reiniciaJogo);
})

const campo = $('.campo-digitacao');

function atualizaTamanhoFrase() {
    const frase = $('.frase').text();
    const numeroDePalavras = frase.split(/\S+/).length;
    const tamanhoDaFrase = $('#tamanhoDaFrase');
    tamanhoDaFrase.text(numeroDePalavras);
}


function inicializaContadores() {
    campo.on('input', () => {
        const conteudo = campo.val();
        const quantidadePalavras = conteudo.split(/\S+/).length;
        $('#contador-palavras').text(quantidadePalavras);
    
        const quantidadeCaracteres = conteudo.length;
        $('#contador-caracteres').text(quantidadeCaracteres);
    });
}

function inicializaCronometro() {
    let tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', () => {
        setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                $('#tempo-digitacao').text(tempoRestante);
                if (tempoRestante < 1) {
                    campo.attr('disabled', true);
                    campo.addClass('campo-desabilitado');
                }
            }
        }, 1000);
    });
}

function inicializaMarcadores() {
    const frase = $('.frase').text();
    campo.on('input', () => {
        const digitado = campo.val();
        const comparavel = frase.substr(0, digitado.length);
    
        if (digitado === comparavel) {
            campo.removeClass('campo-incorreto');
            campo.addClass('campo-correto');
        } else {
            campo.removeClass('campo-correto');
            campo.addClass('campo-incorreto');
        }
    });
}


function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    campo.removeClass('campo-desabilitado');
    $('#tempo-digitacao').text('10');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
    campo.removeClass('campo-correto');
    campo.removeClass('campo-incorreto');
}