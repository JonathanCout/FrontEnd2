const list = document.querySelector('.lista')
const form = document.querySelector('.form')
const formButton = document.querySelector('.form-botao')
const task = document.querySelector('.tarefa')
const deleteButton = document.querySelector('.delete-task')
let taskCounter = 0
const tasks = []



// Capturação da tarefa e criação de "li"
const showText = () => {
    const newLi = document.createElement("li")
    // Atributos da nova "li"
    const input = document.createElement('input')
    const label = document.createElement('label')
    const button = document.createElement('button')

    // Modelos dos atributos
    const inputModel = [
        {
            key: "type",
            value: "checkbox"
        },
        {
            key: "name",
            value: `task${taskCounter + 2}`
        },
        {
            key: "id",
            value: `task${taskCounter + 2}`
        }
    ]
    const labelModel = [
        {
            key: "for",
            value: `task${taskCounter + 2}`
        },
        {
            key: "id",
            value: `label${taskCounter + 2}`
        }
    ]
    const buttonModel = [
        {
            key: "type",
            value: "button"
        },
        {
            key: "class",
            value: "delete-task"
        }
    ]

    // Inserção dos dados nas "li"
    newLi.classList.add('tarefa')
    newLi.id = `tarefa${taskCounter + 2}`
    list.appendChild(newLi)

    for (let i of inputModel) {
        input.setAttribute(i.key, i.value)
    }
    for (let l of labelModel) {
        label.setAttribute(l.key, l.value)
    }
    for (let b of buttonModel) {
        button.setAttribute(b.key, b.value)
    }
    // Criando nós entre "li" e seus filhos
    newLi.appendChild(input)
    newLi.appendChild(label)
    newLi.appendChild(button)

    // Se não existir tarefas, ele oferece o valor inicial
    if (taskCounter < 0) {
        label.innerHTML = tasks[0]
    } else {
        label.innerHTML = tasks[taskCounter]
    }

    taskCounter++

    button.addEventListener('click', () => {
        newLi.parentNode.removeChild(newLi)
    })
}

// Inserção de dados
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
form.addEventListener('submit', prevent)

// Botão de inserção
formButton.addEventListener('click', listSetter)

// Deletar tarefas 
const deleteTask = () => {
    task.parentNode.removeChild(task)
}
deleteButton.addEventListener('click', deleteTask)

