import React from 'react';
import {Link} from 'react-router';

import FadeReveal from './fade_reveal';
import FadeAppear from './fade_appear';
import GlitchImage from './glitch_image';
import * as DConst from '../request_constants';
import WebglGlitch from './glitch_webgl';



export default class WorkThumb extends React.Component{
	constructor(props){
		super(props);
		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);
		this.state={
			show:false
		};

	}
	onMouseEnter(){
		// console.log("enter!");		
		this.refs._webgl_glitch.onMouseEnter();
	}
	onMouseLeave(){
		// console.log("leave!");
		this.refs._webgl_glitch.onMouseLeave();
	}


	hide(){
		this.setState({show:false,delay:0});		
	}

	render(){
		//console.log(this.props.index);
		// let en_size=32;
		// let ch_size=22;
		let wrap_=(<div className="wrap">
						<div className="tag">{this.props.work.year}&nbsp;/&nbsp;{this.props.type_text}</div>			
						<div className="english">
							<div className="glitch_always" data-text={this.props.work.title_en}>
							{this.props.work.title_en}
							</div>							
						</div>
						<div className="chinese">{this.props.work.title_ch}</div>
					</div>);
		if(this.props.small){
			// en_size=22;
			// ch_size=16;
			wrap_=(<div className="wrap">
						<div className="english">
							<div className="glitch_always" data-text={this.props.work.title_en}> 
							{this.props.work.title_en}
							</div>							
						</div>
						<div className="chinese">{this.props.work.title_ch}</div>
					</div>);
		}
		return(
			//<div className={this.props.index%3==2?"workItem last-in-row":"workItem"}>				
			<div className="workItem">
				<div>				
					<Link to={"/work/"+this.props.work.id} className="workThumbLink"
							key={this.props.work.id}>
						<FadeReveal className="workThumbContainer"
								 onMouseEnter={this.onMouseEnter}
								 onMouseLeave={this.onMouseLeave}>
								<WebglGlitch ref="_webgl_glitch" 
									last={0.0}
									src={this.props.work.thumb_image.url}/>						
								<img src={this.props.work.thumb_image.url} ref="_img"/>
								<div ref="_descript" className="workThumbDescript">												
									{wrap_}					
								</div>																
						</FadeReveal>
					</Link>
				</div>
			</div>
		);

		// style={{transitionDelay:this.state.delay+'s'}}
		// <GlitchImage ref="_canvas" 
		// 					last={0.0}
		// 					src={this.props.work.thumb_image.url}/>	
		// 				<img src={this.props.work.thumb_image.url} ref="_img"/>

		//<img src={DConst.FilePath+this.props.work.thumb_image.name} ref="_img"/>
					 
		//<GlitchImage ref="_img" 
		//last={0.0}
		//src={DConst.FilePath+this.props.work.thumb_image.name}/>	
	}

}
