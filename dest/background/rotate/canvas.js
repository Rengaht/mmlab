function RotateConstants(ww_){
	this.MRotate=6;
	this.LegSize=ww_*.8;
	this.LegRatio=1;
	this.RotateRadius=ww_*.5;
	this.RotateVel=0.0005;
	this.RotateZ=1;

	this.MSlice=6;	
	this.SliceSize=ww_*1.5;
	this.SliceHeight=ww_*.05;
}

let RotateConst;


var _rotate_leg_geometry;
var _rotate_leg_texture;

//var _mslice;
let _rotate_slice=[];

let _rotate_leg=[];




function initRotate(){

	RotateConst=new RotateConstants(window.innerWidth);

	_rotate_leg_geometry=new THREE.PlaneGeometry(RotateConst.LegSize,RotateConst.LegSize*RotateConst.LegRatio);
	_rotate_leg_texture=new THREE.TextureLoader().load('image/leg-01.png',function(){	
		initSliceRotate();			
	});

}		
function clearRotate(){
	let mslice=_rotate_slice.length;
	if(mslice>1){
		for(let i=mslice-1;i>=0;i--){		
			_scene.remove(_scene.getObjectById(_rotate_slice[i].id,true));
			_rotate_slice.splice(i,1);		
		}
	}

	let mleg=_rotate_leg.length;
	if(mleg>1){
		for(let i=mleg-1;i>=0;i--){		
			_scene.remove(_scene.getObjectById(_rotate_leg[i].id,true));
			_rotate_leg.splice(i,1);		
		}
	}
}

function updateRotate(){
	var i;
	for(i=0;i<_rotate_slice.length;++i){		
		_rotate_slice[i].update();
		updatePosRotate(_scene.getObjectById(_rotate_slice[i].id,true),_rotate_slice[i]);
	}	

	if(_rotate_leg.length==RotateConst.MRotate){
		for(i=0;i<RotateConst.MRotate;++i){
			_rotate_leg[i].update();
			updatePosRotate(_scene.getObjectById(_rotate_leg[i].id,true),_rotate_leg[i]);
		}
	}

	
}


function initSliceRotate(){
	
	var i;


	_rotate_leg_texture.wrapS=_rotate_leg_texture.wrapT=THREE.RepeatWrapping;
	_rotate_leg_texture.repeat.set(1,1);

	//_mslice=Const.MSlice;
	
	// create random index to slice
	var random_arr=[];
	for(i=1;i<=RotateConst.MSlice;++i) random_arr.push(i);
	shuffleArray(random_arr);
	
	let ww_=window.innerWidth.toFixed(2);
	let wh_=window.innerHeight.toFixed(2);

	let etheta=Math.PI*2.0/RotateConst.MRotate;

	for(i=0;i<RotateConst.MRotate;i+=1.0){
		
		var pos_=[RotateConst.RotateRadius,etheta*i,0];
		var vel_=[0,RotateConst.RotateVel,0];

		var leg_=new FloatLeg(pos_,vel_);
		
		var mat_=createMaterialRotate(leg_._shader_uniform);
		
		var mesh_=new THREE.Mesh(_rotate_leg_geometry,mat_);	

		leg_.id=mesh_.id;

		updatePosRotate(mesh_,leg_);

		_rotate_leg.push(leg_);
		_scene.add(mesh_);	

	}



	for(i=0;i<RotateConst.MSlice;i++){

		//var pos_=[random(0,ww_*.1),random(0,wh_*.1),100];
		var pos_=[random(-ww_*.5,ww_*.5),wh_*.5*(1-2.0/RotateConst.MSlice*i+random(-.5,.5)),100];
		var amp_=[random(20,80),random(20,80),random(-10,10)];

		var slice_=new RotateSlice(pos_,amp_,random_arr[i]);
		
		var mat_=createMaterialRotate(slice_._shader_uniform);

		var len_=RotateConst.SliceSize*(Math.random()*.2+1);
		var geo_=new THREE.PlaneGeometry(len_,RotateConst.SliceHeight*random(.5,1.5));
		// var geo_=new THREE.PlaneGeometry(20,20);

		var mesh_=new THREE.Mesh(geo_,mat_);	
		slice_.id=mesh_.id;

		updatePosRotate(mesh_,slice_);

		_rotate_slice.push(slice_);
		_scene.add(mesh_);
		

	}
	

}


function createMaterialRotate(uniforms_,tex_index_){

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		vertexShader:_vertexshader,
		fragmentShader:_rotate_fragshader,
		transparent:true,
		opacity:0.9,
		blending:THREE.AdditiveBlending
	});
	// return new THREE.MeshBasicMaterial({
	// 	color:0xff0000} );
	
}
function updatePosRotate(mesh_,slice_){
	
	let pos=slice_.getPos();

	mesh_.position.x=pos[0];
	mesh_.position.y=pos[1];
	mesh_.position.z=pos[2];

	//mesh_.rotation.z+=random(-1,1)*.005;
	// mesh_.rotation.x+=Math.random()*.001;
	// mesh_.rotation.y+=Math.random()*.001;

	if(slice_.getRot) mesh_.rotation.z=slice_.getRot();
}


