const list = document.querySelector('.lista')
const form = document.querySelector('.form')
const formButton = document.querySelector('.form-botao')
let taskCounter = 0
const tasks = []

// Gambiarra que fez dar certo
if (localStorage.length === 0) {
    localStorage.setItem('tarefas', JSON.stringify(tasks))
}
const tar = JSON.parse(localStorage.getItem('tarefas'))

// Funcão para setar atributos
const setValues = (model, element) => {
    for (let m of model) {
        element.setAttribute(m.key, m.value)
    }
}

// Capturação da tarefa e criação de "li"
const showText = () => {
    const newLi = document.createElement("li")
    // Atributos da nova "li"
    const input = document.createElement('input')
    const label = document.createElement('label')
    const editButton = document.createElement('button')
    const delButton = document.createElement('button')

    // Modelos dos atributos
    const inputModel = [
        {
            key: "type",
            value: "checkbox"
        },
        {
            key: "name",
            value: `task${taskCounter + 1}`
        },
        {
            key: "id",
            value: `task${taskCounter + 1}`
        }
    ]
    const labelModel = [
        {
            key: "for",
            value: `task${taskCounter + 1}`
        },
        {
            key: "id",
            value: `label${taskCounter + 1}`
        }
    ]
    const editButtonModel = [
        {
            key: "type",
            value: "button"
        },
        {
            key: "class",
            value: "edit-task-btn"
        }
    ]
    const delButtonModel = [
        {
            key: "type",
            value: "button"
        },
        {
            key: "class",
            value: "delete-task"
        }
    ]
    const editInputModel = [
        {
            key: "type",
            value: "text"
        },
        {
            key: "name",
            value: `edit-task${taskCounter + 1}`
        },
        {
            key: "id",
            value: `edit-task${taskCounter + 1}`
        },
        {
            key: "class",
            value: "edit-task-input"
        }
    ]

    // Inserção dos dados nas "li"
    newLi.classList.add('tarefa')
    newLi.id = `tarefa${taskCounter + 1}`
    list.appendChild(newLi)

    // Inserção dos atributos nos elementos
    setValues(inputModel, input)
    setValues(labelModel, label)
    setValues(editButtonModel, editButton)
    setValues(delButtonModel, delButton)

    // Criando nós entre "li" e seus filhos
    newLi.appendChild(input)
    newLi.appendChild(label)
    newLi.appendChild(editButton)
    newLi.appendChild(delButton)

    if (tar.length < tasks.length) {
        label.innerHTML = tasks[taskCounter]
    } else {
        label.innerHTML = tar[taskCounter]
    }

    taskCounter++

    // Evento deletar para os botões criados
    delButton.addEventListener('click', () => {
        const deleteLabel = (delButton.previousElementSibling).previousElementSibling;
        tasks.splice(tasks.indexOf(tasks.find(e => e === deleteLabel.textContent)), 1)
        tar.splice(tar.indexOf(tar.find(e => e === deleteLabel.textContent)), 1)
        localStorage.setItem('tarefas', JSON.stringify(tasks))
        newLi.parentNode.removeChild(newLi)
        taskCounter--
    })

    // Botão de editar tarefas e seu evento
    const edit = document.createElement('input')
    editButton.addEventListener('click', () => {
        for (let e of editInputModel) {
            edit.setAttribute(e.key, e.value)
        }
        let inputEdit = editButton.previousElementSibling;
        inputEdit.after(edit)
    })

    // Capturar valor do input, inserir no array e deletar o elemento input
    edit.addEventListener('keyup', (event) => {
        if (event.key === "Enter") {
            let editedTask = edit.value
            if (editedTask.trim().length == 0) {
                alert("Favor inserir alguma tarefa a ser editada")
                return
            }
            let editedLabel = edit.previousElementSibling
            const taskEditedFound = tasks.find(t => t === editedTask)
            if (!taskEditedFound) {
                pushEditedTask(editedTask, editedLabel, edit)
                return
            } else {
                const conf = confirm("Essa tarefa já existe, deseja mesmo criar uma cópia?")
                if (conf) {
                    pushEditedTask(editedTask, editedLabel, edit)
                    return
                }
            }
        }
    })
}

const pushNewTask = (elem) => {
    tasks.push(elem)
    localStorage.setItem('tarefas', JSON.stringify(tasks))
    showText()
    document.querySelector('.form-input').value = ''
}

const pushEditedTask = (task, label, elem) => {
    tasks[tasks.indexOf(tasks.find(e => e === label.textContent))] = task
    localStorage.setItem('tarefas', JSON.stringify(tasks))
    label.innerHTML = task
    elem.parentNode.removeChild(elem)
}
// Inserção de dados
const listSetter = () => {
    let newTask = document.querySelector('.form-input').value
    if (newTask.trim().length == 0) {
        alert("Favor inserir alguma tarefa")
        return
    }
    const taskFound = tasks.find(t => t === newTask)
    if (!taskFound) {
        pushNewTask(newTask)
    } else {
        const conf = confirm("Essa tarefa já existe, deseja mesmo criar uma cópia?")
        if (conf) {
            pushNewTask(newTask)
            return
        }
    }
}

// Impedir que a página seja recarregada ao apertar o botão 'nova tarefa'
form.addEventListener('submit', (event) => {
    event.preventDefault()
    listSetter()
})

window.onload = setTimeout(() => {
    if (tar) {
        if (tar.length > 0) {
            taskCounter = 0
            console.log(tar)
            tar.forEach(t => {
                showText()
                tasks.push(t)
            })
            return
        }
    }
}, 150)