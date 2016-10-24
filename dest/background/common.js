

function Constants(){
	this.StartPoint=1;
	this.EndPoint=1800;
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


function init(){


	_scene=new THREE.Scene();
	_camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,Const.StartPoint,Const.EndPoint);
	_camera.position.z=Const.EndPoint;
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
	// document.body.appendChild(stats.dom);

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );


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
	_camera.position.x=mouseX.toFixed(2)/5.0;
	_camera.position.y=mouseY.toFixed(2)/5.0;

	
	_mouse.x=(event.clientX/window.innerWidth)*2-1;
	_mouse.y=-(event.clientY/window.innerHeight)*2+1;
}

function update(){
	
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

	update();
	_renderer.render(_scene, _camera);
	// _composer.render();

}

function initBackgroundType(type_){

	if(_Background_Type==type_) return;
	console.log('Init Background Type: '+type_);

	clearLogo();
	clearFloat();
	clearStack();
	clearRotate();	


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

