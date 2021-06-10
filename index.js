const possibleCardValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'k']
const possibleSuitValues = ['♦', '♥', '♠', '♣'];
const generar = document.querySelector('#generar');
const ordenar = document.querySelector('#ordenar');
let ordenarCartas = [];

function createCards(elem) {
    let input = document.getElementById('cantidadCartas');
    let cantidadCartas = parseInt(input.value);
    ordenarCartas = [];
    function cambiarValor (valor) {
        switch(valor) {
            case 'A': return "1";
            case 'J': return "11";
            case 'Q': return '12';
            case 'k': return '13';
            default: return valor;
        }
    }

    for (let i = 0; i < cantidadCartas; i++) {

        let randomSuit = Math.floor(Math.random() * possibleSuitValues.length);
        let randomCardValue = Math.floor(Math.random() * possibleCardValues.length);

        let card = document.createElement('div');
        card.classList.add('card');

        let cardValue = document.createElement('div');
        cardValue.classList.add('cardValue');
        cardValue.innerHTML = possibleCardValues[randomCardValue];


        
        let topSuit = document.createElement('div');
        topSuit.classList.add('topSuit');
        topSuit.innerHTML = possibleSuitValues[randomSuit];

        let bottonSuit = document.createElement('div');
        bottonSuit.classList.add('bottonSuit');

        if (topSuit.innerHTML === '♥' || topSuit.innerHTML === '♦') {
            topSuit.style.color = "red";
            bottonSuit.style.color = "red";
        } else {
            topSuit.style.color = "black";
            bottonSuit.style.color = "black";
        };

        bottonSuit.innerHTML = topSuit.innerHTML;

        card.appendChild(topSuit);
        card.appendChild(cardValue);
        card.appendChild(bottonSuit);
        elem.appendChild(card);

        let contenidoDeCarta = {
            number: parseInt(cambiarValor(cardValue.innerHTML)),
            html: card.innerHTML
        }
        ordenarCartas.push(contenidoDeCarta);
    }
}


generar.addEventListener('click', (e) => {

    const cartasGeneradas = document.querySelector('#cartasGeneradas');
    cartasGeneradas.innerHTML = "";
    createCards(cartasGeneradas);
    let cartasOrdenadas = document.getElementById('cartasOrdenadas');
    cartasOrdenadas.innerHTML = "";
});


ordenar.addEventListener('click', (e) => {
    let cartasOrdenadas = document.getElementById('cartasOrdenadas');
    cartasOrdenadas.innerHTML = "";

    for (let j = ordenarCartas.length - 1; j > 0; j--) {
        for (let k = 0; k < j; k++) {
            if (ordenarCartas[k].number > ordenarCartas[k + 1].number) {
                let aux = ordenarCartas[k];
                ordenarCartas[k] = ordenarCartas[k + 1];
                ordenarCartas[k + 1] = aux;
                let pasoUno = document.createElement('div');
                pasoUno.classList.add('lineas');
                cartasOrdenadas.appendChild(pasoUno);
                var numerodepaso = cartasOrdenadas.childElementCount;
                pasoUno.innerHTML = numerodepaso;
                
                for (let m = 0; m < ordenarCartas.length; m++) {
                    let newCard = document.createElement('div');
                    newCard.classList.add('newCard');
                    newCard.innerHTML = ordenarCartas[m].html;
                    pasoUno.appendChild(newCard);
                }
            }
        }
    }

});