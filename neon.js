//monster Image displayed on screen
const monsterImage = document.querySelector('#monsterImg')
//game.html - Main Play
const wordTemplatePlaceholder = document.querySelector('.guessesTemplate')
const letters = document.querySelector('.letters')
const reseters = document.querySelector('.resets')
const hintHolder = document.querySelector('.hint')
const playerDiv = document.querySelector('.playerDiv')
const displayLevelofDifficulty = document.querySelector('#displayDifficulty')
const displayRemainingGuess = document.querySelector('#remainingGuessDisplay')
const displayLifePoints = document.querySelector('.lifePointsRemaining')

//reset and play buttons on the game page
const restartGameButton = document.querySelector('#restart')
const playButton = document.querySelector('#play')
const hintButton = document.querySelector('#showHint')
const startGame = document.querySelector('#startGame')

//conditional screens & buttons
const lostGameScreen = document.querySelector('.lostGame')
const gameOverScreen = document.querySelector('.zeroLifeGameOver')
const wonGameScreen = document.querySelector('.wonTheGane')
const savedIslandScreen = document.querySelector('.savedTheIsland')

//the game state: the word, the placeholder, the buttons, levels, and wins
const game = {
    word: '',
    currentGuess: '',
    wordPlaceholder: [],
    hint: '',
    letterButtonsHolder: [],
    totalWins: 0,
    currentPlayer: '',
    playerLifePoints: 4,
    currentLevel: '',
    guessesRemaining: '',
    totalPoints: 0,
    pointsAddPerWin: 0,
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
        //grab the children of that element as an array
        let children = Array.prototype.slice.call(element.childNodes)
        //remove each child
        children.forEach(function(child) {
            element.removeChild(child)
        })
    },
    render: function(arr, element) {
        this.empty(element)
        element.append(arr)
    }
}

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


//create button to reset the game in the game
// 1, reable the play button / 2, empty the alphabet buttons from the div holder letters, clear out the word and hint / empty the displayed hint, reset the remaining guesses 
restartGameButton.addEventListener('click', (e) => {
    e.preventDefault()
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
    console.log(game)
})
playButton.addEventListener('click', (e) => {
    e.preventDefault()
    //e.stopImmediatePropagation()
    grabWordAndHint()
    game.createAlphaButtons()
    game.placeGuess()
    closeMe(hintHolder)
    openMe(hintButton)
    playButton.disabled = true
})
startGame.addEventListener('click', (e) => {
    e.preventDefault()
    displayMonster()
    closeMe(hintButton)
    game.currentGuess = ''
    game.wordPlaceholder = []    
})
hintButton.addEventListener('click', (e) => {
    e.preventDefault()
    openMe(hintHolder)
})
//grab the random word from the api
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
                    console.log(dictionaryData)
                    if (dictionaryData[0].shortdef[0] && dictionaryData[0].meta.offensive === false) {
                        game.word = word
                        game.hint = dictionaryData[0].shortdef[0]
                        hintHolder.textContent = game.hint 
                        createPlaceholder()
                        console.log(game)
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
    } else {
        game.guessesRemaining -= 1
        game.render(game.guessesRemaining, displayRemainingGuess)
        if(game.guessesRemaining <= 0) {
            console.log('You Lost to the Monster -1 Life Point')
            game.playerLifePoints -= 1
            game.render(game.playerLifePoints,displayLifePoints)
            if(game.playerLifePoints === 0) {
                console.log('GAME OVER NO LIFE LEFT.')
            }
        }
    }
    
}    
function openMe(element){
    element.style.display = 'flex'
}
function closeMe(element){
    element.style.display = 'none'
}
function displayMonster(){
let randomMonster = monsterAvatars[game.random(monsterAvatars)]
    monsterImage.setAttribute('src', randomMonster.imageSrc)    
}

































// function setup(){
//         createCanvas(600,600)
//         background(100,126,226,100)
// }

// let fishes = []
// function draw(){
    
//     fill(100,100,250)
//     ellipse(100,100,50,50)
//     createTree(50,50,50)
//     createTree(100,200,150)
//     createTree(200,250,150)
//     createTree(500,400,150)

//     fill(10,10,100,100)
//     rect(0,400,600,200)
// }

// function createTree(x,y, diameter){
//     fill(255,200,250)
//     rect(x-5,y,10,150)

//     fill(150,10,250)
//     ellipse(x,y,diameter, diameter)
// }

// class Fish {
//     constructor(x, y, diameter = 25){
//         this.x = x;
//         this.y = y;
//         this.diameter = diameter;
//     }
// }