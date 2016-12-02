import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import {MainMenu, MainMenuItem} from '../components/menu'
import {Title,CopyRight} from '../components/title'

import MainContainer from '../components/main_container'


export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.setBlur=this.setBlur.bind(this);
		
	}
	
  	render(){
  		
  		var show_menu=true;
  		if(this.props.location.pathname=="/") show_menu=false;

  		var is_awork=false;
  		if(this.props.location.pathname.match(/(^\/work\/)(.*[0-9]$)/gm)) is_awork=true;
  		//console.log("is awork= "+is_awork);

  		return(
		    <div>		    	
		    	<div ref="_main" id="_main">
			    	<ReactCSSTransitionGroup transitionName="corner_title"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*2}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*2}
						transitionLeaveTimeout={Const.AppearInterval}>	
			    		<Title text={this.props.location.pathname} key={this.props.location.pathname} noTitle={!show_menu || is_awork}/>
			    	</ReactCSSTransitionGroup>

		    		<ReactCSSTransitionGroup transitionName="main_container"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*3}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*3}
						transitionLeaveTimeout={Const.AppearInterval+Const.DelayInterval*3}>	
			     		{React.cloneElement(this.props.children,{key:this.props.location.pathname})}
			     	</ReactCSSTransitionGroup>			     	
		    	 </div>
		    	 <MainMenu backBlur={this.setBlur} hideMenu={!show_menu} isAWork={is_awork} router={this.props.router}/>
		    </div>
	   	);
		
	}  
	setBlur(blur_){
		if(blur_) ReactDOM.findDOMNode(this.refs._main).classList.add('blur');
		else ReactDOM.findDOMNode(this.refs._main).classList.remove('blur');
	}
}
