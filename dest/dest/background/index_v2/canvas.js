
function LogoConstants(){
	this.ShapeScale;
	//this.AddInterval=240;
	this.AddInterval=18;
	// this.StartVel=[20,3.14159/180.0,1.0];
	this.StartVel=[20,3.14159/240.0,12.0];
	this.PreVelDiff=[0.01,1,0.00];
	this.VelDiff=[1.01,1,1];
	this.GoldInterval=150;
	this.MBranch=12;
	this.LegSize=500;
	this.LegRatio=1.0;
	this.LogoSize=800;
	this.StartNum=50;
	this.StartRad;
	this.DestRad;
	this.IntersectDelay=.05;
}


var LogoConst=new LogoConstants();
var _logo_leg=[];
var _leg_texture,_special_texture,_select_texture;
var _leg_shape,_leg_gemoetry,_leg_material;
var _selected_material;
var _gold_interval;

var _logo_texture;
var _logo_geometry,_logo_material;
var _logo_id;


var _intersect;
var _catched_gold;

var _logo_add_loop;



function initLogo(){

	LogoConst.StartRad=LogoConst.LogoSize;//window.innerWidth.toFixed(2)*0.5;
	LogoConst.DestRad=window.innerWidth.toFixed(2)*1.2;
	LogoConst.ShapeScale=1.0;//LogoConst.DestRad*.2/LogoConst.LegSize;

	_gold_interval=LogoConst.GoldInterval;

	_leg_geometry=new THREE.PlaneGeometry(LogoConst.LegSize,LogoConst.LegSize*LogoConst.LegRatio);
	_logo_geometry=new THREE.PlaneGeometry(LogoConst.LogoSize,LogoConst.LogoSize);

	_leg_texture=new THREE.TextureLoader().load('image/leg-01.png',function(texture){		
		_special_texture=new THREE.TextureLoader().load('image/golden.png',function(texture){
			_select_texture=new THREE.TextureLoader().load('image/golden_selected.png',function(texture){
				_logo_texture=new THREE.TextureLoader().load('image/index_logo.png',function(texture){
					initLogoLeg();			
				});		
			});
		});		
	});

	_logo_add_loop=0;
}		
function clearLogo(){
	var mleg=_logo_leg.length;
	
	_scene.remove(_scene.getObjectById(_logo_id));
	if(mleg<1) return;

	for(var i=mleg-1;i>=0;i--){		
		_scene.remove(_scene.getObjectById(_logo_leg[i].id));
		_logo_leg.splice(i,1);		
	}

}

function updateLogo(){
	var mleg=_logo_leg.length;
	for(var i=mleg-1;i>=0;i--){		
		if(_logo_leg[i]._dead){
			_scene.remove(_scene.getObjectById(_logo_leg[i].id,true));
			_logo_leg.splice(i,1);			
		}else{
			_logo_leg[i].update();
			updatePosLogo(_scene.getObjectById(_logo_leg[i].id,true),_logo_leg[i]);
		}
	}	

	var add_=_intersect?LogoConst.AddInterval/LogoConst.IntersectDelay:LogoConst.AddInterval;
	if(frameCount%add_==LogoConst.AddInterval-1) addLogo();
	
	checkIntersect();

}

function addLogo(init_){

	//console.log("add");
	_logo_add_loop++;//=(_logo_add_loop+1)%LogoConst.MBranch;
	// var dis_=_logo_add_loop*.5;//.5/LogoConst.MBranch;
	var dis_=0;

	for(var i=0;i<LogoConst.MBranch;++i){
		//var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch*i,Const.StartPoint+LogoConst.StartVel[2]*10*i];

		
		var start_=[LogoConst.StartRad,Math.PI*2.0/LogoConst.MBranch.toFixed(2)*(i+dis_),Const.StartPoint];
		// console.log(dis_+" "+start_[1]);

		var vel_=[LogoConst.StartVel[0],LogoConst.StartVel[1],LogoConst.StartVel[2]];

		var leg_=new LLeg(start_,vel_,readyToAddGold());

		if(init_!==undefined){
			for(var x=0;x<init_.toFixed(2)*LogoConst.AddInterval;x+=1) leg_.update();
		}

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
	_selected_material=new THREE.MeshBasicMaterial( {color:0xffffff,map:_select_texture,transparent:true} );
	//center logo:
	_logo_material=new THREE.MeshBasicMaterial( {color:0xffffff,map:_logo_texture,transparent:true} );
	// var _logo_mesh=new THREE.Mesh(_logo_geometry,_logo_material);
	// _logo_mesh.position.z=(Const.EndPoint-Const.StartPoint)*.6+Const.StartPoint;
	// _scene.add(_logo_mesh);
	// _logo_id=_logo_mesh.id;

	for(var j=0;j<LogoConst.StartNum;j+=1){
		addLogo(j);	
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
    rotation2Matrix.makeRotationAxis(axis.normalize(),Math.PI*.4);
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

	mesh_.rotation.z=leg_.getRot();
	// rotateToSurface(mesh_,leg_);



}

function readyToAddGold(){
	_gold_interval--;
	var gold_=_gold_interval==0;
	if(_gold_interval<0) _gold_interval=Math.floor(Math.random(.8,1.2)*LogoConst.GoldInterval);
	return gold_;
}


function checkIntersect(){

	if(_mouse.x>1 || _mouse.x<-1 ||
		_mouse.y>1 || _mouse.y<-1) return;

	//check intersected
	_raycaster.setFromCamera(_mouse,_camera);
	var inter=_raycaster.intersectObjects(_scene.children);

	if(inter.length>0){
		
		if(_catched_gold!=inter[0].object){

			if(_catched_gold) _catched_gold.material=_catched_gold._current_material;

			var uni=inter[0].object.material.uniforms;
			if(uni && uni.gold && uni.gold.value==true){
				_catched_gold=inter[0].object;
				_catched_gold._current_material=_catched_gold.material;
				_catched_gold.material=_selected_material;

				_intersect=true;
				document.body.style.cursor="pointer";

			}else{
				_intersect=false;
				document.body.style.cursor="auto";
			}
		}		
	}else{
		if(_catched_gold) _catched_gold.material=_catched_gold._current_material;
		_catched_gold=null;

		_intersect=false;
		document.body.style.cursor="auto";
	}
}

function onClickLogo(){
	if(_intersect){
		window.location.href="./#/work";
	}
}

