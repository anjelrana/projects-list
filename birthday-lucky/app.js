var dateBirthday = document.querySelector(".date-birthday");
var luckyNumber  = document.querySelector(".lucky-number");
var dayDate = document.querySelector("#day-date");
var outputFirst = document.querySelector(".lucky-output")
var outputSecond = document.querySelector(".day-output")


var dayButton = document.querySelector(".day");
var luckyButton = document.querySelector(".lucky");



// function 

function luckyButtonHandler(event) {
    var valueDate = dateBirthday.value;
    var valueLuckNumber = luckyNumber.value;

    var totalDays = addDays(valueDate);
// remainder we are getting
    var valueRemainder = totalDays%valueLuckNumber;
// displaying the value

    if((!isNaN(valueLuckNumber))) {
        valueRemainder === 0 ? outputFirst.innerHTML = "<p>You are lucky my child</p>" : outputFirst.innerHTML = "<p>You know what you are lucky to alive and no harm in changing the lucky number or date in DOB certificate.</p>";

        outputFirst.style.borderBottom= "4px yellow solid" 

    }else {
        outputFirst.innerHTML = "<p>Please put the valid number in lucky input</p>"
    }


}

function addDays(dateString) {
    var date = new Date(dateString);
    var monthsDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    var monthsDaysLeapYear = [31,29,31,30,31,30,31,31,30,31,30,31];
    var addedDays = 0;
    var monthTotalDays = date.getDate();
    var monthNo = date.getMonth();
    var yearNo = date.getFullYear();
    if(yearNo % 4 != 0 ){
        for(var i = 0; i < monthNo; i++){
            addedDays += monthsDays[i];
        }
        addedDays += monthTotalDays;
    }else {
        for(var i = 0; i < monthNo; i++){
            addedDays += monthsDaysLeapYear[i];
        }
        addedDays += monthTotalDays;
    }

    console.log(addedDays, monthTotalDays,monthNo, yearNo);
    return addedDays;
}




function dayButtonHandler(event) {
  var dateValue = dayDate.value;
  
  var date = new Date(dateValue);
  
  var dayName = ["sunday", "monday", "tuesday","wednesday", "thursday", "friday", "saturday"];

  var getDay = date.getDay();

  if(dateValue.length != 0) {
    outputSecond.innerHTML = "<p>Day is : -- " + dayName[getDay]+" </p>"
    outputSecond.style.borderBottom= "4px yellow solid" ;
  }else {
    outputSecond.innerHTML = "<p>Please first select the date</p>"
  }


}




















// adding event listeners
luckyButton.addEventListener("click", luckyButtonHandler);
dayButton.addEventListener("click", dayButtonHandler);