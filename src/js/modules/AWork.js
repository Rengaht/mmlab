import React from 'react'
import {Link} from 'react-router'
import GlitchText from './glitch_text'

export default class AWork extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
			'key':-1
		};
		//this.loadData=this.loadData.bind(this);
		this.loadData(this.props.params.title);
		//console.log(this.props.location.query);
	}
	loadData(title_){

		let url="data/"+title_+".json";	
		$.ajax({
			url:url,
			dataType:'json',
			cache:false,
			success: function(data){
				this.setState({work:data.work});
				this.setState({key:data.work.id});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});

	}
	render() {
		if(!this.state.work) return(
			<div></div>
		);

		let tag_list_='';
		for(var t  in this.state.work.type) tag_list_+='  #'+this.state.work.type[t];

		return (
			<div>
				<iframe src="background_rotate.html" className="indexFrame"></iframe>		     					
				<div key={this.state.key} className="AWorkContent center">
					<div className="AWorkLeft">
						<div className="AWorkLeftTop">
							<div className="English">
								<GlitchText hover={false}
									font_size={36}
									text={this.state.work.title_en}/>										
							</div>
							<div className="Chinese">{this.state.work.title_ch}</div>
						</div>
						<div className="AWorkLeftBottom">
							<div className="floatBottom">
								<div>{this.state.work.client}</div>
								<div>{this.state.work.descript}</div>
								<div className="AWorkTag">{this.state.work.year}{tag_list_}</div>
							</div>
						</div>
					</div>
					<div className="AWorkRight">
						
						<WorkVideo src={this.state.work.video}/>
						<div className="AWorkText Chinese">{this.state.work.text_ch}</div>
						<div className="AWorkGap"></div>
						<div className="AWorkText English">{this.state.work.text_en}</div>

						<ImageSlide image={this.state.work.image}/>

						<RelateWork work={this.state.work.related}/>
					</div>
					<Link to={"/work"} className="AWorkClose">
						<img src="image/x.png"/>
					</Link>

				</div>
			</div>

		);
	}	
	componentWillReceiveProps(props_){
		//console.log(props_);
		console.log("update");
		this.loadData(props_.params.title);
		this.forceUpdate();
	}
}

class ImageSlide extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'show_index':0
		};
		this.goLeft=this.goLeft.bind(this);
		this.goRight=this.goRight.bind(this);
		this.goNum=this.goNum.bind(this);
	}
	render(){
		var imageNodes,dotNodes;

		if(this.props.image!==undefined){
			var m_=this.props.image.length;
			var show_=this.state.show_index;
			imageNodes=this.props.image.map(function(image,index){
						return(
							<div key={index} className={index==show_?"image show":"image"}>
							<img src={image} style={{'width':'100%'}}/>				
							</div>
						);
					});
			var go_=this.goNum;
			dotNodes=this.props.image.map(function(img,index){
				return(
					<img key={index} id={index} src={index==show_?"image/gray_o.png":"image/white_o.png"}
						onClick={go_} className="dot"/>
				);
			});
		}	
		return(
			<div className="AWorkImageContainer">
				<div className="AWorkImageView">
					<div ref="_slider" className="slider">
					{imageNodes}
					</div>
					<div className="control">
						<div className="imageArrow left" onClick={this.goLeft}/>
						<div className="imageArrow right" onClick={this.goRight}/>
					
						<div className="dotContainer">
							<div className="center">{dotNodes}</div>
						</div>
					</div>
				</div>
			</div>
		);		
	}
	goLeft(){
		var m_=this.props.image.length;
		this.setState({show_index:(this.state.show_index-1+m_)%m_});
	}
	goRight(){
		var m_=this.props.image.length;
		this.setState({show_index:(this.state.show_index+1)%m_});
		
	}
	goNum(e){
		if(this.state.show_index==e.target.id) return;
		this.setState({show_index:e.target.id});	
	}
}
class RelateWork extends React.Component{
	// constructor(props){
	// 	super(props);
	// }
	render(){
		var relateNodes=[];		
		relateNodes=this.props.work.map(function(work_,index){
			return(				
				<div key={index} className="relatedContainer">
					<Link to={"/work/"+work_.id}>
						<img className="workThumbImage" src={"data/thumb/p"+(work_.id+1)+".jpg"} /> 
						<div className="relatedTag">
							<div>{work_.title_en}</div>
							<div>{work_.title_ch}</div>
						</div>
					</Link>
				</div>				
			);
		});
		return(
			<div className="AWorkRelated">
				{relateNodes}
			</div>
		);
	}
}

class WorkVideo extends React.Component{
	render(){
		return(
			<div className="AWorkVideo">
			<iframe src={this.props.src} frameBorder="0" allowFullScreen></iframe>
			</div>
		);
	}
}