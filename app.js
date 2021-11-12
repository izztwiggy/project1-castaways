//Now that you have the basics of oop game, need to be able to add a gameState, so lets make an object to hold said Game
const letterDiv = document.querySelector('.letters')
const gameState = {
    wordList: ["migration", "background", "sentiment", "tiger", "bang", "wash", "meaning", "brainstorm", "expectation", "question", "apple"],
    wordTemplate: [],
    letterGuesses: [],
    randomIndex: function(){
       return Math.floor(Math.random() * this.wordList.length)
    },
    alphaButtons: function(){
        for(let i = 65; i <= 90; i ++) {
            const letter = String.fromCharCode(i)
            const letterButtons = document.createElement('button')
            letterButtons.setAttribute('value', letter)
            letterButtons.innerText = letter
            letterDiv.append(letterButtons)

        }
    }
}

const word = gameState.wordList[gameState.randomIndex()]
console.log(word)
gameState.alphaButtons()

//going to use event delegation to set a global scope listener on the document itself, since the document is really always listening, if type is equal to the event and e.target matches the selector, then will add the callback to run, in anticipation of potential added elements and attempting to keep everything in the gameState relevant to eachother AND using less stack space, I will use this one named function. WebDevSimplified went over this, and this makes sense to use as I transfer my game from OOP and console based to DOM/state based
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}


const handleClick = e => {
    const guess = $(e.currentTarget)

}





























// //Step 1
// //list of 10 words in array and assign it to the variable of wordsList
// //loop over the alphabet letters and create buttons
// //A = 65 - Z = 91  , small = a-z 97-123
// let letters = document.querySelector('.letters')
// let startGameBtn = document.querySelector('#startGame')
// // //
// // //this start button will be on a modal pop up that will disseaper once clicked, and generate the buttons
// // startGameBtn.addEventListener('click', createAlphaButtons)
// // for (let i = 65; i <= 90; i++) {
// //     let letter = String.fromCharCode(i)
// //     let letterBtn = document.createElement('button')
// //     letterBtn.classList.add('letterBtn')
// //     letterBtn.innerText = letter
// //     letterBtn.classList.add('alphabet')
// //     letterBtn.setAttribute('value', letter)
// //     letters.append(letterBtn)
// //     letterBtn.addEventListener('click', e => {
// //         e.preventDefault()
// //         let guess = e.target.value
// //         console.log(guess)
// //     })
// // }








// // let easy = new Levels('easy', 10)
// // let medium = new Levels('medium', 6)
// // let hard = new Levels('hard', 4)


// //                     //random word picker
// // const randomIndex = Math.floor(Math.random() * wordList.length)
// // let randomWord = wordList[randomIndex]
// // console.log(`The word is ${randomWord}`)
//                     // create blanks for the word


  

// // let buttonsAlpha = document.querySelectorAll('letterBtn')
// // for (button of buttonsAlpha) {
// //     button.addEventListener('click',(e) => {
// //         e.preventDefault()
// //         guess = e.target.value
// //     })
// //     console.log(e)
// // }


// // letterBtn.addEventListener('click', (e) => {
// //     e.preventDefault()
// //     let guess = e.target.value
// //     console.log(guess)
// // })

// class Levels {
//     constructor(difficulty, points){
//         this.difficulty = difficulty
//         this.points = points
//     }
// }

// let easy = new Levels('easy', 10)
// let medium = new Levels('medium', 6)
// let hard = new Levels('hard', 4)

// const wordList = ["migration", "background", "sentiment", "tiger", "bang", "wash", "meaning", "brainstorm", "expectation", "question", "apple"]
// const placeHolder = []
// let guessHistory = []
//                     //random word picker
// const randomIndex = Math.floor(Math.random() * wordList.length)
// let randomWord = wordList[randomIndex]
// console.log(`The word is ${randomWord}`)
//                     //create blanks for the word
// for (let i = 0; i < randomWord.length; i++) {
//     placeHolder.push("_")
// }
// let points = 10
//     let gameOver = false
//     while (gameOver === false) {
//     console.log(`You have ${points} points`)
//     let guess = prompt('Enter letter here').toLocaleLowerCase()
//     console.log('Your Previous Guesses: ',guessHistory)
    
//     if (guessHistory.includes(guess)) {
//         console.log(`You have already chosen ${guess}`)
//     } else {
//         guessHistory.push(guess)
//         if (randomWord.includes(guess) === false) {
//             console.log(`${guess} was incorrect`)
//             points -= 1
//             if (points <= 0) {
//                 console.log(`You are out of guesses, you lose`)
//                 gameOver = true
//             }
//         }
//         for (let i = 0; i < randomWord.length; i ++) {
//             if (randomWord[i] === guess) {
//                 placeHolder[i] = guess
//                 console.log(placeHolder)
//             }
//         }
//         if(placeHolder.includes('_') == false) {
//             gameOver = true
//             console.log(placeHolder)
//             console.log(`You win`)
//         }
//     }
// }




























// loop through the word and for each letter, append a _ to the placeholder array

// function generatePlaceHolder(word){
//     for (let i = 0; i < word.length; i++) {
//         placeHolder.push("_")
//     }
//     console.log(placeHolder)
// }
// let guess = prompt('Enter letter here').toLocaleLowerCase()
// //check to see if the guess is in the word. If so update the template, if not deduct a point 
// function checkGuess(){
//     for (let i = 0; i < randomWord.length; i ++) {
//         if (randomWord[i] == guess) {
//             placeHolder[i] = guess
//         } else {
//             points -= 1
//         }
//     }
// }

// function checkForBlanks(){
//     if (!placeHolder.includes('_')) {
//         console.log(placeHolder, `You guessed all the letters`)
//         return gameOver = true
//     }
// }





// //create while loop
// while(gameOver !== true) {
//     //check if the place holder has _ placeholders
//     checkPlaceHolderArray(placeHolder)
//     //if does not return gameOver then prompt the user for a guess
//     guess
//     //now with that guess check to see if their guess is contained in the word chosen
//     checkToUpdateDisplay(guess)
//     //will then loop back to the top where it will check if the array has placeholders left and if game should be over
// }



































//keep asking until the player guesses the word (or in later version the player runs out of points)(not to get ahead of myself but that would look like, while (gameOver !== true)) 
//loop will only stop once display array has no more blanks
//check if array contains "_", for display.contains('_') // if true keep looping if false, game over = true, if gameOver is true and player has points left over then the player would win. 
//again not to get ahead of myself but the bones of this games loop will look like:
/*
while (gameOver !== true) {
    guess = input('Enter your guessed Letter').toLocaleLowerCase()
    //check for the guessed letter in the secretWord
    for the letter in the secretword
    can log: the current position of the letter is _, the current letter is _, and your guessed letter is _
    if letter is equal to guess, dislpayArray[index of letter in for loop] is equal to the guessed letter
    if no blanks left in array, end of game is true and we exit the loop,
    otherwise ask user for guess again 
}

*/
//Step 4 - creating player lives and items left
//create a counter to hold the score, if the guess is not in the chosen secretWord then one point is deducted from the score. If lives is equal to 0, then game over is true
//create an array to hold images of items, the number of items is equivelent to the number of points left in the game. Will leave the item array empty for now, that will be a later step
//start with 8 lives, (changing Easy to 8, med to 6, hard to 5)

//step 5 - display the word and spaces on the screen
//once displayed on the screen, update the array to contain icons of survival items
//once that is completed, fetch the merriam webster api and update the list of random words to be an Array.from the json data returned.
//once the api is updated, add the ability to localStorage to keep track of total games played. 
//once you have accurate working order of number of games played, work through the pages css to aquire it to wireframe status
//once base css background has been set, set levels of difficulty easy / medium / hard and link to the buttons (actually do this before finishing up css)
//once levels have been set, add an option to have a timer to guessing period. If you do not guess the word before the time is up, then game is over.
//easy time length will be 2 min
//med is 1:15 min
//hard is 45 sec - 1 min, will research what the best option would be to maximize intrigue and keep players challenged

//step 5, add levels to the story, after 2 - 3 games in one location, give the player the option (if they have won) they can "travel" to the next story location. The next levels should grow in difficulty in one or more aspects, so getting the 5th and final location would be a challenge and desired
//location one = the island of the crash
//location 2 = in the sea, a seamonster is trying to attack
//location 3 = still in the sea, made it past the monster but now there is a horrible storm
//location 4 = land but chased by ravished animal up the mountain, due to global warming and disgusting corportaion patterns the animals are hungry and losing shelter, so have to deal with a very hungry and grumpy animal
//location 5 = abducted by aliens and are in space

//step6 introduce double Play 
//2 players enter their names, have a shuffle to decide who will go first entering word, and who will go first guessing.
//display the results, take the word choosing player to the "back end " and have them enter a word into a prompt. Check for numbers and characters that are not letters
//take the players to the guessing stage. 
//the blanks are updated and displayed for the first players entered word, the guessing player has _ attempts to guess wrong based on the level of difficulty they choose, 
//have guesser go through game and display and work the game with same logic as above for single player, but at the end, give the guessing player the option to switch places and enter a word, or redo their current spot
//as a multiplayer user, I want to clearly see whos turn it is to guess, so display the users name on the page, 
//display the amount of points left 
//mulitplayers can have option to add timer to guess
