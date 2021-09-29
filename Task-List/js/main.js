// Elementos utilizados
const list = document.querySelector('.list')
const form = document.querySelector('.form')
const showInput = document.querySelector('#show-input')
const newTaskInput = document.querySelector("#new-task-input")
const dateInput = document.querySelector("#new-task-date")
const legend = document.querySelector(".input-label")
const mainCard = document.querySelector(".main-card")
const errorMsg = document.querySelector('.error-msg')
const generatorBtn = document.querySelector('#task-generator')
let tasks = JSON.parse(localStorage.getItem("tarefas")) || []
let validator = true

// Captura o dia atual e coloca como mínimo no input de datas
let today = new Date();
dateInput.setAttribute('min',`${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()}`)

// lógica

const sendToStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tasks))
}

if (!localStorage.getItem("tarefas")) {
    sendToStorage()
}

const createRandomId = (length) => {
    const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let randomString = validChars[Math.floor(Math.random() * (validChars.length - 10))]
    for (let i = 0; i <= length; i++) {
        const random = Math.floor(Math.random() * (validChars.length - 1))
        randomString += validChars[random]
    }
    return randomString
}

const validateTasks = (desc,err, id) => {
    
    if (desc.trim().length <= 10) {
        err.textContent = "A tarefa deve ter mais de 10 caracteres"
        err.classList.remove('disabled')
        validator = false
        return
    }
    const taskFound = tasks.find(t => t.description === desc.trim() && t.id !== id)

    if (taskFound) {
        const conf = confirm("Essa tarefa já existe, deseja mesmo criar uma cópia?")
        if (!conf) {
            validator = false
            return
        }
    }
    validator = true
}

const dateFixer = (date) => {
    if (date) {
        const d = date.split('-')
        return `${d[2]}/${d[1]}/${d[0]}`
    }
 
}

const taskMakeHandler = (description, date) => {
    validateTasks(description,errorMsg,0)
    if (!validator) {
        return
    }

    let time = `${today.getDate()}/0${today.getMonth()+1}/${today.getFullYear()}`
    const newTask = {
        id: createRandomId(16),
        description: description.trim(),
        currentDate: time,
        date: dateFixer(date),
        done: false,
    }

    tasks.push(newTask)
    sendToStorage()

    return newTask
}

const taskEditHandler = (description, id) => {
    validateTasks(description,document.querySelector(`#error-${id}`),id)
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

// Método que cria a box de confirmação 
const confirmDelete = id => {
    const li = document.querySelector(`#${id}`)
   
    const confDel = document.createElement('div')

    confDel.classList.add('confirm')
    confDel.setAttribute('aria-expanded','false')
    confDel.setAttribute('data-transition','false')

    li.appendChild(confDel)

    const p = document.createElement('p')
    p.classList.add('confirm-txt')
    p.textContent = "Confirmar exclusão"
    confDel.appendChild(p)

    const confirmBtn = document.createElement('button')
    confirmBtn.classList.add('confirm-btn')
    confirmBtn.textContent = 'Confirmar'
    confDel.appendChild(confirmBtn)

    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('cancel-btn')
    confDel.appendChild(cancelBtn)
    cancelBtn.textContent = 'Cancelar'

    confirmBtn.addEventListener('click', () => {
        taskDeleteView(id)       
    })
    cancelBtn.addEventListener('click', () => {      
        confDel.remove()
    })

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
    const dateDiv = document.createElement('div')
    const createdDate = document.createElement('p')
    const taskDate = document.createElement('p')
    const taskError = document.createElement('p')

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
                    value: "edit-task-btn bg-btn"
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
                    value: "delete-task-btn bg-btn"
                }
            ]
        },
        {
            element: dateDiv,
            props: [
                {
                    key: "id",
                    value: "date-div"
                }
            ]
        },
        {
            element: createdDate,
            props: [
                {
                    key: "class",
                    value: "created date-task"
                }
            ]
        },
        {
            element: taskDate,
            props: [
                {
                    key: "class",
                    value: "limit date-task"
                },
                {
                    key: "id",
                    value: `date-${task.id}`
                }
            ]
        },
        {
            element: taskError,
            props: [
                {
                    key: "class",
                    value: "task-error disabled"
                },
                {
                    key: "id",
                    value: `error-${id}`
                }
            ] 
        }
    ]

// Dá os atributos definidos aos elementos e os conectam com a li criada
    for (let element of elementModels) {
        setValues(element.props, element.element)
        newLi.appendChild(element.element)
    }

    dateDiv.appendChild(createdDate)
    dateDiv.appendChild(taskDate)
    
    input.checked = task.done
    if (task.done) {
        newLi.classList.add("done")
    }

    // Inserção dos dados nas "li"
    newLi.classList.add('task')
    newLi.id = task.id
    newLi.setAttribute('aria-expanded','false')
    newLi.setAttribute('data-transition','false')   
    list.appendChild(newLi)

    label.textContent = task.description

    // Insere o valor da data limite, caso ela seja informada
    if (task.date) {
        taskDate.textContent = `Fazer até: ${task.date}`
    } else if(!task.date) {
        taskDate.remove()
    }
    createdDate.textContent = `Criada em: ${task.currentDate}`

    label.addEventListener('click', () => {
        taskDoneView(task.id)
        showView(newLi)
    })
    delButton.addEventListener("click", () => {
        confirmDelete(task.id)
        showView(document.querySelector('.confirm'))
    })
    editButton.addEventListener("click", () => {
        taskEditView(task.id)
        taskError.classList.add('disabled')
    })
    editInput.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
            taskEditView(task.id, false)
        }
        if (e.key === "Enter") {
            taskEditView(task.id)
        }
    })
}

// Método para completar uma tarefa, dando o valor 'done' para o objeto
const taskDoneView = id => {
    taskDoneHandler(id)
    const task = document.querySelector(`#${id}`)
    task.classList.toggle("done")

    if (task.classList.contains('done')) {
        task.setAttribute('aria-expanded','true')
        task.setAttribute('data-transition','true')
    }   
}

// Deleta a tarefa escolhida do DOM
const taskDeleteView = id => {
    taskDeleteHandler(id)
    document.querySelector(`#${id}`).remove()
    lengthChecker()    
}

// Esconde o elemento 'ul' caso nao existem tarefas criadas
const lengthChecker = () => {
    const lisCount = document.getElementsByTagName('li')
    if (lisCount.length == 0) {
        list.classList.add('disabled')
    }
}
// Apresentação das tarefas editadas
const taskEditView = (id, submit = true) => {
    const taskEdit = document.querySelector(`#edit-${id}`)
    const labelEdit = document.querySelector(`#label-${id}`)
    if (!taskEdit.classList.contains("disabled") && submit) {
        taskEditHandler(taskEdit.value, id)
    }
    taskEdit.classList.toggle("disabled")
    labelEdit.classList.toggle("disabled")

// Só altera o valor no DOM se o valor inputado for aceito
    if (validator) {
        labelEdit.textContent = taskEdit.value
        document.querySelector(`#${id}`).classList.remove('done')
    }
    taskEdit.focus()
}


// Inserção de dados
const createNewTask = () => {
    const date = dateInput.value
    const newTask = taskMakeHandler(newTaskInput.value, date)
    if (newTask) {
        newTaskView(newTask.id)
        showView(form)
        list.classList.remove('disabled')
    }
}

// Método para mudança de animação
const showView = (element, fixed = null) => {
    const current = fixed || element.getAttribute("aria-expanded")
    const map = {
        "true": "false",
        "false": "true",
    }
    element.setAttribute("aria-expanded", map[current])
    setTimeout(() => {
        element.setAttribute("data-transition", map[current])
    }, 400)
}

// Pega uma tarefa aleatória na API
const getRandomTask = async () => {
    const getTask = await fetch('https://www.boredapi.com/api/activity') 
    return getTask.json()
}

// Insere a tarefa encontrada no input
const showRandomTask = (result) => {
    newTaskInput.focus()
    newTaskInput.value = result
}

// Evento que gera uma tarefa aleatória
generatorBtn.addEventListener('click', () => {
    getRandomTask().then(response => {
        showRandomTask(response.activity)
    })
})


showInput.addEventListener('click', () => {
    showView(form)
    showView(legend, "true")
    newTaskInput.value = ''
    errorMsg.classList.add('disabled')
})
newTaskInput.addEventListener('focus', () => {
    showView(legend, "false")
})
legend.addEventListener('click', () => {
    showView(legend, "false")
    newTaskInput.focus()
})
newTaskInput.addEventListener('blur', () => {
    if (newTaskInput.value.length > 0) {
        return
    }
    showView(legend, "true")
})
// Impedir que a página seja recarregada ao apertar o botão 'nova tarefa'
form.addEventListener('submit', (event) => {
    event.preventDefault()
    createNewTask()
    newTaskInput.value = ""
    dateInput.value = ""
})

window.onload = () => {   
    if (tasks && tasks.length > 0) {
        tasks.forEach(t => {
            newTaskView(t.id)
        })
        list.classList.remove('disabled')
    }
}