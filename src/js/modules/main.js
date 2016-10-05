import React from 'react'
import {Link} from 'react-router'
import {MainMenu, MainMenuItem} from './menu'
import GlitchText from './glitch_text'

export default React.createClass({
  	render(){
	    return(
	    <div>
	    	 {this.props.children}
		     <MainMenu>
		     	<MainMenuItem to="/">HOME</MainMenuItem>
	     		<MainMenuItem to="/about">ABOUT</MainMenuItem>
	     		<MainMenuItem to="/work">WORK</MainMenuItem>
	     		<a href="./blog.html" target="_blank">
	     			<GlitchText  
	    				text={'BLOG'}
	    				font_size={40}
	    				hover={true}
	    			/>
	     		</a>
	     		<MainMenuItem to="/contact">CONTACT</MainMenuItem>	     		
		     </MainMenu>

		     
	    </div>
	    )
	}  
})