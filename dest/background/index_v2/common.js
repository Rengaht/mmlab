

function Constants(){
	this.StartPoint=1;
	this.EndPoint=4200;
}

// common variable
var _Background_Type;

let Const=new Constants();
let _canvas;


var _scene,_camera,_renderer;
var _composer;

var stats;
var frameCount;

var _raycaster;
var _mouse=new THREE.Vector2(),_intersected;


//for controlling framerate
var _now;
var _then=Date.now();
var _frame_interval=1000.0/60.0;
var _delta;


function init(){


	_scene=new THREE.Scene();
	var end_point=(Const.EndPoint-Const.StartPoint)+Const.StartPoint;
	_camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,Const.StartPoint,Const.EndPoint);
	_camera.position.z=end_point;
	// _camera=new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	// _camera.position.z=5;

	_renderer=new THREE.WebGLRenderer();
	_renderer.setSize(window.innerWidth,window.innerHeight);
	// document.body.appendChild(_renderer.domElement);
	

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


	var effectContainer=document.getElementById('_BackEffect');
	if(effectContainer.childNodes.length>0)
		effectContainer.removeChild(effectContainer.childNodes[0]);
	effectContainer.appendChild(_renderer.domElement);
	

	stats = new Stats();
	document.body.appendChild(stats.dom);

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );


	initBackgroundType(0);
	


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
	mouseX/=window.innerWidth;
	mouseY/=window.innerHeight;
	_camera.position.x=mouseX.toFixed(2)*250.0;
	_camera.position.y=mouseY.toFixed(2)*250.0;
	// _camera.rotateY(0);
	// _camera.rotateY(mouseX*Math.PI/200);
	
	_mouse.x=(event.clientX/window.innerWidth)*2-1;
	_mouse.y=-(event.clientY/window.innerHeight)*2+1;
}

function update(){
	
	updateLogo();


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
	_renderer.render(_scene, _camera);

	// _composer.render();

}

function initBackgroundType(type_){

	if(_Background_Type==type_) return;
	console.log('Init Background Type: '+type_);

	clearLogo();

	initLogo();
	

	_Background_Type=type_;
	
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

