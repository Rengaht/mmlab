function FloatLeg(p_,v_){
	
	this._center=[-window.innerWidth,-window.innerHeight];
	this._pos=[p_[0],p_[1],p_[2]];
	this._vel=[v_[0],v_[1],v_[2]];
	this._ang=Math.random()*Math.PI;
	this._shader_uniform={
		amount:{value:0.0},
		angle:{value:Math.random()*Math.PI},
		seed_x:{value:0.0},
		seed_y:{value:0.0},
		texture:{value:_rotate_leg_texture},		
		damp:{value:0},
		dvel:{value:20},
		alpha:{value:0.6}
	};

	this._shader_uniform.texture.value.wrapS=this._shader_uniform.texture.value.wrapT=THREE.RepeatWrapping;
	this.id;
	this.phi=Math.random()*Math.PI*2.0;
}

FloatLeg.prototype.update=function(){
	

	this._pos[0]+=this._vel[0];
	this._pos[1]+=this._vel[1];
	this._pos[2]+=this._vel[2];

	this._shader_uniform.amount.value=2.0*(Math.sin(frameCount/100.0+this.phi)*.5+.8+random(-.05,.05));
	//this._shader_uniform.angle.value=(Math.random()-0.5)*2.0*Math.PI*.4;
	//this._shader_uniform.seed_x.value=(Math.random()-0.5)*2.0*0.02;
	//this._shader_uniform.seed_y.value=(Math.random()-0.5)*2.0*0.03;

}
FloatLeg.prototype.getPos=function(){
	return [this._center[0]+this._pos[0]*Math.sin(this._pos[1]),this._center[1]+this._pos[0]*Math.cos(this._pos[1]),this._pos[2]];
}
FloatLeg.prototype.getRot=function(){
	return -this._pos[1]-Math.PI/2;
}