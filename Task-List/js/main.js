const list = document.querySelector('.lista')
const form = document.querySelector('.form')
const formButton = document.querySelector('.form-botao')
let taskCounter = 0
const tasks = []

// Capturação da tarefa e criação de "li"
const showText = () => {
    const newLi = document.createElement("li")
    // Atributos da nova "li"
    const input = document.createElement('input')
    const label = document.createElement('label')
    const editbutton = document.createElement('button')
    const delbutton = document.createElement('button')
   
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
            key:"class",
            value:"edit-task-input"
        }
    ]

    // Inserção dos dados nas "li"
    newLi.classList.add('tarefa')
    newLi.id = `tarefa${taskCounter + 1}`
    list.appendChild(newLi)

    for (let i of inputModel) {
        input.setAttribute(i.key, i.value)
    }
    for (let l of labelModel) {
        label.setAttribute(l.key, l.value)
    }
    for (let e of editButtonModel) {
        editbutton.setAttribute(e.key, e.value)
    }
    for (let e of delButtonModel) {
        delbutton.setAttribute(e.key, e.value)
    }
    // Criando nós entre "li" e seus filhos
    newLi.appendChild(input)
    newLi.appendChild(label)
    newLi.appendChild(editbutton)
    newLi.appendChild(delbutton)

    label.innerHTML = tasks[taskCounter]

    taskCounter++

    // Evento deletar para os botões criados
    delbutton.addEventListener('click', () => {
        const deleteLabel = (delbutton.previousElementSibling).previousElementSibling;
        console.log(tasks)
        console.log(deleteLabel)
        const index = tasks.indexOf(tasks.find(e => e === deleteLabel.textContent))
        console.log(index)
        tasks.splice(index ,1)
        console.log(tasks)
        newLi.parentNode.removeChild(newLi)
        taskCounter--
    })

    // Botão de editar tarefas
    const edit = document.createElement('input')
    editbutton.addEventListener('click', () => {
        for (let e of editInputModel) {
            edit.setAttribute(e.key, e.value)
        }
        let inputEdit = editbutton.previousElementSibling;
        inputEdit.after(edit)
    })

    // Capturar valor do input, inserir no array e deletar o elemento input
    edit.addEventListener('keyup',(event) => {
        if(event.key === "Enter")
        {   
            let editedTask = edit.value
            if (editedTask.length ==0) {
                alert("Favor inserir alguma tarefa a ser editada")
                return
            }
            let editedLabel = edit.previousElementSibling
            tasks[tasks.indexOf(tasks.find(e => e === editedLabel.textContent))] = editedTask
            editedLabel.innerHTML = editedTask
            edit.parentNode.removeChild(edit)
            return
        }
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
form.addEventListener('submit', (event) => {
    event.preventDefault()
    listSetter()
})


