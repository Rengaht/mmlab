import React from 'react'
import {Link} from 'react-router'

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			mouseX:0,
			mouseY:0
		};
		this.mouseMove=this.mouseMove.bind(this);
	}
	componentWillMount(){		
		initBackgroundType(0);			
	}
	mouseMove(event){
		//console.log('move');
		// let delta_x=-(event.clientX-window.innerWidth*.5)*.25;
		// let delta_y=(event.clientY-window.innerHeight*.5)*.25;
		// this.setState({mouseX:delta_x,mouseY:delta_y});
	}
	render(){
		return (
			<div className="home" onMouseMove={this.mouseMove}>
				<div className="center">
					<div className="hello" style={{marginLeft:this.state.mouseX,marginTop:this.state.mouseY}}>	
							<div className="hello_logo">
								<img src="image/logo.png"/>								
								<div className="descript">We believe digital  <br/> technology is the magic <br/>of  modern real world.</div>
								<div>
									<Link to="/work">
										<img src="image/see_our_project.png"/>
									</Link>
								</div>				
							</div>
							<div className="hello_special">
								<img src="image/special.png"/>
							</div>
					</div>
				</div>
			</div>		
		);
	
	}
}