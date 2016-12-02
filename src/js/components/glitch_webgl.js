import React from 'react'
import ReactDOM from 'react-dom'
import * as GShader from './glitch_shader'


var _canvas;
var _gl;

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export default class WebglGlitch extends React.Component{
	constructor(props){
		super(props);	
		
		this.draw=this.draw.bind(this);

		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);
		this.resetCanvas=this.resetCanvas.bind(this);
		this.setupCanvas=this.setupCanvas.bind(this);

		this._options={	       	        
	        frame_rate: 60.0
    	};
    	this.gl;
    	this.uniform={};

    	this.glitch={
    		p:0.0,
    		seed:0.0,
    		scale:1.0
    	}
    	this.image;

	}
	componentDidMount(){
		// this.img=new Image();
		// this.img.src=this.props.src;
		// let draw_=this.draw;
		// this.img.onload=function(){
		// 	draw_(this.img);
		// };

		this.image=new Image();
		this.image.src=this.props.src;
		// let draw_=this.draw;
		// this.image.onload=function(){
		// 	this.refs._canvas.width=this.image.width;
		// 	this.refs._canvas.height=this.image.height;
		// }.bind(this);
		

		// this.intervalId=setInterval(this.draw,this._options.frame_rate);
	}
	setupCanvas(){
		if(!_canvas){
			_canvas=document.createElement('canvas');
			_canvas.id='_thumb_canvas';
			_canvas.width=500;
			_canvas.height=333;
			_canvas.style.position='absolute';
			_canvas.style.width='100%';
			_canvas.style.height='100%';
		}

		
		if(this.refs._canvas_wrap) this.refs._canvas_wrap.appendChild(_canvas);
		else return;
		
		if(!_gl){
			
			_gl=_canvas.getContext('webgl') || _canvas.getContext("experimental-webgl");
			if(!_gl){
				console.log("Unable to initialize WebGL. Your browser may not support it.");
				return;

			}
			// setup a GLSL program
			var vertexShader=createShader(_gl,_gl.VERTEX_SHADER,GShader._gl_vertex_shader);
			var fragmentShader=createShader(_gl,_gl.FRAGMENT_SHADER,GShader._gl_frag_shader);
			var program=createProgram(_gl,vertexShader,fragmentShader);
			_gl.useProgram(program);

			// look up where the vertex data needs to go.
			var positionLocation = _gl.getAttribLocation(program, "a_position");

			// Create a buffer and put a single clipspace rectangle in
			// it (2 triangles)
			var buffer = _gl.createBuffer();
			_gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
			_gl.bufferData(
			    _gl.ARRAY_BUFFER,
			    new Float32Array([
			        -1.0, -1.0,
			         1.0, -1.0,
			        -1.0,  1.0,
			        -1.0,  1.0,
			         1.0, -1.0,
			         1.0,  1.0]),
			    _gl.STATIC_DRAW);
			_gl.enableVertexAttribArray(positionLocation);
			_gl.vertexAttribPointer(positionLocation, 2, _gl.FLOAT, false, 0, 0);


			// look up where the texture coordinates need to go.
			var texCoordLocation = _gl.getAttribLocation(program, "a_texCoord");

			// provide texture coordinates for the rectangle.
			var texCoordBuffer = _gl.createBuffer();
			_gl.bindBuffer(_gl.ARRAY_BUFFER, texCoordBuffer);
			_gl.bufferData(_gl.ARRAY_BUFFER, new Float32Array([
			      0.0,  1.0,
			      1.0,  1.0,
			      0.0,  0.0,
			      0.0,  0.0,
			      1.0,  1.0,
			      1.0,  0.0]), _gl.STATIC_DRAW);
			_gl.enableVertexAttribArray(texCoordLocation);
			_gl.vertexAttribPointer(texCoordLocation, 2, _gl.FLOAT, false, 0, 0);

			// Create a texture.
			var texture = _gl.createTexture();
			_gl.bindTexture(_gl.TEXTURE_2D, texture);

			// Set the parameters so we can render any size image.
			_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
			_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);
			_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
			_gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);

			// Upload the image into the texture.
			// _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, this.image);
			this.uniform.amount=_gl.getUniformLocation(program,"amount");
			this.uniform.angle=_gl.getUniformLocation(program,"angle");
			this.uniform.alpha=_gl.getUniformLocation(program,"alpha");
			this.uniform.scale=_gl.getUniformLocation(program,"scale");

			this.uniform.seed=_gl.getUniformLocation(program,"seed");
			this.uniform.seed_x=_gl.getUniformLocation(program,"seed_x");
			this.uniform.seed_y=_gl.getUniformLocation(program,"seed_y");
			
			_gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, this.image);
			// this.gl=gl;
		}


		
	}
	draw(){
		
		if(!_gl) return;

		// draw		
		if(this.glitch.p<=1) this.glitch.p+=0.18;
		
		if(this.glitch.scale<=1) this.glitch.scale+=.1;


		let p_=easeFunction(Math.abs(Math.sin(Math.PI*this.glitch.p)));

		if(this.uniform.amount) _gl.uniform1f(this.uniform.amount,p_*.5);		
		if(this.uniform.alpha) _gl.uniform1f(this.uniform.alpha,p_);
		if(this.uniform.scale){
			_gl.uniform1f(this.uniform.scale,1.0+.5*easeFunction(this.glitch.scale));
			//console.log(this.glitch.scale);
		} 

		
		
		if(this.glitch.p<=1){
			this.glitch.angle=p_*Math.PI*.5*(Math.random()*2.0-1);

			_gl.uniform1f(this.uniform.seed,p_*0.15);
			_gl.uniform1f(this.uniform.angle,this.glitch.angle);
			_gl.uniform1f(this.uniform.seed_x,p_*0.05+0.01*(Math.random()*2.0-1));
			_gl.uniform1f(this.uniform.seed_y,p_*0.05+0.01*(Math.random()*2.0-1));

		}else{
			_gl.uniform1f(this.uniform.angle,this.glitch.angle+Math.PI*.1*(Math.random()*2.0-1));			
		}
		_gl.drawArrays(_gl.TRIANGLES, 0, 6);


	}
	resetCanvas(){
		//remove canvas
		let len=this.refs._canvas_wrap.children.length;
		for(var i=0;i<len;++i)
			this.refs._canvas_wrap.removeChild(this.refs._canvas_wrap.children[i]);	

		//clear gl
		_gl=null;
		this.uniform={};
	}
	easeFunction(k){
		if(k===0) return 0;
		if(k===1) return 1;
		
		return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
	}
	onMouseEnter(){

		this.setupCanvas();

		this.glitch.p=0.0;		
		this.glitch.scale=0.0;
		this.intervalId=setInterval(this.draw,this._options.frame_rate);
		
	}
	onMouseLeave(){
		
		clearInterval(this.intervalId);
		this.resetCanvas();
		
	}





	render(){
		return (
			<div ref="_canvas_wrap" className="thumbWrap"
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}/>			
		);
	}
}


