const mainHtml = document.querySelector("main");
const gridHtml = document.querySelector("#grid");
const playBtn = document.querySelector(".play-btn");
const rstBtn = document.querySelector(".rst-btn");
const selectHtml = document.querySelector("#diff-level");
const bombList = [];
const totBombs = 16;
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

    cellHtml.addEventListener("click", function () {
      let cellNum = this.querySelector("span").innerText;

      bombList.forEach((bomb) => {
        if (bomb == cellNum) {
          this.classList.add("bomb");
          endGame();
        } else {
          this.classList.add("active");
        }
      });

      console.log(cellNum);
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

rstBtn.addEventListener("click", () => {
  location.reload();
});

function endGame() {
  console.log("you lost");
}
