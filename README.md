Castaways - A version of Spaceships SEI
In this project One, we will be building Castaways, a game where a secret word is generated, once generated a coresponding amount of blank spaces to represent the letters in said word. The player then gets to make their play by choosing one letter out of the alphabet. If the letter is correct, it is then displayed in the placeholder word in it's respective spot. If the guess is incorrect, the player then loses a turn and the player loses an "item" and a point. The game is over either once the player guesses the word and still has points/items left, or the player has 0 items/points left and the word has not been correctly guessed. 

For the game, the story is, The player was on a plane that crashed, once they woke up they were stranded on an island with survival items, a boat, and a monster. The monster wants to eat the player, but wants to play a game first. So the monster challenges the player to play castaways, if the player can guess the word via the rules in above paragraph, the player will win, and the moster will let the player get into the boat and sail away. If the player runs out of guesses before guessing the word, then the player will lose and has to stay on the island. The player should have the option to challenge the moster to another game where a game will be restarted, or to exit the game. 

There should be 3 levels of difficulty - the difficulty is the amount of incorrect guesses the user will get. Easy = 10 wrong guesses - 10 points/items
medium = 8 wrong guesses - 8 points/items
hard = 6 wrong guesses - 6 points/items
If the user can guess the word prior to losing all their points then they will be awarded with another life. And the chance to play another game, or escape the island and exit the game.


User Stories:
MVP:
as a user I want to have a page to enter the game
as a user I want to clearly see the instructions
as a user I want to enter my name and have it be displayed on the page
as a user I want to choose my level of difficulty
as a user I want to be able to press a button to display placeholders for letters in a word
as a user I want to know what letter I have guessed 
as a user I want to know if my guess was correct by having the placeholder replaced by the letter
as a user I want to know how many remaining guesses I have left
as a user I want to chose to play another game or leave 
as a user I want to have a score created and updated for each win that I incur
as a user I want to be able to see that score if I leave the page then come back later
as a user I want to see a definition for the word that was generated after the fact if wanted
as a user I want to choose the monster I see on the screen 
as a user I want to choose my avatar on the screen
as a user I want to move through different levels of play 
as a user I want it clearly and cleanly displayed the amount of points I have left
as a user I want it clearyly and cleanly displayed the level of difficulty I am on
as a user I want the option to change my level of diffivulty after each game
as a user I want to be able to exit to the home page at any point
as a user I want to have the option to play with a friend 
as a user I want the option to collect lives and earn points through correct guesses
Wonderful! You thought through the game peices! 
You completed the hardest part! Great job, now the fun stuff, the toppings as they say. 

 ** You are doing a great job! You are awesome! You got this! ** 

Once the funtionality of the game has been completed, look at the color scheme, are you going to depressed manic work to get out of the situations or are you going for a juxtapostion of cheerful light summer island colors? Deep and dark or light and cheery?
//Add some audio! For each incorrect guess, make a BUZZ, correct, add a ding!
Add a link embedded to the words definition
Hints! Everyone loves a good hint now and again, add an optional hint button. (they only get one per game! *maybe 2 if you're feeling generous)

Steps to create game: 
In your js file:
Step.1a =
-create list of 10 words in array and assign it to the variable of wordsList
-then create a random number generator from 0 to the length of random word array -1
-then use the random generator to randomly select a word from the array
-have user enter an inputed guess with prompt, change their answer to lowercase to match with the wordsList case
-write simple checker to see if the guessed letter is in the random word
-create a placeholder array to display the placeholders for each character of the random word, it should be the same length as the word.
-Have user input a guess, loop through each position in the chosen word, if the letter matches the guess, change the placeholder in the display array to match the letter in the correct position 

Step 1.b
continually ask for guesses until the full word has been guessed
use a while loop to iniate the guess

Step 2 = Great you made game work in the console! Now get that game State working. :)
2.a Create a gameState Object to hold the main components of the game
    -the word list
    -the template arrays (guess and placeholders)
    - the random index generator
    -the alphabet button creator 
2.b Create global event listener template to use less stack space :

--------------------------------------------------------------
//going to use event delegation to set a global scope listener on the document itself, since the document is really always listening, if type is equal to the event and e.target matches the selector, then will add the callback to run, in anticipation of potential added elements and attempting to keep everything in the gameState relevant to eachother AND using less stack space, I will use this one named function. WebDevSimplified went over this, and this makes sense to use as I transfer my game from OOP and console based to DOM/state based. Just be aware to put the actual css selector in selector NOT a var name

function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}
 --------------------------------------------------------------- 

2.c Add listener to buttons to generate the alphabet buttons and to add listeners to the buttons

step 3 = get base functional game working in state
