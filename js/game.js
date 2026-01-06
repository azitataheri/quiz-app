import formatData from "./helper.js"

const level = localStorage.getItem('level') || 'medium'
const loader = document.getElementById('loader')
const container = document.getElementById('container')
const questionText = document.getElementById('question-text')
const answerList = document.querySelectorAll('.answer-text')
const scoreText = document.getElementById('score')
const next = document.getElementById('next-button')
const finish = document.getElementById('finish-button')
const before = document.getElementById('before-button')


const CORRECT_BONUS = 10; // score for any correct answer
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`
let formattedData = null
let questionIndex = 0
let correctAnswer = null;
let score = 0
let isAccepted = true

// fetch data
const fetchData = async () => {
  try {
    const response = await fetch(URL)
    const json = await response.json()
    formattedData = formatData(json.results)
    console.log(formattedData);
    start()
  } catch (error) {
    console.log('error');

  }

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
  // if isAccepted is not true score is not added
  if (!isAccepted) return;
  isAccepted = false


  const isCorrect = index === correctAnswer ? true : false
  if (isCorrect) {
    event.target.classList.add('correct')
    score += CORRECT_BONUS
    scoreText.innerHTML = score
  } else {
    event.target.classList.add('incorrect')
    answerList[correctAnswer].classList.add('correct')
  }

}



const nextQuestionHandler = () => {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    isAccepted = true
    removeClasses()
    showQuestion()
  } else {
    finishHandler()
  }
}


const finishHandler = () => {
  localStorage.setItem('score', JSON.stringify(score))
  window.location.assign('/end.html')
}

const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = 'answer-text'
  })
}







window.addEventListener('load', fetchData)
next.addEventListener('click', nextQuestionHandler)
finish.addEventListener('click', finishHandler)

// click on any button
answerList.forEach((button, index) => {
  const handler = (event) => checkAnswer(event, index)
  button.addEventListener('click', handler)
})
