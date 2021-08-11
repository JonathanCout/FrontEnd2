// Criando a variável de confirmação do jogo
let lilGame = confirm("Vamos brincar de pedra, papel ou tesoura?")

if (lilGame) {
    let userPoints = 0
    let pcPoints = 0

/*  Loop até um dos jogadores conseguirem 3 pontos. Foi feita desta forma pois em 3 rodadas, pode-se não ter um
resultado definitivo, pois podem existir 3 empates */

    while(userPoints < 3 && pcPoints < 3) {
        // Array de possibilidades
        let choices = ["pedra","papel","tesoura"]
        // Escolha feita pelo pc atribuindo um valor aleatório entre 0, 1 e 2 e atribuindo ao array choices
        let pcChoice = choices[Math.floor(Math.random()*choices.length)]
        // Escolha do usuário
        let userChoice = prompt("Escolha entre Pedra, Papel ou Tesoura")
        // Verificação se a escolha foi correta
        let userChoiceConfirm = choices.find(choice => choice === userChoice.toLowerCase())
        if (!userChoiceConfirm) {
            alert("Escolha uma opção válida")
        } else switch (pcChoice + userChoiceConfirm) {
            // Casos de empate
            case "pedrapedra":
            case "tesouratesoura":
            case "papelpapel":
                alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Êpa, nós empatamos. Vamos de novo`) 
            break;
            // Casos de vitória do PC
            case "pedratesoura":
            case "tesourapapel":
            case "papelpedra":
                pcPoints++
                alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Eu ganhei essa! =P. 
                Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
            break;
            // Casos de vitória do usuário
            default:         
                userPoints++
                alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Droga, você ganhou essa. 
                Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
        }
    } 
    // Verificação do vencedor
    if (userPoints == 3) {
        alert("Ok... dessa vez você ganhou")
    } else if (pcPoints == 3) {
        alert("HAHA! Dessa vez eu ganhei!")
    }
    
} else alert("Poxa que pena")





// Código caso foi realizado com if/else

/*   else if (userChoiceConfirm==pcChoice) {
      alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Êpa, nós empatamos. Vamos de novo`)
  } else if (userChoiceConfirm=="pedra" && pcChoice == "papel") {
     pcPoints++
     alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Eu ganhei essa! =P. 
     Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
  } else if (userChoiceConfirm=="papel" && pcChoice == "tesoura") {
     pcPoints++
     alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Eu ganhei essa! =P. 
     Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
  } else if (userChoiceConfirm=="tesoura" && pcChoice == "pedra") {
     pcPoints++
     alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Eu ganhei essa! =P. 
     Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
  } else {
      userPoints++
      alert(`Sua escolha: ${userChoiceConfirm}. Minha escolha: ${pcChoice}. Droga, você ganhou essa. 
      Sua pontuação: ${userPoints}. Minha pontuação: ${pcPoints}`)
  }    */