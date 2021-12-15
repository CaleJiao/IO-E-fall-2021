let poses = [];
let poseNet;
let video;

let firstpose;

let NoseX;
let NoseY;

let rEyeX;
let rEyeY;
let lEyeX;
let lEyeY;

let rHandX;
let rHandY;

let distant;
let distA;
let distB;
let distC;

let monoSynth;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width,height);
  
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPose);
  
  video.hide();
  
  monoSynth = new p5.MonoSynth();
  
}

function draw() {
  background(220);
  
  image(video, 0, 0);
  
  distant = dist(rEyeX, rEyeY, lEyeX, lEyeY);
  
  
  
//move down move down down down//
  
  let rCenterX = rEyeX-distant*0.4;
  let lCenterX = lEyeX+distant*0.4;
  
  let CenterY = rEyeY-distant*0.8;
  
//CALECALE CHANGED//
  
  noFill();
  ellipse(100,200,100,100);
  ellipse(300,200,100,100);
  ellipse(500,200,100,100);
  
  distA = dist(100,200,NoseX,NoseY);
  distB = dist(300,200,NoseX,NoseY);
  distC = dist(500,200,NoseX,NoseY);
  
  if(distA < 50){
    fill(255,0,0);
    ellipse(NoseX,NoseY,30,30);
    monoSynth.play('C4',1,0,1/6);
  }else if(distB < 50){
    fill(0,255,0);
    ellipse(NoseX,NoseY,30,30);
    monoSynth.play('D4',1,0,1/6);
  }else if(distC < 50){
    fill(0,0,255);
    ellipse(NoseX,NoseY,30,30);
    monoSynth.play('E4',1,0,1/6);
  }
  else{
    fill(255,255,255);
    ellipse(NoseX,NoseY,30,30);
  }
  
  
  
}

function modelReady(){
  console.log("posenet works");
}

function gotPose(poses){
  if(poses.length >0){
    firstpose = poses[0].pose;
    
    if(poses.length > 0){
      
      NoseX = poses[0].pose.nose.x;
      NoseY = poses[0].pose.nose.y;
    
      rEyeX = poses[0].pose.rightEye.x;
      rEyeY = poses[0].pose.rightEye.y;
      lEyeX = poses[0].pose.leftEye.x;
      lEyeY = poses[0].pose.leftEye.y;
      
      rHandX = poses[0].pose.rightWrist.x;
      rHandY = poses[0].pose.rightWrist.y;
      
    }
    
    //console.log("NoseX: " + poses[0].pose.nose.x);
    //console.log("NoseY: " + poses[0].pose.nose.y);
    
    //console.log(handDist);
  }
}