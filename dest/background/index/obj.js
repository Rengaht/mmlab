function LLeg(p_,v_,g_){
	
	this._pos=[p_[0],p_[1],p_[2]];
	this._vel=[v_[0],v_[1],v_[2]];
	this._gold=g_;
	this._dead=false;
	this._ang=Math.random()*Math.PI;
	this._shader_uniform={
		amount:{value:0.0},
		angle:{value:Math.random()*Math.PI},
		seed_x:{value:0.0},
		seed_y:{value:0.0},
		texture:{value:_leg_texture},
		gold:{value:g_}			
	};
	if(g_){
		this._shader_uniform.texture.value=_special_texture;
	}

	this._shader_uniform.texture.value.wrapS=this._shader_uniform.texture.value.wrapT=THREE.RepeatWrapping;
	this.id;

}

LLeg.prototype.update=function(){
	
	if(this._dead) return;

	this._pos[0]+=this._vel[0];
	this._pos[1]+=this._vel[1];
	this._pos[2]+=this._vel[2];

	var t=this._pos[0]/LogoConst.DestRad.toFixed(2);
	if(t<0.5){
		this._vel[0]+=LogoConst.PreVelDiff[0];
		this._vel[1]*=LogoConst.PreVelDiff[1];
		this._vel[2]*=LogoConst.PreVelDiff[2];
	}else{
		this._vel[0]*=LogoConst.VelDiff[0];
		this._vel[1]*=LogoConst.VelDiff[1];
		this._vel[2]*=LogoConst.VelDiff[2];
	}
	if(t>1) this._dead=true;

	// var gstart=0.3;
	// var gend=0.9;
	// if(t<gstart) t=0;
	// else if(t>gend) t=gend;
	//t=(t-gstart)/(gend-gstart);
	//console.log(t);
	if(!this._gold){
		this._shader_uniform.amount.value=t;
		this._shader_uniform.angle.value=t*(Math.random()-0.5)*2.0*Math.PI*.4;
		this._shader_uniform.seed_x.value=t*(Math.random()-0.5)*2.0*0.02;
		this._shader_uniform.seed_y.value=t*(Math.random()-0.5)*2.0*0.03;
	}
	//console.log(this._pos[2]+" - "+t+" - "+this._shader_uniform.amount.value);

}
LLeg.prototype.getPos=function(){
	return [this._pos[0]*Math.sin(this._pos[1]),this._pos[0]*Math.cos(this._pos[1]),this._pos[2]];
}
LLeg.prototype.getRot=function(){
	return -this._pos[1]-Math.PI/2-0.4;
}
LLeg.prototype.getScale=function(){
	var _shrink_dest=0.5;
	var t=(this._pos[0]/LogoConst.DestRad.toFixed(2));
	if(t>_shrink_dest) t=_shrink_dest;

	var s=t*(0.8/_shrink_dest)+0.2;
	//return new THREE.Vector3(s,s,s);
	return s;
}