import React from 'react'



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

		this._options={	       	        
	        frame_rate: 60.0
    	};
    	this.gl;

	}
	componentDidMount(){
		// this.img=new Image();
		// this.img.src=this.props.src;
		// let draw_=this.draw;
		// this.img.onload=function(){
		// 	draw_(this.img);
		// };

		var img=new Image();
		img.src=this.props.src;
		let draw_=this.draw;
		img.onload=function(){
			draw_(img);
		};
		

		// this.intervalId=setInterval(this.draw,this._options.frame_rate);
	}
	draw(img_){
		if(!this.refs._canvas) return;
		// console.log("draw!");
		this.refs._canvas.width=img_.width;
		this.refs._canvas.height=img_.height;

		if(!this.gl){
			var canvas=this.refs._canvas;
			var gl=canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
			if(!gl){
				console.log("Unable to initialize WebGL. Your browser may not support it.");
				return;

			}
			// setup a GLSL program
			var vertexShader=createShader(gl,gl.VERTEX_SHADER,_gl_vertex_shader);
			var fragmentShader=createShader(gl,gl.FRAGMENT_SHADER,_gl_frag_shader);
			var program=createProgram(gl,vertexShader,fragmentShader);
			gl.useProgram(program);

			// look up where the vertex data needs to go.
			var positionLocation = gl.getAttribLocation(program, "a_position");

			// Create a buffer and put a single clipspace rectangle in
			// it (2 triangles)
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(
			    gl.ARRAY_BUFFER,
			    new Float32Array([
			        -1.0, -1.0,
			         1.0, -1.0,
			        -1.0,  1.0,
			        -1.0,  1.0,
			         1.0, -1.0,
			         1.0,  1.0]),
			    gl.STATIC_DRAW);
			gl.enableVertexAttribArray(positionLocation);
			gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);


			// look up where the texture coordinates need to go.
			var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

			// provide texture coordinates for the rectangle.
			var texCoordBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			      0.0,  1.0,
			      1.0,  1.0,
			      0.0,  0.0,
			      0.0,  0.0,
			      1.0,  1.0,
			      1.0,  0.0]), gl.STATIC_DRAW);
			gl.enableVertexAttribArray(texCoordLocation);
			gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

			// Create a texture.
			var texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);

			// Set the parameters so we can render any size image.
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

			// Upload the image into the texture.
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img_);

			// draw
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			this.gl=gl;
		}
	}

	onMouseEnter(){

		// this.setState({'glitch':true});

		// var clear=this.onMouseLeave;
		// this.intervalId=setInterval(this.draw,this._options.frame_rate);
		draw(this.img);
	}
	onMouseLeave(){
		// this.setState({'glitch':false});
		// clearInterval(this.intervalId);
		// draw();
	}


	render(){
		return (
			<canvas ref="_canvas" 
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}/>			
		);
	}
}


var _gl_vertex_shader=[
	"attribute vec2 a_position;",
	"attribute vec2 a_texCoord;",
	"varying vec2 v_texCoord;",
	"",
	"void main() {",
	"v_texCoord = a_texCoord;",
  	"gl_Position = vec4(a_position, 0, 1);",  	
	"}"
].join("\n");

var _gl_frag_shader=[
	"precision mediump float;",
	"uniform sampler2D u_image;",
	"varying vec2 v_texCoord;",
	"void main() {",
	  "gl_FragColor = texture2D(u_image, v_texCoord);",
	"}"
].join("\n");