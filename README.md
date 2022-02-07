## Castaways - A version of Spaceships SEI
In this project One, we will be building Castaways, a game where a secret word is generated, once generated a coresponding amount of blank spaces to represent the letters in said word. The player then gets to make their play by choosing one letter out of the alphabet. If the letter is correct, it is then displayed in the placeholder word in it's respective spot. If the guess is incorrect, the player then loses a turn and the player loses an "item" and a point. The game is over either once the player guesses the word and still has points/items left, or the player has 0 items/points left and the word has not been correctly guessed.

The story for this game, is that the player has found themselves near the ocean, and have found an evil monster who keeps dumping pollution into the sea. You challenge the monster to a battle of wit, you choose your level, Easy, Medium, or Hard. The Monster will generate a random word, you then need to try to guess the word letter by letter. If you guess wrong too many times you will loose and the monster will dump more pollution in. If you win, You sucsessfully have stopped this monster..But there are lots of monsters. You can either rest and exit the game, or find another monster and play on.
Level of difficulty corresponds to amount of incorrect guesses allowed. Easy = 10, Med = 7, Hard = 5


### TECHNOLOGIES USED:
HTML/CSS
JAVASCRIPT / Vanilla js
The Main Title Screen is held at https://izztwiggy.github.io/project1-castaways/titlepage.html
Random Word Genertor API 
Merriam Webster Collegiate Dictionary API to grab teh definitions and filter the words

### User Stories:
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


as a user I want to move through different levels of play 
as a user I want it clearly and cleanly displayed the amount of points I have left
as a user I want it clearyly and cleanly displayed the level of difficulty I am on
as a user I want the option to change my level of diffivulty after each game
as a user I want to be able to exit to the home page at any point
as a user I want the option to collect lives and earn points through correct guesses
as a user I want to choose my avatar on the screen : STRETCH
as a user I want to have the option to play with a friend : STRETCH
as a user I want to choose the monster I see on the screen : STRETCH


There should be 3 levels of difficulty - the difficulty is the amount of incorrect guesses the user will get. Easy = 10 wrong guesses - 10 points/items
medium = 8 wrong guesses - 8 points/items
hard = 5 wrong guesses - 5 points/items
If the user guesses the word before losing all their points then they to get to get in their boat and leave. Before leaving they are given the chance to play another game, or escape the island and exit the game. This is where I would insert levels and leaving would take them on a journey to 5 other locations if they win.

Stretch Goals:
    -add in lives, best 2 / 3 wins the round, if you win the round you can up a level and continue on the story timeline. if you lose, the moster eats you
    -add Timed Play 
    -Add Double Player Version
    -Once the funtionality of the game has been completed, look at the color scheme, are you going to depressed manic work to get out of the situations or are you going for a juxtapostion of cheerful light summer island colors? Deep and dark or light and cheery?
    -Add some audio! For each incorrect guess, make a BUZZ, correct, add a ding!
    -At the end of the game - display the word definition 
    -Hints! Everyone loves a good hint now and again, add an optional hint button. (they only get one per game! *maybe 2 if you're feeling generous)
    -Let player Choose their monster image
    -Levels: Take user on story timeline, with each new level = new background 

Steps to create game: 
Part One is functionality
Part Two is design 

Part 1----------------------------------------------------------------------
Step 1 =
In your js file:
    -create list of 10 words in array and assign it to the variable of wordsList
    -then create a random number generator from 0 to the length of random word array -1
    -then use the random generator to randomly select a word from the array
    -have user enter an inputed guess with prompt, change their answer to lowercase to match with the wordsList case
    -write simple checker to see if the guessed letter is in the random word
    -create a placeholder array to display the placeholders for each character of the random word, it should be the same length as the word.
    -Have user input a guess, loop through each position in the chosen word, if the letter matches the guess, change the placeholder in the display array to match the letter in the correct position 
    -continually ask for guesses until the full word has been guessed
        -use a while loop to iniate the guess


Step 2 = Great you made game work in the console! Now get that game State working. :)
2.a Create a gameState Object to hold the main components of the game
    -the word list
    -the template arrays (guess and placeholders)
    - the random index generator
    -the alphabet button creator 
    
2.b Add listener to buttons to generate the alphabet buttons and to add listeners to the buttons
    -click a letter, add to guess History array
    -check to see if the letter is in the word
        if guess is in word, update the template
            -turn the button green
        if guess is not in word, deduct a point
            -turn the button red

Step 3 = add winning/losing conditionals
    -create levels of difficulty, that will represent your starting points
    -Each point represents an incorrect guess, the total you have is the total of incorrect guesses you are allotted per game
    -utilize game points
        if points = 0, then you lose
        if you guess all the letters in word then you win: aka when template doesnt have "_" in it

Step 4. Add the Dictionary API to get lists of words to use for random word
    -update the list and generate random words from that list
    -Ended up using a different API than the Merriam Webster, but it included not great words/words I would never ever want to see or have included. So I found and used a list of bad words on gitHub https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/blob/master/en and added them to block words that matched. So I am very sorry that the words are on my page at all!

Step 5. Create Pages & Score Modal:
    -Game Info Screen 
    -Game Levels Modal 
    -Winning Screen : has take me home button, has replay button: reset and bring to game state with (potentially keeping level as last game)
    -Losing Screen : has take me home button, has replay button: reset and bring to game state with (potentially keeping level as the last game)

    -Title page, click single player, takes you to game info page, =>

    -Game info page, click the I accept challenge button, => takes you to the game state with Levels Modal OPEN
    -Levels Modal: hit any of the levels buttons (E/M/H) => closes the modal
    
    - from gamepage: 
        levels button => opens level modal 
        home button => game Info (becuase here we will change game stuff (fun))
    - game info:
        play button => gamepage: generates alpha buttons
        exit button => title page
        change info button => changes variables in game ** to be added **
    - title page:
        single player => game info
        double player => doubleplay game info (will be stretch goal to add)
    - winningScreen:
        replay=> gamepage & resets game: generates alpha buttons
        home => gameInfo
    -losing page:
        replay => gamepage and resets game: generates alpha buttons
        home => gameInfo

Step 6, create a visual of action on the screen, an image coming on and off

UNSOLVED / MAJOR HURDLES
--
It came to a point of running out of time, It took me longer than expected to complete the basic js and found a bug the first time around so I rewrote, and I probably truly needed one more day. I was not able / did not give myself enough time to get the images to display on the screen and refresh and reset after each round. Once tried to impliement them I noticed that the aliens now dont show up on the pages, but there were aliens that showed up for each round. 
I also had an issue when the 1st api returns a word that is offensive (I believe this to be the issue) and the 2nd API throws an issue since it blocks for that. That is what I think is happening and that too I need to spend more time investigating.
CSS, I needed longer than I gave myself to style the body of the work. (As in starting css when I started the js too). 
