const root = document.querySelector(':root')
const list = document.querySelector('.lista')
const form = document.querySelector('.form')
const formbutton = document.querySelector('.form-botao')
const task1 = document.getElementById('tarefa1')
let taskCounter = -1

const tasks = []


const getText = () => {
    let newTask = document.querySelector('.form-input').value
    taskCounter++
    tasks.push(newTask)
}

const showText = () => {
    const newLi = document.createElement("li")
    newLi.id = `tarefa${taskCounter + 2}`
    newLi.classList.add('tarefa') 
    newLi.innerHTML = tasks[taskCounter]

    if(taskCounter == 0) {
        task1.after(newLi)
        return
    } 
    document.getElementById(`tarefa${taskCounter + 1}`).after(newLi)
}

const listSetter = () => {
    getText()
    setTimeout(() => {
        showText()
    },300)
}

// Impedir que a página seja recarregada ao apertar o botão 'nova tarefa'
const prevent = (event) => {
    event.preventDefault()
}
form.addEventListener('submit',prevent)

formbutton.addEventListener('click',listSetter)



