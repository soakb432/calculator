// -- OPERATION VARIABLES -- //

let firstOperand = null;
let operator = null
let secondOperand = null;
let result = null;

// -- KEY TO VALUE MAPPING -- //

const keyMap = {
    0: '0', 1: '1', 2: '2', 3: '3', 4: '4',
    5: '5', 6: '6', 7: '7', 8: '8', 9: '9',

    '+': '+', '-': '-', '*': '*',
    '/': '/', '%': '%', '=': '=',
    'Enter': '=',

    'Escape': 'AC', 'Backspace': 'C',
    "'": '+/-', '.': '.'
}

// -- ERROR MESSAGES -- //

const errorInstructions =  "[C] : Undo | [AC] : Reset";
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

const mainDisplay = document.querySelector(".display .main");
const subDisplay = document.querySelector(".display .sub");
const keyboard = document.querySelector("#keyboard");
const buttons = document.querySelectorAll("#keyboard button");

// -- INPUT -- //

keyboard.addEventListener("click", (e) => {
    const target = e.target;
    getButtonAction(target);
});

window.addEventListener('keydown', (e) => {
    const keyValue = keyMap[e.key];
    const button = findButtonByValue(keyValue);

    if (keyValue && button) {
        getButtonAction(button);
    }
});

// -- FUNCTIONS -- //

function findButtonByValue(value) {
    return Array.from(buttons).find(btn => btn.value === value);
}

function getButtonAction(target) {
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
}

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
            clearCalculator();
            break;
        case "C":
            undoInput();
            break;
        case "+/-":
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
                operator = null;
                result = null;
            }
        
            let currInput = mainDisplay.textContent.split("");
            if (currInput[0] === "-" && currInput.length === 2) {
                mainDisplay.textContent = "";
            } else {
                currInput.pop();
                mainDisplay.textContent = currInput.join("");
            }
            break;
    }
}

function convertPositiveToNegative() {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
            break;
        default:
            if (result || mainDisplay.textContent === `${result}`) {
                subDisplay.textContent = "";
                operator = null;
                result = null;
            }
        
            if (mainDisplay.textContent && result === null) {
                mainDisplay.textContent = `${mainDisplay.textContent * -1}`;
            }
            break;
    }
}

function convertToDecimal() {
    switch (mainDisplay.textContent) {
        case `${errorMessage}`:
            break;
        default:
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
            break;
    }
}