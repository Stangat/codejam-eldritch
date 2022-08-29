const ancients = document.querySelector(".cards-container");
const azathoth = document.querySelector(".azathoth");
const cthulthu = document.querySelector(".cthulthu");
const iogSothoth = document.querySelector(".iogSothoth");
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

let greenCard;
let brownCard;
let blueCard;

let miniDeckOfCardsFirstStage = [];
let miniDeckOfCardsSecondStage = [];
let miniDeckOfCardsThirdStage = [];

let totalDeck = [];

let displayingCard;

const easyLevelGreenCards = cardsDataGreen.filter(
  (item) =>
    (item.color === "green" && item.difficulty === "easy") ||
    (item.color === "green" && item.difficulty === "normal")
);

const easyLevelBrownCards = cardsDataBrown.filter(
  (item) =>
    (item.color === "brown" && item.difficulty === "easy") ||
    (item.color === "brown" && item.difficulty === "normal")
);

const easyLevelBlueCards = cardsDataBlue.filter(
  (item) =>
    (item.color === "blue" && item.difficulty === "easy") ||
    (item.color === "blue" && item.difficulty === "normal")
);

const highLevelGreenCards = cardsDataGreen.filter(
  (item) =>
    (item.color === "green" && item.difficulty === "hard") ||
    (item.color === "green" && item.difficulty === "normal")
);

const highLevelBrownCards = cardsDataBrown.filter(
  (item) =>
    (item.color === "brown" && item.difficulty === "hard") ||
    (item.color === "brown" && item.difficulty === "normal")
);

const highLevelBlueCards = cardsDataBlue.filter(
  (item) =>
    (item.color === "blue" && item.difficulty === "hard") ||
    (item.color === "blue" && item.difficulty === "normal")
);

import ancientsData from "./data/ancients.js";
import cardsDataGreen from "./data/mythicCards/green/index.js";
import cardsDataBlue from "./data/mythicCards/blue/index.js";
import cardsDataBrown from "./data/mythicCards/brown/index.js";

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickCard(source, min, max) {
  const randomNumber = getRandomNumber(min, max);
  return source[randomNumber];
}

function addCardToMiniDeck(target, source, min, max) {
  const randomNumber = getRandomNumber(min, max);
  target.push(source[randomNumber]);
}

function checkCards(target, source, min, max) {
  target.map((item, index) => {
    if (index !== target.indexOf(item)) {
      target.splice(index, 1);
      addCardToMiniDeck(target, source, min, max);
    }
  });
}

function checkCardsForDublicatesInTotalDeckForBasicLevel() {
  totalDeck.map((item, index) => {
    if (index !== totalDeck.indexOf(item)) {
      let dublicate = totalDeck.splice(index, 1)[0];
      // console.log("true")

      if (dublicate.color === "green") {
        totalDeck.splice(index, 0, pickCard(cardsDataGreen, 0, 17))[0];
      } else if (dublicate.color === "brown") {
        totalDeck.splice(index, 0, pickCard(cardsDataBrown, 0, 20))[0];
      } else if (dublicate.color === "blue") {
        totalDeck.splice(index, 0, pickCard(cardsDataBlue, 0, 11))[0];
      }
    }
  });
}

function checkCardsForDublicatesInTotalDeckForEasyLevel() {
  totalDeck.map((item, index) => {
    if (index !== totalDeck.indexOf(item)) {
      let dublicate = totalDeck.splice(index, 1)[0];

      if (
        (dublicate.color === "green" && dublicate.difficulty === "easy") ||
        (dublicate.color === "green" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(easyLevelGreenCards, 0, 12))[0];
      } else if (
        (dublicate.color === "brown" && dublicate.difficulty === "easy") ||
        (dublicate.color === "brown" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(easyLevelBrownCards, 0, 15))[0];
      } else if (
        (dublicate.color === "blue" && dublicate.difficulty === "easy") ||
        (dublicate.color === "blue" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(easyLevelBlueCards, 0, 7))[0];
      }
    }
  });
}

function checkCardsForDublicatesInTotalDeckForHighLevel() {
  totalDeck.map((item, index) => {
    if (index !== totalDeck.indexOf(item)) {
      let dublicate = totalDeck.splice(index, 1)[0];

      if (
        (dublicate.color === "green" && dublicate.difficulty === "hard") ||
        (dublicate.color === "green" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(highLevelGreenCards, 0, 12))[0];
      } else if (
        (dublicate.color === "brown" && dublicate.difficulty === "hard") ||
        (dublicate.color === "brown" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(highLevelBrownCards, 0, 15))[0];
      } else if (
        (dublicate.color === "blue" && dublicate.difficulty === "hard") ||
        (dublicate.color === "blue" && dublicate.difficulty === "normal")
      ) {
        totalDeck.splice(index, 0, pickCard(highLevelBlueCards, 0, 7))[0];
      }
    }
  });
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

function removeActive(element) {
  element.classList.remove("active");
}

function addNumbersInDots(stage, green, brown, blue) {
  stage.children[0].innerHTML = green;
  stage.children[1].innerHTML = brown;
  stage.children[2].innerHTML = blue;
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

let displayingCardId;

function showCard() {
  if (totalDeck.length > 0) {
    displayingCard = totalDeck.pop();
    displayingCardId = displayingCard.id;
    // console.log(displayingCard);
    currentCard.style.backgroundImage = `url(/assets/MythicCards/${displayingCardId}.png)`;
    currentCard.style.backgroundSize = "cover";
    checkColorOfCard();
  } else {
    makeInvisible(deckButton);
    checkColorOfCard();
  }
}

function decreaseNumbersInDots(stage, number) {
  let decreasedNumber = stage.children[number].innerHTML - 1;
  stage.children[number].innerHTML = decreasedNumber;
}

function miniDeckOfCardsShuffle(miniDeck) {
  miniDeck.sort(() => Math.random() - 0.5);
}

function addMiniDecksToTotalDeck() {
  totalDeck = totalDeck.concat(
    miniDeckOfCardsThirdStage,
    miniDeckOfCardsSecondStage,
    miniDeckOfCardsFirstStage
  );
  return totalDeck;
}

//Azathoth basic level

function addCardsToBasicLevelOfAzatoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 20);
  // checkCards(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  // checkCards(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  // checkCards(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForBasicLevel();
  // console.log(totalDeck);
}

//Azathoth easy level

function addCardsToEasyLevelOfAzatoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForEasyLevel();
  // console.log(totalDeck);
}

//Azathoth high level

function addCardsToHighLevelOfAzatoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForHighLevel();
  // console.log(totalDeck);
}

//Chtulchu basic level

function addCardsToBasicLevelOfChtulchu() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  // checkCards(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);

  // checkCards(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  // checkCards(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  // checkCards(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForBasicLevel();
  // console.log(totalDeck);
}

//Chtulchu easy level

function addCardsToEasyLevelOfChtulchu() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  // checkCards(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 22);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForEasyLevel();
  // console.log(totalDeck);
}

//Chtulchu high level

function addCardsToHighLevelOfChtulchu() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  // checkCards(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 22);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForHighLevel();
  // console.log(totalDeck);
}

//iogSothoth basic level

function addCardsToBasicLevelOfIogSothoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 20);
  // checkCards(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  // checkCards(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  // checkCards(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForBasicLevel();
  // console.log(totalDeck);
}

//iogSothoth easy level

function addCardsToEasyLevelOfIogSothoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForEasyLevel();
  // console.log(totalDeck);
}

//iogSothoth high level

function addCardsToHighLevelOfIogSothoth() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForHighLevel();
  // console.log(totalDeck);
}

//shubNiggurath basic level

function addCardsToBasicLevelOfShubNiggurath() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsFirstStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, cardsDataBlue, 0, 11);

  // checkCards(miniDeckOfCardsSecondStage, cardsDataGreen, 0, 20);
  // checkCards(miniDeckOfCardsSecondStage, cardsDataBrown, 0, 20);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  // checkCards(miniDeckOfCardsThirdStage, cardsDataGreen, 0, 17);
  // checkCards(miniDeckOfCardsThirdStage, cardsDataBrown, 0, 20);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForBasicLevel();
  // console.log(totalDeck);
}

//shubNiggurath easy level

function addCardsToEasyLevelOfShubNiggurath() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, easyLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, easyLevelGreenCards, 0, 22);
  // checkCards(miniDeckOfCardsSecondStage, easyLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, easyLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, easyLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForEasyLevel();
  // console.log(totalDeck);
}

//shubNiggurath high level

function addCardsToHighLevelOfShubNiggurath() {
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsFirstStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsFirstStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsSecondStage, highLevelBlueCards, 0, 7);

  // checkCards(miniDeckOfCardsSecondStage, highLevelGreenCards, 0, 22);
  // checkCards(miniDeckOfCardsSecondStage, highLevelBrownCards, 0, 15);

  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);
  addCardToMiniDeck(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  // checkCards(miniDeckOfCardsThirdStage, highLevelGreenCards, 0, 12);
  // checkCards(miniDeckOfCardsThirdStage, highLevelBrownCards, 0, 15);

  miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
  miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
  addMiniDecksToTotalDeck();

  checkCardsForDublicatesInTotalDeckForHighLevel();
  // console.log(totalDeck);
}

//card shuffle

shuffleButton.addEventListener("click", () => {
  makeInvisible(shuffleButton);
  makeVisible(deckContainer);
  makeVisible(deckButton);
  currentCard.style.backgroundImage = "none";

  if (totalDeck.length > 0) {
    miniDeckOfCardsFirstStage.length = 0;
    miniDeckOfCardsSecondStage.length = 0;
    miniDeckOfCardsThirdStage.length = 0;
    totalDeck.length = 0;
    if (
      azathoth.className === "ancient-card azathoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToBasicLevelOfAzatoth();
    } else if (
      azathoth.className === "ancient-card azathoth active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToEasyLevelOfAzatoth();
    } else if (
      azathoth.className === "ancient-card azathoth active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToHighLevelOfAzatoth();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToBasicLevelOfChtulchu();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToEasyLevelOfChtulchu();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToHighLevelOfChtulchu();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToBasicLevelOfIogSothoth();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToEasyLevelOfIogSothoth();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToHighLevelOfIogSothoth();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToBasicLevelOfShubNiggurath();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToEasyLevelOfShubNiggurath();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToHighLevelOfShubNiggurath();
    }
  } else {
    miniDeckOfCardsFirstStage.length = 0;
    miniDeckOfCardsSecondStage.length = 0;
    miniDeckOfCardsThirdStage.length = 0;
    totalDeck.length = 0;
    if (
      azathoth.className === "ancient-card azathoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToBasicLevelOfAzatoth();
    } else if (
      azathoth.className === "ancient-card azathoth active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToEasyLevelOfAzatoth();
    } else if (
      azathoth.className === "ancient-card azathoth active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToHighLevelOfAzatoth();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToBasicLevelOfChtulchu();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToEasyLevelOfChtulchu();
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 2);
      addNumbersInDots(stageTwo, 1, 3, 0);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToHighLevelOfChtulchu();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToBasicLevelOfIogSothoth();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToEasyLevelOfIogSothoth();
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 0, 2, 1);
      addNumbersInDots(stageTwo, 2, 3, 1);
      addNumbersInDots(stageThree, 3, 4, 0);
      addCardsToHighLevelOfIogSothoth();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      basicLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToBasicLevelOfShubNiggurath();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      easyLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToEasyLevelOfShubNiggurath();
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      highLevel.className === "difficulty active"
    ) {
      addNumbersInDots(stageOne, 1, 2, 1);
      addNumbersInDots(stageTwo, 3, 2, 1);
      addNumbersInDots(stageThree, 2, 4, 0);
      addCardsToHighLevelOfShubNiggurath();
    }
  }
});

azathoth.addEventListener("click", () => {
  makeVisible(difficultyLevels);
  addNumbersInDots(stageOne, 1, 2, 1);
  addNumbersInDots(stageTwo, 2, 3, 1);
  addNumbersInDots(stageThree, 2, 4, 0);
  makeActive(azathoth);
  removeActive(cthulthu);
  removeActive(iogSothoth);
  removeActive(shubNiggurath);

  if (deckContainer.classname === "deck-container hidden") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
  if (basicLevel.className === "difficulty active") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
});

cthulthu.addEventListener("click", () => {
  makeVisible(difficultyLevels);
  addNumbersInDots(stageOne, 0, 2, 2);
  addNumbersInDots(stageTwo, 1, 3, 0);
  addNumbersInDots(stageThree, 3, 4, 0);
  makeActive(cthulthu);
  removeActive(azathoth);
  removeActive(iogSothoth);
  removeActive(shubNiggurath);

  if (deckContainer.classname === "deck-container hidden") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
  if (basicLevel.className === "difficulty active") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
});

iogSothoth.addEventListener("click", () => {
  makeVisible(difficultyLevels);
  addNumbersInDots(stageOne, 0, 2, 1);
  addNumbersInDots(stageTwo, 2, 3, 1);
  addNumbersInDots(stageThree, 3, 4, 0);
  makeActive(iogSothoth);
  removeActive(cthulthu);
  removeActive(azathoth);
  removeActive(shubNiggurath);

  if (deckContainer.classname === "deck-container hidden") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
  if (basicLevel.className === "difficulty active") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
});

shubNiggurath.addEventListener("click", () => {
  makeVisible(difficultyLevels);
  addNumbersInDots(stageOne, 1, 2, 1);
  addNumbersInDots(stageTwo, 3, 2, 1);
  addNumbersInDots(stageThree, 2, 4, 0);
  makeActive(shubNiggurath);
  removeActive(cthulthu);
  removeActive(azathoth);
  removeActive(iogSothoth);

  if (deckContainer.classname === "deck-container hidden") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
  if (basicLevel.className === "difficulty active") {
    makeVisible(shuffleButton);
    makeInvisible(deckContainer);
  }
});

basicLevel.addEventListener("click", () => {
  makeActive(basicLevel);
  removeActive(easyLevel);
  removeActive(highLevel);
  makeVisible(shuffleButton);
  makeInvisible(deckContainer);

  if (deckContainer.className === "deck-container hidden")
    makeVisible(shuffleButton);
});

easyLevel.addEventListener("click", () => {
  makeActive(easyLevel);
  removeActive(basicLevel);
  removeActive(highLevel);
  makeVisible(shuffleButton);
  makeInvisible(deckContainer);
  if (deckContainer.className === "deck-container hidden")
    makeVisible(shuffleButton);
});

highLevel.addEventListener("click", () => {
  makeActive(highLevel);
  removeActive(basicLevel);
  removeActive(easyLevel);
  makeVisible(shuffleButton);
  makeInvisible(deckContainer);
  if (deckContainer.className === "deck-container hidden")
    makeVisible(shuffleButton);
});

deckButton.addEventListener("click", () => {
  showCard();
});
