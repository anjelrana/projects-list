let timer = document.querySelector(".timer");
let scramble = document.querySelector(".scramble");
let dropZone = document.querySelectorAll(".drop-zone");
let dropItem = document.querySelectorAll("img");var output = document.querySelector(".output")
let stop;

let img = new Image();
   img.src = "1.png";
var m = s = 0;



//drag and drop - API
dropZone.forEach((item, index)=>{
    item.addEventListener("dragover", draggingOver, false) ;
item.addEventListener("drop", droppingItem, false) ;
item.addEventListener("dragleave", function (dE) {
    dE.target.style.opacity = "1"
}, false)

})
dropItem.forEach((item) => {

item.addEventListener("dragstart", draggingItem, false) ;

})//only in this event we are able to set the data - as the drag event is going 



function draggingItem(dE) {
    dE.dataTransfer.setData("image/png", dE.target.id);

    
void dE.dataTransfer.setDragImage(img, 50,50);

    

}
function draggingOver(dE) {
    dE.preventDefault();
    dE.target.style.opacity = "0.6"

}
function droppingItem(dE) {
    dE.preventDefault();
    dE.target.style.opacity= "1"

    var imgId = dE.dataTransfer.getData("image/png");
    var dataFloat = document.getElementById(imgId);
    var dataFloat2 = dE.target.parentElement.firstElementChild;
    var parent = dataFloat.parentElement;

    dE.target.parentElement.replaceChild(dataFloat,dataFloat2 );
   parent.appendChild(dataFloat2)

    var solved =   checkingPuzzle();
    
    if(solved) {
        output.innerHTML = m+" minutes and "+ s +" seconds taken to complete";
        stop.click();
    }else {
        output.innerHTML = "try a bit harder"
        }
}

function checkingPuzzle() {
    // getting the src value.
    var src = Array.from(dropZone).map(item=> {
        var child = item;

      return  item.firstElementChild.src.match(/\d(?=.png)/g)[0];

    })

    return src.every(function (item, index) {
        return item == index;
    })
    
}

// event listener 
timer.onclick = function () {
    let time = document.querySelector(".Timing");
     stop = document.querySelector('.stop');
    let minutes = 0, seconds = 0;
    scramble.click();
   
    var timeOb = setInterval(function () {
        seconds++;
         m = String(minutes).padStart(2,"0");
         s = String(seconds).padStart(2, "0");

        time.innerHTML = m+":"+s;
        console.log(m,s);

        if(seconds > 60) {
            minutes++;
        }
        
    },1000);

    stop.onclick = function () {
        clearInterval(timeOb);
    }
    
}

scramble.addEventListener("click", jumbleIt, false);

function jumbleIt() {
    var allImg = document.querySelectorAll("img");
    let numberOfImage = [0,1,2,3,4,5,6,7,8]
   allImg.forEach(function (item) {
    var src ;    
    var randomNo = Math.floor(Math.random()*numberOfImage.length);
    src = numberOfImage[randomNo];
     numberOfImage.splice(randomNo,1);
    
    item.src = "images/"+src + ".png";

   })
   timer.click();
}