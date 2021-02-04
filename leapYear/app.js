// global variable 
var RegExp = /[0-9]/;
var inputText = document.querySelector(".section__input");
var outputDiv = document.querySelector(".output");
var outputDivValue = document.querySelector(".output-value");
var buttonClick = document.querySelector(".primary-link");
var paragraphElement = document.createElement("p");
var paragraphText = document.createTextNode("This is what you have given: ");
var outputDivText = paragraphElement.appendChild(paragraphText);
outputDiv.insertBefore(outputDivText, outputDivValue);

//function 

function clickHandler() {
    //checking the number coming and making it validating using the regex value.
    var inputTextValue = inputText.value;
    var checkResult = checkingNumber(inputTextValue);

    // checking the the year 
    LeapYear(checkResult, inputTextValue);

    //debugger
    console.log(inputTextValue);

}
//checking the value.

function checkingNumber(inputTextValue) {

    if (RegExp.test(parseInt(inputTextValue))) {


        outputDivValue.innerText = inputTextValue;
       
     return true;

    } else {
        outputDiv.innerHTML = "please add valid number";
        return false;
    }
    
}
// checking the number for leap year
function LeapYear(number, inputTextValue) {
    if (number) {
        console.log(1);
        var leapYearNumber = parseInt(inputTextValue);
        if(leapYearNumber%4 === 0 &&leapYearNumber%100 === 0 &&leapYearNumber%400 === 0  ){
            let combine = inputTextValue + " is a leap year";
            outputDivValue.innerText = combine;
        } else if (leapYearNumber%4 === 0 && leapYearNumber%100 ===0){
            let combine = inputTextValue + " is not a leap year";
            outputDivValue.innerText = combine;
        }else if (leapYearNumber%4 === 0 ){
            let combine = inputTextValue + " is a leap year";
            outputDivValue.innerText = combine;
        }
        else {
            let combine = inputTextValue + " is not a leap year";
            outputDivValue.innerText = combine;
        }

    }else {
        console.log("check the value")
    }
}

buttonClick.addEventListener("click", clickHandler);