// Memory Game in JavaScript

const cardsArray = ["🍎", "🍌", "🍇", "🍉", "🍋", "🍓", "🍑", "🍒"];
let gameBoard = document.getElementById("game-board");
let statusDisplay = document.getElementById("status");
let cardElements = [];
let flippedCards = [];
let matchedCards = [];

// Duplicate and shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Create the game board
function createBoard() {
  let shuffledCards = shuffle([...cardsArray, ...cardsArray]); // Duplicate and shuffle cards
  gameBoard.innerHTML = "";

  shuffledCards.forEach((card, index) => {
    let cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-card", card);
    cardElement.setAttribute("data-index", index);

    let innerElement = document.createElement("div");
    innerElement.classList.add("inner");
    innerElement.innerHTML = card;

    cardElement.appendChild(innerElement);
    cardElement.addEventListener("click", handleCardClick);

    gameBoard.appendChild(cardElement);
    cardElements.push(cardElement);
  });
}

// Handle card click event
function handleCardClick(event) {
  let clickedCard = event.target;
  let cardValue = clickedCard.getAttribute("data-card");

  // Flip the card
  if (flippedCards.length < 2 && !clickedCard.classList.contains("flipped")) {
    clickedCard.classList.add("flipped");
    flippedCards.push(clickedCard);
  }

  // Check for a match
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("data-card") ===
      flippedCards[1].getAttribute("data-card")
    ) {
      flippedCards.forEach((card) => card.classList.add("matched"));
      matchedCards.push(...flippedCards);
      flippedCards = [];
      checkWin();
    } else {
      setTimeout(() => {
        flippedCards.forEach((card) => card.classList.remove("flipped"));
        flippedCards = [];
      }, 1000);
    }
  }
}

// Check for win condition
function checkWin() {
  if (matchedCards.length === cardElements.length) {
    statusDisplay.innerHTML = "Congratulations! You've matched all the cards!";
  }
}

// Initialize the game
function initGame() {
  cardElements = [];
  flippedCards = [];
  matchedCards = [];
  statusDisplay.innerHTML = "";
  createBoard();
}

// Start the game
initGame();
