
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
const mooBtn = document.querySelector(".moo"); 
const mooSound = document.querySelector("#mooSound");
mooBtn.addEventListener("click", ()=> {
    mooSound.play();
})

const currentDisplay = document.querySelector("#currentDisplay");
const displayTopRow = document.querySelector("#displayTopRow");
const btns = document.querySelectorAll("button"); 

let inputArr = [];
let operatorArr = ["+", "-", "*", "/", "^"]
let firstInput; 
let secondInput; 
let operatorChosen;
let result; 

function clearArr (arr) {
    arr.length = 0; 
}

//TODO add DEL function
    //remove the last key entered in the arr
function del_last(arr) {
    arr.splice(-2);
}

//TODO add the logic to continue run operation after one = sign is detected
    //if no num entered, use previous result as the firstInput
    //if new num is entered, wipe previous entry and start new one

//TODO add negative logic
    //multiply -1 to the num

function getInput(btns) {
    btns.forEach(btn => {
        btn.addEventListener("click", () => { 
            inputArr.push(btn.value);
            console.log(inputArr); 
            
            let operatorIndex = inputArr.findIndex(item => operatorArr.includes(item));
            if (operatorIndex !== -1) {
                firstInput = Number(inputArr.slice(0, operatorIndex).join(""));
                operatorChosen = inputArr[operatorIndex];
                console.log(`first input is ${firstInput}`);
                console.log(`operator is ${operatorChosen}`);
                
                
                let equalIndex = inputArr.indexOf("=");
                if (equalIndex !== -1) {
                    secondInput = Number(inputArr.slice(operatorIndex + 1, equalIndex).join(""));
                    console.log(`second input is ${secondInput}`);
                    // Perform calculation
                    result = operate(operatorChosen, firstInput, secondInput);
                    console.log(`result is ${result}`);
                    
                }
            } 
            
            if (inputArr.includes("C")) {
                result = ""; 
                clearArr(inputArr); 
                
                console.log(`remaining arr is ${inputArr}`)
            }

            if (inputArr.includes("DEL")) {
                del_last(inputArr);

                console.log(`after del btm the arr is ${inputArr}`);
            }
            displayTopRow.textContent = inputArr.join("");
            currentDisplay.textContent = result;
           
        });
    });
}


getInput(btns);


