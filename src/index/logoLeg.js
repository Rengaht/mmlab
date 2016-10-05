class PVector{
	constructor(x,y,z){
		this.x=x;
		this.y=y;
		this.z=z;
	}
	add(v_){
		this.x+=v_.x;
		this.y+=v_.y;
		this.z+=v_.z;
	}
	mult(v_){
		this.x*=v_.x;
		this.y*=v_.y;
		this.z*=v_.z;	
	}
}

class LogoLeg{
	constructor(pos_,vel_,gold_){
		this._pos=pos_;
		this._vel=vel_;
		this._gold=gold_;
		this._dead=false;
	}
	draw(canvas_){
		if(this._dead) return;

		let t_=(this._pos.z-Const.StartPoint)/(Const.EndPoint-Const.StartPoint);
		

	}
	update(){
		if(this._dead) return;

		this._pos.add(this._vel);
		let t_=(this._pos.z-START_POINT)/(END_POINT-START_POINT);
		if(t_>0.1 && t_<0.7){
			this._vel.mult(Const.vel_diff);
		}

		if(this._pos.x>Const.width*1.2) this._dead=true;
	}



}