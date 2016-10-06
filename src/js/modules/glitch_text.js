import React from 'react'

export default class GlitchText extends React.Component{
	constructor(props){
		super(props);	
		this.draw=this.draw.bind(this);
		this.randomRange=this.randomRange.bind(this);

		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);
		this.setActive=this.setActive.bind(this);


		this._options={
	        color:{
	            red:1,
	            green:0.8,
	            blue:0.58
	        },
	        lineOffset:{
	            value:2.0,
	            lineHeight: 8
	        },
	        frame_rate:100
    	};
    	this.state={
    		glitch:false
    	};
    	this.density=1.0;
    	this.font='Assistant';
    	this.text;
    	this.img;

    	this.active=false;

	}
	componentDidMount(){	
		this.intervalId=setInterval(this.draw,this._options.frame_rate);
		
		if(!this.props.hover) this.setState({'glitch':true});			
		 		
		if(this.props.amp) this._options.lineOffset.value=this.props.amp;	
		if(this.props.line_height) this._options.lineOffset.lineHeight=this.props.line_height;
		

		if(this.props.text){
			if(this.props.font){
				this.font=this.props.font;
				this.text=this.props.text;
			}else{	
				this.text=this.props.text.toUpperCase()
			} 
			if(this.refs._canvas){
				const ctx=this.refs._canvas.getContext('2d');
				ctx.textBaseline="Alpabetic";
				ctx.font=this.props.font_size+'pt '+this.font;		
	 			var s_=ctx.measureText(this.text);

				this.refs._canvas.width=s_.width;
				this.refs._canvas.height=this.props.font_size*1.2;
			}
		}
		if(this.props.img_src){
			this.img=new Image();
			let draw_=this.draw;
			this.img.onload=function(){
				draw_();
			};
			this.img.src=this.props.img_src;

			if(this.refs._canvas){
				const ctx=this.refs._canvas.getContext('2d');			
				this.refs._canvas.width=this.img.width;
				this.refs._canvas.height=this.img.height;
			}
		}


		
	}
	draw(){		
		
		if(!this.refs._canvas) return;

		const ctx=this.refs._canvas.getContext('2d');

		let w_=this.refs._canvas.width;
		let h_=this.refs._canvas.height;

		ctx.fillStyle="transparent";
		ctx.clearRect(0,0,w_,h_);
		if(this.text){
			
			ctx.fillStyle="white";
			ctx.textBaseline="Alpabetic";
			ctx.font=this.props.font_size+'pt '+this.font;		
	 		ctx.fillText(this.text, 0, h_);
		}
		if(this.img){
			ctx.drawImage(this.img,0,0,w_,h_);
		}
		
		//if(this.randomRange(1,10)>1) return;
		if(!this.state.glitch && !this.active) return;
		// if(this.density<0) return;
		//if(!this.props.hover && this.randomRange(1,5)>1) return;
		
		var imageData=ctx.getImageData(0,0,w_,h_),
			pixels=imageData.data,
			length=pixels.length,
			offset,i,x,y;

		offset=this._options.lineOffset.value;

		

    	var turb=0;
    	for(y=0;y<h_;++y){
    		//if(this.props.hover){
    			if(y%this._options.lineOffset.lineHeight==0) 
    			if(this.randomRange(1,5)<2) turb=this._options.lineOffset.value*this.randomRange(-1,1);
    			else turb=0;
    		//}
    		for(x=0;x<w_;++x){  
    			
    			let off=offset+turb;
    			//console.log(off);
    			
    			// if(this.randomRange(0,120)<1) 
    			// 	turb+=this._options.lineOffset.value*this.randomRange(-1,1)*.3;
    			
				let val=pixels[(x+y*w_)*4];
				var cr=(x+off>=w_)?val:pixels[(x+off+y*w_)*4];
				var cg=(x-off<0)?val:pixels[(x-off+y*w_)*4];

				pixels[(x+y*w_)*4]=cr;
				pixels[(x+y*w_)*4+1]=cg;
				pixels[(x+y*w_)*4+2]=cr+cg;
				pixels[(x+y*w_)*4+3]=(pixels[(x+y*w_)*4+3]+cr+cg);

				// pixels[(x+y*w_)*4]=pixels[(x+y*w_)*4]+cr;
				// pixels[(x+y*w_)*4+1]=pixels[(x+y*w_)*4+1]+cg;
				// pixels[(x+y*w_)*4+2]=pixels[(x+y*w_)*4+2]+cr+cg;
				// pixels[(x+y*w_)*4+3]=(pixels[(x+y*w_)*4+3]+cr+cg);
			
    		}
    	}
    	this.density-=1.0/(this.props.last/100.0);
		
		ctx.putImageData(imageData,0,0);
	}
	onMouseEnter(){
		if(this.props.hover) this.setState({'glitch':true});		
	}
	onMouseLeave(){		
		if(this.props.hover) this.setState({'glitch':false});		
	}
	setActive(act_){
		console.log('set active '+act_);
		this.active=act_;
	}

	randomRange(min, max){
    	return Math.floor(Math.random()*(max-min+1))+min;
	}
	render(){
		return (
			<canvas ref="_canvas" 
					className={this.props.className}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}/>			
		);
	}
}