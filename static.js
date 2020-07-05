// array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// all cards in game
const deck = document.getElementById("cardDeck");
deck.innerHTML = ""
let moves = 0;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

// variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// list
let starsList = document.querySelectorAll(".stars li");

// close icon
let closeicon = document.querySelector(".close");

// declaring modal
let modal = document.getElementById("popupOne")

// Game Start button
let startButton = document.getElementById('startBtn');
// array for opened cards
var openedCards = [];

// get dummy html for adding dynamic user 
var addPlayer = document.getElementById('dynamicPlayer');

// get dummy html for user rating display
var scores = document.getElementById('player');

// get element of select to get total user value 
let player = document.getElementById('totalPlayer');

// get game type example (3*4)
let gameType = document.getElementById('gameType');
//show at then end winner user
let winnerUser = document.getElementById('winnerUser');
// array's for user store and rating

let userScores = [0, 0, 0, 0];
let userRating = [0, 0, 0, 0];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;
};



// @description function to start a new play 
function startGame() {
    
    addPlayer.innerHTML = "";
    let player_score = scores.cloneNode(true);

    for (var i = 0; i < player.value; i++) {
        let player_score = scores.cloneNode(true);
        player_score.style.display = "block";
        player_score.setAttribute("id", "player_" + (i + 1));
        addPlayer.appendChild(document.createTextNode("Player " + (i + 1)));
        addPlayer.appendChild(document.createElement("BR"));
        addPlayer.appendChild(player_score);
        addPlayer.appendChild(document.createElement("BR"));
    }



    openedCards = [];

    // shuffle deck
    cards = cards.slice(0, gameType.value * 4);

    cards = shuffle(cards);
    // remove all exisiting classes from each card
    var count = 0;
    deck.innerHTML = "";
    for (var i = 0; i < gameType.value * 4; i++) {

        // append cards 
        deck.appendChild(cards[i]);
       
       // remove classes loading time 
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// @description toggles open and show class to display cards
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

var scoringIndex = 0;
// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;

    if (len === 2) {
        userRating[scoringIndex] += 1;
        congratulations();
        moveCounter();
        if (openedCards[0].type === openedCards[1].type) {
            matched();
            userScores[scoringIndex] += 10
// access each user by id and set values 
            document.getElementById('player_' + (scoringIndex + 1)).innerHTML = userScores[scoringIndex]
            scoringIndex++;
            if (scoringIndex == player.value) {
                scoringIndex = 0;
            }
        } else {
            unmatched();
            //user of index to track the user activity and save into array
            if (scoringIndex == player.value) {
                scoringIndex = 0;
            }
            scoringIndex++;

        }
    }

};


// cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}


// disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}


// enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}
// Add Event Listner on Start Button

startButton.addEventListener('click', function() {
    if(gameType.value >  0 && totalPlayer.value > 0){
    startGame();
    startTimer();
    startButton.classList.add('d-none');
    // loop to add event listeners to each card
    for (var i = 0; i < cards.length; i++) {
        card = cards[i];
        card.addEventListener("click", displayCard);

        card.addEventListener("click", cardOpen);
        card.addEventListener("click", congratulations);
    };
}
else{
    alert("Please Select Both Values First!");
}
});

function resetAgain() {
    clearInterval(interval);
    deck.innerHTML = ""
    addPlayer.innerHTML = ""
    clearInterval(interval);
    startButton.classList.remove('d-none')
}
// count player's moves
var ratingfinder = 0;

function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    // setting rates based on moves

    if (moves > 8 && moves < 16) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 17) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// game timer
var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {

        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


// congratulations msg and rating
function congratulations() {
    if (matchedCard.length == gameType.value * 4) {

        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");
        // get maximum number user from user array
        var maximumScoreUser = Math.max(...userScores);

        // find the maximum user from array
        var maximumUser = userScores.indexOf(maximumScoreUser);
        var displayUser = "";
        for (var i = 0; i < userScores.length; i++) {
            if (maximumScoreUser == userScores[i]) {  // user user in variable if more then one
                displayUser += "User " + (i + 1) + " , ";
            }

        }
        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        // display all winner user
        winnerUser.innerHTML = "Congratulations " + displayUser + "  Winner";
        //showing move, rating, time on modal


        document.getElementById("finalMove").innerHTML = moves;
       // set rating on the base of moves and numbers 
        document.getElementById("starRating").innerHTML = ((userRating[maximumUser] / (gameType.value * 4)) * 100) + "%";
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        // startGame();
    });
}


// for user to play Again 
function playAgain() {
    modal.classList.remove("show");
    // startGame();
    startButton.classList.remove('d-none')
}



//players