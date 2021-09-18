const calculator = document.querySelector('.calculator')
const visor = document.querySelector('#operation')
const input = document.querySelector('#currentValue')
const numberBtn = document.querySelectorAll('.numbers')
const operatorsBtn = document.querySelectorAll('.operator')

let values = []
let symbolFound
let n = 0
let result = 0
let optClock = false
const symbols = [
    {
        symbol: '+',
        operation: () => { result = values.reduce((sum, a) => sum += a) }
    },
    {
        symbol: '-',
        operation: () => { result = values.reduce((sub, a) => sub -= a) }
    },
    {
        symbol: '*',
        operation: () => { result = values.reduce((mult, a) => mult *= a) }
    },
    {
        symbol: '/',
        operation: () => {result = values.reduce((div,a) => div /= a)}
    },
    {
        symbol: '÷',
        operation: () => {result = values.reduce((div,a) => div /= a)}
    },
]

const numbers = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.'
]




// Impede inserção de caracteres não permitidos
const validate = (event) => {
    const findSym = symbols.find(s => s.symbol === event.key)
    const findNum = numbers.find(nmb => nmb === event.key)
    if (!findSym && !findNum) {
        input.value = input.value.replace(event.key, '')
    }
}

// Verificadores se uma operação já foi realizada e a descarta para fazer uma nova
const optClockKeyHandler = () => {
    if (optClock) {
        input.value = input.value.charAt(input.value.length - 1)
        optClock = false
    }
}

const optClockBtnHandler = () => {
    if (optClock) {
        input.value = ''
        optClock = false
    }
}

// Método resetador para o botão Clear
const reset = () => {
    values = []
    input.value = ''
    visor.textContent = ''
}

// Captura o primeiro numero e para quando um símbolo operador for digitado
const getFirstNum = (event) => {
    n = input.value 
    symbolFound = symbols.find(s => s.symbol === event.key) || symbols.find(s => s.symbol === event.target.textContent)
    if (symbolFound) {
        n.slice(0,-1)
        n = parseFloat(n)
        n = isNaN(n) ? 0 : n
        values=[n]
        visor.textContent = `${n}${symbolFound.symbol}`
        input.value = ''   
    }   
}

// Pega o segundo valor quando for pressionado Enter
const getSecondNum = () => {
    n = input.value
    n = parseFloat(n)
    n = isNaN(n) ? 0 : n
    visor.textContent += n
    values.push(n)
    input.value = ''
}

// Encontra o operador digitado, o pesquisa no array e faz a operação
const findOp = () => {
    if (symbolFound) {
        symbolFound.operation()
        visor.textContent += '='
        result = isFinite(result) ? result : 'Comé que divide por 0?'
        input.value = result
        optClock = true
        symbolFound = ''  
    }
}

// Conserta o foco para fora da calculadora
document.addEventListener('click', evt =>{
    console.log(evt.target.className)
    const classes = ['numbers','symbol','operator']
    if(!classes.some(c => evt.target.className.includes(c))) {
        input.focus()
    }
})


input.addEventListener('keyup', (event) => {
    if (!symbolFound) {
        getFirstNum(event)
    }
    optClockKeyHandler()
    validate(event)
    if (event.key === "Enter") {
        getSecondNum()
        findOp() 
    }
})

numberBtn.forEach(btn => btn.addEventListener('click',() => {
    optClockBtnHandler()
    input.value += btn.textContent
}))

document.querySelector('#clear').addEventListener('click',reset)

document.querySelector('#erase').addEventListener('click',() => {
    input.value = input.value.slice(0,-1) 
})

document.querySelector('#equals').addEventListener('click',() => {
    getSecondNum()
    findOp()
})

const operators = document.querySelectorAll('.operator')
operators.forEach(op => op.addEventListener('click',(event) => {
    input.value += op.textContent
    getFirstNum(event)
}))

