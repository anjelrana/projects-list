var inputTextArea = document.querySelector(".inputTake");

var clickButton = document.querySelector(".primary-link");

var paraElement = document.createElement("p");
var paraText = document.createTextNode("Here is your latin phineas and ferb translation 👇 :  ");

 var divText = paraElement.appendChild(paraText);
var outputDiv = document.querySelector(".output");
var outputDivValue = document.querySelector(".output-value");

outputDiv.insertBefore(divText, outputDivValue);

//functions 

function clickHandle() {
    var textSendToSever = inputTextArea.value;
    var urlEncoded = urlConstruction(textSendToSever);
    

  fetchingData(urlEncoded);

  
}

//constructing the API endpoint for fetch to get the json data.

function urlConstruction(input){
    var url = "https://api.funtranslations.com/translate/ferb-latin.json" +"?text=" +input;
    return url;
}
function fetchingData(url) {
    fetch(url)
    .then(responseApi)
    .then(storeJson)
    .catch(errorHanding);
}

function responseApi(response) {
    return response.json();
}
function storeJson(json) {
    var  translationKey = json.contents.translated ;
    outputDivValue.innerHTML = "<br><br>"+translationKey;
}
function errorHanding(error) {
    outputDivValue.innerHTML = "Try after Sometime Please - server is working - after 1 hour"+ error;
}

//fetch function


// click event 

clickButton.addEventListener("click", clickHandle);
