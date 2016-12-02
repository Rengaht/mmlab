var _stack_fragshader=[
	"uniform float amount;",
	"uniform float alpha;",
	"uniform float angle;",
	"uniform float seed_x;",
	"uniform float seed_y;",
	"uniform sampler2D texture;",
	"",
	"uniform float dvel;",
	"uniform float damp;",
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
	"	vec2 p=vUv;",
	"",
	"	float xs=floor(gl_FragCoord.x/0.5);",
	"	float ys=floor(gl_FragCoord.y/0.5);",
	"",	
	"",	//distort
	"	float distortion=sin(vUv.y*dvel)*damp;",		
	"	p.x+=distortion;",
	"",
	"",	//glitch
	"	vec2 offset = amount*0.01 * vec2( cos(angle), sin(angle));",
	"	vec4 cr = texture2D(texture, p + offset);",
	"	vec4 cga = texture2D(texture, p);",
	"	vec4 cb = texture2D(texture, p - offset);",
	"",
	"	gl_FragColor = vec4(cga.r+cr.r, cga.g+cb.b, cga.b+cb.b,(cga.a+cr.a+cb.a)*.25*alpha);",
	"",	
	"}"
	].join("\n");


	// 	uniform float amount;
	// uniform float angle;
	// uniform float seed_x;
	// uniform float seed_y;
	// uniform sampler2D texture;

	// uniform float dvel;
	// uniform float damp;


	// varying vec2 vUv;
	// float rand(vec2 co){
	// 	return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
	// }
	// void main(void){


	// 	float seed=0.05;
	// 	float distortion_x=0.5;
	// 	float distortion_y=0.2;
	// 	float col_s=0.02;


	// 	vec2 p=vUv;

	// 	float xs=floor(gl_FragCoord.x/0.5);
	// 	float ys=floor(gl_FragCoord.y/0.5);
		
	// 	//distort
	// 	float distortion=sin(vUv.y*dvel)*damp;		
	// 	p.x+=distortion;

	// 	//glitch
	// 	vec2 offset = amount*0.01 * vec2( cos(angle), sin(angle));
	// 	vec4 cr = texture2D(texture, p + offset);
	// 	vec4 cga = texture2D(texture, p);
	// 	vec4 cb = texture2D(texture, p - offset);

	// 	gl_FragColor = vec4(cga.r+cr.r, cga.g+cb.b, cga.b+cr.r+cb.b,(cga.a+cr.a+cb.a)*.25);
		
	// }