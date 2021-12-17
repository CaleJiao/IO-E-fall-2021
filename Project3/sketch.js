var sound,sound1,sound2;
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
	myRec.continuous = true; // do continuous recognition
	myRec.interimResults = true; // allow partial recognition (faster, less accurate)
  var menuLoaded = 0;
  var playbutton,pausebutton, vslider; // UI
  let serial;
  let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
  let splitter;
  let diameter0 = 0, diameter1 = 0, diameter2 = 0;
  let CAL
  //////////
  //////////
  function preload()
{
  // initialize sound
  sound = loadSound('GoingHome.mp3');
  sound1 = loadSound('Morning.mp3');
  sound2 = loadSound('SailorMoon.mp3');
}

function setup() 
{
  createCanvas(500, 1000);

     // ///////////////////////////////////////////////////// //button:
 playbutton = createButton('Play my Song / Pause my Song');
 playbutton.position(1100, 1000);
 playbutton.mousePressed(playPause);
//slider
  vslider = createSlider(0., 100., 100.);
  vslider.position(1135, 1100);
  vslider.mouseReleased(setVolume);
  // display instructions
  serial = new p5.SerialPort();
  serial.list();
  console.log("serial.list()   ", serial.list());
  serial.open("COM3");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen); 
  }

function setVolume()
{
	sound.setVolume(vslider.value()/100.);
  sound1.setVolume(vslider.value()/100.);
  sound2.setVolume(vslider.value()/100.);
}
// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  console.log("Serial Port is Open");
}

function gotError(theerror) {
  console.log(theerror);
}

function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log("currentString  ", currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  console.log("latestData" + latestData);   //check to see if data is coming in
  splitter = split(latestData, ',');       // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  diameter0 = splitter[0];                 //put the first sensor's data into a variable
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 

  if (diameter2 > 30){
 // change background color
       background(random(255), random(255), random(255));
    }
    else if (sound2.isPlaying()) {
      sound.stop();
      sound1.stop();
      }
    else if (!sound.isPlaying()) {
      sound.play();
      sound.setVolume(vslider.value()/100.);
      sound1.stop();
    }
 
    if (diameter2 < 10){
      position(100, 100);
      }
      else if (sound2.isPlaying()) {
        sound.stop();
        sound1.stop();
        }
      else if (!sound1.isPlaying()) {
        sound1.play();
        sound1.setVolume(vslider.value()/100.);
        sound.stop();
      }
    
    
    }




// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}




function draw(){
  background(255,255,255);
  text(latestData, 10,10);
  ellipseMode(RADIUS);    
  fill(255,0,0);
  noStroke(); 
  //console.log("diameter0  "  + diameter0);
}




  function playPause(){
    //use the isPlaying to determine whether the sound is playing or not
    // if the sound is not playing
    if (!sound2.isPlaying()){
      // make it play
      sound2.play();
      // define the sound level
      sound2.setVolume(vslider.value()/100.);
       // change background color
       background(random(255), random(255), random(255));
       sound.stop();
       sound1.stop();
    }
    
    // else pause it
    else {
      sound.pause();
      sound1.pause();
      sound2.pause();
    }

  
 
  }
