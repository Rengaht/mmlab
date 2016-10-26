import React from 'react'
import {Link} from 'react-router'

import WorkThumb from '../components/work_thumb'
import ImageSlide from '../components/image_slide'
import RelateWork from '../components/related_work'

import * as DConst from '../request_constants'


export default class AWork extends React.Component{

	constructor(props){
		super(props);
		
		this.state={
			'key':-1
		};
		//this.loadData=this.loadData.bind(this);
		this.loadData(this.props.params.id);
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
        initBackgroundType(3);
  	}
	render() {
		if(!this.state.work) return(
			<div></div>
		);

		
		//for(var t  in this.state.work.type.rows[0].) tag_list_+='  #'+this.state.work.type[t];

		return (
			<div>
				<div key={this.state.key} className="AWorkContent center">
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
					<div className="AWorkRight">
						<div>
							<WorkVideo src={this.state.work.video}/>
						</div>
						<div className="AWorkText">
							<div className="title">作品簡介</div>
							<div className="text" dangerouslySetInnerHTML={{__html:this.state.work.text_ch}}></div>
						</div>

						<div className="AWorkText">
							<div className="title en">Introduction</div>
							<div className="text" dangerouslySetInnerHTML={{__html:this.state.work.text_en}}></div>
						</div>

						<ImageSlide image={this.state.work.image.rows}/>

						<RelateWork id={this.state.work.id}/>
					</div>
					<Link to={"/work"} className="AWorkClose">						
						<img src="image/x.png"/>
					</Link>

				</div>
			</div>

		);
		//<Link to={"/work"} className="AWorkClose">						
		//				<GlitchText 
     	//					img_src="image/x.png"
     	//					hover={true}
     	//					amp={1.0}
		//					line_height={3.0}/>
		//			</Link>
	}	
	componentWillReceiveProps(props_){
		//console.log(props_);
		console.log("update");
		this.loadData(props_.params.id);
		this.forceUpdate();
	}
}
class WorkVideo extends React.Component{
	render(){
		return(
			<div className="AWorkVideo" dangerouslySetInnerHTML={{__html:this.props.src.html}}>			
			</div>
		);
	}
}




