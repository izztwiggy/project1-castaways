//Step 1
//starting off, will have a list of 10 words in array and assign it to the variable of wordsList
const wordList = ["migration", "background", "sentiment", "tiger", "bang", "wash", "meaning", "brainstorm", "expectation", "question", "apple"]
//console.log(wordList.length)
//then create a random number generator from 0 to the length of random word array -1 (OR use floor method to bring everything down to lower int an increment)
const randomIndex = Math.floor(Math.random() * wordList.length)
//console.log(randomIndex)
//then use the random generator to randomly select a word from the array
const randomWord = wordList[randomIndex]
//console.log(chosenWord) to give yourself a sanity check 
console.log(`The word is ${randomWord}`)


//have user enter an inputed guess with input form
//  const guess = prompt('To make a guess, Enter a Letter here:').toLocaleLowerCase()
//change their answer to lowercaset to match with the wordsList case

//write simple checker, for letter in chosen random word, if the guess is equal to that iterated letter, return true. Otherwise return false. In this loop return a print true + letter, or false + letter to view 
// console.log(`guess was: ${guess}`)
// for(letter of randomWord) {
//     if (letter === guess) {
//         console.log(`true ${letter}`)
//     } else {
//         console.log(`false ${letter}`)
//     }
// }


//step 2 create blank placeholders array for the letters in chosenWord to display placeholders for each letter in randomWord

//create a display list placeholder
const placeHolder = []
//loop through the word and for each letter, append a _ to the placeholder array
for (let i = 0; i < randomWord.length; i++) {
    placeHolder.push("_")
}
//console.log(placeHolder)
//have the user input a guess
//loop through each position in the chosen word, if the letter matches the guess, the array element is now equal to the guess
const guess = prompt('To make a guess, Enter a Letter here:').toLocaleLowerCase()
for(let i = 0; i < randomWord.length; i ++) {
    if(randomWord[i] == guess) {
        console.log(randomWord[i] ,guess,'true', i)
        placeHolder[i] = guess
    } else {
        console.log(randomWord[i], guess,'false', i)
    }
}
console.log(placeHolder)


//step 3, ask for guesses until the word is populated on the screen 
//use while loop. While there are _blanks left in the array, continue to prompt the user for a guess
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
//mulitplayers can have option to add timer to guesses
