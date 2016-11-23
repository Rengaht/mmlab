import React from 'react'
import {Link, browserHistory} from 'react-router'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import WorkThumb from '../components/work_thumb'
import ImageSlide from '../components/image_slide'
import RelateWork from '../components/related_work'
import FadeReveal from '../components/fade_reveal'

import * as DConst from '../request_constants'
import MainContainer from '../components/main_container'


export default class AWork extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
			'key':-1
		};
		//this.loadData=this.loadData.bind(this);
		this.loadData(this.props.params.id);
		// this.goBack=this.goBack.bind(this);

		//console.log(this.props.location.query);
	}
	loadData(id_){
		
		let url=DConst.URL+DConst.WorkPath+'/'+id_+'?'+DConst.Token;	
		// let url="data/data.json"

		$.ajax({
			url:url,
			dataType:'json',
			cache:false,
			success: function(data){
				
				let tag_list_=(data.type)?data.type.rows.map(function(obj){
					return '#'+obj.data.text;
				}):[];
				tag_list_=tag_list_.join(' ');
				
				this.setState({work:data,key:data.id,tag_list:tag_list_});				

			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});

	}
	componentWillMount(){
        // initBackgroundType(3);
  	}
	render() {
		var content_;
		if(this.state.work){
			content_=(
				<div key={this.state.key} className="AWorkContent center">
				<ReactCSSTransitionGroup transitionName="awork_left"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*2}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*2}
						transitionLeaveTimeout={Const.AppearInterval+Const.DelayInterval*2}>
					<div className="AWorkLeft">
						<div className="AWorkLeftTop">
							<div className="English glitch_always" data-text={this.state.work.title_en}>
								{this.state.work.title_en}
							</div>
							<div className="Chinese">{this.state.work.title_ch}</div>
							
							<div className="AWorkLeftBottom">
								<div>{this.state.work.client}</div>
								<div>{this.state.work.descript}</div>
								<div className="AWorkTag">{this.state.work.year}{this.state.tag_list}</div>
							</div>
						</div>
						
					</div>
				</ReactCSSTransitionGroup>
				<ReactCSSTransitionGroup transitionName="main_container"
						transitionAppear={true}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={Const.AppearInterval+Const.DelayInterval*3}
						transitionEnterTimeout={Const.AppearInterval+Const.DelayInterval*3}
						transitionLeaveTimeout={Const.AppearInterval+Const.DelayInterval*3}>
					<div className="AWorkRight">
						<div>
							<WorkVideo src={this.state.work.video}/>
						</div>
						<div className="AWorkText">
							<div className="title">作品簡介</div>
							<div className="text" dangerouslySetInnerHTML={{__html:this.state.work.text_ch}}></div>
						</div>

						<FadeReveal className="AWorkText">
							<div className="title en">Introduction</div>
							<div className="text" dangerouslySetInnerHTML={{__html:this.state.work.text_en}}></div>
						</FadeReveal>

						<ImageSlide image={this.state.work.image.rows}/>

						<RelateWork id={this.state.work.id}/>
					</div>				
				</ReactCSSTransitionGroup>
				</div>
			);


		} 

		return(
			<MainContainer noCopyright={true}>
			{content_}
			</MainContainer>

		);

	}	
	componentWillReceiveProps(props_){
		//console.log(props_);
		console.log("update");
		this.loadData(props_.params.id);
		this.forceUpdate();
	}
	// goBack(){
	// 	// console.log("goback "+window._global_page_count);

	// 	if(!window._global_page_count) this.props.router.push("/work");
	// 	else this.props.router.go(-window._global_page_count);		
	// 	// this.props.router.push(window._from_home_or_work);
	// }
}
class WorkVideo extends React.Component{
	render(){
		if(this.props.src.type.includes("embed"))
			return(
				<div className="AWorkVideo" dangerouslySetInnerHTML={{__html:this.props.src.html}}>			
				</div>
			);
		else if(this.props.src.type.includes("image"))
			return(
				<div className="AWorkVideo">			
					<img src={this.props.src.url}/>
				</div>
			);

	}
}




