function PLogoLeg(pos_,vel_,gold_){
	this._pos=createVector(pos_.x,pos_.y,pos_.z);
	this._vel=createVector(vel_.x,vel_.y,vel_.z);
	this._gold=gold_;
	this._dead=false;

}
PLogoLeg.prototype.draw=function(){
	if(this._dead) return;
       
    var t_=(this._pos.z-START_POINT)/(END_POINT-START_POINT);
      
    push();
    noFill();
     
    push();
    translate(SPIRAL_FACTOR*this._pos.x*sin(this._pos.y),SPIRAL_FACTOR*this._pos.x*cos(this._pos.y),this._pos.z);
     //println(_pos);
    translate(_shape_leg.width/2*SHAPE_SCALE,0);    
    rotate(-this._pos.y-PI/2);
    // rotateY(PI/6);
     //pg_.rotateY(map(t_,0,.5,PI/3.2,PI/4));
    translate(-_shape_leg.width/2*SHAPE_SCALE,0);
     
    var _shrink_dest=0.72;
    scale(SHAPE_SCALE*(constrain(t_,0,_shrink_dest)*(0.8/_shrink_dest)+0.2));
     
    var _alpha_dest=0.2;
    fill(255,constrain(constrain(t_,0,_alpha_dest)*(1.0/_alpha_dest)*255,0,255));
    
    if(this._gold) image(_img_gold,0,0);
    image(_shape_leg,0,0);
     
    var glitch_=map(this._pos.z,START_POINT+(END_POINT-START_POINT)*.2,END_POINT*.5,0,1);
    var gamp_=40;
    //tint(255,0,255,constrain(glitch_*255.0,0,255.0));
    image(_shape_leg,random(0,1)*gamp_*glitch_,random(0,1)*gamp_*glitch_);
    
    tint(0,255,255,constrain(glitch_*255.0,0,255.0));
    //image(_shape_leg,random(-1,0)*gamp_*glitch_,random(-1,0)*gamp_*glitch_);

     
    pop();
     
    pop();

}

PLogoLeg.prototype.update=function(){
	if(this._dead) return;
    
    this._pos.add(this._vel);
    
    var t_=(this._pos.z-START_POINT)/(END_POINT-START_POINT);
      
    if(t_>0.1 && t_<0.7){
      this._vel.x*=VEL_DIFF.x;
      this._vel.y*=VEL_DIFF.y;    
      this._vel.z*=VEL_DIFF.z;      
    }
    
    
    if(this._pos.x>width*1.2){
      this._dead=true;
    }

}
