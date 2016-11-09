import React from 'react'
import ReactDOM from 'react-dom'
import {Link,Match} from 'react-router'
import {MainMenu, MainMenuItem} from '../components/menu'

import MainContainer from '../components/main_container'
import {Title,CopyRight} from '../components/title'

export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.setBlur=this.setBlur.bind(this);
		
	}
	
  	render(){
  		
  		var show_menu=false;
  		if(this.props.location.pathname=="/about" 
  			||this.props.location.pathname=="/contact"
  			||this.props.location.pathname=="/work") show_menu=true;

  		return(
		    <div>
		    	<Title text={this.props.location.pathname} show={show_menu}/>
		    	<div ref="_main" id="_main">
		    	  <MainContainer path={this.props.location.pathname}>
			     	{this.props.children}
			     </MainContainer>
		    	 </div>
		    	 <MainMenu backBlur={this.setBlur} show={show_menu}/>
		    </div>
	    );
	}  
	setBlur(blur_){
		if(blur_) ReactDOM.findDOMNode(this.refs._main).classList.add('blur');
		else ReactDOM.findDOMNode(this.refs._main).classList.remove('blur');
	}
}