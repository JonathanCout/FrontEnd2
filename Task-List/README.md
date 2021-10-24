# ToDo List
  
  ToDo List é um projeto criado para o checkpoint final de Front End II do curso CTD. 
  
  O desafio era criar uma lista de tarefas utilizando Javascript para criação dos elementos e manipulação dos dados. 
  
  Além disso, foi utilizado LocalStorage para salvar os dados inseridos pelo usuário e os carregarem assim que a página for recarregada.
  
  O site foi feito para ser completamente responsivo, com o modelo de mobile-first em mente.
  
  O usuário pode inserir tarefas através de um formulário, com uma descrição e a data limite para que ela seja feita.
  
  Como um bônus, foi feita uma segunda página, nomeada Task Generator, onde é feita a extração de 200 tarefas de uma API, e exibidas na tela do usuário
  
  
## Documentação

  O cabeçalho contém um botão (+) para mostrar mostrar o form de inserção de dados. Neste, existem um botão para escolher uma tarefa aleatória da API BoredAPI
  e dois inputs: o primeiro para definir a descrição da tarefa a ser criado
  e o segundo para definir uma data limite para a tarefa. 
  
  Não são permitidas tarefas vazias ou com menos de 10 caracteres de texto. Caso esta condição seja inválida, uma mensagem de erro é exibida abaixo do input de descrição.
  
  Cada card possuí 3 botões:
  - Checkbox para marcar a tarefa como concluída (gerando opacidade no card e uma marcação no texto). Esta operação também pode ser realizada clicando no texto da tarefa.
  - Botão para editar o texto da tarefa
  - Botão para excluir a tarefa. Este, ao ser clicado, exibe um balão de confirmação.

## Links

- [ToDo List](https://jonathancout.github.io/FrontEnd2/Task-List/)
- [API para geração de tarefas aleatórias](https://www.boredapi.com)
- [Task Generator](https://jonathancout.github.io/FrontEnd2/Task-List/Using-API/)
