var myVoice = new p5.Speech(); // new P5.Speech object
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
	myRec.continuous = true; // do continuous recognition
	myRec.interimResults = true; // allow partial recognition (faster, less accurate)

var menuLoaded = 0;
var label, input, checkbox, speakbutton,listenbutton, vslider, rslider, pslider; // UI

function setup()
{
	createCanvas(1000, 1000);
		fill(0, 0, 0, 255);
	// input dialog:
	input = createInput("Try me");
	input.style("width", 600);
	  input.position(20, 65);
	// checkbox:
	checkbox = createInput(0, 1, 0);
	checkbox.attribute("type", "checkbox");
	checkbox.style("width", "15px");
	checkbox.style("height", "15px");
	  checkbox.position(175, 100);
	// button:
	speakbutton = createButton('Speak');
	  speakbutton.position(20, 100);
	  speakbutton.mousePressed(doSpeak);
	  listenbutton = createButton('Listen to me');
	  listenbutton.position(80, 100);
	  listenbutton.mousePressed(doListen);
	  // sliders:
	  vslider = createSlider(0., 100., 100.);
	  vslider.position(20, 140);
	  vslider.mouseReleased(setVolume);
	  rslider = createSlider(10., 200., 100.);
	  rslider.position(20, 160);
	  rslider.mouseReleased(setRate);
	  pslider = createSlider(1., 200., 100.);
	  pslider.position(20, 180);
	  pslider.mouseReleased(setPitch);
	// labels:
	label = createDiv("say something:");
	label.position(20, 40);
	label = createDiv("interrupt?");
	label.position(200, 100);
	label = createDiv("volume");
	label.position(160, 140);
	label = createDiv("rate");
	label.position(160, 160);
	label = createDiv("pitch");
	label.position(160, 180);

	  // say hello:
	myVoice.speak(input.value());
}


function doListen(){
	myRec.onResult = showResult;
	myRec.start();
}
function setVolume()
{
	myVoice.setVolume(vslider.value()/100.);
}
function setRate()
{
	myVoice.setRate(rslider.value()/100.);
}
function setPitch()
{
	myVoice.setPitch(pslider.value()/100.);
}

function draw()
{
	// why draw when you can click?
}


function showResult()
	{
		if(myRec.resultValue==true) {
			background(255, 255, 255);
			text(myRec.resultString, width/2, height/2);
			console.log(myRec.resultString);
		}
	}
function doSpeak()
{
	myVoice.interrupt = checkbox.elt.checked;
	myVoice.speak(input.value()); // debug printer for voice options
}