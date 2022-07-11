$(document).ready(() => {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
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
                }
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    $('#tempo-digitacao').text('10');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    inicializaCronometro();
}