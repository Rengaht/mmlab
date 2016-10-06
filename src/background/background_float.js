// import {LogoLeg} from './logoLeg.js'
// import {THREE} from '../include/three/three.js'

const PI=3.14159;
function Constants(){
	this.MSlice=7;	
	this.SliceSize=280;
	this.DestRad;
}

let Const=new Constants();
let _canvas;
let _context;

var _mslice;
let _slice=[];

var _scene,_camera,_renderer;
var _leg_texture,_special_texture;
var _leg_shape,_leg_gemoetry,_leg_material;
var _leg_mat_cyan,_leg_mat_magenta;

var _selected_material;

var _shader_uniform;


var _composer;


var stats;
var frameCount;



function init(){


	_scene=new THREE.Scene();
	_camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1200);
	_camera.position.z=1200;

	_renderer=new THREE.WebGLRenderer();
	_renderer.setSize( window.innerWidth, window.innerHeight );
	
	_raycaster=new THREE.Raycaster();
	

	// var _cube=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
	// _scene.add(_cube);
	_leg_geometry=new THREE.PlaneGeometry(Const.LegSize,Const.LegSize*Const.LegRatio);

	_leg_texture=new THREE.TextureLoader().load('image/logo_slice/slice-01.png');

	initSlice();			
	
	frameCount=0;

	var light1 = new THREE.DirectionalLight('#fff');
    light1.position.set(-50, 50, 50);
    _scene.add(light1);
	_scene.add(new THREE.AmbientLight(0x222222));
	//_scene.fog=new THREE.FogExp2(0xffffff, 0.001);

	//postprocessing
	_composer=new THREE.EffectComposer(_renderer);
	_composer.addPass(new THREE.RenderPass(_scene,_camera));
	_composer.passes[0].renderToScreen=true;
	



	document.body.appendChild( _renderer.domElement );
	stats = new Stats();
	//document.body.appendChild(stats.dom);

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

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

}

function update(){
	var i;
	for(i=0;i<_mslice;++i){		
		_slice[i].update();
		updatePos(_scene.children[i],_slice[i]);
	}	

	frameCount++;
	stats.update();

	
}

function draw(){

	
	requestAnimationFrame(draw);

	update();
	//_renderer.render(_scene, _camera);
	_composer.render();

}

function initSlice(){
	
	var i;


	_leg_texture.wrapS=_leg_texture.wrapT=THREE.RepeatWrapping;
	_leg_texture.repeat.set(1,1);

	_mslice=Math.round(Math.random()*4)+3;
	
	// create random index to slice
	var random_arr=[];
	for(i=1;i<=Const.MSlice;++i) random_arr.push(i);
	shuffleArray(random_arr);
	
	let ww_=window.innerWidth.toFixed(2);
	let wh_=window.innerHeight.toFixed(2);

	for(i=0;i<_mslice;i++){

		//var pos_=[random(0,ww_*.1),random(0,wh_*.1),100];
		var pos_=[random(ww_*.2,ww_*.5)*(random(0,2)<1?1:-1),random(-wh_*.5,wh_*.5),random(50,550)];
		var amp_=[random(20,80),random(20,80),random(-10,10)];

		var slice_=new FloatSlice(pos_,amp_,random_arr[i]);
		
		var mat_=createMaterial(slice_._shader_uniform);
		var geo_=new THREE.PlaneGeometry(Const.SliceSize*random(1,3),Const.SliceSize*random(1,3));
		// var geo_=new THREE.PlaneGeometry(20,20);

		var mesh_=new THREE.Mesh(geo_,mat_);	

		updatePos(mesh_,slice_);

		_slice.push(slice_);
		_scene.add(mesh_);
		

	}
	

}

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

function createMaterial(uniforms_,tex_index_){

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		vertexShader:document.getElementById('vertexShader').textContent,
		fragmentShader:document.getElementById('glitchFragmentShader').textContent,
		transparent:true,
		opacity:0.9,
		blending:THREE.AdditiveBlending
	});
	// return new THREE.MeshBasicMaterial({
	// 	color:0xff0000} );
	
}
function updatePos(mesh_,slice_){
	
	let pos=slice_.getPos();

	mesh_.position.x=pos[0];
	mesh_.position.y=pos[1];
	mesh_.position.z=pos[2];

	mesh_.rotation.z+=random(-1,1)*.005;
	// mesh_.rotation.x+=Math.random()*.001;
	// mesh_.rotation.y+=Math.random()*.001;

	//mesh_.rotation.z=leg_.getRot();
}



init();
draw();

