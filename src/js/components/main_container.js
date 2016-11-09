import React,{cloneElement} from 'react'
import {RouteTransition} from 'react-router-transition'

export default class MainContainer extends React.Component{
	constructor(props){
		super(props);
		this.state={
			mouseX:0,
			mouseY:0,
			trans_alpha:0
		};
		this.mouseMove=this.mouseMove.bind(this);
		this.willEnter=this.willEnter.bind(this);
		this.willLeave=this.willLeave.bind(this);
		this.getStlyes=this.getStlyes.bind(this);
		this.getDefaultStyles=this.getDefaultStyles.bind(this);

		// this.renderRoute=this.renderRoute.bind(this);
	}

	willEnter(){
		console.log('will enter!');
		return({
			opacity:1
		});
	}
	willLeave(){
		console.log('will leave!');
		return({
			opacity:spring(0)
		});
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
	componentDidMount(){
		
	}
	componentWillunmount(){
	
	}
	mouseMove(event){
		console.log('move');
		let delta_x=-(event.clientX-window.innerWidth*.5)*.0;
		let delta_y=-(event.clientY-window.innerHeight*.5)*.0;
		this.setState({mouseX:delta_x,mouseY:delta_y});
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
		return(
			<div className="mainContainer">
			{this.props.children}
			</div>
		);
		
	}


}