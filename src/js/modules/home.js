import React from 'react'

export default class Home extends React.Component{
	componentWillMount(){

	// 	let scripts=['src/index/TLogoLeg.js','dist/shader/index_frag.js',
	// 					'dist/shader/vert.js','src/index/logoCanvas.js'];

	// 	for(var i in scripts){
	// 		const script_=document.createElement('script');
	// 		script_.src=scripts[i];
	// 		script_.async=false;
	// 		document.body.appendChild(script_);
	// 	}
		initBackgroundType(0);	
	}
	render(){
		return (
			<div/>
		);
	}
}