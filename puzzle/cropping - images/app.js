 let input = document.querySelector("input");
 let sizeInput = document.querySelector(".size");
 let typeInput = document.querySelector(".type");
 let showImage = document.querySelector("img");
 let cropInput = document.querySelector("#crop");
 let startCrop = document.querySelector("#crop-start");
 let preview = document.querySelector(".preview");
 let canvas3 = document.querySelector("#showcase");
 let next = document.querySelector(".next");
 let prev = document.querySelector(".prev");
 let downloadImg = document.querySelector(".downloadImg")
 

 //canvas
 let canvas = document.querySelector("#canvas");
 let canvas2, ctx2,ctx3;
 let dataURLs = [];
 let ctx = canvas.getContext("2d")
 ctx3 = canvas3.getContext("2d");
 let countImg; 

 function getCanvas2() {
    canvas2 = canvas.cloneNode(true);
    canvas2.setAttribute("class", "canvas2");
    canvas2.removeAttribute("id");

    canvas.insertAdjacentElement("afterend", canvas2)

    return canvas2.getContext("2d");
 }

 input.onchange = function () {
    var fileList = input.files;
    fileList = fileList[0];

    sizeInput.textContent = "Size : "+ getSize(fileList.size);
    typeInput.textContent = "Type : "+ fileList.type;

    //image putting up 
    
    showImage.onload = function () {
        ctx.drawImage(showImage, 0,0,600,600)
        //check for the load in case media files 
    }      

    showImage.src = URL.createObjectURL(fileList);

    }

 function getSize(number) {
    if(number > 1048576) {
        var cal = number/1024*1024;
        return cal.toFixed(1) + " MB";
    }else {
        var cal = number/1024 ;
        return cal.toFixed(1) + " KB";
    }
 }

 //inputs for for the crop.

 
startCrop.addEventListener("click", showArea, false);

function showArea(event) {
    
    if(ctx2 != undefined) {
        canvas2.remove();
    }
    
    ctx2 = getCanvas2();
    let cropValue= cropInput.value;

    selection(cropValue);

    cutAndData(cropValue);

}


    function cutAndData(cropValue) {

        var WxH = createDimension(cropValue);
        var widthArr = creatingArray(cropValue , "width" , WxH);
        var heightArr = creatingArray(cropValue, "height",WxH );
        
        canvasClipping(widthArr, heightArr, WxH,cropValue);

    }

    function canvasClipping(wArr, hArr,dm, no) {
        let h = dm[1];
        let w = dm[0];
        canvas3.width = w;
        canvas3.height = h;
        canvas3.clientHeight = h;
        canvas3.clientWidth = w;

        for(let i = 0; i < no ; i++) {
            ctx3.clearRect(0,0,canvas.width, canvas.height);
            ctx3.drawImage(canvas, wArr[i], hArr[i],w ,h, 0,0,w,h);
            dataURLs.push(canvas3.toDataURL())   
        }
        countImg = dataURLs.length -1 ;
    }
    

    function creatingArray(no, dimension, diff) {
        var arr = [];
        var count = 0;
        var digit ;
        if(dimension  == "width") {
            digit = diff[0];
            do {    
                arr.push(digit*count);
                count++;
                if(count > 1 && no == 4 ) {
                    count = 0;
                }else if(count > 2 && (no == 6 || no == 9)) {
                    count = 0;
                }
            }while(arr.length < no)
            return arr;
        }
        else {
            digit = diff[1];
            let h = 0;
            do {    
                arr.push(digit*h);
                count++;
                if(count > 1 && no == 4) {
                    h+=1;
                    count=0;                    
                }else if (count > 2 && (no == 6 || no == 9)) {
                    h+=1;
                    count=0;
                }


            }while(arr.length < no)
            return arr;
        }
    }


    function createDimension(value) {
        if(value == 4) {
            return [300,300];
        }else if(value == 6) {
            return[200,300];
        }else {
            return [200,200]
        }
    }


    function selection(v) {

        ctx2.setLineDash([5,10]);
        ctx2.beginPath();
        ctx2.strokeStyle = "white";
        
        if(v == 4) {
            ctx2.moveTo(canvas.width/2,0);
            ctx2.lineTo(canvas.width/2,canvas.height);
            
            ctx2.moveTo(0,canvas.height/2) ;
            ctx2.lineTo(canvas.width, canvas.height/2);
            ctx2.stroke();
        }else if (v == 6) {
            ctx2.moveTo(canvas.width/3,0);
            ctx2.lineTo(canvas.width/3,canvas.height);
            
            ctx2.moveTo((canvas.width/3)*2,0);
            ctx2.lineTo((canvas.width/3)*2,canvas.height);
           
            ctx2.moveTo(0,canvas.height/2) ;
            ctx2.lineTo(canvas.width, canvas.height/2);
            ctx2.stroke();
        }else {
            ctx2.moveTo(canvas.width/3,0);
            ctx2.lineTo(canvas.width/3,canvas.height);
           
            ctx2.moveTo((canvas.width/3)*2,0);
            ctx2.lineTo((canvas.width/3)*2,canvas.height);
          
            ctx2.moveTo(0,canvas.height/3) ;
            ctx2.lineTo(canvas.width, canvas.height/3);
          
            ctx2.moveTo(0,(canvas.height/3)*2) ;
            ctx2.lineTo(canvas.width, (canvas.height/3)*2)
            ctx2.stroke();
        }
        
    }

    //event listener of download and preview

    preview.onclick = function () {
        var previewBoard =document.querySelector(".hidden");
        let previewClose = document.querySelector("#close");

        previewBoard.style.display = "block";

        previewClose.onclick = function () {
          
            previewBoard.style.display = "none";
        }
    }
    
    prev.onclick = function() {
        if(countImg > 0 ) {
              var img = new Image();
        countImg -= 1;      
        img.onload = function () {
            ctx3.drawImage(img, 0,0);
        }
        img.src = dataURLs[countImg];
        }

        
        next.onclick = function() {
         if(countImg < cropInput.value -1) {
                var img = new Image();
            countImg += 1;      
            img.onload = function () {
                ctx3.drawImage(img, 0,0);
            }
            img.src = dataURLs[countImg];
         }
        }
    }

downloadImg.onclick = function() {
    var data = Object.assign([],dataURLs);
    var imgLeft = data.length;


    downloadAll(data);
    

    function downloadAll(data) {
        if(data.length == 0) {
            return ;
        }
        var link = data.pop();
        imgLeft--;

        let dImg = document.createElement("a");
    
        dImg.setAttribute("download", `${imgLeft}.png`);
        dImg.href = link;
        dImg.setAttribute("class", "vanish")

        dImg.click();
        dImg.remove();

        console.log("hello world", imgLeft)
        downloadAll(data);
    }
    
}


