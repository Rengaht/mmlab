import React,{cloneElement} from 'react'
import {RouteTransition} from 'react-router-transition'

import FadeAppear from './fade_appear'
import {CopyRight} from '../components/title'

export default class MainContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			mouseX:0,
			mouseY:0,
			trans_alpha:0
		};
		// this.mouseMove=this.mouseMove.bind(this);
		this.getStlyes=this.getStlyes.bind(this);
		this.getDefaultStyles=this.getDefaultStyles.bind(this);

		// this.renderRoute=this.renderRoute.bind(this);
	}

	
	getStlyes(){
		return[{
			key:'all',
			style:{opacity:spring(1,{stiffness:20})},
			data:this.props.children
		}];
	}
	getDefaultStyles(){
		return[{
			key:'all',
			style:{opacity:0},
			data:this.props.children
		}];
	}
	// componentWillAppear(){
	// 	console.log("------ will appear!");
	// }
	// componenetWillEnter(){
	// 	console.log("------ will enter!");
	// }
	// componentWillLeave(){
	// 	console.log("------ will leave!");
	// }


	// mouseMove(event){
	// 	console.log('move');
	// 	let delta_x=-(event.clientX-window.innerWidth*.5)*.0;
	// 	let delta_y=-(event.clientY-window.innerHeight*.5)*.0;
	// 	this.setState({mouseX:delta_x,mouseY:delta_y});
	// }
	componentWillMount(){
		
	}
	render(){
		//console.log(this.getStlyes());
		// return(
		// 	<RouteTransition
		// 		pathname={this.props.path}
		// 		atEnter={{opacity:0,scale:0}}
		// 		atLeave={{opacity:0,scale:0}}
		// 		atActive={{opacity:1,scale:0}}
		// 		mapStyles={styles=>({opacity:styles.opacity})}	
		// 		className="mainContainer"
		// 	>
		// 	{this.props.children}
		// 	</RouteTransition>
		// );
		if(this.props.noCopyright)
			return(
				<div className="mainContainer">
					{this.props.children}
				</div>
			
			);
		else
			return(
				<div className="mainContainer">
					{this.props.children}
					<CopyRight/>
				</div>
			
			);
		
		
	}


}