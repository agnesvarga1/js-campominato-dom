"use strict";
const mainHtml = document.querySelector("main");
const gridHtml = document.querySelector("#grid");
const playBtn = document.querySelector(".play-btn");
const rstBtn = document.querySelector(".rst-btn");
const selectHtml = document.querySelector("#diff-level");
const scoreDisplay = document.querySelector("#score-display");
const bombList = [];
const totBombs = 16;

let count = 0;
function genRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function createBombList(x) {
  do {
    let randomBombPlace = genRandomNumber(x ** 2);
    if (!bombList.includes(randomBombPlace)) {
      bombList.push(randomBombPlace);
    }
  } while (bombList.length < totBombs);
}

function startGame(n) {
  let cellPerLine = n;

  for (let i = 1; i <= cellPerLine ** 2; i++) {
    let cellHtml = document.createElement("div");
    const wCalced = `calc(100% / ${cellPerLine})`;
    cellHtml.style.setProperty("width", wCalced);
    cellHtml.classList.add("cell");
    cellHtml.innerHTML = `<span>${i}</span>`;
    if (bombList.includes(i)) {
      cellHtml.classList.add("bomb");
    }
    cellHtml.addEventListener("click", function () {
      let cellNum = this.querySelector("span").innerText;

      let state = bombList.includes(Number(cellNum));

      if (state === true) {
        this.classList.add("bomb-clicked");
        endGame("GAME OVER");
      } else {
        this.classList.add("active");
        this.style.setProperty("pointer-events", "none");
        count = count + 1;
        scoreDisplay.innerText = count;
        if (count == cellPerLine ** 2 - totBombs) {
          endGame("You Won");
        }
      }
    });

    gridHtml.append(cellHtml);
  }
}

playBtn.addEventListener("click", () => {
  let diffLevel = selectHtml.value;
  mainHtml.classList.remove("noshow");
  playBtn.classList.add("noshow");
  rstBtn.classList.remove("noshow");
  createBombList(diffLevel);
  console.log(bombList);
  startGame(diffLevel);
});
function endGame(msg) {
  const endGameInfos = document.createElement("div");
  endGameInfos.classList.add("end-game");
  endGameInfos.innerHTML += `<h2>${msg}</h2>`;
  endGameInfos.innerHTML += `<h2>Your Score : ${count}</h2>`;
  mainHtml.appendChild(endGameInfos);
}

rstBtn.addEventListener("click", () => {
  location.reload();
});
