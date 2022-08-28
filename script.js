const ancients = document.querySelector(".cards-container");
const azathoth = document.querySelector(".azathoth");
const cthulthu = document.querySelector(".cthulthu");
const iogSothoth = document.querySelector(".iogSothoth");
const shubNiggurath = document.querySelector(".shubNiggurath");

const difficultyLevels = document.querySelector(".difficulty-container");
// const superEasyLevel = difficultyLevels.children[0];
// const easyLevel = difficultyLevels.children[1];
const basicLevel = difficultyLevels.children[0];
// const highLevel = difficultyLevels.children[3];
// const superHighLevel = difficultyLevels.children[4];

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

function removeActive(element) {
  element.classList.remove("active");
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

function returnToCardsData() {
  if (displayingCard.color === "green" && cardsDataGreen.length < 18) {
    cardsDataGreen.push(displayingCard);
  } else if (displayingCard.color === "brown" && cardsDataBrown.length < 21) {
    cardsDataBrown.push(displayingCard);
  } else if (displayingCard.color === "blue" && cardsDataBlue.length < 12) {
    cardsDataBlue.push(displayingCard);
  }
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

//Azathoth

function fillMiniDeckAzathothStageOne(
  sourceGreen,
  sourceBrown,
  sourceBlue,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 20, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 19, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 11, miniDeck);
  return miniDeck;
}

function fillMiniDeckAzathothStageTwo(
  sourceGreen,
  sourceBrown,
  sourceBlue,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 16, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 15, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 18, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 16, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 10, miniDeck);
  return miniDeck;
}

function fillMiniDeckAzathothStageThree(sourceGreen, sourceBrown, miniDeck) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 14, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 13, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 15, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 13, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 12, miniDeck);
  return miniDeck;
}

//Cthulthu

function fillMiniDeckCthulthuStageOne(sourceBrown, sourceBlue, miniDeck) {
  addCardToMiniDeck(brownCard, sourceBrown, 0, 20, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 19, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 11, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 10, miniDeck);
  return miniDeck;
}

function fillMiniDeckCthulthuStageTwo(sourceGreen, sourceBrown, miniDeck) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 18, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 16, miniDeck);
  return miniDeck;
}

function fillMiniDeckCthulthuStageThree(sourceGreen, sourceBrown, miniDeck) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 16, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 15, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 15, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 13, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 12, miniDeck);
  return miniDeck;
}

//Iog Sothoth

function fillMiniDeckIogSothothStageOne(sourceBrown, sourceBlue, miniDeck) {
  addCardToMiniDeck(brownCard, sourceBrown, 0, 20, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 19, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 11, miniDeck);
  return miniDeck;
}

function fillMiniDeckIogSothothStageTwo(
  sourceGreen,
  sourceBrown,
  sourceBlue,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 17, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 16, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 18, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 16, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 10, miniDeck);
  return miniDeck;
}

function fillMiniDeckIogSothothStageThree(sourceGreen, sourceBrown, miniDeck) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 15, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 14, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 13, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 15, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 13, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 12, miniDeck);
  return miniDeck;
}

//Shub Niggurath

function fillMiniDeckShubNiggurathStageOne(
  sourceGreen,
  sourceBrown,
  sourceBlue,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 17, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 20, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 19, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 11, miniDeck);
  return miniDeck;
}

function fillMiniDeckShubNiggurathStageTwo(
  sourceGreen,
  sourceBrown,
  sourceBlue,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 16, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 15, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 18, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 17, miniDeck);
  addCardToMiniDeck(blueCard, sourceBlue, 0, 10, miniDeck);
  return miniDeck;
}

function fillMiniDeckShubNiggurathStageThree(
  sourceGreen,
  sourceBrown,
  miniDeck
) {
  addCardToMiniDeck(greenCard, sourceGreen, 0, 13, miniDeck);
  addCardToMiniDeck(greenCard, sourceGreen, 0, 12, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 16, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 15, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 14, miniDeck);
  addCardToMiniDeck(brownCard, sourceBrown, 0, 13, miniDeck);
  return miniDeck;
}

//card shuffle

shuffleButton.addEventListener("click", () => {
  makeInvisible(shuffleButton);
  makeVisible(deckContainer);
  makeVisible(deckButton);
  if (totalDeck.length > 0) {
    let card;
    // console.log(totalDeck);
    for (let i = 0; i < totalDeck.length; i++) {
      if (totalDeck[i].color === "green") {
        card = totalDeck.splice(i, 1)[0];
        i--;
        cardsDataGreen.push(card);
        // console.log(card);
      } else if (totalDeck[i].color === "brown") {
        card = totalDeck.splice(i, 1)[0];
        i--;
        cardsDataBrown.push(card);
      } else if (totalDeck[i].color === "blue") {
        card = totalDeck.splice(i, 1)[0];
        i--;
        cardsDataBlue.push(card);
      }
    }
    miniDeckOfCardsFirstStage.length = 0;
    miniDeckOfCardsSecondStage.length = 0;
    miniDeckOfCardsThirdStage.length = 0;

    // console.log(cardsDataGreen.length);
    // console.log(cardsDataBrown.length);
    // console.log(cardsDataBlue.length);

    // console.log(totalDeck);

    if (
      azathoth.className === "ancient-card azathoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckAzathothStageOne(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckAzathothStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckAzathothStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();

      console.log(totalDeck);
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckCthulthuStageOne(
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckCthulthuStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckCthulthuStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();

      console.log(totalDeck);
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckIogSothothStageOne(
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckIogSothothStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckIogSothothStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();
      console.log(totalDeck);
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckShubNiggurathStageOne(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckShubNiggurathStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckShubNiggurathStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );
      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();
      console.log(totalDeck);
    }
  } else {
    miniDeckOfCardsFirstStage.length = 0;
    miniDeckOfCardsSecondStage.length = 0;
    miniDeckOfCardsThirdStage.length = 0;

    if (
      azathoth.className === "ancient-card azathoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckAzathothStageOne(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckAzathothStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckAzathothStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();

      console.log(totalDeck);
    } else if (
      cthulthu.className === "ancient-card cthulthu active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckCthulthuStageOne(
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckCthulthuStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckCthulthuStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();

      console.log(totalDeck);
    } else if (
      iogSothoth.className === "ancient-card iogSothoth active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckIogSothothStageOne(
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckIogSothothStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckIogSothothStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );

      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();
      console.log(totalDeck);
    } else if (
      shubNiggurath.className === "ancient-card shubNiggurath active" &&
      basicLevel.className === "difficulty active"
    ) {
      fillMiniDeckShubNiggurathStageOne(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsFirstStage
      );

      fillMiniDeckShubNiggurathStageTwo(
        cardsDataGreen,
        cardsDataBrown,
        cardsDataBlue,
        miniDeckOfCardsSecondStage
      );

      fillMiniDeckShubNiggurathStageThree(
        cardsDataGreen,
        cardsDataBrown,
        miniDeckOfCardsThirdStage
      );
      miniDeckOfCardsShuffle(miniDeckOfCardsFirstStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsSecondStage);
      miniDeckOfCardsShuffle(miniDeckOfCardsThirdStage);
      addMiniDecksToTotalDeck();
      console.log(totalDeck);
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
  if (deckContainer.className === "deck-container hidden")
    makeVisible(shuffleButton);
});

deckButton.addEventListener("click", () => {
  showCard();
  checkColorOfCard();
  returnToCardsData();
});
