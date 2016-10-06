// import {LogoLeg} from './logoLeg.js'
// import {THREE} from '../include/three/three.js'

const PI=3.14159;
function Constants(){
	this.MSlice=9;	
	this.SliceSize=420;	
	this.MStack=2;
}

let Const=new Constants();
let _canvas;
let _context;

var _mslice;

let _stack=[];

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
	var i,j;

	for(j=0;j<Const.MStack;++j){
		_stack[j].update();
		var mslice=_stack[j].mslice;
		for(i=0;i<mslice;++i){		
			_stack[j].slice[i].update();
			//updatePos(_scene.children[i],_slice[i]);
			updatePos(_stack[j],
					  _scene.getObjectById(_stack[j].slice[i].id,true),
					  _stack[j].slice[i]);
		}	
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
	
	var i,j;

	var random_arr=[];
	for(i=1;i<=Const.MSlice;++i) random_arr.push(i);
		
	let ww_=window.innerWidth.toFixed(2);
	let wh_=window.innerHeight.toFixed(2);


	
	for(j=0;j<Const.MStack;++j){

		var mslice=Math.round(Math.random()*3)+3;
		var slice=[];
		
		// create random index to slice
		shuffleArray(random_arr);
		
		let spos_=[(ww_*.45+ww_*.1*random(0,1))*(j*2-1),
				   wh_*.3*random(-1,1),
				   random(20,120)];
		var samp_=[random(20,80),random(20,80),random(-10,10)];
		var stack=new FloatSlice(spos_,samp_,-1);


		for(i=0;i<mslice;i++){

			//var pos_=[random(0,ww_*.1),random(0,wh_*.1),100];
			var pos_=[random(-20,20),random(-20,20),random(-10,10)];
			var amp_=[random(0,60),random(0,60),random(0,10)];

			var slice_=new FloatSlice(pos_,amp_,random_arr[i]);
			
			var mat_=createMaterial(slice_._shader_uniform);
			var geo_=new THREE.PlaneGeometry(Const.SliceSize*random(1,3),Const.SliceSize*random(1,3));
			// var geo_=new THREE.PlaneGeometry(20,20);

			var mesh_=new THREE.Mesh(geo_,mat_);	

			slice_.id=mesh_.id;
			slice_._shader_uniform.amount=stack._shader_uniform.amount;
			slice_._shader_uniform.angle=stack._shader_uniform.angle;
			slice_._shader_uniform.seed_x=stack._shader_uniform.seed_x;
			slice_._shader_uniform.seed_y=stack._shader_uniform.seed_y;

			updatePos(stack,mesh_,slice_);

			slice.push(slice_);
			_scene.add(mesh_);		
		}

		stack.mslice=mslice;
		stack.slice=slice;

		_stack.push(stack);
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
function updatePos(stack_,mesh_,slice_){
	let spos=stack_.getPos();
	let pos=slice_.getPos();

	mesh_.position.x=spos[0]+pos[0];
	mesh_.position.y=spos[1]+pos[1];
	mesh_.position.z=spos[2]+pos[2];

	mesh_.rotation.z=slice_._rot_ang;
	// mesh_.rotation.x+=random(-1,1)*.001;
	// mesh_.rotation.y+=random(-1,1)*.001;


	


}



init();
draw();

