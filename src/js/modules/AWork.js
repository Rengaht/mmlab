import React from 'react'
import {Link} from 'react-router'
import GlitchText from './glitch_text'
import WorkThumb from './work_thumb'
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
		
		// let url=DConst.URL+DConst.WorkPath+'/'+id_+'?'+DConst.Token;	
		let url="data/data.json"

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
							<div className="English">
								<GlitchText hover={false}
									font_size={45}
									text={this.state.work.title_en}/>										
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
						
						<WorkVideo src={this.state.work.video}/>

						<div className="AWorkText">
							<div className="title">作品簡介</div>
							<div className="text" dangerouslySetInnerHTML={{__html:this.state.work.text_ch}}></div>
						</div>

						<div className="AWorkText">
							<div className="title">Introduction</div>
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
							<img src={DConst.FilePath+image.data.name} style={{'width':'100%'}}/>				
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
			<div>
				<div className="AWorkImageContainer">
					<div className="AWorkImageView">
						<div ref="_slider" className="slider">
						{imageNodes}
						</div>
						<div className="control">
							<div className="imageArrow left" onClick={this.goLeft}/>
							<div className="imageArrow right" onClick={this.goRight}/>										
						</div>				
					</div>
				</div>
				<div className="dotContainer">
						<div className="center">{dotNodes}</div>
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
	constructor(props){
		super(props);
		this.state={};
		//load related item by id		
		// let url=DConst.URL+DConst.WorkPath+'/?'+DConst.Token+'&status=1&sort_order=DESC&columns_show=title_en,title_ch,thumb_image';
		let url="data/work.json";
		var id_=this.props.id;
		$.ajax({
			url:url,
			dataType:'json',
			cache:false,
			success: function(data){
				
				var total_=data.rows.length;
				var this_=data.rows.findIndex(function(ele,index){
					return ele.id==id_;
				});

				var relate_work=[];
				for(var i=1;i<=3;++i){
					relate_work.push(data.rows[(this_+i)%total_]);
				}
				this.setState({work:relate_work});

			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});



	}
	render(){
		
		if(!this.state.work) return <div/>;

		var relateNodes=[];		
		relateNodes=this.state.work.map(function(work_,index){
			return(				
				<div key={index} className="relatedContainer">
					<WorkThumb key={work_.id} work={work_} type_text={''} small={true}/>
				</div>				
			);
		});
		//<Link to={"/work/"+work_.id}>
		//	<img className="workThumbImage" src={DConst.FilePath+work_.thumb_image.name} /> 
		//	<div className="relatedTag">
		//		<div>{work_.title_en}</div>
		//		<div>{work_.title_ch}</div>
		//	</div>
		//</Link>

		return(
			<div className="AWorkRelated">
				<div className="more">More Projects</div>
				{relateNodes}
			</div>
		);
	}
}

