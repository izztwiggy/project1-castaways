//Now that you have the basics of oop game, need to be able to add a gameState, so lets make an object to hold said Game
const letterDiv = document.querySelector('.letters')
const displayTemplate = document.querySelector('.displayTemplate')
const gameState = {
    wordList: ["migration", "background", "sentiment", "tiger", "bang", "wash", "meaning", "brainstorm", "expectation", "question", "apple"],
    wordTemplate: [],
    letterGuesses: [],
    points: 5,
    randomIndex: function(){
       return Math.floor(Math.random() * this.wordList.length)
    },
    alphaButtons: function(){
        for(let i = 65; i <= 90; i ++) {
            const letter = String.fromCharCode(i)
            const letterButtons = document.createElement('button')
            letterButtons.classList.add('letterBtn')
            letterButtons.setAttribute('value', letter)
            letterButtons.innerText = letter
            letterDiv.append(letterButtons)
        }
        addGlobalEventListener('click', '.letterBtn', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const guess = e.target.value
            console.log(guess)
            //update the guessed List and redisplay on the screen
            this.letterGuesses.push(guess)
            document.querySelector('#displayGuesses').append(guess)
            if (this.word.includes(guess)) {
                console.log('true')
                this.updateWordTemplate(guess)
            }
            
        })
    },
    //create the blanks on the screen = to characters in word
    addTemplates: function() {
        for(let i = 0; i < this.word.length; i ++) {
            this.wordTemplate.push('_')
        }
    },
    //create a function to check the guess to the word
    updateWordTemplate: function(guess) {
        //check which index has the letter and update the word template to reflect
        for (let i = 0; i < this.word.length; i ++) {
            if (this.word[i] === guess) {
                this.wordTemplate[i] = guess
                //this works, now need to append the updated wordTemplate to the screen
            }
        }
        //update the wordTemplate on the screen
        //console.log(this.wordTemplate)
        this.render(this.wordTemplate)
    },

    //create function to subtract point, and check to see if points is at 0, if at 0 then will call up the game over screen 
    deductPoints: function(points){
        points -= 1
        if (points === 0) {
            alert(`game Over No more points`)
        }
    },
    //create function to clear out an element - to then replace it
    empty: function(element) {
        //grab the children of that element as an array
        let children = Array.prototype.slice.call(element.childNodes)
        //remove each child
        children.forEach(function(child) {
            element.removeChild(child)
        })
    },
    //create function to update the actual screen
    render: function(arr) {
        //not sure if I need to redeclare display template
        const displayTemplate = document.querySelector('.displayTemplate')
        //empty it out, then append the array (which will be word template)
        this.empty(displayTemplate)
        displayTemplate.append(arr)
    }


}

//create an eListener to the start button:
// const startButton = document.querySelector('#startBtn')
addGlobalEventListener('click', '#startBtn', (e) => {
    e.preventDefault()
    const startButton = document.querySelector('#startBtn')
    gameState.alphaButtons()
    //pick the random word
    const randomWord = gameState.wordList[gameState.randomIndex()]
    gameState.word = randomWord.toUpperCase()
    console.log(randomWord)
    gameState.addTemplates(randomWord)
    displayTemplate.append(gameState.wordTemplate)
    //disable the button so can't click and generate more and more alphaButtons. Will need to add on at restart of game 
    startButton.disabled = true
    console.log(gameState)
})
//create functional event listener on the document to add to specified elements. 
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}


































































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
