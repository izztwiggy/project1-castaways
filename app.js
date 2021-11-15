//Now that you have the basics of oop game, need to be able to add a gameState, so lets make an object to hold said Game
const letterDiv = document.querySelector('.letters')
const displayTemplate = document.querySelector('.displayTemplate')
const displayPoints = document.querySelector('#pointsSpan')
const gameInfoDiv = document.querySelector('#gameInfo')
const levelsSelection = document.querySelector('#levelsModal')
const openInfo = document.querySelector('#openInfo')

const gameState = {
    word: [],
    wordTemplate: [],
    letterGuesses: [],
    easy: 10,
    medium: 7,
    hard: 5,
    points: 0,
    removeCommas: function(){
        displayTemplate.append(this.wordTemplate.join(' '))
    },
    // randomIndex: function(){
    //     return Math.floor(Math.random() * this.wordList.length)
    //},
    alphaButtons: function(){
        //create the alphabet letter Buttons
        for(let i = 65; i <= 90; i ++) {
            const letter = String.fromCharCode(i)
            const letterButtons = document.createElement('button')
            letterButtons.classList.add('letterBtn')
            letterButtons.setAttribute('value', letter)
            letterButtons.innerText = letter
            letterDiv.append(letterButtons)
        }
        //add the event listener to the letter buttons
        addGlobalEventListener('click', '.letterBtn', (e) => {
            e.preventDefault()
            e.stopPropagation()
            //add the points to the screen
            //this.render(this.points, displayPoints)     : commented this out as I don;t need this, I am satisfying this in the levels button and the update points function 
            //guess is the letterBtns value
            const guess = e.target.value
            console.log(guess)
            //update the guessed List and redisplay on the screen: will take this out later
            this.letterGuesses.push(guess)
            document.querySelector('#displayGuesses').append(guess)
            //check the word to see if includes guess
            if (this.word.includes(guess)) {
                console.log('true')
                this.updateWordTemplate(guess)
                if (this.wordTemplate.includes("_") === false) {
                    this.wonGame()
                    //insert you have won the game modal here
                }
            } else {
                this.points -= 1
                this.render(this.points, displayPoints)
                this.checkPoints(this.points)
            }
            e.target.disabled = true
        })
    },
    //function to create the blanks on the screen = to characters in word
    addTemplates: function() {
        for(let i = 0; i < this.word.length; i ++) {
            this.wordTemplate.push('_')
        }
    },
    //function to check position of guess in the word, and updates the wordTemplate
    updateWordTemplate: function(guess) {
        //check which index has the letter and update the word template to reflect
        for (let i = 0; i < this.word.length; i ++) {
            if (this.word[i] === guess) {
                this.wordTemplate[i] = guess
            }
        }
        //update the wordTemplate on the screen, needed to do without the commas so instead of render, used empty and commas
        this.empty(displayTemplate)
        this.removeCommas()
    },
    //function to check to see if points is at 0, if at 0 then will call up the game over screen 
    checkPoints: function(points) {
        if(points === 0) {
            console.log(`You lost the game`)
            this.empty(displayPoints)
            this.empty(letterDiv)
            // //bring the You lost modal to the screen
            this.lostGame()
        }
    },
    //function to clear out an element
    empty: function(element) {
        //grab the children of that element as an array
        let children = Array.prototype.slice.call(element.childNodes)
        //remove each child
        children.forEach(function(child) {
            element.removeChild(child)
        })
    },
    //create function to update the actual screen
    render: function(arr, element) {
        //empty it out the element, then append the array to said element
        this.empty(element)
        element.append(arr)
    },
    lostGame: function(){
        alert('You lost')
    },
    wonGame: function() {
        alert('You won')
    }
}
//create an eListener to the start button to generate the buttons (this will be in the modal pop up)
addGlobalEventListener('click', '#startBtn', (e) => {
    e.preventDefault()
    const startButton = document.querySelector('#startBtn')
    gameState.alphaButtons()
    //disable the button so can't click and generate more and more alphaButtons. Will need to add on at restart of game 
        //can take off disbaled as will be on a screen will only access at the start of the game 
    //startButton.disabled = true
    gameInfoDiv.style.display = 'none'
    console.log(gameState)
})
//add e listener to the button to open the game info will switch this button out to be the button from the title page
addGlobalEventListener('click', '#singlePlayBtn', (e) => {
    e.preventDefault()
    console.log(e.target)
    const container = document.querySelector('.container')
    //container.style.display = 'none'
    //console.log(gameState.hard)
}) 
//add listner to the level buttons, will be contained in a modal, click on the level it will take you back to game play
addGlobalEventListener('click', '.levelsBtn', (e) => {
    e.preventDefault()
    levelButton = document.querySelectorAll('.levelsBtn')
    console.log(levelButton)
    console.log('clicked', e.target.value)
    const level = e.target.value
    for (key in gameState) {
        if (level === key) {
           gameState.points = gameState[key]
           console.log(gameState)
           displayPoints.append(gameState.points)
        }
    }
    
    //now fetch the random word api and set the word when you click down here:
    fetch("https://random-word-api.herokuapp.com/word?number=1000&swear=0")
        .then(res=> res.json())
        .then(jsonData => {

            const randomNuber = Math.floor(Math.random() * jsonData.length)
            let randomJson = jsonData[randomNuber]
            console.log(randomJson)
            //check for bad words
            for (let i = 0; i < blockedWords.length; i ++) {
                if (randomJson === blockedWords[i] || randomJson.includes(blockedWords[i])) {
                    randomJson = jsonData[randomNuber]
                }
            }
            gameState.word = randomJson.toUpperCase()
            gameState.addTemplates(randomJson)
            gameState.removeCommas()
            //console.log(jsonData)
        })
        .catch(err => {
            console.log('something went wrong', err)
        })
        e.target.disabled = true
})

//create functional event listener on the document to add to specified elements. 
function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, (e) => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}






















const blockedWords = [
    'acrotomophilia','alabama hot pocket', 'alaskan pipeline', 'anal','anilingus', 'anus', 'apeshit', 'arsehole', 'ass','asshole', 'assmunch','auto erotic','autoerotic', 'babeland', 'baby batter', 'baby juice','ball gag', 'ball gravy','ball kicking', 'ball licking', 'ball sack', 'ball sucking', 'bangbros', 'bangbus', 'bareback','barely legal', 'barenaked','bastard','bastardo','bastinado','bbw','bdsm', 'beaner', 'beaners', 'beaver cleaver', 'beaver lips','beastiality','bestiality','big black','big breasts','big knockers', 'big tits','bimbos', 'birdlock', 'bitch','bitches', 'black cock', 'blonde action', 'blonde on blonde action',  'blowjob', 'blow job',  'blow your load',  'blue waffle',  'blumpkin',   'bollocks',  'bondage',  'boner',  'boob',   'boobs',  'booty call',  'brown showers',   'brunette action',  'bukkake',   'bulldyke',  'bullet vibe',  'bullshit',   'bung hole', 'bunghole', 'busty',  'butt',  'buttcheeks',  'butthole',  'camel toe',  'camgirl',  'camslut',  'camwhore',  'carpet muncher',  'carpetmuncher',   'chocolate rosebuds',  'cialis',  'circlejerk',  'cleveland steamer', 'clit',  'clitoris',  'clover clamps', 'clusterfuck','cock',   'cocks',  'coprolagnia',  'coprophilia',  'cornhole',  'coon',  'coons',  'creampie',  'cum',  'cumming',  'cumshot',  'cumshots',  'cunnilingus', 'cunt', 'darkie', 'date rape', 'daterape',  'deep throat', 'deepthroat',  'dendrophilia',  'dick', 'dildo', 'dingleberry', 'dingleberries', 'dirty pillows', 'dirty sanchez', 'doggie style',  'doggiestyle',  'doggy style',  'doggystyle',  'dog style', 'dolcett',  'domination',  'dominatrix', 'dommes', 'donkey punch', 'double dong', 'double penetration', 'dp action', 'dry hump',  'dvda', 'eat my ass',  'ecchi',  'ejaculation',  'erotic', 'erotism', 'escort', 'eunuch', 'fag',  'faggot',  'fecal', 'felch',  'fellatio', 'feltch',  'female squirting',  'femdom',  'figging', 'fingerbang',  'fingering',  'fisting',  'foot fetish',  'footjob',  'frotting', 'fuck',  'fuck buttons',  'fuckin',  'fucking', 'fucktards', 'fudge packer',  'fudgepacker',  'futanari', 'gangbang', 'gang bang', 'gay sex',  'genital','giant cock',  'girl on',  'girl on top', 'girls gone wild', 'goatcx',  'goatse',   'god damn', 'gokkun',  'golden shower', 'goodpoop',  'goo girl', 'goregasm',  'grope','group sex', 'g-spot', 'guro',  'hand job', 'handjob',  'hard core',  'hardcore', 'hentai', 'homoerotic','homicide', 'honkey', 'hooker',  'horny', 'hot carl',  'hot chick',  'how to kill',  'how to murder', 'huge fat', 'humping', 'incest',  'intercourse',  'jack off',  'jail bait',   'jailbait', 'jelly donut',  'jerk off',  'jigaboo',  'jiggaboo','jiggerboo',   'jizz',   'juggs',   'kike',   'kinbaku',  'kinkster',  'kinky',  'knobbing', 'leather restraint', 'leather straight jacket', 'lemon party',  'livesex','lolita', 'lovemaking', 'make me come',  'male squirting','masturbate', 'masturbating', 'masturbation','menage a trois','milf', 'missionary position','mong','motherfucker','mound of venus', 'mr hands','muff diver', 'muffdiving', 'nambla', 'nawashi', 'nig','nimphomania','nipple','nipples','nsfw','nsfw images','nude','nudity','nutten','nympho','nymphomania','octopussy', 'omorashi','one cup two girls','one guy one jar','orgasm','orgy','paedophile','paki','panties','panty','pedobear','pedophile','pegging', 'penis', 'phone sex','piece of shit','pikey','pissing','piss pig','pisspig','playboy','pleasure chest','ponyplay','poof','poon','poontang','punany','poop chute','poopchute', 'porn','porno','pornography','prince albert piercing','pthc', 'pubes', 'pussy', 'queaf', 'queef', 'quim','raghead', 'raging boner','rape','raping','rapist', 'rectum', 'reverse cowgirl','rimjob', 'rimming', 'rosy palm', 'rosy palm and her 5 sisters', 'rusty trombone','sadism','santorum','scat','schlong', 'scissoring', 'semen', 'sex', 'sexcam', 'sexo', 'sexy', 'sexual', 'sexually','sexuality','shaved beaver','shaved pussy', 'shemale','shibari', 'shit','shitblimp', 'shitty','shota','shrimping','skeet','slanteye','slut','s&m','smut','snatch','snowballing','sodomize','sodomy','spastic', 'spic','splooge','splooge moose',   'spooge', 'spread legs', 'spunk', 'strap on', 'strapon','strappado',   'strip club', 'style doggy', 'suck',  'sucks', 'suicide girls', 'sultry women',  'swastika','swinger',  'tainted love',  'taste my', 'tea bagging', 'threesome', 'throating', 'thumbzilla', 'tight',  'white',  'tit',  'tits',  'titties','titty', 'tongue', 'topless', 'tosser','towelhead', 'tranny','tribadism', 'tub girl','tubgirl','tushy', 'twat','twink','twinkie','two girls one cup','undressing','upskirt', 'urethra play', 'urophilia','vagina','venus mound', 'viagra', 'vibrator','violet wand', 'vorarephilia','voyeur','voyeurweb','voyuer','vulva','wank','wetback','wet dream','white power','whore','worldsex','wrapping men','wrinkled starfish','xx','xxx','yaoi','yellow showers','yiffy','zoophilia']





























































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
