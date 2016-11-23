import React from 'react'
// import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class FadeAppear extends React.Component{
	componentDidMount(){
		// this.refs._item.classList.add("animated");
		// if(this.props.effect) this.refs._item.classList.add(this.props.effect);
		// else this.refs._item.classList.add("fadeIn");
	}
	componentDidUnMount(){
		// this.refs._item.classList.remove("animated");
		// if(this.props.effect) this.refs._item.classList.remove(this.props.effect);
		// else this.refs._item.classList.remove("fadeIn");
 	}
	render(){
		
		const rest = Object.assign({}, this.props);
  		delete rest.effect;

		return(
			<div ref="_item" {...rest}>
				{this.props.children}
			</div>
		);
		// return(
		// 	<ReactCSSTransitionGroup transitionName="work_thumb"
		// 							transitionAppear={true}
 	// 								transitionEnter={true}
  //   								transitionLeave={true}
  //   								transitionAppearTimeout={500}
  //   								transitionEnterTimeout={500}
  //   								transitionLeaveTimeout={250}
  // 									{...rest}>
  // 									{this.props.children}
  // 			</ReactCSSTransitionGroup>
  //     	)
	}
}