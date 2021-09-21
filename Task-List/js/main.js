const list = document.querySelector('.lista')
const form = document.querySelector('.form')
let tasks = JSON.parse(localStorage.getItem("tarefas")) || []
let validator = true
// lógica

const sendToStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tasks))
}

if (!localStorage.getItem("tarefas")) {
    sendToStorage()
}

const createRandomId = (length) => {
    const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let randomString = validChars[Math.floor(Math.random()*(validChars.length - 10))]
    for (let i = 0; i <= length; i++) {
        const random = Math.floor(Math.random() * (validChars.length - 1))
        randomString += validChars[random]
    }
    return randomString
}

const validateTasks = (desc) => {
    if (desc.trim().length == 0) {
        alert("Favor inserir alguma tarefa")
        validator = false
        return
    }
    const taskFound = tasks.find(t => t.description === desc.trim())
    
    if (taskFound) {
        const conf = confirm("Essa tarefa já existe, deseja mesmo criar uma cópia?")
        if (!conf) {
            validator = false
            return
        }
    }
    validator = true
}

const taskMakeHandler = (description) => {
    validateTasks(description)
    if (!validator) {
        return
    }

    const newTask = {
        id: createRandomId(16),
        description: description.trim(),
        done: false,
    }

    tasks.push(newTask)
    sendToStorage()

    return newTask
}

const taskEditHandler = (description, id) => {
    validateTasks(description)

    if (!validator) {
        
        return
    }

    tasks.forEach(t => {
        if (t.id === id) {
            t.description = description.trim()
        }
    })

    sendToStorage()
}

const taskDoneHandler = (id) => {
    const task = tasks.find(t => t.id === id)
    task.done = !task.done
    sendToStorage()
}

const taskDeleteHandler = (id) => {
    tasks = tasks.filter(t => t.id !== id)
    sendToStorage()
}


// apresentação

// Funcão para setar atributos
const setValues = (model, element) => {
    for (let m of model) {
        element.setAttribute(m.key, m.value)
    }
}

// Capturação da tarefa e criação de "li"
const newTaskView = id => {
    const task = tasks.find(t => t.id === id)

    const newLi = document.createElement("li")
    // Atributos da nova "li"
    const input = document.createElement('input')
    const label = document.createElement('label')
    const editInput = document.createElement('input')
    const editButton = document.createElement('button')
    const delButton = document.createElement('button')

    // Modelos dos atributos
    const elementModels = [
        {
            element: input,
            props: [
                {
                    key: "type",
                    value: "checkbox"
                },
                {
                    key: "name",
                    value: `done-${task.id}`
                },
                {
                    key: "id",
                    value: `checkbox-${task.id}`
                },
                {
                    key: "class",
                    value: "task-checker"
                }
            ]
        },

        {
            element: editInput,
            props: [
                {
                    key: "type",
                    value: "text"
                },
                {
                    key: "name",
                    value: `edit-${task.id}`
                },
                {
                    key: "id",
                    value: `edit-${task.id}`
                },
                {
                    key: "class",
                    value: "edit-task-input disabled"
                },
                {
                    key: "value",
                    value: task.description
                }
            ]
        },

        {
            element: label,
            props: [
                {
                    key: "for",
                    value: `checkbox-${task.id}`
                },
                {
                    key: "id",
                    value: `label-${task.id}`
                }
            ]
        },

        {
            element: editButton,
            props: [
                {
                    key: "type",
                    value: "button"
                },
                {
                    key: "class",
                    value: "edit-task-btn"
                }
            ]
        },

        {
            element: delButton,
            props: [
                {
                    key: "type",
                    value: "button"
                },
                {
                    key: "class",
                    value: "delete-task"
                }
            ]
        }   
    ]

    for (let element of elementModels) {
        setValues(element.props, element.element)
        newLi.appendChild(element.element)
    }

    input.checked = task.done
    if (task.done) {
        newLi.classList.add("done")
    }

    // Inserção dos dados nas "li"
    newLi.classList.add('tarefa')
    newLi.id = task.id
    list.appendChild(newLi)
    label.textContent = task.description

    input.addEventListener("change", () => taskDoneView(task.id))
    delButton.addEventListener("click", () => taskDeleteView(task.id))
    editButton.addEventListener("click", () => taskEditView(task.id))
    editInput.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            taskEditView(task.id, false)
        }
        if (e.key === "Enter") {
            taskEditView(task.id)
        }
    }) 
}

function taskDoneView(id) {
    taskDoneHandler(id)
    const task = document.querySelector(`#${id}`)
    task.classList.toggle("done")
}

const taskDeleteView = id => {
    taskDeleteHandler(id)
    document.querySelector(`#${id}`).remove()
}



const taskEditView = (id, submit = true) => {
    const taskEdit = document.querySelector(`#edit-${id}`)
    const labelEdit = document.querySelector(`#label-${id}`)
    if (!taskEdit.classList.contains("disabled") && submit) {
        taskEditHandler(taskEdit.value, id)
    }
    taskEdit.classList.toggle("disabled")
    labelEdit.classList.toggle("disabled")
    if (validator) {
        labelEdit.textContent = taskEdit.value
    }
    taskEdit.focus()
}


// Inserção de dados
const createNewTask = () => {
    const description = document.querySelector('.form-input').value
    const newTask = taskMakeHandler(description)
    newTaskView(newTask.id)
}

// Impedir que a página seja recarregada ao apertar o botão 'nova tarefa'
form.addEventListener('submit', (event) => {
    event.preventDefault()
    createNewTask()
    document.querySelector("#new-task-input").value = ""
})

window.onload = () => {
    if (tasks && tasks.length > 0) {
        tasks.forEach(t => {
            newTaskView(t.id) 
        })
    }
}
