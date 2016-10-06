import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import Title from './title'
import GlitchImage from './glitch_image'
import GlitchText from './glitch_text'

export default class Work extends React.Component{
	constructor(props){
		super(props);
		this.work_url="data/work.json";
		this.filter_url="data/filter.json";
		this.state={
			'filter':{
				'year':[],
				'type':[]
			}
		};

		//load filter
		$.ajax({
			url:this.filter_url,
			dataType:'json',
			cache:false,
			success: function(data){
				this.setState({filter:data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});

		//load work
		$.ajax({
			url:this.work_url,
			dataType:'json',
			cache:false,
			success: function(data){
				this.setState({data:data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});

		this.applyFilter=this.applyFilter.bind(this);
		this.toggleFilter=this.toggleFilter.bind(this);
	}
	render(){
		// return(
		// 	<div className="mainContainer">
		//      	<Title text="WORK">
		//      		<WorkFilter ref="_all" name="ALL" showFilter={this.toggleFilter}/>
		//      		<span className="filterGap">|</span>
		//      		<WorkFilter ref="_year" name="YEAR" val={this.state.filter.year} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		//      		<span className="filterGap">|</span>
		//      		<WorkFilter ref="_type" name="TYPE" val={this.state.filter.type} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		//      	</Title>
		//      	<div className="mainContent content center">
		// 			<WorkList ref="_list" data={this.state.data} filter_type={this.state.filter} filter_val={this.state.filter_value}/>			
		// 	 	</div>
  //    		</div>
			
		// );
		return(
			<div className="mainContainer">
				<iframe src="background_float.html" className="indexFrame"></iframe>
		     	<Title text="WORK">
		     		<WorkFilter ref="_year" name="YEAR" val={this.state.filter.year} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     		<span className="filterGap">|</span>
		     		<WorkFilter ref="_type" name="TYPE" val={this.state.filter.type} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     	</Title>
		     	<div className="content center">
					<WorkList ref="_list" data={this.state.data} filter_type={this.state.filter} filter_val={this.state.filter_value}/>			
			 	</div>
     		</div>
			
		);
	}
	toggleFilter(name){
		if(name!='TYPE') this.refs._type.toggleShow(false);
		if(name!='YEAR') this.refs._year.toggleShow(false); 
		//if(name=='ALL') this.applyFilter('','');
		this.applyFilter('','');
	}
	applyFilter(name,val){
		//console.log("apply filter! "+name+'  '+val);
		this.refs._list.applyFilter(name,val);
	}

}
class WorkList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'name':'',
			'val':''
		};
	}
	render(){		
		var workNodes=[];
		if(this.props.data!==undefined){
			let name=this.state.name;
			let val=this.state.val;
			workNodes=this.props.data.work
					.filter(function(work){
						if(name=='YEAR') return work.year==val;
						if(name=='TYPE') return work.type.includes(val);
						return true;
					})
					.map(function(work,index){
						return(
							<WorkThumb key={work.id} work={work} index={index} />				
						);
					});
		}
		return(
			<div className="workList">
				{workNodes}
			</div>
		);
	}
	applyFilter(name,val){
		this.setState({'name':name,'val':val});
	}
}

class WorkThumb extends React.Component{
	constructor(props){
		super(props);
		this.onMouseEnter=this.onMouseEnter.bind(this);
		this.onMouseLeave=this.onMouseLeave.bind(this);
	}
	onMouseEnter(){
		//console.log("enter!");
		this.refs._img.onMouseEnter();
	}
	onMouseLeave(){
		//console.log("leave!");
		this.refs._img.onMouseLeave();
	}
	render(){
		//console.log(this.props.index);
		return(
			<div className={this.props.index%3==2?"workItem last-in-row":"workItem"}>
			<Link to={"/work/"+this.props.work.id}>
				<div className="workThumbContainer" 
					 onMouseEnter={this.onMouseEnter}
					 onMouseLeave={this.onMouseLeave}>
					<GlitchImage ref="_img" 
							last={500.0}
							src={"data/thumb/p"+(this.props.work.id+1)+".jpg"}/>
					<div ref="_descript" className="workThumbDescript">
						<div className="english">
							<GlitchText hover={false}
										font_size={32}
										amp={1.0}
										line_height={3.0}
										text={this.props.work.title_en}/>
						</div>
						<div className="chinese">{this.props.work.title_ch}</div>
						<div className="tag">
							<span className="floatBottom">
							{this.props.work.year}&nbsp;/&nbsp;{this.props.work.type[0]}
							</span>
						</div>			
					</div>									
				</div>
			</Link>
			</div>
		);
	}

}

class WorkFilter extends React.Component{
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
							<WorkFilterNode className="filterName" key={index} ref={val} text={val} onClick={callback}  />		
						);
					});
		}
		return(
			<div className="workFilter">
				<span className="filterTitle" onClick={this.toggleShow}>{this.props.name}</span>
				<span className={this.state.show?'filterContent show':'filterContent'}>
					{filterNodes}
				</span>
			</div>
		);
	}
	toggleShow(show_){

		if(typeof show_==='boolean'){
			this.setState({show:show_});			
		}else{
			//no self-closing
			// if(this.props.val
			// 	&& this.state.show) return;

			this.props.showFilter(this.props.name);
			this.setState({show:!this.state.show});				
			
			this.resetActive();	
		} 

	}
	resetActive(){
		for(var v in this.props.val){
			//ReactDOM.findDOMNode(this.refs[this.props.val[v]]).classList.remove('active');
			this.refs[this.props.val[v]].resetActive();
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
			<span onClick={this.setActive}>
			<GlitchText ref="_text"
					className={this.props.className}
					text={String(this.props.text)}
					font_size={10}
					hover={true}
					font={'mmlabWebText'}
					amp={1.0}
					>
					</GlitchText>
			</span>
		);
	}
	setActive(){
		console.log("click!");
		this.props.onClick(this.props.text);
		this.refs._text.setActive(true);
	}
	resetActive(){
		this.refs._text.setActive(false);
	}

}