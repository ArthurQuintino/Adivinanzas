// Math é um objeto que vai permitir realizar operaçoes matemáticas
// método random vai sortear um número aleatorio entre 0 e 1
let numeroAleatorio = parseInt(Math.random() * 100 + 1)
const somJogada = new Audio('js/stock.mp3')
const erro = new Audio('js/buzzer.mp3')
const numeroRepetido = new Audio('js/ohoh.mp3')
//console.log(numeroAleatorio)

/* manipulando elementos html */
const botaoJogar = document.querySelector('#jogar') // botão jogar
const caixaTexto = document.querySelector('#txtNumero') // caixa de texto
const jogadasAnteriores = document.querySelector('.vezes') // span
const jogadasRestantes = document.querySelector('.numChances') // span
const recomecar = document.querySelector('.resultados') // div com paragrafos
const avisos = document.querySelector('.avisos') // terceiro paragrafo da div resultados

//criando um elemento html
const paragrafo = document.createElement('p')

// criação de um vetor para armazenar os números jogados
let numerosJogados = []

// variavel contadora
let minhasJogadas = 1

// variavel para poder jogar
let playGame = true


if (playGame) {
    botaoJogar.addEventListener('click', function (e) { // função anonima que vai receber como parametro o botão representado pela letra (e)
        e.preventDefault() // removendo a ação de envio do botão jogar número
        let tentativa = parseInt(caixaTexto.value) // variável que vai receber um número inteiro da caixa de texto
        validaChances(tentativa) // chamando uma função e passando numero digitado como argumento 
    })
}

function validaChances(num) {
    if (isNaN(num)) { // se o conteudo da variável não for um número execute o que estiver dentro da chaves
        erro.play()
        alert('Atenção, digite apenas valores númericos entre 1 e 100') // alert vai exibir mensagem na tela
        caixaTexto.value = '' // limpando conteudo da caixa de texto
        caixaTexto.focus() // setando focus na caixa de texto

    }

    else if (num < 1 || num > 100) {
        erro.play()
        alert(`O número ${num} não é valido. Infome apenas valores númericos entre 1 e 100`)
        caixaTexto.value = ''
        caixaTexto.focus()
    }

    else if (numerosJogados.includes(num)) {
        numeroRepetido.play()
        alert(`O número ${num} já jogado. Infome um outro valor númerico.`)
        caixaTexto.value = ''
        caixaTexto.focus()
    }

    else {
        numerosJogados.push(num)
        somJogada.play()
        if (minhasJogadas === 6 && num != numeroAleatorio) {
            displayJogadas(num)
            textoMsg(`Game Over !! O número secreto era ${numeroAleatorio} `)
            fimJogo()
        }
        else {
            displayJogadas(num)
            checarJogadas(num)
        }
    }
}

/*
    função checarJogadas()
    veriricará se o numero jogado é igual ao numero aleatorio
    veriricará se o numero jogado é menor que o numero aleatorio
    verificará se o numero jogado é maior que o número aleatório
*/
function checarJogadas(num) {
    if (num === numeroAleatorio){
        textoMsg(`Parabéns você acertou o número secreto !!! <br> o número secreto era ${numeroAleatorio}`)
        fimJogo()
    }
    else if(num < numeroAleatorio){
        textoMsg(`O número secreto é maior que ${num}`)
    }
    else if (num > numeroAleatorio){
        textoMsg(`O número secreto é menor que ${num}`)
    }
    
}

/*
    displayJogadas()
    vamos inserir uma informação na span que representa as jogadas Anteriores
    incrementar o contador minhasjogadas
    vamos inserir uma informação na span que representa as jogadas Restantes
*/

function displayJogadas(num) {
    caixaTexto.value = ''
    caixaTexto.focus()
     /*O que acontece qdo atingir 6 jogadas */
    if(minhasJogadas === 6){
        jogadasAnteriores.innerHTML += `${num}.`
    }
    else{
        jogadasAnteriores.innerHTML += `${num}, `
    }
    minhasJogadas++
    jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
}


function textoMsg(msg){
    avisos.innerHTML = `<h1> ${msg} </h1>`
}

function fimJogo(){
    caixaTexto.setAttribute('disabled', '') // desabilitando a caixa de texto
    botaoJogar.setAttribute('disabled', '') // desabilitando o botão jogar
    paragrafo.classList.add('button') // colocando o estilo para o botão
    paragrafo.innerHTML = '<button id="iniciar">Tentar novamente!</button>'
    recomecar.appendChild(paragrafo)
    playGame = false
    iniciarJogo()
}
function iniciarJogo() {
    playGame = true
    if (playGame === true) {
        const startButton = document.querySelector('#iniciar')
        startButton.addEventListener('click', function () {
            numeroAleatorio = parseInt(Math.random() * 100 + 1)
            numerosJogados = []
            minhasJogadas = 1
            jogadasAnteriores.innerHTML = ''
            avisos.innerHTML = ''
            jogadasRestantes.innerHTML = `${7 - minhasJogadas}`
            caixaTexto.removeAttribute('disabled')
            botaoJogar.removeAttribute('disabled')
            recomecar.removeChild(paragrafo)
        })
    }
} 



/*function reset(num){
    if(minhasJogadas >= 8){
        window.location.reload();
    }
    caixaTexto.focus()
}
*/