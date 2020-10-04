var ball, ballIMG;
var redBall;
var firebaseBall;
var database;

function preload(){
 ballIMG=loadImage("pic/370-cartoon-dog-vector-image.png");
}

function setup(){
    createCanvas(500,500);
    redBall = createSprite(50,50,10,10);
    ball = createSprite(400,400,10,10);
    ball.addImage(ballIMG)
    ball.scale=0.2
    redBall.shapeColor = "red";
    database=firebase.database();
    var firebaseBallPosition=database.ref("ball/position");
    firebaseBallPosition.on("value",readPosition,showError);

}

function draw(){
    background("white");
    noStroke();
    textSize(35)
    fill("black")
    text("PLAY WITH MAX!")
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data)
{ 
    console.log(data); console.log(data.val()); firebaseBall=data.val(); ball.x=firebaseBall.x; ball.y=firebaseBall.y; } function showError(){ console.log("Error while reading the data"); } function writePosition(x,y){ database.ref("ball/position").set({ x:firebaseBall.x+x, y:firebaseBall.y+y }) }