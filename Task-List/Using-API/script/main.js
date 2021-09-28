const createBtn = document.querySelector('#create-btn')
const main = document.getElementsByTagName('main')[0]

const getTasks = async () => {
    const tasks = await fetch('https://jsonplaceholder.typicode.com/todos/')
    return tasks.json()
}
const createElements = (element) => {
    const newTask = document.createElement('div')
    newTask.id = `id-${element.id}`
    newTask.classList.add('task-card')
    main.appendChild(newTask)

    const taskTitle = document.createElement('h2')
    taskTitle.id = `title-${element.id}`
    taskTitle.textContent = element.title
    taskTitle.classList.add('task-title')
    newTask.appendChild(taskTitle)

    const taskId = document.createElement('p')
    taskId.id = `id-${element.id}`
    taskId.textContent = `id-${element.id}`
    taskId.classList.add('task-id')
    newTask.appendChild(taskId)

    taskDoneHandler(element,newTask)
}

const taskDoneHandler = (result,element) => {
    if (result.completed === true) {
        element.classList.add('done')
    }
}
const viewTasks = (result) => {
    for (const field of result) {
        createElements(field)
    }
}
createBtn.addEventListener('click',() => {
    getTasks().then(response => {
        console.log(response)
        viewTasks(response)
    })
    createBtn.classList.toggle('disabled')
})
