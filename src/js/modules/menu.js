import React from 'react'
import {Link} from 'react-router'
import GlitchText from './glitch_text'

export class MainMenu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false
		};
		this.toggleShow=this.toggleShow.bind(this);
	}

	render(){
		if(this.state.show){
			return(
				<div className="mainMenu show" onClick={this.toggleShow}>
					<div>
					<img className="center" src="./image/big_triangle.png"/>
					{this.props.children}

					<div className="copyright center">Copyright &copy; MERLIN'S MUSTACHE LAB</div>
					</div>
				</div>
			);
		}else{
			return(
				<div className="mainMenu" onClick={this.toggleShow}>
					<img className="center" src="./image/small_triangle.png"/>
					<img className="center" src="./image/logo.png"/>
				</div>
			);
		}
	}
	toggleShow(){
		this.props.backBlur(!this.state.show);
		this.setState({show:!this.state.show});

	}

}
export class MainMenuItem extends React.Component{
	render(){
		return(
			<Link {...this.props} className="mainMenuItem" activeClassName="active">
				<GlitchText  
	    				text={this.props.children}
	    				font_size={40}
	    				hover={true}
	    				/>							
			</Link>
		);
	}
}