//monster Image displayed on screen
const monsterImage = document.querySelector('#monsterImg')

//game screen:
const gameScreen = document.querySelector('.gameScreen')
//game.html - Main Play
const wordTemplatePlaceholder = document.querySelector('.guessesTemplate')
const letters = document.querySelector('.letters')
const reseters = document.querySelector('.resets')
const hintHolder = document.querySelector('.hint')
const playerDiv = document.querySelector('.playerDiv')
const displayLevelofDifficulty = document.querySelector('#displayDifficulty')
const displayRemainingGuess = document.querySelector('#remainingGuessDisplay')
const displayLifePoints = document.querySelector('.lifePointsRemaining')
//homepage
const homePage = document.querySelector('.homePage')
const loginDiv = document.querySelector('.loginDiv')
const playerNameBtn = document.querySelector('#playerNameSubmitBtn')
//const playerNameInput = document.querySelector('#playerLogin')
//reset and play buttons on the game page
const restartGameButton = document.querySelector('#restart')
const playButton = document.querySelector('#play')
const hintButton = document.querySelector('#showHint')
const startGame = document.querySelector('#startGame')
const homeButton = document.querySelector('#home')
//conditional screens & buttons
const lostGameScreen = document.querySelector('#lostGame')
const gameOverScreen = document.querySelector('#zeroLifeGameOver')
const wonGameScreen = document.querySelector('#wonTheGame')
const savedIslandScreen = document.querySelector('#savedTheIsland')
const replayBtn = document.querySelectorAll('.replay')
const returnHomeBtn = document.querySelectorAll('.returnHome')
const lifePointsLostScreen = document.querySelector('#lifePointsLeft')
const lifePointsWonScreen = document.querySelector('#lifePointsLeftWinScreen')
//playerscore spans & names
const playerNameDisplay = document.querySelector('#playerName')
const playerScoreWonGameScreen = document.querySelector('#winnerScreenScore')
const lostGamePlayerScore = document.querySelector('#lostGamePlayerScore')
const gameOverFinalScore = document.querySelector('#gameOverPlayerScore')
const savedIslandScore = document.querySelector('#screenFour')
const playerNameClass1 = document.querySelector('#playerName1')
const playerNameClass2 = document.querySelector('#playerName2')
const playerNameClass4 = document.querySelector('#playerName4')
//highscore
const scoreTitleBtn = document.querySelector('#scoreTitle')

window.addEventListener('load', (e) => {
    e.preventDefault()
    closeMe(gameScreen)
})

let gamesWon = 0
const game = {
    word: '',
    currentGuess: '',
    wordPlaceholder: [],
    hint: '',
    letterButtonsHolder: [],
    highestScore: 0,
    currentPlayer: '',
    playerLifePoints: 4,
    scurrentLevel: '',
    guessesRemaining: '',
    totalPoints: 0,
    pointsAddPerWin: 0,
    trashBag: [],
    //currentRound: 0,
    random: function(item){
        return Math.floor(Math.random() * item.length)
    },
    createAlphaButtons: function(){
        for(let i = 65; i <= 90; i++) {
            let letter = String.fromCharCode(i)
            let buttonAlpha = document.createElement('button')
            buttonAlpha.classList.add('.letterBtn')
            buttonAlpha.setAttribute('letter', letter)
            buttonAlpha.innerHTML = letter
            this.letterButtonsHolder.push(buttonAlpha)
            buttonAlpha.style.fontFamily = 'Rubik Mono One'
            letters.append(buttonAlpha)
        }
    },
    placeGuess: function(){
        if(this.letterButtonsHolder.length > 0 ) {
            this.letterButtonsHolder.forEach(letterBtn => {
                letterBtn.addEventListener('click', (e) => {
                    e.preventDefault()
                    let guess = e.target.innerText
                    this.currentGuess = guess.toLocaleLowerCase()
                    updateWithGuess(this.currentGuess)
                    letterBtn.disabled = true
                }) 
            })
        }   
    },
    empty: function(element) {
        let children = Array.prototype.slice.call(element.childNodes)
        children.forEach(function(child) {
            element.removeChild(child)
        })
    },
    render: function(arr, element) {
        this.empty(element)
        element.append(arr)
    }
}
//initialize local storage 
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
function saveStorage() {
    localStorage.setItem('highScores', JSON.stringify(highScores))
}
//if there is a player with a score, add to player data when they hit exit to leave the game. 
let sendPlayerData = document.querySelectorAll('.sendPlayerData')
sendPlayerData.forEach(exit => {
    exit.addEventListener('click', (e) => {
        if(e.target === exit) {
            if(game.currentPlayer.length >= 1 && game.totalPoints > 0) {
                console.log(`Current Player is ${game.currentPlayer}, Player's points are ${game.totalPoints}`)
                let highScore = (game.totalPoints * game.playerLifePoints)
                let player = {
                    player: game.currentPlayer,
                    score: highScore,
                }
                highScores.push(player)
                //sort from highest to lowest, if b(new)player score  is greater than old player score(previous score), put b ahead of a
                highScores.sort((a, b) => {
                    return b.score - a.score
                })
                highScores.splice(10)
                saveStorage()
            } else {
                console.log(`There is no player Game Data yet, keep playing!`)
            }
        }
    })
    
})

//retrieve the list of highscores to display:
const highScoreList = document.querySelector('.highScoreList')
const storageHighScores = JSON.parse(localStorage.getItem('highScores')) || []
highScoreList.innerHTML = storageHighScores.map(unit => {
    let li = document.createElement('li') 
    return `<li class='hg-score'>${unit.player} - ${unit.score}</li>`
}).join('')
//create toggle-able scores, click the heading to open and close
scoreTitleBtn.addEventListener('click', (e) => {
    console.log('scoreTitle')
    if(highScoreList.style.display === 'none') {
        console.log('openScores!')
        openMe(highScoreList)
        
    } else {
        console.log('not closed')
        closeMe(highScoreList)
    }
})

//get player name
playerNameBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let name = document.querySelector('#playerLogin').value
    if(!name) {
        name = `player${Math.floor(Math.random() * 500)}`
    }
    const player = {
        score: 0,
        userName: '',
    }
    player.userName = name
    
    game.currentPlayer = player.userName
    //should change this to class, querySelectorAll and forEach item update the currentPlayer.
    playerNameDisplay.textContent = game.currentPlayer
    playerNameClass1.innerHTML = game.currentPlayer
    playerNameClass2.innerHTML = game.currentPlayer
    playerNameClass4.innerHTML = game.currentPlayer
    document.querySelector('#playerNameLogin').innerText = name
    gamesWon = 0
    game.playerLifePoints
})

function getLevelofDifficulty () {
    const difficultyRadioButtons = document.querySelectorAll('input[name="difficultyRadio"]')
    difficultyRadioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let choice = e.target.defaultValue
            for(let i = 0; i < playLevel.length; i++) {
                if(playLevel[i].difficulty === choice) {
                    game.currentLevel = playLevel[i]
                    game.guessesRemaining = playLevel[i].wrongGuesses
                    game.pointsAddPerWin = playLevel[i].pointsPerWin
                    displayLevelofDifficulty.innerHTML = game.currentLevel.difficulty
                    displayLifePoints.innerHTML = game.playerLifePoints
                    displayRemainingGuess.innerHTML = game.guessesRemaining
                    console.log(game)
                }
                
            }
        })
    })
}
getLevelofDifficulty()
function reset(){
    playButton.disabled = false
    game.empty(letters)
    game.word = ''
    game.hint = ''
    game.currentGuess = ''
    game.wordPlaceholder = []
    game.empty(wordTemplatePlaceholder)
    game.empty(hintHolder)
    closeMe(hintButton)
    game.guessesRemaining = game.currentLevel.wrongGuesses
    game.render(game.guessesRemaining, displayRemainingGuess)
}

//ConditionalScreens Buttons
replayBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        reset()
        displayMonster(gamesWon)
        closeMe(lostGameScreen) 
        closeMe(wonGameScreen)
        openMe(gameScreen)
        
    })
})
returnHomeBtn.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        reset()
        closeMe(lostGameScreen) 
        closeMe(wonGameScreen)
        closeMe(gameScreen)
        openMe(homePage)
    })
})

//create button to reset the game in the game
// 1, reable the play button / 2, empty the alphabet buttons from the div holder letters, clear out the word and hint / empty the displayed hint, reset the remaining guesses 
restartGameButton.addEventListener('click', (e) => {
    e.preventDefault()
    reset()
    openMe(gameScreen)
    console.log(game)
})
playButton.addEventListener('click', (e) => {
    e.preventDefault()
    grabWordAndHint()
    game.createAlphaButtons()
    game.placeGuess()
    closeMe(hintHolder)
    openMe(hintButton)
    openMe(restartGameButton)
    playButton.disabled = true
    
})
startGame.addEventListener('click', (e) => {
    e.preventDefault()
    displayMonster(gamesWon)
    closeMe(hintButton)
    game.currentGuess = ''
    game.wordPlaceholder = []
    closeMe(homePage)
    openMe(gameScreen)
    closeMe(restartGameButton)    
})
hintButton.addEventListener('click', (e) => {
    e.preventDefault()
    openMe(hintHolder)
})
homeButton.addEventListener('click', (e) => {
    e.preventDefault()
    openMe(homePage)
    closeMe(gameScreen)
})
function grabWordAndHint(){
    fetch('https://random-word-api.herokuapp.com/word?number=250&swear=0')
        .then(res => res.json())
        .then(data => {
            let word = data[game.random(data)]
            console.log(word)
            fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=679e4828-5409-4005-bd80-f99e9e519d3f`)
                .then((response) => {
                    if(!response) {
                        throw new Error(`Status Code Error: ${response.status}`)
                    }
                    return response.json()
                })
                .then((dictionaryData) => {
                    //console.log(dictionaryData)
                    if (dictionaryData[0].shortdef[0] && dictionaryData[0].meta.offensive === false) {
                        game.word = word
                        game.hint = dictionaryData[0].shortdef[0]
                        hintHolder.textContent = game.hint 
                        createPlaceholder()
                        //console.log(game)
                    } else {
                        if (!dictionaryData[0].shortdef[0] && dictionaryData[0].meta.offensive === false) {
                            word = data[game.random(data)]
                        }
                    }
                })
                .catch((error) => {
                    console.log(`Something went wrong: ${error}`)   
                })
        })
        .catch(err => {
            console.log(`Something went wrong: ${err}`)
        })
}

function createPlaceholder(){
    console.log('Add placeholder')
    for(let i = 0; i < game.word.length; i ++) {
        game.wordPlaceholder.push('_')
    }
    console.log(game.wordPlaceholder)
    wordTemplatePlaceholder.append(game.wordPlaceholder.join(' '))
}
function updateWithGuess(guess){
    if(game.word.includes(guess)) {
        for(let i = 0; i < game.word.length; i ++) {
            if(game.word[i] === guess) {
                console.log('correct')
                game.wordPlaceholder[i] = guess
            } 
            game.empty(wordTemplatePlaceholder)
            wordTemplatePlaceholder.append(game.wordPlaceholder.join(' '))
        }
        checkForWin()
    } else {
        game.guessesRemaining -= 1
        game.render(game.guessesRemaining, displayRemainingGuess)
        if(game.guessesRemaining <= 0 && game.playerLifePoints > 0) {
            console.log('You Lost to the Monster -1 Life Point')
            game.playerLifePoints -= 1
            game.render(game.playerLifePoints,lifePointsLostScreen)
            game.render(game.totalPoints, lostGamePlayerScore)
            closeMe(gameScreen)
            openMe(lostGameScreen)
            game.render(game.playerLifePoints,displayLifePoints)
            checkForGameOver()
        }
    }
    
}
function checkForWin(){
    if(game.wordPlaceholder.includes('_') === false) {
        gamesWon += 1
        game.totalPoints += game.pointsAddPerWin
        game.render(game.totalPoints, savedIslandScore)
        if(gamesWon === monsterAvatars.length) {
            closeMe(gameScreen)  
            openMe(savedIslandScreen)
        } else {
            game.render(game.playerLifePoints,lifePointsWonScreen)
            game.render(game.totalPoints, playerScoreWonGameScreen)
            closeMe(gameScreen)
            openMe(wonGameScreen)
        }
    }
}    
function checkForGameOver() {
    if(game.guessesRemaining===0 && game.playerLifePoints === 0) {
        console.log('Game over')
        closeMe(lostGameScreen)
        closeMe(gameScreen)
        game.render(game.totalPoints, gameOverFinalScore)
        openMe(gameOverScreen)
        gamesWon = 0
    } 
}
function openMe(element){
    element.style.display = 'block'
}
function closeMe(element){
    element.style.display = 'none'
}
function displayMonster(gamesWon){
    let currentMonster = monsterAvatars[gamesWon]
    monsterImage.setAttribute('src', currentMonster.imageSrc)  
}
































