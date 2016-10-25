import React from 'react'
import {Link} from 'react-router'
import GlitchImage from './glitch_image'
import GlitchText from './glitch_text'
import * as DConst from '../request_constants'

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
		//console.log("enter!");
		this.refs._img.onMouseEnter();
	}
	onMouseLeave(){
		//console.log("leave!");
		this.refs._img.onMouseLeave();
	}
	componentDidMount(){
		this.setState({show:true,delay:(this.props.index+1)*.1});
	}
	componentWillUnmount(){
		// console.log("thumb will unmount");
		// this.setState({show:false});	
	}
	hide(){
		this.setState({show:false,delay:0});		
	}

	render(){
		//console.log(this.props.index);
		let en_size=32;
		let ch_size=22;
		let wrap_=(<div className="wrap">
						<div className="tag">{this.props.work.year}&nbsp;/&nbsp;{this.props.type_text}</div>			
						<div className="english">
							<GlitchText hover={false}
									font_size={en_size}
									amp={1.0}
									line_height={3.0}
									text={this.props.work.title_en}/>
						</div>
						<div className="chinese" style={{'fontSize':ch_size}}>{this.props.work.title_ch}</div>
					</div>);
		if(this.props.small){
			en_size=20;
			ch_size=16;
			wrap_=(<div className="wrap">
						<div className="english">
							<GlitchText hover={false}
										font_size={en_size}
										amp={1.0}
										line_height={3.0}
										text={this.props.work.title_en}/>
						</div>
						<div className="chinese" style={{'fontSize':ch_size}}>{this.props.work.title_ch}</div>
					</div>);
		}
		return(
			//<div className={this.props.index%3==2?"workItem last-in-row":"workItem"}>				
			<Link to={"/work/"+this.props.work.id}>
				<div className={this.state.show?"workThumbContainer show":"workThumbContainer"}
					 onMouseEnter={this.onMouseEnter}
					 onMouseLeave={this.onMouseLeave}
					 style={{transitionDelay:this.state.delay+'s'}}>
					<GlitchImage ref="_img" 
							last={0.0}
							src={DConst.FilePath+this.props.work.thumb_image.name}/>
					<div ref="_descript" className="workThumbDescript">												
						{wrap_}					
					</div>									
				</div>
			</Link>
			);
	
	}

}
