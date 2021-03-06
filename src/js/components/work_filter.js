import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

import * as DConst from '../request_constants'

export default class WorkFilter extends React.Component{
	constructor(props){
		super(props);
		this.state={
			show:false
		};
		this.toggleShow=this.toggleShow.bind(this);
		this.filterClick=this.filterClick.bind(this);
		this.resetActive=this.resetActive.bind(this);
	}
	render(){

		var filterNodes=[];
		if(this.props.val!==undefined){
			let callback=this.filterClick;
			filterNodes=this.props.val.map(function(val,index){
						return(
							<WorkFilterNode className="filterName" key={index} ref={val.text} id={val.id} text={val.text} onClick={callback}  />		
						);
					});			
		}
		// console.log("filter: "+this.state.show);
		return(
			<div className="workFilter" onClick={this.toggleShow}>
				<div className="filterTitle">{this.props.name}</div>
				<div className={this.state.show?'filterContent show':'filterContent'}>
					{filterNodes}
				</div>
			</div>
		);
	}
	toggleShow(show_){

		if(typeof show_==='boolean'){
			this.setState({show:show_});			
		}else{
			//no self-closing
			if(this.props.val
				&& this.state.show) return;

			this.props.showFilter(this.props.name);
			this.setState({show:!this.state.show});				
			
			this.resetActive();	
		} 
		if(!this.props.val) 
			if(!this.state.show) this.props.filterHandler('ALL','ALL');

	}
	resetActive(){
		if(!this.props.val) return;
		for(var v in this.props.val){
			//ReactDOM.findDOMNode(this.refs[this.props.val[v]]).classList.remove('active');
			this.refs[this.props.val[v].text].resetActive();
		}
	}
	filterClick(text_){		
		this.props.filterHandler(this.props.name,text_);		
		this.resetActive();
	}
}

class WorkFilterNode extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'active':false
		};
		this.setActive=this.setActive.bind(this);
	}
	render(){
		return(
			<div onClick={this.setActive}>
			<div className="filterName glitch" data-text={String(this.props.text)} ref="_text" id={this.props.id}>
				{String(this.props.text)}
			</div>			
			</div>
		);
	}
	setActive(){
		// console.log("click!");
		this.props.onClick(this.props.id);
		ReactDOM.findDOMNode(this.refs._text).classList.add('glitch_always');
		// this.refs._text.setActive(true);
	}
	resetActive(){

		ReactDOM.findDOMNode(this.refs._text).classList.remove('glitch_always');
	}

}