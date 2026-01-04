import formatData from "./helper.js"
const URL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
const loader = document.getElementById('loader')
const container = document.getElementById('container')
const questionText = document.getElementById('question-text')
const answerList = document.querySelectorAll('.answer-text')

let formattedData = null
let questionIndex = 0
let correctAnswer = null;


// fetch data
const fetchData = async () => {
    const response = await fetch(URL)
    const json = await response.json()
    formattedData = formatData(json.results)
    console.log(formattedData);

    start()
}


// project start
const start = () => {
    showQuestion()
    loader.style.display = 'none'
    container.style.display = 'block'
}


// show questions 
const showQuestion = () => {
    const {
        question,
        answers,
        correctAnswerIndex
    } = formattedData[questionIndex]
    correctAnswer = correctAnswerIndex
    console.log(correctAnswer);
    

    questionText.innerText = question
    answerList.forEach((button, index) => {
        button.innerText = answers[index]
    })
}


const checkAnswer = (event, index) => {
  const isCorrect = index === correctAnswer ? true : false
  if(isCorrect) {
    event.target.classList.add('correct')
  }else{
    event.target.classList.add('incorrect')
    answerList[correctAnswer].classList.add('correct')
  }

}


// window load
window.addEventListener('load', fetchData)
answerList.forEach((button, index) => {
    const handler = (event) => checkAnswer(event, index)
    button.addEventListener('click', handler)
})