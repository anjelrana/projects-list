var billAmount = document.querySelector("#bill-amount");
var cashReceived = document.querySelector("#cash-received");

var wholeBill = document.querySelector(".bill");
var wholeCash = document.querySelector(".cash");

var findButton = document.querySelector(".hit");
var resultAmount = document.querySelector(".notes__return-value");
var divisor = [400,100,20,4,2,1]; // in reverse
var numberOfNotes = [0];
var valueOfNotes = [0,0,0,0,0,0];
var changingValue ;


var nextValue = document.querySelector(".next");
var restartButton = document.querySelector(".restart");


onload = function () {
  wholeCash.style.display = "none";

}

nextValue.onclick = function () {
  if(checkValue()) {
  
    wholeCash.style.display = "unset";
    wholeBill.style.display = "none";
  }

}


findButton.onclick = clickHandling;
restartButton.onclick = function () {
  billAmount.value = " ";
  cashReceived.value = " ";
  wholeCash.style.display = "none";
  wholeBill.style.display = "unset";
}



function clickHandling() {
    var value1 = billAmount.value;
    var value2 = cashReceived.value;
    var check = checkValue();
    if(check)    {  
        var diff = value2 - value1;
        resultAmount.innerHTML = diff;
        var result = getNotes(diff);
        console.log(result);
        domValueChanging(result);
        // billAmount.value = " ";
        // cashReceived.value = " ";
    }else {
        resultAmount.innerHTML = "Please Enter the Number";
    }
    
}

function checkValue() { 
    var value1 = billAmount.value;
    var value2 = cashReceived.value;
    var pattern = /\d{1,}/;
    if(pattern.test(value1) === true) { 
        return true;
    }else   if (pattern.test(value2) === true ){

        return true;

    }
    return false;
}


/*algorithm understanding for the work tomorrow*/

// 1/5x , x , 2x, 4x, 20x,100x,400x
//diving the number or the difference value we got in the number with 5 and making it a floor and the remain will the number of the 1 rupee notes.

// we will assign the number of number to the array as will going to the value from the for loop.
//[0,0,0,0,0,0,0]

//making an array of [1,2,4,20,100,400] in reverse order; that will divide the value.
// assuming the quotient is 315

// we need to check whether the quotient we got is divisible by checking is if smaller or greater. 315 < 400 and we will do nothing then. 

// but in the case it is greater than the 100 there we will divide and assuming there will some remainder than we use the remainder operator and get the value and pass it to the value for the next loop. i.e 15 and this time it will pass the value and there will no change. and will move on to the next divisor and remainder will be 3 and so on until the loop is over and we get the our number of notes in the form of array.




function getNotes(number) {
  var quotientFive = Math.floor(number/5);
  var valueOfOneNote = number%5;
  numberOfNotes[0] = valueOfOneNote;
 
  getOtherValue(quotientFive);

 	var finalValue = numberOfNotes.concat(valueOfNotes.reverse()) ;
  
  return finalValue;
}

function getOtherValue(value) {
  changingValue = value;
  for (var i = 0; i< divisor.length; i++) {
    if(divisor[i] > changingValue ){
      console.log("it greater in case of " +divisor[i] )
      valueOfNotes[i]= 0;
    }else if  (divisor[i] <= changingValue) {
      var numberOfNotesAtPlace = Math.floor(changingValue/divisor[i]);
      valueOfNotes[i]= (numberOfNotesAtPlace);
      var newValueOfChangingValue =  changingValue% divisor[i];
      changingValue = newValueOfChangingValue;
      console.log(changingValue, "this is the value")
    }else {
     console.log("hello world")
    }
  }
  console.log(valueOfNotes);
}

function domValueChanging(arr) {
    var notesNumber = document.querySelectorAll(".notes__number");
    console.log(notesNumber);
    notesNumber = Array.from(notesNumber);
    notesNumber.map((item, index)=> {
        
        item.innerHTML = arr[index]; 
    })
}


