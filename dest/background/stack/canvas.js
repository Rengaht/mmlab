
function StackConstants(){
	this.MSlice=9;	
	this.SliceSize=420;	
	this.MStack=2;
}

let StackConst=new StackConstants();
var _stack=[];

function initStack(){
	
	initSliceStack();			

}		
function clearStack(){
	let mstack=_stack.length;
	
	if(mstack<1) return;

	for(let i=mstack-1;i>=0;i--){		
		var mslice=_stack[i].slice.length;
		for(j=mslice-1;j>=0;--j){
			_scene.remove(_scene.getObjectById(_stack[i].slice[j].id));
			_stack[i].slice.splice(j,1);		
		}
		_stack.splice(i,1);
	}
}
function updateStack(){
	var i,j;

	for(j=0;j<StackConst.MStack;++j){
		_stack[j].update();
		var mslice=_stack[j].slice.length;
		for(i=0;i<mslice;++i){		
			_stack[j].slice[i].update();
			//updatePos(_scene.children[i],_slice[i]);
			updatePosStack(_stack[j],
					  _scene.getObjectById(_stack[j].slice[i].id,true),
					  _stack[j].slice[i]);
		}			
	}
	
}


function initSliceStack(){
	
	var i,j;

	var random_arr=[];
	for(i=1;i<=StackConst.MSlice;++i) random_arr.push(i);
		
	let ww_=window.innerWidth.toFixed(2);
	let wh_=window.innerHeight.toFixed(2);


	
	for(j=0;j<StackConst.MStack;++j){

		var mslice=Math.round(Math.random()*3)+3;
		var slice=[];
		
		// create random index to slice
		shuffleArray(random_arr);
		
		let spos_=[(ww_*.5+ww_*.3*random(0,1))*(j*2-1),
				   wh_*.3*random(-1,1),
				   random(20,120)];
		var samp_=[random(20,80),random(20,80),random(-10,10)];
		var stack=new FloatSlice(spos_,samp_,-1);


		for(i=0;i<mslice;i++){

			//var pos_=[random(0,ww_*.1),random(0,wh_*.1),100];
			var pos_=[random(-20,20),random(-20,20),random(-10,10)];
			var amp_=[random(0,60),random(0,60),random(0,10)];

			var slice_=new FloatSlice(pos_,amp_,random_arr[i]);
			
			var mat_=createMaterialStack(slice_._shader_uniform);
			var geo_=new THREE.PlaneGeometry(StackConst.SliceSize*random(1,3),StackConst.SliceSize*random(1,3));
			// var geo_=new THREE.PlaneGeometry(20,20);

			var mesh_=new THREE.Mesh(geo_,mat_);	

			slice_.id=mesh_.id;
			slice_._shader_uniform.amount=stack._shader_uniform.amount;
			slice_._shader_uniform.angle=stack._shader_uniform.angle;
			slice_._shader_uniform.seed_x=stack._shader_uniform.seed_x;
			slice_._shader_uniform.seed_y=stack._shader_uniform.seed_y;

			updatePosStack(stack,mesh_,slice_);

			slice.push(slice_);
			_scene.add(mesh_);		
		}

		//stack.mslice=mslice;
		stack.slice=slice;

		_stack.push(stack);
	}

}

function createMaterialStack(uniforms_,tex_index_){

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		vertexShader:_vertexshader,
		fragmentShader:_stack_fragshader,
		transparent:true,
		opacity:0.9,
		blending:THREE.AdditiveBlending
	});
	// return new THREE.MeshBasicMaterial({
	// 	color:0xff0000} );
	
}
function updatePosStack(stack_,mesh_,slice_){
	let spos=stack_.getPos();
	let pos=slice_.getPos();

	mesh_.position.x=spos[0]+pos[0];
	mesh_.position.y=spos[1]+pos[1];
	mesh_.position.z=spos[2]+pos[2];

	mesh_.rotation.z=slice_._rot_ang;
	// mesh_.rotation.x+=random(-1,1)*.001;
	// mesh_.rotation.y+=random(-1,1)*.001;

}

