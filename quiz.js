const prompt=require("prompt-sync")()
const fs=require("fs")
const { get } = require("http")

function loadQuestions(){
    try{
        const data=fs.readFileSync("questions.json","utf8")
        const questions=JSON.parse(data).questions
        return questions
    }
    catch(e){
        console.log("Error ocuured while loading ",e)
        return []
    }
}


function getRandomQuestions(questions,numQuestions){
    if(numQuestions>questions.length){
        numQuestions=questions.length
    }
    const shuffled=questions.sort(()=>{
        return 0.5 - Math.random()
    })
    return shuffled.splice(0,numQuestions)
}

function askQuestion(question){
    console.log(question.question)
    for(let i=0;i<question.options.length;i++){
        console.log(`${i+1}. ${question.options[i]}`)
    }
    const choice=parseInt(prompt("Enter correct option number: "))
    if(isNaN(choice) || choice<1 || choice>question.options.length) {
        console.log("Invalid!")
        return false
    }
    const choiceValue=question.options[choice-1]
    if(choiceValue===question.answer)return true
    else return false
}

const numQuestions=parseInt(prompt("Enter number of questions: "))
const questions=loadQuestions()
const randomQuestions=getRandomQuestions(questions,numQuestions)
let correct=0
let startTime=Date.now()
for(let question of randomQuestions){
    let isCorrect=askQuestion(question)
    if(isCorrect) correct++
}
let totalTime=Date.now() - startTime

console.log("Correct:",correct)
console.log("Time Taken:",Math.round(totalTime/1000)+"s")
console.log("Score:", Math.round((correct/numQuestions)*100)+"%")

