const cardHandler = document.querySelector('#card-handler')
const form = document.querySelector('#form')
const titleInput = document.querySelector('#title-input')
const cardText = document.querySelector('#description-input')
const image = document.querySelector('#imageUrl')
const createbutton = document.querySelector('#create-button')
const infobutton = document.querySelector('#info-button')
const emptyValues = document.querySelectorAll('.error-msg')

let cards = JSON.parse(localStorage.getItem("cards")) || []

const sendToStorage = () => {
    localStorage.setItem("cards", JSON.stringify(cards))
}

if (!localStorage.getItem("cards")) {
    sendToStorage()
}

const createRandomId = (length) => {
    const validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let randomString = ""
    for (let i = 0; i <= length; i++) {
        const random = Math.floor(Math.random() * (validChars.length - 1))
        randomString += validChars[random]
    }
    return randomString
}

const createCardHandler = (title, desc, url,id = null) => {
    
    const findCard = cards.find(c => c.id === id) || {
        id: createRandomId(16)
    }
    if (id && findCard.id !== id) {
        return
    }

    const newCard = {
        ...findCard,
        title: title,
        description: desc,
        image:url
    }

    cards.push(newCard)
    sendToStorage()

    return newCard
}


const newCardView = id => {
    const card = cards.find(c => c.id === id)
    const cardGrid = document.querySelector('#cards-grid')
    const mainDiv = document.createElement('div')
    const title = document.createElement('h4')
    const description = document.createElement('p')
    const cardImage = document.createElement('img')
    const deletebutton = document.createElement('button') 
    mainDiv.classList.add('card')
    mainDiv.id = card.id

    title.classList.add('title')
    title.id = `title-${card.id}`
    title.textContent = card.title

    description.classList.add('description')
    description.id = `desc-${card.id}`
    description.textContent = card.description

    cardImage.classList.add('cardImage')
    cardImage.id = `img-${card.id}`
    cardImage.setAttribute('src',`${card.image}`)

    deletebutton.classList.add('deleteButton')
    deletebutton.id = `delbtn-${card.id}`
    

    cardGrid.appendChild(mainDiv)
    mainDiv.appendChild(deletebutton)
    mainDiv.appendChild(cardImage)
    mainDiv.appendChild(title)
    mainDiv.appendChild(description)
    

    deletebutton.addEventListener("click", () => cardDeleteView(card.id))
}

const changeView = (element, button) => {
    const current = element.getAttribute('aria-expanded')
    const map = {
        "true":"false",
        "false":"true"
    }
    element.setAttribute('aria-expanded',map[current])
    if (button) {
        button.disabled = true
    }

    setTimeout(() => {
        element.setAttribute('data-transition',map[current])  
        if (button) {
            button.disabled = false
        }
    },300)
}

const emptyErrorHander = () => {
    emptyValues.forEach((e) => {
        let get = e.getAttribute('aria-expanded')
        if (get === 'true') {
            get = "false"
        }
        e.setAttribute('aria-expanded',get)
        e.setAttribute('data-transition',get)
    })
}

const setData = () => {
    if (titleInput.value.trim().length == 0 || cardText.value.trim().length == 0) {
        emptyValues.forEach((e) => {
            e.setAttribute('aria-expanded',"true") 
            e.setAttribute('data-transition',"true") 
        })
        return
    }
    const newCard = createCardHandler(titleInput.value,cardText.value,image.value)
    newCardView(newCard.id)
}

const cardDeleteHandler = (id) => {
    cards = cards.filter(c => c.id !== id)
    sendToStorage()
}
const cardDeleteView = id => {
    cardDeleteHandler(id)
    document.querySelector(`#${id}`).remove()
}

createbutton.addEventListener('click',() => {
    changeView(cardHandler,createbutton)
    emptyErrorHander()
})
cardHandler.addEventListener('click', () => {
    changeView(cardHandler,createbutton)
})
form.addEventListener('reset', () => {
    changeView(cardHandler)
})
form.addEventListener('click',(event) => {
    event.stopPropagation()
})
form.addEventListener('submit',(event) => {
    event.preventDefault()
    setData()
})
infobutton.addEventListener('click', () => {
    const info = document.querySelector('#info')
    changeView(info,infobutton)
})
window.onload = () => {
    if (cards && cards.length > 0) {
        cards.forEach(c => {
            newCardView(c.id) 
        })
    }
}