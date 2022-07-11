const frase = $('.frase').text();

const numeroDePalavras = frase.split(/\S+/).length;

const tamanhoDaFrase = $('#tamanhoDaFrase');
tamanhoDaFrase.text(numeroDePalavras);

const campo = $('.campo-digitacao');
campo.on('input', () => {
    const conteudo = campo.val();
    const quantidadePalavras = conteudo.split(/\S+/).length;
    $('#contador-palavras').text(quantidadePalavras);

    const quantidadeCaracteres = conteudo.length;
    $('#contador-caracteres').text(quantidadeCaracteres);
});

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