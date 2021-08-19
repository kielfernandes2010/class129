song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet is initialized');
}

function draw(){
    image(video,0 ,0 , 600 ,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftWrist>0.2){
    circle(leftWristX, leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimals/1000;
    volume=leftWristY_divide_1000 *2;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume - "+ volume;
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
if (results.length>0)
{
    console.log(results);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftWrist ="+ scoreleftWrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX= "+leftWristX+ "leftWristY= "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX= "+rightWristX+ "rightWristY= "+rightWristY);
}
}
