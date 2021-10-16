const data = [
    {
        name: "rabbit",
        imagePath: "https://img.icons8.com/emoji/96/000000/rabbit-face-emoji.png"
    },
    {
        name: 'mickey',
        imagePath: "https://img.icons8.com/clouds/100/000000/animation.png"
    },

    {
        name: 'mickey',
        imagePath: "https://img.icons8.com/clouds/100/000000/animation.png"
    },
    
    {
        name: "rabbit",
        imagePath: "https://img.icons8.com/emoji/96/000000/rabbit-face-emoji.png"
    },
    
    {
        name: 'disney',
        imagePath: "https://img.icons8.com/color/96/000000/disney-logo.png"
    },

    {
        name: 'superMario',
        imagePath: "https://img.icons8.com/office/80/000000/super-mario.png"
    },
    
    {
        name: 'popeye',
        imagePath: "https://img.icons8.com/office/80/000000/popeye.png"
    },

    {
        name: 'cheburashka',
        imagePath: "https://img.icons8.com/office/80/000000/cheburashka.png"
    },

    {
        name: 'superMario',
        imagePath: "https://img.icons8.com/office/80/000000/super-mario.png"
    },

    {
        name: 'popeye',
        imagePath: "https://img.icons8.com/office/80/000000/popeye.png"
    },

    {
        name: 'disney',
        imagePath: "https://img.icons8.com/color/96/000000/disney-logo.png"
    },

    {
        name: 'cheburashka',
        imagePath: "https://img.icons8.com/office/80/000000/cheburashka.png"
    }
]

class MemoryGame {
    constructor() {
        this.rows = 4;
        this.columns = 4;
        this.data = data;
        this.init();
        this.attachButtonClickHandler()
    }

    init() {
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlipped = false;
        this.moves = 0;
        this.noOfMatches = 0;
    }

    render() {
        this.shuffle();
        this.createCardGrid();
    }

    attachButtonClickHandler() {
        let buttonElm = document.getElementById('reset');
        buttonElm.addEventListener('click', () => {
            this.reset()
        })
    }

    reset() {
        this.init();
        this.updateMatches(0);
        this.updateMoves(0);
        this.render();
    }

    displayCard(cardElm) {
        cardElm.classList.add('vjs__card-flipped')
        this.moves++;
        this.updateMoves(this.moves);

        if (!this.hasFlipped) {
            this.firstCard = cardElm;
            this.hasFlipped = true;
            return;
        } 

        this.secondCard = cardElm;
        this.checkForMatch();
    }

    checkForMatch() {
        if (this.firstCard.getAttribute('data-name') === this.secondCard.getAttribute('data-name')) {
            this.noOfMatches++;
            this.updateMatches(this.noOfMatches);

            setTimeout(() => {
                this.firstCard.classList.add('vjs__card-disabled');
                this.secondCard.classList.add('vjs__card-disabled');
            }, 1000)
            
        } else {
            setTimeout(() => {
                this.firstCard.classList.remove('vjs__card-flipped');
                this.secondCard.classList.remove('vjs__card-flipped');
            }, 1000)
        }

        this.hasFlipped = false;
    }

    updateMoves(moves) {
        let movesElm = document.getElementById('moves');
        movesElm.innerText = moves;
    }

    updateMatches(noOfMatches) {
        let matchesElm = document.getElementById('matches');
        matchesElm.innerText = noOfMatches;
    }

    createCard(card) {
        let cardElm = document.createElement('div');
        cardElm.setAttribute('data-name', card.name);
        cardElm.classList.add('vjs__card');

        let frontFaceElm = document.createElement('div');
        frontFaceElm.classList.add('vjs__card__front');
        cardElm.appendChild(frontFaceElm);

        let backFaceElm = document.createElement('img');
        backFaceElm.classList.add('vjs__card__back');
        backFaceElm.src = card.imagePath;
        cardElm.appendChild(backFaceElm);

        cardElm.addEventListener('click', () => {
            this.displayCard(cardElm);
        })
        return cardElm;
    }

    createCardGrid() {
        let mainContainerElm = document.getElementById('vjs__game__caontainer');
        mainContainerElm.innerHTML = null;
        let cardContainerElm = document.createElement('div');
        cardContainerElm.classList.add('vjs__card__container');

        for (let i=0; i<this.data.length; i++) {
            let cardElm = this.createCard(data[i]);
            cardContainerElm.appendChild(cardElm);
        }

        
        mainContainerElm.appendChild(cardContainerElm);
    }

    shuffle() {
        for (let i=this.data.length-1; i>-1; i--) {
            let randomNumber = Math.floor(Math.random() * this.data.length);
            let temp = this.data[i];
            this.data[i] = this.data[randomNumber];
            this.data[randomNumber] = temp;
        }
    }
}

let game = new MemoryGame();
game.render();