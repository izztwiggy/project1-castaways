class Monsters {
    constructor(id, name, imageSrc){
        this.id = id;
        this.name = name;
        this.imageSrc = imageSrc

    }
}

const monsterAvatars = [new Monsters(0,'Stonepest','/alienmonster.png'), new Monsters(1,'Grimebrute','/bluealien.png'), new Monsters(2,'Rotsnare','./fluffy_green_monster.png'), new Monsters(3,'SlimeStank','./slimeMonster.png'), new Monsters(4,'Moldspawn','./moldyMonster.png'), new Monsters(5,'FickleCreep','./gloweyEyesMonster.png'), new Monsters(6,'Grave Screamer','./Mythology-Transparent.png')]

class Pollution {
    constructor(id, item, imageSrc) {
        this.id = id;
        this.item = item;
        this.imageSrc = imageSrc;
    }
}

const toxicWaste = [new Pollution(1 , 'cans', './cans-2678363.png'), new Pollution(2 , 'plastic bottle', './croppedplastic.png'), new Pollution(3 , 'pile of garbage', './garbage-4280112_1920.png'), new Pollution(4 , 'toxic waste', './nuclear-2134408_1920.jpg'), new Pollution(5 , 'oil Spilled in water', './oil-2389128_1920.jpg'), new Pollution( 6, 'plastic water bottles', './plastic-gedcdf433b_1280.png')]


class Levels {
    constructor(difficulty, lives, wrongGuesses, pointsPerWin){
        this.difficulty = difficulty;
        this.lives = lives;
        this.wrongGuesses = wrongGuesses;
        this.pointsPerWin = pointsPerWin;
    }
}

const playLevel = [new Levels('easy', 4, 10, 2), new Levels('medium', 4, 7, 3), new Levels('hard', 4, 5, 4)]

class Player {
    constructor(name, lifeLeft, totalPoints) {
        this.name = name;
        this.lifeLeft = lifeLeft;
        this.totalPoints = totalPoints;
    }
}
