import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {MainMenu, MainMenuItem} from './menu'
import GlitchText from './glitch_text'

export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.setBlur=this.setBlur.bind(this);
	}
  	render(){
	    return(
	    <div>
	    	<div ref="_main" id="_main">
	    	 {this.props.children}
	    	 </div>
		     <MainMenu backBlur={this.setBlur}>
		     	<MainMenuItem to="/">HOME</MainMenuItem>
	     		<MainMenuItem to="/about">ABOUT</MainMenuItem>
	     		<MainMenuItem to="/work">WORK</MainMenuItem>
	     		<a href="http://mmlab.com.tw/blog/" target="_blank" className='MainMenuItem'>
	     			<GlitchText 
	     				text={'BLOG'}
	    				font_size={40}
	    				hover={true}
	    			/>
	     		</a>
	     		<MainMenuItem to="/contact">CONTACT</MainMenuItem>	     		
		     </MainMenu>

	    </div>
	    );
	}  
	setBlur(blur_){
		if(blur_) ReactDOM.findDOMNode(this.refs._main).classList.add('blur');
		else ReactDOM.findDOMNode(this.refs._main).classList.remove('blur');
	}
}