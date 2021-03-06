import React from 'react'
import FadeReveal from './fade_reveal'
import FadeAppear from './fade_appear'

export class Title extends React.Component{
  render(){
  	// console.log(this.props.text);

  	if(this.props.noTitle) return <div/>;
  	// if(path[1].length>0){
	    return(	    	
		    <div className="corner_title"
		    	ref="_item">
		    	<div>
		    		| {this.props.text.substr(1)} |				
		    	</div>
		    </div>
	   	);
	// }else return <div/>;
  }
}

export class CopyRight extends React.Component{
	render(){
		return(			
			<FadeReveal className="copyright">
				<div className="center">Copyright &copy; MERLIN'S MUSTACHE LAB</div>
			</FadeReveal>					
		);
	}
}
