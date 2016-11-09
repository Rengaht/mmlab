
function LogoConstants(){
	this.ShapeScale;
	this.AddInterval=18;
	this.StartVel=[20,3.14159/240.0,12.0];
	this.PreVelDiff=[0.01,1,0.00];
	this.VelDiff=[1.01,1,1];
	this.GoldInterval=150;
	this.MBranch=12;
	this.LegSize=500;
	this.LegRatio=1.0;
	this.LogoSize=400;
	this.StartNum=50;
	this.StartRad;
	this.DestRad;
}


var LogoConst=new LogoConstants();
let _logo_leg=[];
var _leg_texture,_special_texture;
var _leg_shape,_leg_gemoetry,_leg_material;
var _selected_material;
var _gold_interval;

var _logo_texture;
var _logo_geometry,_logo_material;
var _logo_id;



function initLogo(){

	LogoConst.StartRad=LogoConst.LogoSize*1.8;//window.innerWidth.toFixed(2)*0.5;
	LogoConst.DestRad=window.innerWidth.toFixed(2)*1.2;
	LogoConst.ShapeScale=1.0;//LogoConst.DestRad*.2/LogoConst.LegSize;

	_gold_interval=LogoConst.GoldInterval;

	_leg_geometry=new THREE.PlaneGeometry(LogoConst.LegSize,LogoConst.LegSize*LogoConst.LegRatio);
	_logo_geometry=new THREE.PlaneGeometry(LogoConst.LogoSize,LogoConst.LogoSize);

	_leg_texture=new THREE.TextureLoader().load('image/leg-01.png',function(texture){		
		_special_texture=new THREE.TextureLoader().load('image/golden.png',function(texture){
			_logo_texture=new THREE.TextureLoader().load('image/index_logo.png',function(texture){
				initLogoLeg();			
			});		
		});		
	});

}		
function clearLogo(){
	let mleg=_logo_leg.length;
	
	_scene.remove(_scene.getObjectById(_logo_id));
	if(mleg<1) return;

	for(let i=mleg-1;i>=0;i--){		
		_scene.remove(_scene.getObjectById(_logo_leg[i].id));
		_logo_leg.splice(i,1);		
	}

}

function updateLogo(){
	let mleg=_logo_leg.length;
	for(let i=mleg-1;i>=0;i--){		
		if(_logo_leg[i]._dead){
			_scene.remove(_scene.getObjectById(_logo_leg[i].id,true));
			_logo_leg.splice(i,1);			
		}else{
			_logo_leg[i].update();
			updatePosLogo(_scene.getObjectById(_logo_leg[i].id,true),_logo_leg[i]);
		}
	}	

	if(frameCount%LogoConst.AddInterval==LogoConst.AddInterval-1) addLogo();
	


}

function addLogo(){

	//console.log("add");

	for(var i=0;i<LogoConst.MBranch;++i){
		//var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch*i,Const.StartPoint+LogoConst.StartVel[2]*10*i];
		var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch*i,Const.StartPoint];
		var vel_=[LogoConst.StartVel[0],LogoConst.StartVel[1],LogoConst.StartVel[2]];

		var leg_=new LLeg(start_,vel_,readyToAddGold());

		var mat_=createMaterialLogo(leg_._shader_uniform);

		var mesh_=new THREE.Mesh(_leg_geometry,mat_);	
				
		leg_.id=mesh_.id;
				
		updatePosLogo(mesh_,leg_);
		//console.log(leg_._shader_uniform.amount.value);

		_logo_leg.push(leg_);
		_scene.add(mesh_);
	}
	
}
function initLogoLeg(){
	
	_leg_texture.wrapS=_leg_texture.wrapT=THREE.RepeatWrapping;
	_leg_texture.repeat.set(1,1);


	//TODO:
	_selected_material=new THREE.MeshBasicMaterial( {color:0xff0000,map:_leg_texture,transparent:true} );
	//center logo:
	_logo_material=new THREE.MeshBasicMaterial( {color:0xffffff,map:_logo_texture,transparent:true} );
	// var _logo_mesh=new THREE.Mesh(_logo_geometry,_logo_material);
	// _logo_mesh.position.z=(Const.EndPoint-Const.StartPoint)*.6+Const.StartPoint;
	// _scene.add(_logo_mesh);
	// _logo_id=_logo_mesh.id;


	for(var j=0;j<LogoConst.MBranch;j+=1){
		
		for(var i=0;i<LogoConst.StartNum;i+=1){

			// var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch*(j),Const.StartPoint+LogoConst.StartVel[2]*10*j];
			var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch*(j),Const.StartPoint];
			var vel_=[LogoConst.StartVel[0],LogoConst.StartVel[1],LogoConst.StartVel[2]];

			var leg_=new LLeg(start_,vel_,readyToAddGold());

			for(var x=0;x<i.toFixed(2)*LogoConst.AddInterval;x+=1) leg_.update();

			
			//console.log(leg_._pos[2]+" - "+leg_._shader_uniform.amount.value);

			var mat_=createMaterialLogo(leg_._shader_uniform);

			var mesh_=new THREE.Mesh(_leg_geometry,mat_);
			

			leg_.id=mesh_.id;

			updatePosLogo(mesh_,leg_);

			_logo_leg.push(leg_);
			_scene.add(mesh_);
			
		}
	
	}

}
function rotateToSurface(mesh_,leg_){

	var axis=new THREE.Vector3(mesh_.position.y,-mesh_.position.x,0);
	var axis2=new THREE.Vector3(0,0,1);

	var rotationMatrix=new THREE.Matrix4();
	//rotationMatrix.premultiply(mesh_.matrix); 
    rotationMatrix.makeRotationAxis(axis2.normalize(),leg_.getRot());
    
   
    var rotation2Matrix=new THREE.Matrix4();
    
	rotation2Matrix.premultiply(mesh_.matrix); 
    rotation2Matrix.makeRotationAxis(axis.normalize(),Math.PI*0);
    rotation2Matrix.multiply(rotationMatrix);

    mesh_.matrix=rotation2Matrix;
    mesh_.rotation.setFromRotationMatrix(mesh_.matrix);

	
	//mesh_.rotateOnAxis(vec_,Math.PI*.5);
			
}

function createMaterialLogo(uniforms_){
	

	return new THREE.ShaderMaterial({
		uniforms:uniforms_,
		vertexShader:_vertexshader,
		fragmentShader:_index_fragshader,
		transparent:true
	});
	
	
}
function updatePosLogo(mesh_,leg_){

	if(!mesh_){
		return;	
	} 

	var pos=leg_.getPos();

	mesh_.position.x=pos[0];
	mesh_.position.y=pos[1];
	mesh_.position.z=pos[2];

	mesh_.scale.set(leg_.getScale(),leg_.getScale(),leg_.getScale());

	// mesh_.rotation.z=leg_.getRot();
	rotateToSurface(mesh_,leg_);



}

function readyToAddGold(){
	_gold_interval--;
	var gold_=_gold_interval==0;
	if(_gold_interval<0) _gold_interval=Math.floor(Math.random(.8,1.2)*LogoConst.GoldInterval);
	return gold_;
}
