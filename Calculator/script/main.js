const visor = document.querySelector('#operation')
const input = document.querySelector('#currentValue')
const numberBtn = document.querySelectorAll('.numbers')

let values = []

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

let n
let result = 0

input.focus()
input.addEventListener('blur', () => {
    input.focus()
})
input.addEventListener('keyup', (event) => {
    validate(event)
    getFirstNum(event)
    if (event.key === "Enter") {
        getSecondNum()
        findOp()
    }
})

const validate = (event) => {
    const findSym = symbols.find(s => s.symbol === event.key)
    const findNum = numbers.find(nmb => nmb === event.key)
    if (!findSym && !findNum) {
        input.value = input.value.replace(event.key, '')
    }
}

const reset = () => {
    values = []
    input.value = ''
    visor.textContent = ''
}
const getFirstNum = (event) => {
    n = input.value
    const findSym = symbols.find(s => s.symbol === event.key) || symbols.find(s => s.symbol === event.target.textContent)
    if (findSym) {
        visor.textContent = n
        if(n === event.key){
            return
        }
        n.slice(0,-1)
        values=[parseFloat(n)]
        input.value = ''   
    }   
}

const findOp = () => {
    const opFound = symbols.find(s => visor.textContent.includes(s.symbol))
    if (opFound) {
        opFound.operation()
        visor.textContent += '='
        input.value = result
    }
}

const getSecondNum = () => {
    if (result == 0) {
        n = input.value
    }
    visor.textContent += n
    values.push(parseFloat(n))
    input.value = ''
}

numberBtn.forEach(btn => btn.addEventListener('click',() => {
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

