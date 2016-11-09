import React from 'react'

export default class GlitchImage extends React.Component{
	constructor(props){
		super(props);	
		
		this.draw=this.draw.bind(this);
		this.randomRange=this.randomRange.bind(this);

		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);

		this._options={	       
	        lineOffset:{
	            value:5.0,
	            lineHeight:40
	        },
	        frame_rate: 60.0,
	        vel:0.2
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

		// this.intervalId=setInterval(this.draw,this._options.frame_rate);
	}
	draw(){

		if(!this.refs._canvas) return;
		// console.log("draw!");
		this.refs._canvas.width=this.img.width;
		this.refs._canvas.height=this.img.height;

		const ctx=this.refs._canvas.getContext('2d');



		let w_=this.refs._canvas.width;
		let h_=this.refs._canvas.height;

		// this.origCanvas.width=w_;
		// this.origCanvas.height=h_;
		// ctx.fillStyle="red";
		// ctx.fillRect(0,0,w_,h_);
		ctx.drawImage(this.img,0,0,w_,h_);

		if(!this.state.glitch) return;
		// if(this.density<0 && this.props.last>0) return;

		// this._options.stereoscopic={
	 //            red: 10*this.randomRange(1,3),
	 //            green: 5*this.randomRange(1,3),
	 //            blue: 30*this.randomRange(1,3)
	 //    };
	 	if(ctx.width*ctx.height==0) return;

		var imageData=ctx.getImageData(0,0,w_,h_),
			pixels=imageData.data,
			length=pixels.length,
			offset,i,x,y;
		
    	//console.log(this._options.stereoscopic);
    	
    	//offset=25*(Math.cos(this.density*Math.PI));
    	// offset=this._options.lineOffset.value*(1.0-this.density);
    	//console.log(offset+'  '+this.density);

    	var p_=Math.abs(Math.sin(this.density));//(1.0-this.density);
    	//offset=this._options.lineOffset.value*Math.sin(p_*Math.PI*.5);
    	//offset=(Math.sin(Math.PI*.5*p_)+(Math.random()*2-1)*.3)*this._options.lineOffset.value+(Math.random()*2-1);
    	offset=(Math.sin(Math.PI*p_)+(Math.random()*2-1)*.05)*this._options.lineOffset.value;
    	//console.log(this.density+'  '+offset);


    	var turb=0;
    	var turby=0;

    	var turby_start=0;
    	var turby_end=0;

    	for(y=0;y<h_;++y){
    		if(y%this._options.lineOffset.lineHeight==0){
    			if(this.randomRange(1,20)<2*p_) turb=this._options.lineOffset.value*5.0*(Math.random()*2-1)*p_;
    			else turb=0;

    			if(this.randomRange(1,80)<2){
    				turby=this._options.lineOffset.value*(Math.random()*2-1);    				
    				turby_start=w_*.5*Math.random();
    				turby_end=w_*(.5+.5*Math.random());
    			}else turby=0;
    		}
    		
    		// turb=offset*.1*Math.round(y/this._options.lineOffset.lineHeight);
    		// turb+=2;
    		for(x=0;x<w_;++x){  

    			//if(turb!=0) if(this.randomRange(1,50)<2) turb=0;
    			
    			var off=Math.round(offset+turb);
    			// if(this.randomRange(0,100)<1) off+=this._options.lineOffset.value*Math.random()*.3;

    			var offy=0;
    			if(x>turby_start && x<turby_end){
    				offy=turby;    				
    			}

				let val=pixels[(x+y*w_)*4];
				let wei=.33;
				var cr=(x+off>=w_)?val*wei:pixels[Math.round((x+off+(y+offy)*w_)*4)]*wei;
				var cg=(x-off<0)?val*wei:pixels[Math.round((x-off+(y+offy)*w_)*4)]*wei;

				// var cr=pixels[Math.round(((x+off)%w_+(y+offy)*w_)*4)]*.33;
				// var cg=pixels[Math.round(((x-off+w_)%w_+(y+offy)*w_)*4)]*.33;

				pixels[(x+y*w_)*4]=pixels[(x+y*w_)*4]+cr;
				pixels[(x+y*w_)*4+1]=pixels[(x+y*w_)*4+1]+cg;
				pixels[(x+y*w_)*4+2]=pixels[(x+y*w_)*4+2]+cr+cg;
				pixels[(x+y*w_)*4+3]=(pixels[(x+y*w_)*4+3]+cr+cg);

    		}
    	}

    	//if(this.props.last>0)
			this.density+=this._options.vel;
		//if(this.density<w_) this.density++;
		//console.log(offset+' '+this.density);
		
		ctx.putImageData(imageData,0,0);
	}
	randomRange(min, max){
    	return Math.floor(Math.random()*(max-min+1))+min;
	}

	onMouseEnter(){
		//console.log("enter");
		this.setState({'glitch':true});
		this.density=0.0;

		//this.vel=1.0;

		var clear=this.onMouseLeave;
		this.intervalId=setInterval(this.draw,this._options.frame_rate);
		// setTimeout(function(){
		// 	//console.log("stop!");
		// 	clear();
		// },this.props.last);
	}
	onMouseLeave(){
		//console.log("clear glitch!");
		this.setState({'glitch':false});
		clearInterval(this.intervalId);
		draw();
	}


	render(){
		return (
			<canvas ref="_canvas" 
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}/>			
		);
	}
}
