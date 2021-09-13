var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let x1, y1, x2, y2, ctx1, canvas1, draw2;
let trianglePoints = [], triangleAngles = [];
 let lineSlopes;
var input1;
//creating a cartesian plane style - here


function getCanvas() {
    canvas1 = canvas.cloneNode(true);
    canvas1.setAttribute("class", "canvas1");
    canvas1.removeAttribute("id")

    canvas.insertAdjacentElement("afterend", canvas1);

    return canvas1.getContext("2d");
}

//draw the triangle

// event listeners of it
var drawTriangle = document.querySelector('.draw')
drawTriangle.addEventListener("click", function () {
    
    canvas.addEventListener("mousedown", startDraw, false);
    draw2 = true;
})
document.querySelector(".restart").onclick = function () {
    location.reload()
}

//function

function startDraw(event) {
    x1 = event.offsetX;
    y1 = event.offsetY;

    if (draw2 == true) {

        ctx1 = getCanvas();
        canvas1.addEventListener("mousemove", drawTri, false);
        canvas1.addEventListener("mouseup", stopDraw, false);

    }

}



function drawTri(event) {
    x2 = event.offsetX;
    y2 = event.offsetY;

    ctx1.clearRect(0, 0, canvas.width, canvas.height);


    ctx1.lineWidth = 2;

    ctx1.beginPath();
    ctx1.moveTo(x1, y1);
    ctx1.lineTo(x2, y2);
    ctx1.lineTo(x1 - (x2 - x1), y2);
    ctx1.closePath();
    ctx1.stroke();

   


}

function finalTri() {
    canvas1.remove();


    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x1 - (x2 - x1), y2);
    ctx.fillStyle = "rgb(245,245,245)"
    
    ctx.closePath();    
    ctx.strokeStyle = "rgb(0,0,0)"

    ctx.clip();
    ctx.fill();
    ctx.stroke();
    y1 = canvas.height - y1;
    y2 = canvas.height - y2;
    
    trianglePoints = [x1, y1, x2, y2, x1 - (x2 - x1), y2];


    console.log(trianglePoints)
}

function stopDraw() {
    canvas1.removeEventListener("mousemove", drawTri, false);
    finalTri();
    draw2 = false;
    getAngle();
}

//finding the angles between the lines
//finding the slopes all the lines
let m1,m2,m3;

function getAngle() {
    let p = trianglePoints;
    m1 = (p[1] - p[3]) / (p[0] -p[2]) ;
    m2 = (p[3] - p[5] )/ (p[2] -p[4]) ;
    m3 = (p[5] - p[1] )/(p[4] -p[0] );
   
    let a1, a2,a3;

   lineSlopes = [m1,m2,m3] ;

    a1 = getTanAng(m1,m2);
    a2 = getTanAng(m2,m3);
    a3 = 180 - (a1+a2);
    triangleAngles.unshift(a3)   
    writeAngleNtext();
}

function getTanAng(a,b) {
    //we get the angles and give angles with math objects method in radian

    let angle = (b - a)/ 1 + (a*b) ;
    angle = Math.atan(angle);
    angle = Math.round((angle*180)/Math.PI) 
    triangleAngles.push(angle);
    return angle
}
 function writeAngleNtext() {
    var points = trianglePoints;
    for(var i = 0 ; i < 6; i+=2) {
        
        drawArc(points[i], points[i+1],Math.floor(i/2))
    
    }

    //drawText 

    input1.focus()
    output();
 }
 
function drawArc(x,y,i) {
    y = Math.abs(canvas.height-y);
    ctx.beginPath();
    ctx.arc(x,y,30,0,Math.PI*2);
    ctx.stroke()

    drawText(x,y,i);
    
}
function drawText(x,y,i) {
 if(i==0){

    ctx.font = "20px arial";
    ctx.strokeText(`${i+1}`,x-2,y+50);
    input1 =document.querySelector(".firstI");
    input1.value = triangleAngles[i]
    //element focus.
    // input1.focus();

 } else if (i == 1) {
    ctx.strokeText(`${i+1}`,x-46,y-20);
    document.querySelector(".secondI").value = triangleAngles[i]

 }else {
    ctx.strokeText(`${i+1}`,x+35,y-20);
    document.querySelector(".thirdI").value = triangleAngles[i]

 }
}


//output 
function output() {
    //check the angle

    var a = angle();

    // check the sides
    a += " and " + sides();
 
    document.querySelector(".output").textContent = "The Triangle is a "+ a + " Triangle."
}

function angle() {
    if(triangleAngles.includes[90]) {
        "right angle"
    }

    var check =   triangleAngles.every(function (item, index){
        return 90 > item ;
    }) 
    if(check) {
        return "Acute Angle";
    }else {
        return "Obtuse Angle";
    }


}
function sides() {

    var s = triangleAngles.join(" ");

    var arr = s.matchAll(`${triangleAngles[1]}`); //for now hard code
    var arr1 = [];

    for(var a of arr) {
        arr1.push(a)
    }

    if(arr1.length ==2) {
        return "Isosceles"
    }else if(arr.length == 3) {
        return "Equilateral"
    }else {
        return "Scalene"
    }

}





// best ideas - not used
//ideas -1 for getting the point on the line using the slopes
//  function findingPoints(a,b,m1,m2) {
//      var constant = 6;
//      m1 = constant*m1;
//      m2 = constant*m2;



//      var pointOnLine = [];


     

//      m1 == 0 ? pointOnLine[0] = [a+(constant*1.5),b]: Math.sign(m1) == -1 ?pointOnLine[0] = [a+m1,b-m1]: pointOnLine[0] = [a-m1,b-m1];;

//      m2 == 0 ? pointOnLine[1] = [a-(constant*1.5),b]: Math.sign(m2) ==-1 ?pointOnLine[1] = [a -m2,b +m2] :pointOnLine[1] = [a+m2,b+m2] ;
     

//      console.log(pointOnLine,a,b,m1,m2);
//      drawLine(pointOnLine, m1,m2);
     

//      return pointOnLine;
//  }
