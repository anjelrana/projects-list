//global variable

var inputName = document.querySelector(".data__list-item-input-name");
var inputNumber = document.querySelector(".data__list-item-input-number");

var buttonAdd = document.querySelector(".button--add");
var buttonName = document.querySelector(".button--name");
var buttonNumber = document.querySelector(".button--number");


var dataDiv = document.querySelector(".data");

//global live code - variable html collection

var indexNumber= document.getElementsByClassName("data__list-item-index");



var names = [];
var number = [];

var nameDisplaceValue = [];
var numberDisplaceValue = [];

//output section
var outputPara  = document.querySelector(".output-para")
;
var maxValue  = document.querySelector(".max-value")
;
var minValue  = document.querySelector(".min-value")
;


// function

// adding the name of the person and number to the list.
function enterHandler(event) {
    if(event.key == "Enter") {
        addHandler();
    }
}

function addHandler(event) {
    var inputNameValue = inputName.value;
    var inputNumberValue = inputNumber.value;

    var checkResult = checkValue(inputNameValue, inputNumberValue);
    
// using the funciton as the high order 

 if(checkResult)
{    createDivElement(createIndexNumber,createElementName,inputNameValue, createElementNumber,inputNumberValue);
    //createIndexNumber,createElementName, createElementNumber,inputNameValue,inputNumberValue 
    updateIndexNumber();
    console.log(names, number);
    outputPara.innerText = ""
}else {
    outputPara.innerText = "please put some valid input in each box"
}

} 

function checkValue(name, number) {
    var patternName = /^\D{1,}/ ;
    var patternNumber = /^\d{1,}/;
   if(patternName.test(name) != true) {
       return false;
   }
   if (patternNumber.test(number)!= true && number.length != 0) {
      return false;

   }
 

   return true
}



function createDivElement(createIndexNumber,createElementName, inputNameValue,createElementNumber,inputNumberValue) {
    
    var dataChild = document.createElement("div");
    dataChild.classList.add("data__child","data__list");

    var indexElement = createIndexNumber();
    dataChild.appendChild(indexElement);

    var elementName = createElementName(inputNameValue);
    dataChild.appendChild(elementName);

    var elementNumber = createElementNumber(inputNumberValue);
    dataChild.appendChild(elementNumber);

    var lastElementDiv = dataDiv.childNodes[dataDiv.childNodes.length-2];
    dataDiv.insertBefore(dataChild, lastElementDiv);

}
function createIndexNumber() {
    var element = document.createElement("div");
    element.classList.add("data__list-item-index");

    return element;
}
function createElementName(value) {
    var element = document.createElement("div");
    element.classList.add("data__list-item-name");
    element.innerText = value;
    names.push(value); //pushing the name to the array for sorting.
    return element;
}
function createElementNumber(value) {
    var element = document.createElement("div");
    element.classList.add("data__list-item-number");
    element.innerText = value;
    number.push(value); // pushing the name to the array for sorting.
    return element;
}

function updateIndexNumber() {   
    var indexNumberArray = Object.values(indexNumber) ;

    indexNumberArray.map(function (item, index) {
       item.innerText = index+1;
       item.scrollIntoView(true);
        return item;

    })
    
}

//sorting the value via name

function sortNameHandler(event) {    
    var nameList = [];
    nameList = nameList.concat(names);
    var list = sort(nameList);
    displaceName(list);
    replaceChildNode(list, nameDisplaceValue);
    outputPara.textContent = "This is your result! for name with no max and min value";
    maxValue.innerText = "-";
    minValue.innerText = "-";
}

function sort(list) {
    var listNames = list;
    listNames.sort(compare);
    
    function compare(ob1, ob2) {
        //toLowerCase();

        if(ob1.toLowerCase() > ob2.toLowerCase()) {
           
            return 1;
           
        }else if (ob1.toLowerCase() < ob2.toLowerCase()) {
            return -1;
        }
        return 0;
    }
    return listNames;
}

function displaceName(list) {
    var previousList = names ;
    var newList = list ; 

    newList.forEach(function (item, index) {
    var changeValue = previousList.indexOf(item);
    console.log(changeValue)
     nameDisplaceValue.push(changeValue);
    })
}

function replaceChildNode(arrayList, numberListing) {
    var listOfObject = document.getElementsByClassName("data__list-item-name");
    listOfObject = Object.values(listOfObject);
    var listOfObjectNumber = document.getElementsByClassName("data__list-item-number");
    listOfObjectNumber = Object.values(listOfObjectNumber);

   
    for(var i = 0 ; i < listOfObject.length ; i++) {
        listOfObject[i].innerText = arrayList[i]; 
        listOfObjectNumber[i].innerText = number[numberListing[i]];
    }
    console.log(arrayList, numberListing);
    console.log(listOfObjectNumber);
        
   
}

// sorting for the number - 

function sortNumberHandler(event) {
    var numberList = [];
    numberList = numberList.concat(number);
    sortNumber(numberList);
    console.log(numberList);
    displaceNumber(numberList);
    replaceNumber(numberList, numberDisplaceValue);
    finalOutput(numberList);
}
function sortNumber(number) {
    number.sort(function (a,b) {
        return a - b;
    })
}
function displaceNumber(numberList) {
    var previousList = number;
    var newList = numberList ; 

    newList.forEach(function (item, index) {
    var changeValue = previousList.indexOf(item);
    console.log(changeValue);
     numberDisplaceValue.push(changeValue);
    })
}
function replaceNumber(newNumberlist, nameListValue ) {
    var listOfObject = document.getElementsByClassName("data__list-item-name");
    listOfObject = Object.values(listOfObject);
    var listOfObjectNumber = document.getElementsByClassName("data__list-item-number");
    listOfObjectNumber = Object.values(listOfObjectNumber);

   
    for(var i = 0 ; i < listOfObject.length ; i++) {
        listOfObjectNumber[i].innerText = newNumberlist[i]; 
        listOfObject[i].innerText = names[nameListValue[i]];
    }
    console.log(newNumberlist, nameListValue);
}

//
function finalOutput(list) {
    var max = maxF(list);
    var min = minF(list);
    console.log(list);

    maxValue.innerText = " Max value is " + max ;
    minValue.innerText = " min value is " + min ;
    outputPara.textContent = "This is your result! added with max and min value";
}

function maxF(list) {
    var value = Math.max.apply(null, list)
    return value;
}

function minF(list) {
    var value = Math.min.apply(null, list)
    return value;
}











// event listener

buttonAdd.addEventListener("click", addHandler);
window.addEventListener("keypress", enterHandler );
buttonName.addEventListener("click", sortNameHandler);
buttonNumber.addEventListener("click", sortNumberHandler);


document.querySelector(".button--restart").onclick = function () {
    location.reload();
}