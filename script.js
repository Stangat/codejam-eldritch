const ancients = document.querySelector(".cards-container");
const azathoth = document.querySelector(".azathoth");
const cthulthu = document.querySelector(".cthulthu");
const logSothoth = document.querySelector(".logSothoth");
const shubNiggurath = document.querySelector(".shubNiggurath");

const difficultyLevels = document.querySelector(".difficulty-container");
const superEasyLevel = difficultyLevels.children[0];
const easyLevel = difficultyLevels.children[1];
const basicLevel = difficultyLevels.children[2];
const highLevel = difficultyLevels.children[3];
const superHighLevel = difficultyLevels.children[4];

const shuffleButton = document.querySelector(".shuffle-deck");
const deckContainer = document.querySelector(".deck-container");
const deckButton = document.querySelector(".deck");
const currentCard = document.querySelector(".last-card");

const stageOne = document.querySelector(".stage-one");
const stageTwo = document.querySelector(".stage-two");
const stageThree = document.querySelector(".stage-three");

let greenCardOne;
let greenCardTwo;
let greenCardThree;

let blueCardOne;
let blueCardTwo;

let brownCardOne;
let brownCardTwo;
let brownCardThree;
let brownCardFour;

let miniDeckOfCardsFirstStage = [];
let miniDeckOfCardsSecondStage = [];
let miniDeckOfCardsThirdStage = [];
let totalDeck = [];

let displayingCard;

import ancientsData from "./data/ancients.js";
import cardsDataGreen from "./data/mythicCards/green/index.js";
import cardsDataBlue from "./data/mythicCards/blue/index.js";
import cardsDataBrown from "./data/mythicCards/brown/index.js";

//middle level

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCard(source, min, max) {
  const randomNumber = getRandomNumber(min, max);
  const indexOfCard = source.indexOf(source[randomNumber]);
  let arrayCard = source.splice(indexOfCard, 1);
  return arrayCard[0];
}

function makeVisible(element) {
  element.classList.remove("hidden");
}

function makeInvisible(element) {
  element.classList.add("hidden");
}

function makeActive(element) {
  element.classList.add("active");
}

function addCardToMiniDeck(cardType, source, min, max, miniDeck) {
  cardType = pickCard(source, min, max);
  miniDeck.push(cardType);
}

function addNumbersInDots(stage, green, brown, blue) {
  stage.children[0].innerHTML = green;
  stage.children[1].innerHTML = brown;
  stage.children[2].innerHTML = blue;
}

function showCard() {
  if (totalDeck.length > 0) {
    displayingCard = totalDeck.pop();
    let displayingCardId = displayingCard.id;
    console.log(displayingCard);
    currentCard.style.backgroundImage = `url(/assets/MythicCards/${displayingCardId}.png)`;
    currentCard.style.backgroundSize = "cover";
  } else {
    makeInvisible(deckButton);
  }
}

function decreaseNumbersInDots(stage, number) {
  let decreasedNumber = stage.children[number].innerHTML - 1;
  stage.children[number].innerHTML = decreasedNumber;
}

function checkColorOfCard() {
  if (displayingCard.color === "green" && stageOne.children[0].innerHTML > 0) {
    decreaseNumbersInDots(stageOne, 0);
  } else if (
    displayingCard.color === "brown" &&
    stageOne.children[1].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageOne, 1);
  } else if (
    displayingCard.color === "blue" &&
    stageOne.children[2].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageOne, 2);
  } else if (
    displayingCard.color === "green" &&
    stageTwo.children[0].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageTwo, 0);
  } else if (
    displayingCard.color === "brown" &&
    stageTwo.children[1].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageTwo, 1);
  } else if (
    displayingCard.color === "blue" &&
    stageTwo.children[2].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageTwo, 2);
  } else if (
    displayingCard.color === "green" &&
    stageThree.children[0].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageThree, 0);
  } else if (
    displayingCard.color === "brown" &&
    stageThree.children[1].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageThree, 1);
  } else if (
    displayingCard.color === "blue" &&
    stageThree.children[2].innerHTML > 0
  ) {
    decreaseNumbersInDots(stageThree, 2);
  }
}

azathoth.addEventListener("click", () => {
  makeVisible(difficultyLevels);
  addNumbersInDots(stageOne, 1, 2, 1);
  addNumbersInDots(stageTwo, 2, 3, 1);
  addNumbersInDots(stageThree, 2, 4, 0);
});

basicLevel.addEventListener("click", () => {
  makeVisible(shuffleButton);
  makeActive(basicLevel);
});

shuffleButton.addEventListener("click", () => {
  makeInvisible(shuffleButton);
  makeVisible(deckContainer);
  addCardToMiniDeck(greenCardOne, cardsDataGreen, 0, 17, miniDeckOfCardsFirstStage);
  addCardToMiniDeck(brownCardOne, cardsDataBrown, 0, 20, miniDeckOfCardsFirstStage);
  addCardToMiniDeck(brownCardTwo, cardsDataBrown, 0, 19, miniDeckOfCardsFirstStage);
  addCardToMiniDeck(blueCardOne, cardsDataBlue, 0, 11, miniDeckOfCardsFirstStage);

  addCardToMiniDeck(greenCardOne, cardsDataGreen, 0, 16, miniDeckOfCardsSecondStage);
  addCardToMiniDeck(greenCardTwo, cardsDataGreen, 0, 15, miniDeckOfCardsSecondStage);
  addCardToMiniDeck(brownCardOne, cardsDataBrown, 0, 18, miniDeckOfCardsSecondStage);
  addCardToMiniDeck(brownCardTwo, cardsDataBrown, 0, 17, miniDeckOfCardsSecondStage);
  addCardToMiniDeck(
    brownCardThree,
    cardsDataBrown,
    0,
    16,
    miniDeckOfCardsSecondStage
  );
  addCardToMiniDeck(blueCardOne, cardsDataBlue, 0, 10, miniDeckOfCardsSecondStage);

  addCardToMiniDeck(greenCardOne, cardsDataGreen, 0, 14, miniDeckOfCardsThirdStage);
  addCardToMiniDeck(greenCardTwo, cardsDataGreen, 0, 13, miniDeckOfCardsThirdStage);
  addCardToMiniDeck(brownCardOne, cardsDataBrown, 0, 16, miniDeckOfCardsThirdStage);
  addCardToMiniDeck(brownCardTwo, cardsDataBrown, 0, 15, miniDeckOfCardsThirdStage);
  addCardToMiniDeck(
    brownCardThree,
    cardsDataBrown,
    0,
    14,
    miniDeckOfCardsThirdStage
  );
  addCardToMiniDeck(brownCardFour, cardsDataBrown, 0, 14, miniDeckOfCardsThirdStage);

  miniDeckOfCardsFirstStage.sort(() => Math.random() - 0.5);

  miniDeckOfCardsSecondStage.sort(() => Math.random() - 0.5);

  miniDeckOfCardsThirdStage.sort(() => Math.random() - 0.5);

  totalDeck = totalDeck.concat(
    miniDeckOfCardsThirdStage,
    miniDeckOfCardsSecondStage,
    miniDeckOfCardsFirstStage
  );

  console.log(totalDeck);
});

deckButton.addEventListener("click", () => {
  showCard();
  checkColorOfCard();
});
