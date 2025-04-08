// -- OPERATION VARIABLES -- //

let firstOperand = null;
let operator = null
let secondOperand = null;
let result = null;

// -- MATH OPERATIONS -- //

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNum, secondNum) {
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
    }
}

// -- DISPLAY POPULATION -- //

const mainDisplay = document.querySelector(".display .main");
const subDisplay = document.querySelector(".display .sub");
const numKey = document.querySelectorAll(".number");
const opKey = document.querySelectorAll(".operator");
const funcKey = document.querySelectorAll(".function");

numKey.forEach((key) => {
    key.addEventListener("click", () => {
        if (mainDisplay.textContent === "0" || mainDisplay.textContent === `${result}`) {
            mainDisplay.textContent = key.textContent;
            result = null;
        } else {
            mainDisplay.textContent += key.textContent;
        }
    })
});

opKey.forEach((key) => {
    key.addEventListener("click", () => {
        if (firstOperand === null) {
            firstOperand = parseFloat(mainDisplay.textContent);
        } else {
            secondOperand = parseFloat(mainDisplay.textContent);
        }
        if (secondOperand || secondOperand === 0) {
            result = operate(operator, firstOperand, secondOperand);
            firstOperand = result;
        }
        if (key.textContent !== "=") {
            operator = key.textContent;
            subDisplay.textContent = `${firstOperand} ${operator} `;
            mainDisplay.textContent = "0";
        } else {
            firstOperand = null;
        }
    })
});

funcKey.forEach((key) => {
    key.addEventListener("click", () => {
        switch (key.textContent) {
            case "AC":
                clearCalculator();
                break;
        }
    })
})

// -- FUNCTIONS -- //

function clearCalculator() {
    mainDisplay.textContent = "0";
    subDisplay.textContent = "0";
    firstOperand = null;
    operator = null
    secondOperand = null;
    result = null;
}