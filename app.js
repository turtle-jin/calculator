
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

const displayBottomRow = document.querySelector("#displayBottomRow");
const displayTopRow = document.querySelector("#displayTopRow");
const btns = document.querySelectorAll("button"); 
const MAX_INPUT_LENGTH = 18; 

let inputArrA = [];
let inputOperatorArr = [];
let inputArrB = [];
let operatorArr = ["+", "-", "*", "/", "^"]
let firstInput; 
let secondInput; 
let operatorChosen;
let result; 
let negativeFlag = false;
let topRowDisplayArr = [];



function clearArr (arr) {
    arr.length = 0; 
}


function del_last(arr) {
    arr.splice(-2);
}



//TODO add negative logic
    //multiply -1 to the num



//TODO round decimals if it gets out of the display window (22 digits total)

//TODO disable decimal button after user has pressed it once for each number


function calculator(btns) {
    
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            

            if (btn.value === "C") {
                result = ""; 
                clearArr(inputArrA); 
                clearArr(inputArrB);
                clearArr(inputOperatorArr);
                clearArr(topRowDisplayArr);
                displayTopRow.textContent = "";
                displayBottomRow.textContent = "";
                return;
                
            }

            //if operatorArr is not empty, and user clicked operator key
            if (inputArrA.length !== 0 && operatorArr.includes(btn.value) && btn.value !== "C") {
                inputOperatorArr.push(btn.value);
                console.log(`operator arr is ${inputOperatorArr}`);
                
                if (inputOperatorArr.includes("DEL")) {
                    del_last(inputOperatorArr);
                }
            }

            operatorChosen = inputOperatorArr[0];
            updateDisplay();
            
            console.log(`the operator user picked is ${operatorChosen}`);
            
           // when arrA is empty, add keys to ArrA 
            if (inputOperatorArr.length === 0 && btn.value !== "C" && inputArrA.length <= MAX_INPUT_LENGTH) {
                inputArrA.push(btn.value); 
                displayBottomRow.textContent = "";
                console.log(`arrA is ${inputArrA}`);
                console.log(`arrA length is ${inputArrA.length}`)
                if (inputArrA.includes("DEL")) {
                    del_last(inputArrA);
                }
            
            }
            
            
            firstInput = Number(inputArrA.join(""));
            
            console.log(`first input is ${firstInput}`);
            

            //when operator is identified, put the rest of the keys in arrB
            if (inputOperatorArr.length !== 0 && !(operatorArr.includes(btn.value)) && btn.value !== "=" && inputArrB.length <= MAX_INPUT_LENGTH) {
                inputArrB.push(btn.value);
                console.log(`arrB is ${inputArrB}`)
                if (inputArrB.includes("DEL")) {
                    del_last(inputArrB);
                }
            }

            secondInput = Number(inputArrB.join(""));
            
            console.log(`second input in ${secondInput}`);
            updateDisplay();
            
            
            

            //when = sign is clicked

            if (btn.value === "=") {
                result = operate(operatorChosen, firstInput, secondInput);
                
                console.log(`the result is ${result}`);
                displayBottomRow.textContent = result;
                clearArr(inputArrA);
                clearArr(inputArrB);
                clearArr(inputOperatorArr);
                inputArrA.push(result);
                updateDisplay();
                return;
                
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
                displayBottomRow.textContent = '';
                
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