var START_POINT=-100;
var END_POINT=500;
var SHAPE_SCALE=.1;
var ADD_INTERVAL=32;
var START_VEL;
var VEL_DIFF;
var GOLD_INTERVAL=20;
var SPIRAL_FACTOR=0.01;
var SPIRAL_BASE=1.9;

var _shape_leg;
var _img_gold;
var _leg=[];

//PShader _shader_blur;

var _save_frame;
var _gold_interval;

function setup(){

	START_VEL=createVector(0.3,PI/114,1.4);
	VEL_DIFF=createVector(1.001,0.9993,0.998);

	createCanvas(windowWidth, windowHeight,WEBGL);
	_shape_leg=loadImage("image/leg.png");
  	//_shape_leg.disableStyle();
  	_img_gold=loadImage("image/gold.png");
  
  	//_shader_blur=loadShader("blur.glsl");
  
  	_leg=new Array();
  
	//initLeg();
  	//smooth();
  	_gold_interval=GOLD_INTERVAL;
}

function draw(){
	 
	update();
  
	push();
	fill(0,120);  
	rectMode(CENTER);
	// rect(width/2,height/2,width*20,height*20);
	quad(width/2,height/2,
		 width/2+width*20,height/2,
		 width/2+width*20,height/2+height*20,
		 width/2,height/2+height*20);
	pop();

	//image(_shape_leg,0,0);
	//filter(_shader_blur);  


	//beginCamera();

	var fov=PI*.5;//map(mouseX,0,width,0,PI);
	var cameraZ=(height/2.0) / tan(fov/2.0);
	//perspective(fov,float(width)/float(height),cameraZ/10.0, cameraZ*100.0);

	var tx_=map(mouseX,0,width,-.3,.3)*width+width/2;
	var ty_=map(mouseY,0,height,-.2,.2)*height+height/2;

	// camera(tx_,ty_,END_POINT,
	//      width/2,height/2.0,START_POINT,
	//      0,1,0);

	push();
	translate(width/2,height/2);

	let mleg=_leg.length;
	for(let i=0;i<mleg;++i) _leg[i].draw();


	pop();
	if(frameCount%ADD_INTERVAL==0) addLeg();
	SPIRAL_FACTOR=1+0.05*sin(frameCount/120.0);

	//endCamera();

	// text(_leg.length,20,20);
	// text(frameRate(),20,40);

}
function update(){
	var mleg=_leg.length;
	for(var i=mleg-1;i>=0;i--){		
		if(_leg[i]._dead) _leg.splice(i,1);
		else _leg[i].update();
	}

}
function addLeg(){
	_leg.push(new PLogoLeg(createVector(0,0,START_POINT),START_VEL,readyToAddGold()));
   updateGoldInterval();
}
function initLeg(){
	for(var i=0;i<125;++i){
    var _start=createVector(0,0,START_POINT);
    var _vel=START_VEL;
    
    for(var x=0;x<i*ADD_INTERVAL;++x){
      _start.add(_vel);
      _vel.x*=VEL_DIFF.x;
      _vel.y*=VEL_DIFF.y;
      _vel.z*=VEL_DIFF.z;
    }
    println(_start+" "+_vel);
    _leg.push(new PLogoLeg(_start,_vel,readyToAddGold()));
    updateGoldInterval();
  }

}
function resetLeg(){
	 _leg=new Array(); 
}
function readyToAddGold(){
  return _gold_interval==0;
}
function updateGoldInterval(){
	_gold_interval--;
   if(_gold_interval<0) _gold_interval=floor(random(.8,1.2)*GOLD_INTERVAL);
}

