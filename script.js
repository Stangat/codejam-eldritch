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

// console.log(superEasyLevel)

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

//pick cards

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCard(source, min, max) {
  const randomNumber = getRandomNumber(min, max);
  const indexOfCard = source.indexOf(source[randomNumber]);
  return source.splice(indexOfCard, 1);
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

//ancient Azathoth

//first stage

greenCardOne = pickCard(cardsDataGreen, 0, 17);

blueCardOne = pickCard(cardsDataBlue, 0, 11);

brownCardOne = pickCard(cardsDataBrown, 0, 20);
brownCardTwo = pickCard(cardsDataBrown, 0, 19);

miniDeckOfCardsFirstStage = miniDeckOfCardsFirstStage.concat(
  greenCardOne,
  blueCardOne,
  brownCardOne,
  brownCardTwo
);

let miniDeckOfCardsFirstStageShuffle = miniDeckOfCardsFirstStage.sort(
  () => Math.random() - 0.5
);

console.log(miniDeckOfCardsFirstStageShuffle);

//second stage

greenCardOne = pickCard(cardsDataGreen, 0, 16);
greenCardTwo = pickCard(cardsDataGreen, 0, 15);

blueCardOne = pickCard(cardsDataBlue, 0, 10);

brownCardOne = pickCard(cardsDataBrown, 0, 18);
brownCardTwo = pickCard(cardsDataBrown, 0, 17);
brownCardThree = pickCard(cardsDataBrown, 0, 16);

miniDeckOfCardsSecondStage = miniDeckOfCardsSecondStage.concat(
  greenCardOne,
  greenCardTwo,
  blueCardOne,
  brownCardOne,
  brownCardTwo,
  brownCardThree
);

let miniDeckOfCardsSecondStageShuffle = miniDeckOfCardsSecondStage.sort(
  () => Math.random() - 0.5
);

console.log(miniDeckOfCardsSecondStageShuffle);

//third stage

greenCardOne = pickCard(cardsDataGreen, 0, 14);
greenCardTwo = pickCard(cardsDataGreen, 0, 13);

brownCardOne = pickCard(cardsDataBrown, 0, 15);
brownCardTwo = pickCard(cardsDataBrown, 0, 14);
brownCardThree = pickCard(cardsDataBrown, 0, 13);
brownCardFour = pickCard(cardsDataBrown, 0, 12);

miniDeckOfCardsThirdStage = miniDeckOfCardsThirdStage.concat(
  greenCardOne,
  greenCardTwo,
  brownCardOne,
  brownCardTwo,
  brownCardThree,
  brownCardFour
);

let miniDeckOfCardsThirdStageShuffle = miniDeckOfCardsThirdStage.sort(
  () => Math.random() - 0.5
);

console.log(miniDeckOfCardsThirdStageShuffle);

//making total deck

totalDeck = totalDeck.concat(
  miniDeckOfCardsThirdStageShuffle,
  miniDeckOfCardsSecondStageShuffle,
  miniDeckOfCardsFirstStageShuffle
);

console.log(totalDeck);

// console.log(totalDeck.pop());

// console.log(totalDeck);

// console.log(cardsDataBrown.length);

//making visible

azathoth.addEventListener("click", () => {
  makeVisible(difficultyLevels);
});

basicLevel.addEventListener("click", () => {
  makeVisible(shuffleButton);
  makeActive(basicLevel);
});

shuffleButton.addEventListener("click", () => {
  makeInvisible(shuffleButton);
  makeVisible(deckContainer);
});

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

// feeding dots container

function addNumbersInDots(stage, green, brown, blue) {
  stage.children[0].innerHTML = green;
  stage.children[1].innerHTML = brown;
  stage.children[2].innerHTML = blue;
}

function decreaseNumbersInDots(stage, number) {
  let decreasedNumber = stage.children[number].innerHTML - 1;
  stage.children[number].innerHTML = decreasedNumber;
}

addNumbersInDots(stageOne, 1, 2, 1);
addNumbersInDots(stageTwo, 2, 3, 1);
addNumbersInDots(stageThree, 2, 4, 0);

deckButton.addEventListener("click", () => {
  showCard();
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
  }else if (
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
});

// console.log(thirdNumber - 1);
