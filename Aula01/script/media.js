// Aula 01 - 10/08/21
// Front-End II

/* A fim de revermos alguns conceitos aprendidos anteriormente, realize esse estudo de caso com os colegas
de sua mesa. Codificando o que for pedido usando a ferramenta VS Code.

A secretaria de uma escola contratou a sua empresa para desenvolver sua plataforma de gestão de alunos,
sendo uma dessas partes a criação de um sistema que calcule as notas obtidas ao longo do semestre, 
Você e seu grupo fazem parte da equipe responsável por implementar esta funcionalidade no sistema.
Para isso, crie um script que permita adicionar uma sequência de números (um array de números) consecutivamente
para receber as notas dos 4 bimestres. Após isso, crie uma estrutura na qual todos os números do array 
sejam somados sequencialmente: o primeiro número seja somado ao segundo e o resultado seja impresso no 
console. Então, temos que pegar esse resultado e adicionar o terceiro número a ele, e assim por diante, 
até terminarmos de percorrer o array. Seguindo a lógica do exemplo a seguir: 
Por fim, a soma desses números deve ser dividida pelo total de bimestres (4) para calcular a média e 
guardada em uma variável, a qual deve ser exibida no console.*/


// Array de notas por bimestre
let notas = [1,6,7,9]
// Variável acumuladora
let soma = 0

console.log("Fazendo cálculo da média final do(a) aluno(a):")
// Método de array para fazer as somas das médias
notas.forEach(nota => {
    console.log(`${soma} + ${nota} =`)
    soma += nota
    console.log(soma)
})
// Cálculo da média final
let media = soma/notas.length
console.log(`A média final do(a) aluno(a) é de ${media}`)
// Condicional de aprovação
if (media >= 7) {
    console.log("Parabéns, você foi aprovado(a).")
} else console.log("Infelizmente, você foi reprovado(a).")



