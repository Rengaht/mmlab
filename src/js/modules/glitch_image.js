import React from 'react'

export default class GlitchImage extends React.Component{
	constructor(props){
		super(props);	
		
		this.draw=this.draw.bind(this);
		this.randomRange=this.randomRange.bind(this);

		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);

		this._options={
	        color:{
	            red:1,
	            green:0.8,
	            blue:0.58
	        },
	        lineOffset:{
	            value:12,
	            lineHeight: 15
	        },
	        frame_rate: 30.0
    	};
    	this.state={
    		glitch:false
    	};
    	this.density=0.0;
    	
	}
	componentDidMount(){
		this.img=new Image();
		let draw_=this.draw;
		this.img.onload=function(){
			draw_();
		};
		this.img.src=this.props.src;

		this.intervalId=setInterval(this.draw,this._options.frame_rate);
	}
	draw(){
		const ctx=this.refs._canvas.getContext('2d');

		let w_=this.refs._canvas.width;
		let h_=this.refs._canvas.height;

		// this.origCanvas.width=w_;
		// this.origCanvas.height=h_;
		// ctx.fillStyle="red";
		// ctx.fillRect(0,0,w_,h_);
		ctx.drawImage(this.img,0,0,w_,h_);

		if(!this.state.glitch) return;
		if(this.density<0) return;

		// this._options.stereoscopic={
	 //            red: 10*this.randomRange(1,3),
	 //            green: 5*this.randomRange(1,3),
	 //            blue: 30*this.randomRange(1,3)
	 //    };

		var imageData=ctx.getImageData(0,0,w_,h_),
			pixels=imageData.data,
			length=pixels.length,
			offset,i,x,y;
		
    	//console.log(this._options.stereoscopic);
    	
    	//offset=25*(Math.cos(this.density*Math.PI));
    	// offset=this._options.lineOffset.value*(1.0-this.density);
    	//console.log(offset+'  '+this.density);

    	var p_=(1.0-this.density);
    	offset=this._options.lineOffset.value*Math.sin(p_*Math.PI*.5);
    	//console.log(this.density+'  '+offset);
    	var turb=0;
    	for(y=0;y<h_;++y){
    		if(y%this._options.lineOffset.lineHeight==0) 
    			if(this.randomRange(1,20)<2) turb=this._options.lineOffset.value*Math.random()*.5;
    			else turb=0;
    		
    		// turb=offset*.1*Math.round(y/this._options.lineOffset.lineHeight);
    		// turb+=2;
    		for(x=0;x<w_;++x){  

    			//if(turb!=0) if(this.randomRange(1,50)<2) turb=0;
    			
    			var off=offset+turb;
    			if(this.randomRange(0,100)<1) off+=this._options.lineOffset.value*Math.random()*.2;


				let val=pixels[(x+y*w_)*4];
				var cr=(x+off>=w_)?0:pixels[Math.round((x+off+y*w_)*4)]*.33*p_;
				var cg=(x-off<0)?0:pixels[Math.round((x-off+y*w_)*4)]*.33*p_;

				pixels[(x+y*w_)*4]=pixels[(x+y*w_)*4]+cr;
				pixels[(x+y*w_)*4+1]=pixels[(x+y*w_)*4+1]+cg;
				pixels[(x+y*w_)*4+2]=pixels[(x+y*w_)*4+2]+cr+cg;
				pixels[(x+y*w_)*4+3]=(pixels[(x+y*w_)*4+3]+cr+cg);

    		}
    	}

		this.density-=1.0/(this.props.last/this._options.frame_rate);
		//console.log(offset+' '+this.density);
		
		ctx.putImageData(imageData,0,0);
	}
	randomRange(min, max){
    	return Math.floor(Math.random()*(max-min+1))+min;
	}

	onMouseEnter(){
		//console.log("enter");
		this.setState({'glitch':true});
		this.density=1.0;

		//this.vel=1.0;

		var clear=this.onMouseLeave;

		// setTimeout(function(){
		// 	//console.log("stop!");
		// 	clear();
		// },this.props.last);
	}
	onMouseLeave(){
		//console.log("clear glitch!");
		this.setState({'glitch':false});
		//clearInterval(this.intervalId);
	}


	render(){
		return (
			<canvas ref="_canvas" 
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}/>			
		);
	}
}
