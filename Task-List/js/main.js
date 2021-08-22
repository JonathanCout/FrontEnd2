const root = document.querySelector(':root')
const list = document.querySelector('.lista')
const form = document.querySelector('.form')
const formbutton = document.querySelector('.form-botao')
let taskCounter = 0
const tasks = []

const showText = () => {
    const newLi = document.createElement("li")
    newLi.id = `tarefa${taskCounter + 2}`
    newLi.classList.add('tarefa') 
    newLi.innerHTML = tasks[taskCounter]
    document.getElementById(`tarefa${taskCounter + 1}`).after(newLi)
    taskCounter++
}

const listSetter = () => {
    let newTask = document.querySelector('.form-input').value
    if (newTask.length == 0) {
        alert("Favor inserir alguma tarefa")
        return
    } 
    tasks.push(newTask) 
    showText()
    document.querySelector('.form-input').value = ''
}

// Impedir que a página seja recarregada ao apertar o botão 'nova tarefa'
const prevent = (event) => {
    event.preventDefault()
}
form.addEventListener('submit',prevent)

formbutton.addEventListener('click',listSetter)



