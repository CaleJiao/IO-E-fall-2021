let video;
let poseNet; 
let poses = [];
let skeletons = [];
let pg;
let noseX;
let noseY;
let pNoseX;
let pNoseY;

function setup() {
  createCanvas(900,600);
  video = createCapture(VIDEO);
  video.size(width, height);

  pixelDensity(1);
  pg = createGraphics(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function draw() {
  image(video, 0, 0, width, height);

  image(pg, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < min(poses.length, 1); i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        if (j == 0) {
          noseX = keypoint.position.x;
          noseY = keypoint.position.y;

pg.stroke(230, 0, 250);
pg.strokeWeight(5);
pg.line(noseX, noseY, pNoseX, pNoseY);

 pNoseX = noseX;
 pNoseY = noseY;
        }
      }
    }
  }
}

function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 255, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// The callback that gets called every time there's an update from the model
//https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ Reference
//https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ Reference

function gotPoses(results) {
  if( poses.length > 0 ){
    pose = poses[0].pose;
    skeleton = poses[0].skeleton; 
} 
}

function mousePressed() {
  pg.clear();
}

function modelReady() {
  select('#status').html('Draw With Your Nose! Ready~ Go!');
}

 