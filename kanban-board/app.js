var colorChange = document.querySelector(".color-range");
//create card - reference;
var createCardButton;

var createCardButtonBox;

var createCardButtonAdd;

var cardCancel;

var cardInput;
var cardListItem;
var allCardPlace;
var listWrapper;

//list related - 

var listMore;
var listMoreInfo;
var wholeList;
var listContainer = document.querySelector(".list-container");

//creation 
var createList = document.querySelector(".create-list-add");
var createListInfo = document.querySelector(".create-list-add-info");
var listCancel = document.querySelector(".list-cancel");
var listButtonAdd = document.querySelector(".list-input-button");

var newListTile = document.querySelector(".new-list-value");


//function
callingLatestElement();
doAAll();
dragAPI();

function callingLatestElement() {
    createCardButton = Object.values(document.getElementsByClassName("create-card"));
    createCardButtonBox = Object.values(document.getElementsByClassName("create-card-input"));
    createCardButtonAdd = Object.values(document.getElementsByClassName("card-input-button-add"));
    cardCancel = Object.values(document.getElementsByClassName("card-cross"));
    cardInput = Object.values(document.getElementsByClassName("card-input-value"));
    listMore = Object.values(document.getElementsByClassName("list-header-more"));
    listMoreInfo = Object.values(document.getElementsByClassName("list-header-more-info"));
    wholeList = Object.values(document.getElementsByClassName("list"));
    cardListItem = Object.values(document.getElementsByClassName("list-child-info"));
    allCardPlace = document.querySelectorAll(".allcard")
    listWrapper = document.querySelectorAll(".list-container-childs")

}


//template
function getTemplate(templateObject, titleValue) {

    var element = templateObject;
    element = document.querySelector("template");
    element = element.content.cloneNode(true);
    element.querySelector(".list-header-p").innerText = titleValue;

    return element;
}

//list creations

createList.addEventListener("click", function (event) {
    event.target.style.display = "none";

    createListInfo.style.display = "flex";
})
listCancel.addEventListener("click", function (event) {
    createList.style.display = "block";
    createListInfo.style.display = "none";
})

listButtonAdd.addEventListener("click", function (event) {
    var titleValue = newListTile.value;
    var templateObject;


    if ((document.querySelector(".list-container").childElementCount * 300 + 100) > 1040) {
        document.body.style.width = document.querySelector(".list-container").childElementCount * 300 + 550 + "px";
        console.log(document.querySelector(".list-container").childElementCount * 300 + 100 + "px")
    }



    templateObject = getTemplate(templateObject, titleValue);


    document.body.querySelector(".list-container").insertBefore(templateObject, listContainer.children[listContainer.childElementCount - 1]);
    newListTile.scrollIntoView(true)
    callingLatestElement();
    doAAll();
})



//drag api
function dragAPI() {

    cardListItem.forEach(function (item, index) {
        item.setAttribute("draggable", "true");
        item.style.cursor = "pointer";
        item.onmousedown = function () {
            item.style.cursor = "grabbing"
        }
        item.onmouseout = function () {
            item.style.cursor = "pointer"
        }
        item.ondragstart = function (drEv) {
            var element = drEv.target;
            drEv.dataTransfer.setData("text", index);
            element.style.transform = "rotate(5deg)"
            console.log(element.style.transform)
            
        }
        item.ondragend = function (drEv) {
            var element = drEv.target;
            element.style.transform = "rotate(0deg)"
            
            
        }
    });
    wholeList.forEach(function (item, index) {
        item.ondragover = function (dE) {
            dE.preventDefault();            
        }

        item.ondragenter = function (dE) {
            createShadowArea(item, dE.target, index);
        }
        item.ondrop = function (dE) {
            dE.preventDefault();
            var indexValue = dE.dataTransfer.getData("text");

            var shadowNode = document.querySelector(".list-child-info-shadow");

            if (allCardPlace[index] !== dE.target.parentElement) {
                allCardPlace[index].replaceChild(cardListItem[indexValue], shadowNode);

            } else {
                if (shadowNode != null) {
                    shadowNode.remove();
                }
            }
        }

    })
    allCardPlace.forEach(function (item, index) {
        item.ondragover = function (dE) {
            dE.preventDefault();
        }
        item.ondrop = function (dE) {
            dE.preventDefault();
            var indexValue = dE.dataTransfer.getData("text");

            var shadowNode = document.querySelector(".list-child-info-shadow");

            item.replaceChild(cardListItem[indexValue], shadowNode);

        }
        item.ondragenter = function (dE) {
            allCardShadowArea(item, index, dE.target);

        }

    })


}

function createShadowArea(parent, child, index) {
    var divShadow = document.createElement("div");

    divShadow.classList.add("list-child-info-shadow");

    var listHeader = document.querySelectorAll(".list-header");

    if (child === listHeader[index] || child.parentElement === listHeader[index]) {

        allCardPlace[index].insertBefore(divShadow, allCardPlace[index].childNodes[0])

    } else if (child === createCardButton[index] || child.parentElement === createCardButton[index]) {
        allCardPlace[index].appendChild(divShadow);
    } else {

    }

    var divShadowAlready = document.querySelectorAll(".list-child-info-shadow");
    for (var i = 0; i < divShadowAlready.length - 1; i++) {
        divShadowAlready[i].remove();
    }



}

function allCardShadowArea(parent, index, child) {
    var divShadow = document.createElement("div");
    divShadow.classList.add("list-child-info-shadow");

    var shadowZone = document.querySelector(".list-child-info-shadow");

    if (document.querySelector(".list-child-info-shadow") && !(shadowZone === child )) {
        document.querySelector(".list-child-info-shadow").remove();
        
    }

    parent.insertBefore(divShadow, child);
    


}




//card related

function doAAll() {
    listMore.forEach(function (item, index) {
        item.onclick = function (event) {
            listMoreInfo[index].classList.toggle("list-header-more-info-show")
            listMoreInfo[index].style.cursor = "pointer";
            for (var i = 0; i < listMoreInfo.length; i++) {
                if (i !== index) {
                    listMoreInfo[i].classList.remove("list-header-more-info-show");
                }
            };
            var percent = document.querySelector(".list-container").childElementCount * 300 + 100;
            if (percent > 1300) {
                document.body.style.width = (percent) + "px";
                console.log(percent)

            } else if (percent < 1100) {
                document.body.style.width = (100) + "%";
            }


        }
    })
    listMoreInfo.forEach(function (item, index) {
        item.onclick = function (event) {
            wholeList[index].remove();

        }
    })
    createCardButton.forEach(function (item, index) {
        item.onclick = function (event) {
            event.target.style.display = "none";
            createCardButtonBox[index].style.display = "flex";
            cardCancel[index].style.cursor = "pointer";
        }

    });
    createCardButtonAdd.forEach(function (item, index) {
        item.onclick = function (event) {
            var addingPlace = event.target.parentNode.parentNode.previousElementSibling.previousElementSibling;
            var value = cardInput[index].value;
            var createCard = document.createElement("div");
            createCard.classList.add("list-child", "list-child-info");
            createCard.innerHTML = value;
            addingPlace.appendChild(createCard);
            cardListItem = Object.values(document.getElementsByClassName("list-child-info"));
            dragAPI();
        }
    });

    cardCancel.forEach(function (item, index) {
        item.onclick = function (event) {
            createCardButton[index].style.display = "block";
            createCardButtonBox[index].style.display = "none";
        }
    });
}




colorChange.oninput = (inputEvent) => {
    document.body.style.backgroundImage = "none";
    colorChange.style.backgroundColor = colorChange.value;
    document.body.style.backgroundColor = colorChange.value;

};

//background related;

var hamburger = document.querySelector(".header__nav-hamburger");

hamburger.onclick = function (event) {

    var backgroundStatic = document.querySelectorAll("img");
    var srcButton = document.querySelector(".src-button");
    var srcInput  = document.querySelector("#image");
    var dateToday = new Date();
    var datePlace = document.querySelector(".date-place");
    var month = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sep", "Oct", "Nov", "Dec"]
    datePlace.innerHTML = dateToday.getDate()+ " "+ month[dateToday.getMonth()]+ ", "+ dateToday.getFullYear();
    
    srcButton.onclick = function () {
        var imageValue = srcInput.value;
        if(imageValue === "a") {
            imageValue = "https://image.tmdb.org/t/p/original/6fZebrmLHzbT9QLBUbrh7ovuh6Q.jpg";
        }else if (imageValue == "m") {
            imageValue = "https://assets.wallpapersin4k.org/uploads/2017/04/Mata-Rani-Images-HD-Wallpaper-9.jpg";
        }
        document.body.style.backgroundImage = "url("+imageValue+")";
    }

    backgroundStatic.forEach(function (item, index) {
    item.onclick = function (event) {
        var image = item.src;
       
            document.querySelector(".header__info").style.color ="white";           
            document.querySelector(".create-list-add").style.color ="white";
            document.querySelector(".create-list-add").style.fontWeight ="bold";
       
            document.body.style.backgroundImage = "url(" + image +")";
        
        
    }
})


}

