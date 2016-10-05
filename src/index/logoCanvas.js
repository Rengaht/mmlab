// import {LogoLeg} from './logoLeg.js'
// import {THREE} from '../include/three/three.js'

const PI=3.14159;
function Constants(){
	this.StartPoint=1;
	this.EndPoint=1800;
	this.ShapeScale=.4;
	this.AddInterval=52;
	this.StartVel=[0,PI/20.0,4.2];
	this.PreVelDiff=[0.015,0.987,1.0];
	this.VelDiff=[0.99,0.999,0.998];
	this.GoldInterval=20;
	this.Width=0;
	this.Height=0;
	this.MBranch=8;
	this.LegSize=320;
	this.LegRatio=1.0;
	this.DestRad;
}

let Const=new Constants();
let _canvas;
let _context;
let _leg=[];

var _scene,_camera,_renderer;
var _leg_texture,_special_texture;
var _leg_shape,_leg_gemoetry,_leg_material;
var _leg_mat_cyan,_leg_mat_magenta;

var _selected_material;

var _shader_uniform;

var _raycaster;
var _mouse=new THREE.Vector2(),_intersected;

var _composer;

var _gold_interval;

var stats;
var frameCount;



function init(){
	// _canvas=document.getElementById('_logo_canvas');
	// if(_canvas.getContext) _context=canvas.getContext("3d");

	// Const.Width=_canvas.offsetWidth;
	// Const.Height=_canvas.offsetHeight;

	Const.DestRad=window.innerWidth.toFixed(2)*0.5;
	_gold_interval=Const.GoldInterval;

	_scene=new THREE.Scene();
	_camera=new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, Const.StartPoint, Const.EndPoint );
	_camera.position.z=Const.EndPoint;

	_renderer=new THREE.WebGLRenderer();
	_renderer.setSize( window.innerWidth, window.innerHeight );
	
	_raycaster=new THREE.Raycaster();
	

	// var _cube=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);
	// _scene.add(_cube);
	_leg_geometry=new THREE.PlaneGeometry(Const.LegSize,Const.LegSize*Const.LegRatio);

	_leg_texture=new THREE.TextureLoader().load('image/leg-01.png',function(texture){		
		_special_texture=new THREE.TextureLoader().load('image/gold-01.png',function(texture){
			initLeg();			
		});		
	});

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
	// var glitchPass = new THREE.GlitchPass(4);	
 //    glitchPass.renderToScreen=true;
    //glitchPass.goWild=true;


    var rgbPass=new THREE.ShaderPass(THREE.RGBShiftShader);
    rgbPass.uniforms['amount'].value=0.0015;
    rgbPass.renderToScreen=true;
    // _composer.addPass(rgbPass);


	// var bloomPass=new THREE.BloomPass(10, 2, 8, 256);
 //    bloomPass.renderToScreen=true;
 //    _composer.addPass(bloomPass);


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

	
	_mouse.x=(event.clientX/window.innerWidth)*2-1;
	_mouse.y=-(event.clientY/window.innerHeight)*2+1;
}

function update(){
	let mleg=_leg.length;
	for(let i=mleg-1;i>=0;i--){		
		if(_leg[i]._dead){
			_leg.splice(i,1);
			_scene.remove(_scene.children[i]);
		}else{
			_leg[i].update();
			updatePos(_scene.children[i],_leg[i]);
		}
	}	

	frameCount++;
	if(frameCount%Const.AddInterval==1) addLeg();

	stats.update();



	_camera.updateMatrixWorld();
	//check intersected
	_raycaster.setFromCamera(_mouse,_camera);
	var inter=_raycaster.intersectObjects(_scene.children);

	if(inter.length>0){
		
		if(_intersected!=inter[0].object){

			if(_intersected) _intersected.material=_intersected._current_material;

			var uni=inter[0].object.material.uniforms;
			if(uni && uni.gold && uni.gold.value==true){
				_intersected=inter[0].object;
				_intersected._current_material=_intersected.material;
				_intersected.material=_selected_material;
			}
		}		
	}else{
		if(_intersected) _intersected.material=_intersected._current_material;
		_intersected=null;
	}
	
}

function draw(){

	
	requestAnimationFrame(draw);

	update();
	// _renderer.render(_scene, _camera);
	_composer.render();

}

function addLeg(){

	//console.log("add");

	for(var i=0;i<Const.MBranch;++i){
		var start_=[0,Math.PI*2.0/Const.MBranch*i,Const.StartPoint+Const.StartVel[2]*i];
		var vel_=[Const.StartVel[0],Const.StartVel[1],Const.StartVel[2]];

		var leg_=new LLeg(start_,vel_,readyToAddGold());

		var mat_=createMaterial(leg_._shader_uniform);

		var mesh_=new THREE.Mesh(_leg_geometry,mat_);			
		updatePos(mesh_,leg_);
		//console.log(leg_._shader_uniform.amount.value);

		_leg.push(leg_);
		_scene.add(mesh_);
	}
	
}
function initLeg(){
	
	_leg_texture.wrapS=_leg_texture.wrapT=THREE.RepeatWrapping;
	_leg_texture.repeat.set(1,1);


	
	// _shader_uniform={
	// 	amount:{value:0.02},
	// 	angle:{value:0.02},
	// 	texture:{value:_leg_texture}
	// };
	// _shader_uniform.texture.value.wrapS=_shader_uniform.texture.value.wrapT=THREE.RepeatWrapping;
	// _leg_material=new THREE.ShaderMaterial({
	// 	uniforms:_shader_uniform,
	// 	vertexShader:document.getElementById('vertexShader').textContent,
	// 	fragmentShader:document.getElementById('glitchFragmentShader').textContent,
	// 	transparent:true
	// });

	_selected_material=new THREE.MeshBasicMaterial( {color:0xff0000,map:_leg_texture,transparent:true} );
	// _selected_material=new THREE.MeshBasicMaterial( {color:0xff0000,map:_leg_texture,transparent:true} );


	// _leg_mat_cyan=new THREE.MeshBasicMaterial( {map:_leg_texture,blending:THREE.AdditiveBlending, transparent:false, color:0x00ffff} );
	// _leg_mat_magenta=new THREE.MeshBasicMaterial( {map:_leg_texture,blending:THREE.AdditiveBlending, transparent:false, color:0xff00ff} );

	//var shader_=THREE.DigitalGlitch;
	//_leg_material=new THREE.MeshPhongMaterial( {map:_leg_texture} );

	for(var j=0;j<Const.MBranch;j+=1){
		
		for(var i=0;i<12;i+=1){

			var start_=[0,Math.PI*2.0/Const.MBranch*j,Const.StartPoint];
			var vel_=[Const.StartVel[0],Const.StartVel[1],Const.StartVel[2]];

			var leg_=new LLeg(start_,vel_,readyToAddGold());

			for(var x=0;x<i.toFixed(2)*Const.AddInterval;x+=1) leg_.update();

			
			//console.log(leg_._pos[2]+" - "+leg_._shader_uniform.amount.value);

			var mat_=createMaterial(leg_._shader_uniform);

			var mesh_=new THREE.Mesh(_leg_geometry,mat_);			
			updatePos(mesh_,leg_);

			_leg.push(leg_);
			_scene.add(mesh_);
			
		}
	
	}

}

function createMaterial(uniforms_){

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		vertexShader:document.getElementById('vertexShader').textContent,
		fragmentShader:document.getElementById('glitchFragmentShader').textContent,
		transparent:true				
	});
	
	
	
}
function updatePos(mesh_,leg_){
	var pos=leg_.getPos();

	mesh_.position.x=pos[0];
	mesh_.position.y=pos[1];
	mesh_.position.z=pos[2];

	mesh_.scale.set(leg_.getScale(),leg_.getScale(),leg_.getScale());

	mesh_.rotation.z=leg_.getRot();



}

function resetLeg(){

}

function readyToAddGold(){
	_gold_interval--;
	var gold_=_gold_interval==0;
	if(_gold_interval<0) _gold_interval=Math.floor(Math.random(.8,1.2)*Const.GoldInterval);
	return gold_;
}


init();
draw();

