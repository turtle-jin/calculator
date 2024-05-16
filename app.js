
//calculator logic 
//find sum
function sum(a, b) {
    return a + b; 
}


//find difference
function subtract(a, b) {
    return a - b; 
}


//find product 
function multiply(a, b) {
    return a * b; 
}


//find quotient 
function divide(a, b) {
    if( b === 0) {
        return "CANNOT DIVIDE BY 0"; 
    }else {
      return a / b;   
    }   
}


//find power
function power (base, power) {
    let result = 1
    for(let i = 0; i < power; i++) {
        result *= base; 
    }
    return result; 
}


//operate function
function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return sum(a, b); 
        case "-":
            return subtract(a, b); 
        case "*":
            return multiply(a, b); 
        case "/":
            return divide(a, b); 
        case "^": 
            return power(a, b); 
        default:
            return "Invalid Operator"
    }
}


//moo button
const mooBtn = document.querySelector("#moo"); 
const mooSound = document.querySelector("#mooSound");
mooBtn.addEventListener("click", ()=> {
    if (mooSound.paused) {
        mooSound.play();
        mooBtn.textContent = "Stop it!"
    } else {
        mooSound.pause();
        mooBtn.textContent = "Suprise!"
    }
})

// const displayBottomRow = document.querySelector("#displayBottomRow");
const displayTopRow = document.querySelector("#displayTopRow");
const btns = document.querySelectorAll("button"); 
const MAX_INPUT_LENGTH = 18; 
const decimalPointButton = document.querySelector("#decimalPoint");

let inputArrA = [];
let inputOperatorArr = [];
let inputArrB = [];
let operatorArr = ["+", "-", "*", "/", "^"]
let firstInput; 
let secondInput; 
let operatorChosen;
let result; 
let topRowDisplayArr = [];
let afterEqualSign = false;


function clearArr (arr) {
    arr.length = 0; 
}


function del_last(arr) {
    arr.splice(-2);
}

function hasDecimalPoint(arr) {
    return arr.includes(".");
}


function calculator(btns) {
    
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            
            if (btn.value === "C") {
                result = ""; 
                clearArr(inputArrA); 
                clearArr(inputArrB);
                clearArr(inputOperatorArr);
                clearArr(topRowDisplayArr);
                decimalPointButton.disabled = false;
                displayTopRow.textContent = "";
                return;   
            }
            
            
            if (inputArrA.length !== 0 && afterEqualSign && !(operatorArr.includes(btn.value))) {
                clearArr(inputArrA);
                inputArrA.push(btn.value);
                afterEqualSign = false; 
                if (inputArrA.includes("DEL")) {
                    del_last(inputArrA);
                }
                if (btn.value === "negative") {
                    inputArrA.pop();
                    inputArrA[0] *= -1;
                    updateDisplay();
                }
                if (hasDecimalPoint(inputArrA)) {
                    decimalPointButton.disabled = true;
                }
            }else if (inputOperatorArr.length === 0 && btn.value !== "C" && inputArrA.length <= MAX_INPUT_LENGTH && !(operatorArr.includes(btn.value))) {  
                inputArrA.push(btn.value); 
                console.log(`arrA is ${inputArrA}`);
                if (inputArrA.includes("DEL")) {
                    del_last(inputArrA);
                }
                if (btn.value === "negative") {
                    inputArrA.pop();
                    inputArrA[0] *= -1;
                    updateDisplay();
                }
                if (hasDecimalPoint(inputArrA)) {
                    decimalPointButton.disabled = true;
                } 
            } 
            firstInput = Number(inputArrA.join(""));
            console.log(`first input is ${firstInput}`);
            
            //operatorArr is not empty, and user clicked operator key
            if (inputArrA.length !== 0 && operatorArr.includes(btn.value) && btn.value !== "C") {
                afterEqualSign = false;
                inputOperatorArr.push(btn.value);
                decimalPointButton.disabled = false;
                console.log(`operator arr is ${inputOperatorArr}`);
                if (inputOperatorArr.includes("DEL")) {
                    del_last(inputOperatorArr);
                }
            }
            operatorChosen = inputOperatorArr[0];
            updateDisplay();
            
                 
            //when operator is identified, put the rest of the keys in arrB
            if (inputOperatorArr.length !== 0 && !(operatorArr.includes(btn.value)) && btn.value !== "=" && inputArrB.length <= MAX_INPUT_LENGTH) {
                inputArrB.push(btn.value);
                console.log(`arrB is ${inputArrB}`)
                if (inputArrB.includes("DEL")) {
                    del_last(inputArrB);
                }
                if (btn.value === "negative") {
                    inputArrB.pop();
                    inputArrB[0] *= -1;
                    updateDisplay();
                }
                if (hasDecimalPoint(inputArrB)) {
                    decimalPointButton.disabled = true;
                }         
            } 
            
            secondInput = Number(inputArrB.join(""));
            console.log(`second input in ${secondInput}`);
            updateDisplay();
            

            //when = sign is clicked
            if (btn.value === "=") {
                result = operate(operatorChosen, firstInput, secondInput);
                console.log(`the result is ${result}`);
                clearArr(inputArrA);
                clearArr(inputArrB);
                clearArr(inputOperatorArr);
                inputArrA.push(result);
                decimalPointButton.disabled = false;
                afterEqualSign = true;
                updateDisplay();  
            }
         

            // when user continue the operation without clicking = sign
            if (inputOperatorArr.length > 1) {
                result = operate(operatorChosen, firstInput, secondInput);
                clearArr(inputArrA);
                inputArrA.push(result);
                console.log(`the new arrA is now ${inputArrA}`);
                clearArr(inputArrB)
                inputOperatorArr.shift();
                operatorChosen = inputOperatorArr[0];
                updateDisplay();  
            }
        });
    });
}


function updateDisplay() {
    if (inputArrA.length + inputOperatorArr.length + inputArrB.length> 20) {
        displayTopRow.textContent = [...inputOperatorArr, ...inputArrB].join("");
    }else {
        displayTopRow.textContent = [...inputArrA, ...inputOperatorArr, ...inputArrB].join("");
    }  
}
calculator(btns);
