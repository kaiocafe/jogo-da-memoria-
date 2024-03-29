let game = {

    lockMode: false,
    firstCard:null,
    secondCard:null,


    setCard: function (id) {
      
        
        let card = this.cards.filter(card=>card.id===id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (!this.firstCard) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }
        else{
            this.secondCard = card
            this.lockMode = true
            this.secondCard.flipped = true
            return true
        }
    },

    checkMatch: function () {
        if(!this.firstCard || !this.secondCard){
            return false
        }
    
      return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },


    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver(){
        return this.cards.filter(card=>!card.flipped).length == 0
    },


    techs: ['astronaut',
        'black-hole',
        'outer-space',
        'planet-earth',
        'rocket-ship',
        'satelite',
        'saturn',
        'science-fiction',
        'telescope',
        'ufo'],

    cards: null,


    createCardFromTechs: function () {

        this.card = []

        this.techs.forEach((tech) => {
            this.card.push(this.createPairFromTech(tech))
        })

        this.cards = this.card.flatMap(pair => pair);
        this.shuffleCards()
        return this.cards

    },

    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]

    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },



    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }

    }


}