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

const pushNewTask = (elem) => {
    tasks.push({
        id: `tarefa${taskCounter + 1}`,
        description: elem,
        done: false
    })
    localStorage.setItem('tarefas', JSON.stringify(tasks))
    showText()
    document.querySelector('.form-input').value = ''
}

const pushEditedTask = (task, label, elem) => {
    tasks.find(t => t.description === label.textContent).description = task.trim()
    localStorage.setItem('tarefas', JSON.stringify(tasks))
    label.innerHTML = task
    elem.parentNode.removeChild(elem)
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
        },
        {
            key: "class",
            value: "task-checker"
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

    // Inserção do texto no DOM
    label.innerHTML = tasks[taskCounter].description
    taskCounter++

    // Evento para mudar o valor "done" de cada tarefa
    [input,label].forEach(t => t.addEventListener('click', () => {
        const findinput = tasks.find(object => object.id === input.parentElement.id)
        if (input.checked) {
            findinput.done = true
            localStorage.setItem('tarefas', JSON.stringify(tasks))
            return
        }
        findinput.done = false
        localStorage.setItem('tarefas', JSON.stringify(tasks))
    }))

    // Verificação se o valor "done" da tarefa é "true" e corresponder ao checkbox o valor pertinente
    const CheckifChecked = tasks.find(object => object.id === input.parentElement.id)
    if (CheckifChecked.done) {
        input.checked = true
    } else {
        input.checked = false
    }

    // Evento deletar para os botões criados
    delButton.addEventListener('click', () => {
        const deleteLabel = (delButton.previousElementSibling).previousElementSibling;
        tasks.splice(tasks.indexOf(tasks.find(e => e.description === deleteLabel.textContent)), 1)
        tar.splice(tar.indexOf(tar.find(e => e.description === deleteLabel.textContent)), 1)
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
            const taskEditedFound = tasks.find(t => t.description === editedTask.trim())
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

// Inserção de dados
const listSetter = () => {
    let newTask = document.querySelector('.form-input').value
    if (newTask.trim().length == 0) {
        alert("Favor inserir alguma tarefa")
        return
    }
    const taskFound = tasks.find(t => t.description === newTask.trim())
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
    if (tar && tar.length > 0) {
        taskCounter = 0
        console.log(tar)
        tar.forEach(t => {
            tasks.push({
                id: t.id,
                description: t.description,
                done: t.done
            })
            showText() 
        })
    }
}, 150)


