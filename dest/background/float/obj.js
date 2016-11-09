function FloatSlice(p_,a_,i_){
	this._pos=p_;
	this._amp=a_;
	this._vel=[Math.random()*50+200,Math.random()*50+200,Math.random()*50+200];
	this._tex_index=i_;

	this.distort_vel=random(10,70);
	let _tex=new THREE.TextureLoader().load('image/logo_slice/slice-'+(i_<10?'0'+String(i_):String(i_))+'.png');
	
	this._shader_uniform={
		amount:{value:2.0},
		angle:{value:Math.random()*Math.PI},
		seed_x:{value:0.0},
		seed_y:{value:0.0},
		texture:{value:_tex},
		damp:{value:0},
		dvel:{value:this.distort_vel}
	};

	this._shader_uniform.texture.value.wrapS=this._shader_uniform.texture.value.wrapT=THREE.RepeatWrapping;
	this.phi=Math.random()*Math.PI*2;
	this.id;
	
}

FloatSlice.prototype.update=function(){
	
	// this._pos[0]+=this._amp[0]*Math.sin(frameCount/this._vel[0]+this.phi);
	// this._pos[1]+=this._amp[1]*Math.sin(frameCount/this._vel[1]+this.phi);
	// this._pos[2]+=this._amp[2]*(Math.sin(frameCount/this._vel[2]+this.phi));
	

	//this._shader_uniform.angle.value=(Math.random()-0.5)*2.0*Math.PI*.4;
	this._shader_uniform.amount.value=2.0*(Math.sin(frameCount/this._vel[1]+this.phi)+random(-.2,.2));
	this._shader_uniform.seed_x.value=(Math.random()-0.5)*2.0*0.01;
	this._shader_uniform.seed_y.value=(Math.random()-0.5)*2.0*0.01;

	// if(random(0,5)<1) 
	this._shader_uniform.damp.value=0.03*Math.sin(frameCount/this._vel[1]+this.phi)+0.01*random(-1,1);
	// else this._shader_uniform.damp.value=0;

	this._shader_uniform.dvel.value=this.distort_vel*(Math.sin(frameCount/this._vel[2]+this.phi));
}
FloatSlice.prototype.getPos=function(){
	return [this._pos[0]+this._amp[0]*Math.sin(frameCount/this._vel[0]+this.phi),
			this._pos[1]+this._amp[1]*Math.sin(frameCount/this._vel[1]+this.phi),
			this._pos[2]+this._amp[2]*(Math.sin(frameCount/this._vel[2]+this.phi))];
	
}