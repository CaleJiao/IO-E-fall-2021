var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
	myRec.continuous = true; // do continuous recognition
	myRec.interimResults = true; // allow partial recognition (faster, less accurate)

	var x, y;
	var dx, dy;

	function setup()
	{
		// graphics stuff:
		createCanvas(800, 600);
		background(0);
		fill(255);
		x = width/2;
		y = height/2;
		dx = 0;
		dy = 0;

		// instructions:
		textSize(20);
		textAlign(CENTER,CENTER);
		text("try say:rain, snow,or clear", 400, 20);

		//myRec.onResult = parseResult; // now in the constructor
		myRec.start(); // start engine
	}

	function draw()
	{
		ellipse(x, y, 5, 5);
		x+=dx;
		y+=dy;
		if(x<0) x = width;
		if(y<0) y = height;
		if(x>width) x = 0;
		if(y>height) y = 0;
	}

	function parseResult()
	{
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostrecentword = myRec.resultString.split(' ').pop();
		if(mostrecentword.indexOf("left")!==-1) { dx=-1;dy=0; }
		else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
		else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
		else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
        else if(mostrecentword.indexOf("rain")!==-1) { dx=50;dy=20; }
        else if(mostrecentword.indexOf("snow")!==-1) { dx=15;dy=1; }
		else if(mostrecentword.indexOf("clear")!==-1) { background(0); }
		console.log(mostrecentword);
	}