// var url = "https://lessonfourapi.tanaypratap.repl.co/translate/yoda.json?text=I like to learn and build";

// var value = fetch(url);
// value.then(res => res.json())
// .then(value => console.log(value.contents.text));

var selectElement = document.querySelector("#select-coin");
var coinPicture = document.querySelector(".coin-image");

var pricePurchased = document.querySelector(".price-of-coin");
var quantityOfCoins = document.querySelector(".quantity-of-coin");
var datePurchasing = document.querySelector(".date-purchased");

var buttonGetData = document.querySelector(".get-data");







//event listener

buttonGetData.addEventListener("click", function () {
    var pattern =/^\d*\.?\d*$/;

    var coinName = selectElement.value;
    var valuePrice = pricePurchased.value;
    var valueQuantity = quantityOfCoins.value;
    var valueDateString = datePurchasing.value;
    
    
    if(coinName == "select") {
        pricePurchased.value = "please select the coin";
        
    }else if (pattern.test(valuePrice)&&pattern.test(valueQuantity)) {
      
        processData(valuePrice, valueQuantity, coinName, valueDateString);
    }else  {
        quantityOfCoins.value = "";
        pricePurchased.value = "please enter valid value";
        
        pricePurchased.title ="eg: 0.1 or 1000 - in rupees";
    }

})

function processData(valuePrice, valueQuantity, coinName, valueDateString) {
    var price = valuePrice;
    var quant = valueQuantity;
    var date = valueDateString;
    var coin = coinName;

     happy = ["awesome.png","beating-market.png","buff.png","going-up.png","going-up2.png","high.png"];
     sad = ["low.png", "verylow.png"];
     sadCount = Math.floor(Math.random()*2);
     happyCount = Math.floor(Math.random()*6);
     currentDogeImage  = document.querySelector(".image-doge");

     coinNameValue  = ["bitcoin", "dogecoin","ethereum","shiba-inu", "tether","binance","ripple", "litecoin","uniswap"]
    
     var priceOnParticularDay;
     var currentDayprice;

    // /fetching the value - like current price on the day or the today's date/
    date = date.split("-");
    date.reverse()
    var newDateValue = date.join("-");
    console.log(newDateValue)



    var url ;

    if(!(newDateValue)) {
       url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=" + coinNameValue[coin];
       fetchData();
       console.log("fetching the data")
    }else {
       let url0 = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&ids=" + coinNameValue[coin];
       let url1 = "https://api.coingecko.com/api/v3/coins/"+coinNameValue[coin]+"/history?date="+newDateValue+"&localization=false";
       fetchDate$data(url0,url1);
       
    }
    function fetchDate$data(url0,url1) {
        fetch(url0).then(response => response.json()).then(function (json) {
            currentDayprice = json[0].current_price;

            fetch(url1).then(response => response.json()).then(json =>{
                price = json.market_data.current_price.inr;
                var arrayValue = calculation(price, currentDayprice, quant);
                var p$f = document.querySelectorAll(".profit-loss");

               // console.log(price)
            if(arrayValue[1] < 0) {
                p$f.forEach(item => {
                 item.style.color = "red";
                 item.nextElementSibling.style.color = "red";
                })
                document.body.style.backgroundImage = "url(down.jpg)";
                currentDogeImage.src = "images-meme/"+ sad[sadCount];
            }else {
             p$f.forEach(item => {
                 item.style.color = "chartreuse";
                 item.nextElementSibling.style.color = "chartreuse";
                 document.body.style.backgroundImage = "url(up.jpg)";
                 currentDogeImage.src = "images-meme/"+ happy[happyCount];
                 console.log(currentDogeImage.src)
             })
            }
             var outputArea = document.querySelectorAll(".value-result");
             outputArea.forEach(function(item, index) {
                 item.innerHTML = arrayValue[index];
             })
            })
            
            
            
        }).catch(errorMistake => {
            console.log(errorMistake);
        });  
    }
    

    function fetchData() {
        fetch(url).then(response => response.json()).then(function (json) {
            currentDayprice = json[0].current_price;
            
            var arrayValue = calculation(price, currentDayprice, quant);
            var p$f = document.querySelectorAll(".profit-loss")
         
         
         
            if(arrayValue[1] < 0) {
                p$f.forEach(item => {
                 item.style.color = "red";
                 item.nextElementSibling.style.color = "red";
                })
                document.body.style.backgroundImage = "url(down.jpg)";
                currentDogeImage.src = "images-meme/"+ sad[sadCount];
            }else {
             p$f.forEach(item => {
                 item.style.color = "chartreuse";
                 item.nextElementSibling.style.color = "chartreuse";
                 document.body.style.backgroundImage = "url(up.jpg)";
                 currentDogeImage.src = "images-meme/"+ happy[happyCount];
                 console.log(currentDogeImage.src)
             })
            }
             var outputArea = document.querySelectorAll(".value-result");
             outputArea.forEach(function(item, index) {
                 item.innerHTML = arrayValue[index];
             })
            
        }).catch(errorMistake => {
            console.log(errorMistake);
        });  
    }
    
    
      
   
  
   

   
}
/*https://www.coingecko.com/en/api#explore-api*/ 



function calculation(p, cp, q) {
    var arrayValue = [];

    arrayValue.push(cp);

    var result = cp*q - p*q ;
    arrayValue.push(result);
    var resultPercent = Math.trunc(((result/(p*q))*100)) + "%";
    arrayValue.push(resultPercent);

    return arrayValue;
}




selectElement.oninput = function (iEvent) {
    var value = iEvent.target.value;
    coinPicture.src = "images-meme/"+value+".png";  
   
}



