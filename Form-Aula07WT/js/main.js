const body = document.body
const form = document.createElement('form')
body.appendChild(form)

const title = document.createElement('h1')
title.innerHTML = "Login"
form.appendChild(title)

const inputEmail = document.createElement('input')
inputEmail.setAttribute("type","email")
inputEmail.setAttribute("placeholder","Email")
form.appendChild(inputEmail)

const inputPassword = document.createElement('input')
inputPassword.setAttribute("type","password")
inputPassword.setAttribute("placeholder","Senha")
form.appendChild(inputPassword)

const submitBtn = document.createElement('button')
submitBtn.setAttribute("type","submit")
submitBtn.innerHTML = "Enviar"
form.appendChild(submitBtn)

const resetBtn = document.createElement('button')
resetBtn.setAttribute("type","reset")
resetBtn.innerHTML = "Cancelar"
form.appendChild(resetBtn)

inputEmail.setAttribute("disabled","disabled")

form.style.display = "flex"
form.style.flexDirection = "column"
form.style.alignItems = "center"

inputEmail.removeAttribute('placeholder')
