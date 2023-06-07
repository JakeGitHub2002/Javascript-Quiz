const question = document.querySelector("#question");
const choices =Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[] 

let questions= [{
question: "What does HTML stand for?",
choice1:"Hyper Technical Machine Language",
choice2:"Hyper Text Markup Language",
choice3:"Hydrate Tummy Micheal Lithium",
choice4:"Hyper Text Markup Lane",
answer:2,},

{question: "What programming language should you focus on for design when making a website?",
choice1:"CSS",
choice2:"CNN",
choice3:"HTML",
choice4:"JavaScript",
answer:1,},

{question: "Which is a string in JavaScript?",
choice1:"2",
choice2:"False",
choice3:"223 ,Blue ,Green ,John",
choice4:"17",
answer:3,},

{question: "What does CSS stand for?",
choice1:"Cascading Styling Sheet",
choice2:"Cant Style Software",
choice3:"Cute Stinky Stuff",
choice4:"All of the above",
answer:1,}

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
questionCounter=0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {

if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
localStorage.setItem ( 'mostRecentScore', score)
return window.location.assign('end.html')
}

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions [questionsIndex]
question.innerText = currentQuestion.question


choices.forEach(choice => {
const number = choice.dataset['number']
choice.innerText = currentQuestion['choice' + number]})


availableQuestions.splice(questionsIndex, 1)

acceptingAnswers = true



}

choices.forEach(choice => {
    choice.addEventListener ( 'click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':"incorrect"

    if(classToApply===
    'correct') {
        incrementScore(SCORE_POINTS)

    }

    selectedChoice.parentElement.classList.add(classToApply)
   
   setTimeout(()=> {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
   },1000)

})
})

incrementScore = num => {
    score +=num
    scoreText.innerText= score
}

startGame()