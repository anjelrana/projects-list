// all global variable 
var RegExp = /^\d{1,2}\/\d{1,2}$/;
var buttonClick = document.querySelector(".primary-link");
var outputDiv = document.querySelector(".output");
var outputDivValue = document.querySelector(".output-value");
var inputText = document.querySelector(".section__input");

var paraElement = document.createElement("p");
var paraText = document.createTextNode("This is your DD/MM: ");
var divText = paraElement.appendChild(paraText);
outputDiv.insertBefore(divText, outputDivValue);


//function
function clickHandler(){
    // console.log("Bang on!");
    var inputTextValue = inputText.value;
    var checkResult = checkingDate(inputTextValue);

    //checking the further - days and month.
    var checkDateMonth = checkingDateMonth(checkResult, inputTextValue);
    // checking the month- date;
    var checkExactDateOfMonth = checkingExactDate(checkDateMonth, inputTextValue);
    //calculating the totalNumber
    var checkTotalDays = checkingTotalDays(checkExactDateOfMonth, inputTextValue);
    //odd or even date
    evenOrOdd(checkTotalDays);


}
function checkingDate(inputTextValue) {
    if(RegExp.test(inputTextValue)){
        outputDivValue.innerHTML = inputTextValue;
        return true;
    }else {
        outputDivValue.innerHTML =  "please put valid input";
    }
}

function checkingDateMonth(number, inputTextValue) {
    if (number){
        var date = inputTextValue.slice(0,2);
        var month = inputTextValue.slice(3,5);
        
        if(date <= 31 && month <=12 ) {
            return true;
        }else {
            outputDivValue.innerHTML =  "please put valid input";
        }

    }
    else {
        outputDivValue.innerHTML =  "please put valid input";
    }
}

// checking the month- date; 
function checkingExactDate(validMonth, inputTextValue){
    if(validMonth) {
        
        var date = parseInt(inputTextValue.slice(0,2));
        var month = parseInt(inputTextValue.slice(3,5));
       if(month < 8) {
        if (month === 2 && date > 28) {
            outputDivValue.innerHTML =  "please put valid input";    
        }     else if (month == 2 && date <=28 ) {
            return true;
        }
        else if(month % 2 ===1 && date <=31 ) {
            return true;
        } else if (month % 2 ===0 && date<=30) {
            return true;
        } else {
            outputDivValue.innerHTML =  "please put valid input";  
        }
        
       } else {
           if(month%2===0 && date <=31) {
               return true;
           } else if(month%2===1 &&date <=30){
               return true;
           }else {
            outputDivValue.innerHTML =  "please put valid input";
           }

       }

    }else {
        outputDivValue.innerHTML =  "please put valid input";
    }
}
// checking total days :

function checkingTotalDays(exactDate, inputTextValue) {
    if(exactDate) {
        var numberOfMonthDays = [31,28,31,30,31,30,31,31,30,31,30,31];
        var date = parseInt(inputTextValue.slice(0,2));
        var month = parseInt(inputTextValue.slice(3,5));
        var totalDays = 0;
        for (var i = month -2 ; i > -2 ; i-=2){
            if( i === -1 || i===-2) {
               console.log(1);
                 totalDays += date;
            }else if(i === 0) {
                totalDays = totalDays+date + numberOfMonthDays[i] ;
              console.log(2);
            }
            else if (i >= 1){
                 totalDays = totalDays+ numberOfMonthDays[i] + numberOfMonthDays[i-1]; 
              console.log(3);
            }

        }
        return totalDays;

    }else {
        outputDivValue.innerHTML =  "please put valid input";
    }
}

//even or odd 
function evenOrOdd(totalDays) {
    if(totalDays%2 ===0) {
        let valueExpression = "Total number of days is :" +totalDays+ "<br> And it's an even date";
        outputDivValue.innerHTML =  valueExpression;
    }else {
        let valueExpression = "Total number of days is :" +totalDays+ "<br> And it's an odd date I am mean no pun intended.";
        outputDivValue.innerHTML =  valueExpression;
    }
}


//event listener 

buttonClick.addEventListener("click", clickHandler)
