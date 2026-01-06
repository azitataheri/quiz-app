const score = JSON.parse(localStorage.getItem('score'))
const userScore = document.getElementById('user-score')
const saveBtn = document.getElementById('save')
const userName = document.getElementById('username')
const highScores = JSON.parse(localStorage.getItem('highScores')) || [] 
userScore.innerText = score




const saveDataHandler = () => {
    if (!userName.value || !score) {
        alert('Invalid username or score')
    } else {
        const finalScore = {
            name: userName.value,
            score
        }
        highScores.push(finalScore)


        // for sort scores use sort method
        highScores.sort((a, b) => b.score - a.score)
        highScores.splice(10)
        localStorage.setItem('highScores', JSON.stringify(highScores))
        localStorage.removeItem('score')
        window.location.assign('/')
        
    }
}
saveBtn.addEventListener('click', saveDataHandler)
