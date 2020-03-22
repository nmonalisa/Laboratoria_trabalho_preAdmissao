//Mensagem de boas-vindas
let player = prompt('Bem-vinda ao Show do Milhão!Qual é o seu nome?');
document.getElementById('text_welcome').innerHTML = `Olá, ${player}!`;

//variáveis globais
let user_decision;
const number_question = 3
const number_answers = 3
const correct_answers_food = ["Frango com quiabo","Gema de ovo","Ceviche"]
const correct_answers_sport = ["Jamaicana","6","33"]
let user_answers = new Array
let question_list

//criando perguntas e respostas
//sobre comida:
function FoodQuestions(){
  let question1 = {
    question: "Qual dessas é uma comida típica do estado de Minas Gerais?",
    0: "Frango com quiabo", 1: "Arroz carreteiro", 2: "Moqueca de camarão"
  }
  let question2 = {
  question: "Qual é o principal ingrediente do doce baba-de-moça?",
  0: "Leite", 1: "Gema de ovo", 2: "Chocolate",
  }
  let question3 = {
  question: "Qual desses é um prato típico do Peru, país de origem da &ltLaboratória>?",
  0: "Salsicha com batatas", 1: "Ceviche", 2: "Pizza"
  }
  let question_list = [question1,question2,question3]
  return question_list;
}

//Esportes
//sobre esportes
function SportQuestions(){
  let question1 = {
    question: "Qual é a nacionalidade do velocista Usain Bolt, campẽao olímpico e mundial?",
    0: "Inglesa", 1: "Sul-Africana", 2: "Jamaicana"
  }
  let question2 = {
  question: "Quantas vezes a jogadora de futebol brasileira Marta foi eleita a melhor do mundo?",
  0: "5", 1: "6", 2: "7",
  }  
  let question3 = {
  question: "Quantas modalidades esportivas serão disputadas na Olímpiada 2020 do Japão?",
  0: "33", 1: "41", 2: "65"
  }
  let question_list = [question1,question2,question3]
  return question_list;
}

//recuperando decisao do usuario sobre tipo de pergunta
FoodButton = () => {
  user_decision = 1;
  StartGame()
}         
SportButton = () => {
  user_decision = 2;
  StartGame()
}

//recuperar valor do input selecionado como resposta pelo usuário
GetOptionUser = (element) => user_answers.push(element.value);

//Iniciar jogo
function StartGame(){
    document.getElementById('container_home').remove();  //esconder tela inicial
    document.getElementById('container_questions').setAttribute("class", "box") //formatação do box de perguntas
      //criar estrutura para alocar respostas
       for (var i=0; i <= number_answers-1; i++){
       let answer_item = document.createElement("INPUT")
       answer_item.setAttribute("class", "answer")
       answer_item.setAttribute("onmousedown", "GetOptionUser(this)")
       answer_item.setAttribute("onclick", "ShowQuestions()")
       answer_item.setAttribute("readonly", "readonly")
       document.getElementById('answers_list').appendChild(answer_item)
       }
ShowQuestions()
    } 

//Mostrar perguntas
let q = 0
function ShowQuestions(){
  user_decision == 1 ? question_list = FoodQuestions() : question_list = SportQuestions()
      if (q <= number_question-1)
      { 
        document.getElementById('title').innerHTML = question_list[q]["question"];
          for (var a=0; a<= number_answers-1; a++)
            {document.getElementsByClassName('answer')[a].value = question_list[q][a]} 
      }
      else 
      {
        if(user_decision == 1){ ShowResults(ComputeResults(correct_answers_food,user_answers)) }
        else { ShowResults(ComputeResults(correct_answers_sport,user_answers)) }
      }
  q++;
}

//Obter resultados
function ComputeResults(correct_answers, user_answers){
  let points = new Array
  //para cada questão: atribua certo (1) ou errado (0)
  for (var i=0; i <= number_question-1; i++){
    if (correct_answers[i] === user_answers[i]){
      points[i] = 1
    } else {
      points[i] = 0
    }
  }
  return points;
}

//mostrar resultados
function ShowResults(result_list){
  result_list
  document.getElementById('container_questions').remove()
  document.getElementById('container_results').setAttribute('class', 'result_box')

  document.getElementById('correct').setAttribute('class', 'result_item')
  document.getElementById('correct').innerHTML = "RESPOSTAS CORRETAS"
  document.getElementById('correct').setAttribute('style', "background-color: lightgreen")

  document.getElementById('wrong').setAttribute('class', 'result_item')
  document.getElementById('wrong').innerHTML = "RESPOSTAS ERRADAS"
  document.getElementById('wrong').setAttribute('style', "background-color: #F08080")

    //mostrar respostas certas e erradas em containers diferentes
     for (var i = 0; i<=result_list['length']-1; i++){
      if (result_list[i] == 1){
          let result_item = document.createElement("div")
          result_item.innerHTML = `Pergunta ${i+1}`
          document.getElementById('correct').appendChild(result_item)
      } else {
        let result_item = document.createElement("div")
        result_item.innerHTML = `Pergunta ${i+1}`
        document.getElementById('wrong').appendChild(result_item)
      }
     }

  //criar botão Restart
   let restart = document.createElement("INPUT")
   restart.value = "Reiniciar"
   restart.setAttribute("class", "buttom")
   restart.setAttribute("onclick", "RestartGame()")
   document.getElementById('container_results').appendChild(restart)
  }

RestartGame = () => window.location.reload()
