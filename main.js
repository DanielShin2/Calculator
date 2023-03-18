let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keydown", handleKeyPress);

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    compute();
  }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

const numberButtons = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    currentDisplayNumber.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    compute();
    operator = op;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum + " " + operator;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
}

function compute() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum -= currentNum;
  } else if (operator === "x") {
    previousNum *= currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "Error";
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousNum.length <= 11) {
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator() {
  currentNum = "";
  previousNum = "";
  operator = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    compute();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}


//add styles

const bodyClass = "body";
const bdy = document.querySelector("body");
bodyClass.split(" ").forEach((cls) => bdy.classList.add(cls));

const calcBodyClass = ".calcBody";
const calcBody = document.querySelector(".calcBody");
calcBodyClass.split(" ").forEach((cls) => calcBody.classList.add(cls));

const outputClass = ".output";
const output = document.querySelector(".output");
outputClass.split(" ").forEach((cls) => output.classList.add(cls));

const previousNumberClass = ".previousNumber";
const previousNumber = document.querySelector(".previousNumber");
previousNumberClass
  .split(" ")
  .forEach((cls) => previousNumber.classList.add(cls));

const currentNumberClass = ".currentNumber";
const currentNumber = document.querySelector(".currentNumber");
currentNumberClass
  .split(" ")
  .forEach((cls) => currentNumber.classList.add(cls));

const buttons = document.querySelectorAll("button");
buttons.forEach((btn) => {
  addClasses(btn);
});

function addClasses(button) {
  const btnNumberClass = ".number";
  const btnClearClass = ".clear";
  const btnOpClass = ".operator";
  const btnEqClass = ".equal";
  const btnDecClass = ".decimal";

  if (button.classList.value === "number") {
    btnNumberClass.split(" ").forEach((cls) => button.classList.add(cls));
  } else if (button.classList.value === "operator") {
    btnOpClass.split(" ").forEach((cls) => button.classList.add(cls));
  } else if (button.classList.value === "clear") {
    btnClearClass.split(" ").forEach((cls) => button.classList.add(cls));
  } else if (button.classList.value === "equal") {
    btnEqClass.split(" ").forEach((cls) => button.classList.add(cls));
  } else if (button.classList.value === "decimal") {
    btnDecClass.split(" ").forEach((cls) => button.classList.add(cls));
  }

  const baseClass = "baseClass";
  baseClass.split(" ").forEach((cls) => button.classList.add(cls));
}