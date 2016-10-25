import React from 'react'
import {Link} from 'react-router'

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
			<div className="home">
				<div className="hello">	
						<div>We believe digital<br/>technology is the magic<br/> of modern real world.</div>
						<img src="image/logo.png"/>
						<div>
							<Link to="/work">
								See our projects!
							</Link>
						</div>				
					
				</div>
			</div>
		
		);
	}
}