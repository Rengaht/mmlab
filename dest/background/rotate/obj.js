function RotateSlice(p_,a_,i_){
	this._pos=p_;
	this._amp=a_;
	this._vel=[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200];
	this._tex_index=i_;

	this.distort_vel=random(5,20);
	var _tex=new THREE.TextureLoader().load('image/logo_slice/slice-01.png');
	
	this._shader_uniform={
		amount:{value:2.0},
		alpha:{value:1.0},
		angle:{value:Math.random()*Math.PI},
		seed_x:{value:0.2},
		seed_y:{value:0.4},
		texture:{value:_tex},
		damp:{value:Math.random()*.3+.1},
		dvel:{value:this.distort_vel},
		alpha:{value:0.0}
	};

	this._shader_uniform.texture.value.wrapS=this._shader_uniform.texture.value.wrapT=THREE.RepeatWrapping;
	this.phi=Math.random()*Math.PI*2;
}

RotateSlice.prototype.update=function(){
	
	// this._pos[0]+=this._amp[0]*Math.sin(frameCount/this._vel[0]+this.phi);
	// this._pos[1]+=this._amp[1]*Math.sin(frameCount/this._vel[1]+this.phi);
	// this._pos[2]+=this._amp[2]*(Math.sin(frameCount/this._vel[2]+this.phi));
	

	//this._shader_uniform.angle.value=(Math.random()-0.5)*2.0*Math.PI*.4;
	this._shader_uniform.amount.value=2.0;//*(Math.sin(frameCount/this._vel[1]+this.phi)+random(-.2,.2));
	// this._shader_uniform.seed_x.value=(Math.random()-0.5)*2.0*0.01;
	// this._shader_uniform.seed_y.value=(Math.random()-0.5)*2.0*0.01;

	//this._shader_uniform.damp.value=0.3;//*Math.sin(frameCount/this._vel[1]+this.phi)+0.1*random(-1,1);
	
	this._shader_uniform.dvel.value=this.distort_vel*(.8+.5*Math.sin(frameCount/this._vel[2]+this.phi));
	
	

	if(_fade_out && _Background_Type==3) this._shader_uniform.alpha.value=Math.min(this._shader_uniform.alpha.value,_fade_scale)*3.0;
	else if(_fade_in) this._shader_uniform.alpha.value=_fade_scale*3.0;
	else this._shader_uniform.alpha.value=1.0*3.0;

}
RotateSlice.prototype.getPos=function(){
	return [this._pos[0]+this._amp[0]*Math.sin(frameCount/this._vel[0]+this.phi),
			this._pos[1]+this._amp[1]*Math.sin(frameCount/this._vel[1]+this.phi),
			this._pos[2]+this._amp[2]*(Math.sin(frameCount/this._vel[2]+this.phi))];
	
}





