// -- OPERATION VARIABLES -- //

let firstOperand = null;
let operator = null
let secondOperand = null;
let result = null;

// -- ERROR MESSAGES -- //

const errorInstructions =  "[AC] : Reset";
const errorMessage = "ERROR";

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

function modulo(a, b) {
    return a % b;
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
            if (secondNum === 0) {
                throw "Division by 0!";
            } else {
                return divide(firstNum, secondNum);
            }
        case "%":
            if (secondNum === 0) {
                throw "Division by 0!";
            } else {
                return modulo(firstNum, secondNum);
            }
    }
}

// -- DISPLAY POPULATION -- //

const keyboard = document.querySelector("#keyboard");
const mainDisplay = document.querySelector(".display .main");
const subDisplay = document.querySelector(".display .sub");

keyboard.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.textContent)
    console.log(target.className)

    switch (target.className) {
        case "number":
            getNumber(target.textContent);
            break;
        case "operator":
            getOperator(target.textContent);
            break;
        case "equal":
            getResult();
            break;
        case "function":
            getFunction(target.textContent);
            break;
        default:
            break;
    }
});

// -- KEYBOARD INPUT -- //

window.addEventListener('keydown', (e) => {
    console.log(`key=${e.key},code=${e.code}`);
    switch (e.key) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "%":
            getOperator(e.key)
            break;
        case "Enter":
        case "=":
            getResult()
            break;
        case "Escape":
        case "Backspace":
        case "'":
        case ".":
            getFunction(e.key);
            break;
        }
    }
);

// -- FUNCTIONS -- //

function getNumber(key) {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
            break;
        case `${result}`:
            clearCalculator();
        default:
            if (mainDisplay.textContent === "0") {
                mainDisplay.textContent = key;
            } else {
                mainDisplay.textContent += key;
            }
    }
}

function getOperator(key) {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
            break;
        default:
            if (mainDisplay.textContent) {
                if (firstOperand === null) {
                    firstOperand = parseFloat(mainDisplay.textContent);
                } else if (secondOperand === null) {
                    secondOperand = parseFloat(mainDisplay.textContent);
                }
            }
            
            let isOperable = ((firstOperand || firstOperand === 0) && (mainDisplay.textContent) && (operator !== null) && (result === null));
            if (isOperable) {
                secondOperand = parseFloat(mainDisplay.textContent);
                try {
                    result = operate(operator, firstOperand, secondOperand);
                    firstOperand = result;
                } catch (error) {
                    subDisplay.textContent = `${errorInstructions}`;
                    mainDisplay.textContent = `${errorMessage}`;
                    break;
                }
            }
            
            if (firstOperand || firstOperand === 0) {
                operator = key;
                subDisplay.textContent = `${firstOperand} ${operator} `;
                secondOperand = null;
                result = null;
                mainDisplay.textContent = "";
            }
    }
}

function getResult() {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
        case "":
            break;
        default:
            let isOperable = ((firstOperand || firstOperand === 0) && (operator !== null) && (result === null));
            if (isOperable) {
                secondOperand = parseFloat(mainDisplay.textContent);
                try {
                    result = operate(operator, firstOperand, secondOperand);
                    subDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
                    mainDisplay.textContent = `${result}`;
                    firstOperand = null;
                    secondOperand = null;
                } catch (error) {
                    subDisplay.textContent = `${errorInstructions}`;
                    mainDisplay.textContent = `${errorMessage}`;
                    break;
                }
            }
    }
}

function getFunction(key) {
    switch (key) {
        case "AC":
        case "Escape":
            clearCalculator();
            break;
        case "C":
        case "Backspace":
            undoInput();
            break;
        case "+/-":
        case "'":
            convertPositiveToNegative();
            break;
        case ".":
            convertToDecimal();
            break;
    }
}

function clearCalculator() {
    mainDisplay.textContent = "";
    subDisplay.textContent = "";
    firstOperand = null;
    operator = null;
    secondOperand = null;
    result = null;
}

function undoInput() {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
            subDisplay.textContent = `${firstOperand} ${operator} `;
            mainDisplay.textContent = "";
            break;
        default:
            if (result || mainDisplay.textContent === `${result}`) {
                subDisplay.textContent = "";
                result = null;
            }
        
            let currInput = mainDisplay.textContent.split("");
            if (currInput[0] === "-" && currInput.length === 2) {
                mainDisplay.textContent = "";
            } else {
                currInput.pop();
                mainDisplay.textContent = currInput.join("");
            }
    }
}

function convertPositiveToNegative() {
    if (result || mainDisplay.textContent === `${result}`) {
        subDisplay.textContent = "";
        result = null;
    }

    if (mainDisplay.textContent && result === null) {
        mainDisplay.textContent = `${mainDisplay.textContent * -1}`;
    }
}

function convertToDecimal() {
    if (result || mainDisplay.textContent === `${result}`) {
        subDisplay.textContent = "";
        mainDisplay.textContent = "";
        result = null;
    }

    if (mainDisplay.textContent && !mainDisplay.textContent.includes(".")) {
        mainDisplay.textContent += ".";
    } else if (mainDisplay.textContent === "") {
        mainDisplay.textContent = "0.";
    }
}