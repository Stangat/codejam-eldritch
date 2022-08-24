const azathoth = document.querySelector(".azathoth");
const cthulthu = document.querySelector(".cthulthu");
const logSothoth = document.querySelector(".logSothoth");
const shubNiggurath = document.querySelector(".shubNiggurath");

const difficultyLevel = document.querySelector(".difficulty-container");
const shuffleButton = document.querySelector(".shuffle-deck");
const deckContainer = document.querySelector(".deck-container");
const deckButton = document.querySelector(".deck");
const currentCard = document.querySelector(".last-card");

// console.log(difficulty.children[3])

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

//Ancient azathoth

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

console.log(totalDeck.pop());

console.log(totalDeck);

console.log(cardsDataBrown.length);
