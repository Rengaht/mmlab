import React from 'react'
import {Link} from 'react-router'
import GlitchText from './glitch_text'
import {CopyRight} from './title'

export class MainMenu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false
		};
		this.toggleShow=this.toggleShow.bind(this);
		this.closeShow=this.closeShow.bind(this);
	}

	render(){
		return(
			<div className="mainMenu" onClick={this.toggleShow}>
				<div className={this.state.show?"wrap show":"wrap"}>
					<div>
					<MainMenuItem to="/about">ABOUT</MainMenuItem>
		     		<MainMenuItem to="/work">WORK</MainMenuItem>
		     		<MainMenuItem href="http://mmlab.com.tw/blog/">BLOG</MainMenuItem>		     		
			     	<MainMenuItem to="/contact">CONTACT</MainMenuItem>	     				     	
			     	</div>
			     	<CopyRight/>
				</div>
				<HamMenu open={this.state.show} onClick={this.toggleShow}/>		
				<div className="logo">
				    <Link to="/">
			     		<img src="image/map_logo.png"/>
			     	</Link>
		     	</div>		
			</div>
		);		
	}
	closeShow(){
		this.props.backBlur(false);
		this.setState({show:false});
	}
	toggleShow(){
		this.props.backBlur(!this.state.show);
		this.setState({show:!this.state.show});

	}

}
export class MainMenuItem extends React.Component{
	render(){
		let text_=(<GlitchText  
		    				text={this.props.children}
		    				font_size={37.5}
		    				hover={true}
		    				amp={5}
		    				/>);
		if(this.props.to)
			return(
				<div {...this.props} className="mainMenuItem">
				<Link to={this.props.to}>
					{text_}								
				</Link>
				</div>
			);
		else
			return(
				<div {...this.props} className="mainMenuItem">
				<a href={this.props.href} target="_blank">
					{text_}
				</a>
				</div>
			);
	}
}

class HamMenu extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'open':false
		};
		this.toggleStyle=this.toggleStyle.bind(this);
	}
	render(){
		return(
			<div id="ham_menu" onClick={this.toggleStyle} className={this.props.open?"open":"close"}>
			  <span></span>
			  <span></span>
			  <span></span>
			  <span></span>
			</div>
		);
	}
	toggleStyle(){
		// console.log(this.state.open);
		// this.setState({'open':!this.state.open});
		//this.props.toggleMenu();
	}
}

