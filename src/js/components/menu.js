import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import {CopyRight} from './title';
import FadeAppear from './fade_appear'


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

		
		//if(this.props.hideMenu) return <div/>;
		
		let menu_open=this.state.show || this.props.isAWork;
		console.log("menu_open= "+menu_open);

		var wrap_=(
				<div className="wrap" ref="_wrap">
					<div className="itemwrap" ref="_item_wrap">					
						<MainMenuItem to="/about" key="_about">ABOUT</MainMenuItem>
			     		<MainMenuItem to="/work" key="_work">WORK</MainMenuItem>
			     		<MainMenuItem href="http://mmlab.com.tw/blog/" key="_blog">BLOG</MainMenuItem>		     		
				     	<MainMenuItem to="/contact" key="_contact">CONTACT</MainMenuItem>
					</div>
			     	<div className="menuCopyright">
			     		<CopyRight/>
			     	</div>
				</div>								
			);
		var ham_;
		if(!this.props.hideMenu)
			ham_=(<HamMenu open={menu_open} 
								 onClick={this.toggleShow}/>);
		
		var logo_;
		if(!this.props.isAWork && !this.props.hideMenu)
			logo_=(
			<div className="logo" onClick={this.closeShow}>
				<Link to="/">
		     		<img src="image/logo_no_name.png"/>
		     	</Link>
	     	</div>);

		return(
				<div>
				<div className="mainMenu" onClick={this.toggleShow}>
					{wrap_}
					<ReactCSSTransitionGroup transitionName="menu_icon"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*4}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*4}
						transitionLeaveTimeout={Const.AppearInterval+Const.DelayInterval*4}>							
						{ham_}
					</ReactCSSTransitionGroup>				
				</div>
					<ReactCSSTransitionGroup transitionName="menu_icon"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*4}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*4}
						transitionLeaveTimeout={Const.AppearInterval+Const.DelayInterval*4}>	
						{logo_}	
				     </ReactCSSTransitionGroup>
			    </div>
			);		
		
	}
	closeShow(){
		this.props.backBlur(false);
		this.setState({show:false});

		this.refs._wrap.classList.remove("show");
		this.refs._item_wrap.classList.remove("show");
	}
	toggleShow(){

		if(this.props.isAWork){
			let count_=0;
			var len_=window._last_page.length;
			var index_=window._last_page.length-1;			
			for(var i=index_;i>=0;i--){
				if(window._last_page[i].match(/(^\/work\/)(.*[0-9]$)/gm)) count_++;				
				else break;
			}
			console.log("AWork count "+count_);

			if(count_==len_) this.props.router.push("/work");
			else{				
				this.props.router.go(-count_);			
			} 

		}else{
			this.props.backBlur(!this.state.show);
			this.setState({show:!this.state.show});

			this.refs._wrap.classList.toggle("show");
			this.refs._item_wrap.classList.toggle("show");
		}
	}
	
}
export class MainMenuItem extends React.Component{

	render(){
		// let text_=(<GlitchText  
		//     				text={this.props.children}
		//     				font_size={37.5}
		//     				hover={true}
		//     				amp={5}
		//     				/>);
		let text_=<div className="glitch" data-text={this.props.children}>{this.props.children}</div>;
		if(this.props.to)
			return(				
				<div {...this.props} className="mainMenuItem" ref="_item">					
					<Link to={this.props.to} key={this.props.children}>
						{text_}								
					</Link>					
				</div>				
			);
		else
			return(
				<div {...this.props} className="mainMenuItem" ref="_item">										
					<a href={this.props.href} target="_blank" key={this.props.children}>
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
			<FadeAppear id="ham_menu" onClick={this.toggleStyle} className={this.props.open?"open":"close"}>
			  <span></span>
			  <span></span>
			  <span></span>
			  <span></span>
			</FadeAppear>
		);
	}
	toggleStyle(){
		// console.log(this.state.open);
		// this.setState({'open':!this.state.open});
		//this.props.toggleMenu();
	}
}

