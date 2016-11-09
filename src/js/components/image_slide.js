import React from 'react'
import * as DConst from '../request_constants'


export default class ImageSlide extends React.Component{
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
<<<<<<< HEAD
							<img src={image.data.url} style={{'width':'100%'}}/>				
=======
							<img src={DConst.FilePath+image.data.name} style={{'width':'100%'}}/>				
>>>>>>> dc5c6c3fd21eaa3d573fc2bf711d78a1a8d057cb
							</div>
						);
					});
			var go_=this.goNum;
			dotNodes=this.props.image.map(function(img,index){
				return(
					<div key={index} id={index} onClick={go_} 
						className={index==show_?"dot active":"dot"}/>
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