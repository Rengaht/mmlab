
var _index_fragshader=[
	"uniform float amount;",
	"uniform float angle;",
	"uniform float alpha;",
	"uniform float seed_x;",
	"uniform float seed_y;",
	"uniform sampler2D texture;",
	"",
	"",
	"varying vec2 vUv;",
	"float rand(vec2 co){",
	"	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
	"}",
	"void main(void){",
	"",
	"",
	"	float seed=0.05;",
	"	float distortion_x=0.5;",
	"	float distortion_y=0.2;",
	"	float col_s=0.02;",
	"",
	"",
	"",
	"	vec2 p=vUv;",
	"	float xs=floor(gl_FragCoord.x/0.5);",
	"	float ys=floor(gl_FragCoord.y/0.5);",
	"",		
	"",
	"",
	"	vec4 normal=texture2D (texture, p*seed*seed);",
	"	p.x+=0.01*amount*distortion_x*rand(vec2(xs * seed,ys * seed*50.));",
	"	p.y+=0.01*amount*distortion_y*rand(vec2(xs * seed,ys * seed*50.));",
	
	"	p.x+=normal.x*seed_x*(seed/5.);",
	"	p.y+=normal.y*seed_y*(seed/5.);",
		//base from RGB shift shader
	"	vec2 offset = amount*0.045 * vec2( cos(angle), sin(angle));",
	"	vec4 cr = texture2D(texture, p + offset);",
	"	vec4 cga = texture2D(texture, p);",
	"	vec4 cb = texture2D(texture, p - offset);",
	"",		
	"	cr*=amount;",
	"	cb*=amount;",
	"",		
	"",
	"	gl_FragColor = vec4(cga.r+cr.r, cga.g+cb.b, cga.b+cr.r+cb.b,(cga.a+cr.a+cb.a)*12.0*alpha);",
	"",		
	"",		
	"	if(gl_FragColor.r<=0.1 && gl_FragColor.b<=0.1 && gl_FragColor.g<=0.1) gl_FragColor.a=0.0;",
	"	else{",
	"",		
	"		vec4 snow =amount*vec4(rand(vec2(xs * seed,ys * seed))*0.01*alpha);",
	"		gl_FragColor = gl_FragColor+ snow;",
	"	}",
	"}"].join("\n");

// uniform float amount;
// 	uniform float angle;
// 	uniform float seed_x;
// 	uniform float seed_y;
// 	uniform sampler2D texture;


// 	varying vec2 vUv;
// 	float rand(vec2 co){
// 		return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
// 	}
// 	void main(void){


// 		float seed=0.05;
// 		// float seed_x=0.02;
// 		// float seed_y=0.03;
// 		float distortion_x=0.5;
// 		float distortion_y=0.2;
// 		float col_s=0.02;



// 		vec2 p=vUv;
// 		float xs=floor(gl_FragCoord.x/0.5);
// 		float ys=floor(gl_FragCoord.y/0.5);
		


// 		vec4 normal=texture2D (texture, p*seed*seed);
// 		p.x+=0.01*amount*distortion_x*rand(vec2(xs * seed,ys * seed*50.));
// 		p.y+=0.01*amount*distortion_y*rand(vec2(xs * seed,ys * seed*50.));
	
// 		p.x+=normal.x*seed_x*(seed/5.);
// 		p.y+=normal.y*seed_y*(seed/5.);
// 		//base from RGB shift shader
// 		vec2 offset = amount*0.03 * vec2( cos(angle), sin(angle));
// 		vec4 cr = texture2D(texture, p + offset);
// 		vec4 cga = texture2D(texture, p);
// 		vec4 cb = texture2D(texture, p - offset);

// 		cr*=amount;
// 		cb*=amount;

// 		//float den_=amount*20.0;
// 		gl_FragColor = vec4(cga.r+cr.r, cga.g+cb.b, cga.b+cr.r+cb.b,(cga.a+cr.a+cb.a)*12.0);
		

// 		if(gl_FragColor.r<=0.1 && gl_FragColor.b<=0.1 && gl_FragColor.g<=0.1) gl_FragColor.a=0.0;
// 		else{
// 			//add noise
// 			vec4 snow =amount*vec4(rand(vec2(xs * seed,ys * seed*50.))*0.2);
// 			gl_FragColor = gl_FragColor+ snow;
// 		}
// 	}