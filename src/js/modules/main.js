import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {MainMenu, MainMenuItem} from './menu'
import GlitchText from './glitch_text'
import MainContainer from './main_container'
import {Title,CopyRight} from './title'

export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.setBlur=this.setBlur.bind(this);
		
	}
	
  	render(){
	    return(
	    <div>
	    	<Title text={this.props.location.pathname}/>
	    	<div ref="_main" id="_main">
	    	  <MainContainer path={this.props.location.pathname}>
		     	{this.props.children}
		     </MainContainer>
	    	 </div>
		     <MainMenu backBlur={this.setBlur}/>
		    

	    </div>
	    );
	}  
	setBlur(blur_){
		if(blur_) ReactDOM.findDOMNode(this.refs._main).classList.add('blur');
		else ReactDOM.findDOMNode(this.refs._main).classList.remove('blur');
	}
}