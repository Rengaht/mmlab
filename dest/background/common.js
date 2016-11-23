

function Constants(){
	this.StartPoint=1;
	this.EndPoint=4200;
	this.MouseMoveThres=20;
	this.EndPoint=4200;
	this.FadeInVel=.05;
	this.FadeOutVel=.05;
	
	this.AppearInterval=800;
	this.DelayInterval=800;

	this.FadeInInterval=this.AppearInterval;
	this.FadeInDelay=this.DelayInterval;
	this.FadeOutInterval=this.AppearInterval;
	this.FadeOutDelay=(this.AppearInterval+this.DelayInterval)*0;
}

// common variable
var _Background_Type=-1;

var Const=new Constants();
var _canvas;


var _scene,_camera,_renderer;
var _composer;

var stats;
var frameCount;

var _raycaster;
var _mouse=new THREE.Vector2(),_intersected;

var _move_src=new THREE.Vector2(); 
var _move_vel=0;
var deltaX=0,deltaY=0;

//for controlling framerate
var _now;
var _then=Date.now();
var _frame_interval=1000.0/60.0;
var _delta;


var _dotScreenEffect;


//for controlling framerate
var _now;
var _then=Date.now();
var _frame_interval=1000.0/60.0;
var _delta;


// for transition
var _fade_out=false;
var _fade_in=false;
var _dest_type;
var _fade_scale=0.0;



function init(){


	_scene=new THREE.Scene();
	_camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,Const.StartPoint,Const.EndPoint);
	_camera.position.z=Const.EndPoint;
	// _camera=new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	// _camera.position.z=5;

	_renderer=new THREE.WebGLRenderer();
	_renderer.setSize(window.innerWidth,window.innerHeight);
	// document.body.appendChild(_renderer.domElement);
	var effectContainer=document.getElementById('_BackEffect');
	if(effectContainer.childNodes.length>0)
		effectContainer.removeChild(effectContainer.childNodes[0]);
	effectContainer.appendChild(_renderer.domElement);

	_raycaster=new THREE.Raycaster();
	


	frameCount=0;


	var light1 = new THREE.DirectionalLight('#fff');
    light1.position.set(-50, 50, 50);
    _scene.add(light1);
	_scene.add(new THREE.AmbientLight(0x222222));

	
	//postprocessing
	_composer=new THREE.EffectComposer(_renderer);
	_composer.addPass(new THREE.RenderPass(_scene,_camera));
	_composer.passes[0].renderToScreen=true;

	
	_dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
	_dotScreenEffect.uniforms[ 'scale' ].value=0;
	// dotScreenEffect.renderToScreen=true;
	_composer.addPass(_dotScreenEffect);

	// var rgbEffect = new THREE.ShaderPass( THREE.RGBShiftShader );
	// rgbEffect.uniforms[ 'amount' ].value = 0.0015;
	// rgbEffect.renderToScreen = true;
	// _composer.addPass( rgbEffect );
		
	

	stats = new Stats();
	// document.body.appendChild(stats.dom);

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onDocumentMouseClick, false );

	//initBackgroundType(0);
	


}		
function onWindowResize(event){

	_camera.aspect = window.innerWidth / window.innerHeight;
	_camera.updateProjectionMatrix();

	_renderer.setSize( window.innerWidth, window.innerHeight );

}
function onDocumentMouseMove(event){

	event.preventDefault();

	var mouseX=event.clientX-window.innerWidth/2;
	var mouseY=event.clientY-window.innerHeight/2;
	

	

	_mouse.x=(event.clientX/window.innerWidth)*2-1;
	_mouse.y=-(event.clientY/window.innerHeight)*2+1;		

	if(_camera.position.x!==NaN){
		deltaX=mouseX.toFixed(2)/2.0-_camera.position.x;
		deltaY=mouseY.toFixed(2)/2.0-_camera.position.y;
		_move_vel=0.0;

		_move_src.x=_camera.position.x;
		_move_src.y=_camera.position.y;
	}
	
}
function updateCamera(){
	// var deltaX=_move_dest.x-_camera.position.x;
	// var deltaY=_move_dest.y-_camera.position.y;

	// var thres=Const.MouseMoveThres*_move_vel;

	// if(Math.abs(deltaX)>thres){
	// 	if(deltaX>0) deltaX=Const.MouseMoveThres;
	// 	if(deltaX<0) deltaX=-Const.MouseMoveThres;
	// }
	// if(Math.abs(deltaY)>thres){
	// 	if(deltaY>0) deltaY=Const.MouseMoveThres;
	// 	if(deltaY<0) deltaY=-Const.MouseMoveThres;
	// }

	// if(_move_vel>.5) _move_vel*=.98;
	if(_move_vel<1){
		 _move_vel+=.01;

		_camera.position.x=_move_src.x+deltaX*easeFunction(_move_vel);
		_camera.position.y=_move_src.y+deltaY*easeFunction(_move_vel);
	}else{
		_camera.position.x=_move_src.x+deltaX;
		_camera.position.y=_move_src.y+deltaY;
	}
	
}
function easeFunction(k){
	// if(k===0) return 0;
	// if(k===1) return 1;
	// return Math.pow(2,-10*k)*Math.sin((k-0.1)*5*Math.PI)+1;
	return k===1?1:1-Math.pow(2,-10*k);

}

function onDocumentMouseClick(event){
	if(_Background_Type==0) onClickLogo();
}
function update(){
	
	updateCamera();

	switch(_Background_Type){
		case 0:
			updateLogo();
			break;
		case 1:
			updateFloat();
			break;
		case 2:
			updateStack();
			break;
		case 3:
			updateRotate();
			break;		
	}

	if(_fade_in){
		_fade_scale+=Const.FadeInVel;		
		if(_fade_scale>1){
			_fade_scale=1;
			_fade_in=false;
		}
	}
	if(_fade_out){
		_fade_scale-=Const.FadeOutVel;		
		if(_fade_scale<0){
			_fade_scale=0;
			// _fade_out=false;			
		}	
	}

	frameCount++;	
	stats.update();

	// _camera.updateMatrixWorld();
	//check intersected
	// _raycaster.setFromCamera(_mouse,_camera);
	// var inter=_raycaster.intersectObjects(_scene.children);

	// if(inter.length>0){
		
	// 	if(_intersected!=inter[0].object){

	// 		if(_intersected) _intersected.material=_intersected._current_material;

	// 		var uni=inter[0].object.material.uniforms;
	// 		if(uni && uni.gold && uni.gold.value==true){
	// 			_intersected=inter[0].object;
	// 			_intersected._current_material=_intersected.material;
	// 			_intersected.material=_selected_material;
	// 		}
	// 	}		
	// }else{
	// 	if(_intersected) _intersected.material=_intersected._current_material;
	// 	_intersected=null;
	// }
	
}

function draw(){

	
	requestAnimationFrame(draw);
	
	_now=Date.now();
	_delta=_now-_then;
	if(_delta>_frame_interval){

		_then=_now-(_delta%_frame_interval);
		update();
	}
	// update();
	
	// _renderer.render(_scene, _camera);

	_composer.render();

	
}

function initBackground(type_){
	
	_dest_type=type_;	
	setTimeout(function(){
		initType(type_);	
	},Const.FadeInDelay);

		


}
function initType(type_){

	// if(_Background_Type==type_) return;
	console.log('Init Background Type: '+type_);

	clearLogo();
	clearFloat();
	clearStack();
	clearRotate();	

	_composer.passes[0].renderToScreen=true;
	_composer.passes[1].renderToScreen=false;

	switch(type_){
		case 0: //logo
			initLogo();
			break;
		case 1: //float
			initFloat();
			break;
		case 2:
			initStack();
			break;
		case 3:
			initRotate();
			break;
	}

	_Background_Type=type_;
	_fade_in=true;
	_fade_out=false;
	_fade_scale=0.0;


}
function endBackground(){
	setTimeout(function(){
		console.log("background fade out!");
		_fade_out=true;			
		_fade_in=false;			
		_fade_scale=1.0;
	},Const.FadeOutDelay);
}

//util
function shuffleArray(array){
    for(var i=array.length-1;i>0;i--){
        var j=Math.floor(Math.random()*(i+1));
        var temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    return array;
}

function random(start_,end_){
	return Math.random()*(end_-start_)+start_;
}



init();
draw();

