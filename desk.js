img = "";
status1 = "";
objects = [];
function preload() {
    img = loadImage("desk_840x650.jpg")
}
function setup() {
    canvas = createCanvas(840, 650);
  
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!")
    status1 = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
    }
    
}
function draw() {
    
    if (status1 != " ") {
        image(img, 0, 0, 840, 650);
        for(var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("objectsdetected").innerHTML = "There were " + objects.length + " objects detected."
            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}