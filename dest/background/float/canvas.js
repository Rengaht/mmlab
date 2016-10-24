
function FloatConstants(){
	this.MSlice=7;	
	this.SliceSize=240;
	this.DestRad;
}

let FloatConst=new FloatConstants();

var _mslice;
let _slice_float=[];



function initFloat(){

	initSliceFloat();			
	
}		
function clearFloat(){

	let mslice=_slice_float.length;
	if(mslice<1) return;

	for(let i=mslice-1;i>=0;i--){		
		_scene.remove(_scene.getObjectById(_slice_float[i].id,true));
		_slice_float.splice(i,1);
		
	}
}

function updateFloat(){
	

	var i;
	for(i=_mslice-1;i>=0;--i){		
		_slice_float[i].update();
		updatePosFloat(_scene.children[i],_slice_float[i]);
	}	
	
}


function initSliceFloat(){
	
	var i;


	_mslice=12;
	
	// create random index to slice
	var random_arr=[];
	for(i=1;i<=_mslice;++i) random_arr.push(i%FloatConst.MSlice);
	shuffleArray(random_arr);
	//console.log(random_arr);
	
	let ww_=window.innerWidth.toFixed(2);
	let wh_=window.innerHeight.toFixed(2);

	for(i=0;i<_mslice;i++){

		//var pos_=[random(0,ww_*.1),random(0,wh_*.1),100];
		var pos_=[random(0,ww_)*(random(0,2)<1?1.0:-1.0),random(-1.0,1.0)*wh_,random(50,550)];
		var amp_=[random(20,80),random(20,80),random(-10,10)];

		var slice_=new FloatSlice(pos_,amp_,random_arr[i]);
		
		var mat_=createMaterialFloat(slice_._shader_uniform);
		var geo_=new THREE.PlaneGeometry(FloatConst.SliceSize*random(1,3),FloatConst.SliceSize*random(1,3));
		// var geo_=new THREE.PlaneGeometry(20,20);

		var mesh_=new THREE.Mesh(geo_,mat_);	
		slice_.id=mesh_.id;


		updatePosFloat(mesh_,slice_);

		_slice_float.push(slice_);
		_scene.add(mesh_);
		

	}
	

}

function createMaterialFloat(uniforms_,tex_index_){

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		// vertexShader:document.getElementById('vertexShader').textContent,
		// fragmentShader:document.getElementById('glitchFragmentShader').textContent,
		vertexShader:_vertexshader,
		fragmentShader:_float_fragshader,
		transparent:true,
		opacity:1,
		blending:THREE.AdditiveBlending
	});
	// return new THREE.MeshBasicMaterial({
	// 	color:0xff0000} );
	
}
function updatePosFloat(mesh_,slice_){
	
	let pos=slice_.getPos();

	mesh_.position.x=pos[0];
	mesh_.position.y=pos[1];
	mesh_.position.z=pos[2];

	mesh_.rotation.z+=random(-1,1)*.005;
	// mesh_.rotation.x+=Math.random()*.001;
	// mesh_.rotation.y+=Math.random()*.001;

	//mesh_.rotation.z=leg_.getRot();
}
