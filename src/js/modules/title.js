import React from 'react'
import GlitchText from './glitch_text'

export default React.createClass({
  render() {
    return(
	    <div className="title">
	    	<div className="titleContent center">
	    	<span className="titleSub">
	    		{this.props.children}
	    	</span>
	    	<GlitchText className="titleText" 
	    				text={this.props.text}
	    				font_size={40}
	    				/>
	    	
	    	</div>
	    </div>
    )
  }
})