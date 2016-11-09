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
<<<<<<< HEAD
		// let delta_x=-(event.clientX-window.innerWidth*.5)*.25;
		// let delta_y=(event.clientY-window.innerHeight*.5)*.25;
		// this.setState({mouseX:delta_x,mouseY:delta_y});
=======
		let delta_x=-(event.clientX-window.innerWidth*.5)*.25;
		let delta_y=(event.clientY-window.innerHeight*.5)*.25;
		this.setState({mouseX:delta_x,mouseY:delta_y});
>>>>>>> dc5c6c3fd21eaa3d573fc2bf711d78a1a8d057cb
	}
	render(){
		return (
			<div className="home" onMouseMove={this.mouseMove}>
				<div className="center">
					<div className="hello" style={{marginLeft:this.state.mouseX,marginTop:this.state.mouseY}}>	
							<div>
								<img src="image/logo.png"/>
								<div className="descript">We believe digital  <br/> technology is the magic <br/>of  modern real world.</div>
								<div>
									<Link to="/work">
<<<<<<< HEAD
										<img src="image/see_our_project.png"/>
=======
										<span className="seeProject glitch_always">See our projects!</span>
>>>>>>> dc5c6c3fd21eaa3d573fc2bf711d78a1a8d057cb
									</Link>
								</div>				
							</div>
					</div>
				</div>
			</div>		
		);
	
	}
}