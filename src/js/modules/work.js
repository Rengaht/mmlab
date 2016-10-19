import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import Title from './title'
import GlitchImage from './glitch_image'
import GlitchText from './glitch_text'
import * as DConst from '../request_constants'

export default class Work extends React.Component{
	constructor(props){
		super(props);

		
		this.work_url=DConst.URL+DConst.WorkPath+'?'+DConst.Token+'&status=1&sort_order=DESC&columns_show=title_en,title_ch,year,thumb_image';
		this.filter_url=DConst.URL+DConst.TypePath+'?'+DConst.Token;
		this.work_type_url=DConst.URL+DConst.WorkTypePath+'?'+DConst.Token;
		this.state={
			'filter':{
				'year':[],
				'type':[]
			}
		};
		


		this.loadFilter=this.loadFilter.bind(this);
		this.loadWork=this.loadWork.bind(this);
		this.loadWorkTypeJunction=this.loadWorkTypeJunction.bind(this);

		this.applyFilter=this.applyFilter.bind(this);
		this.toggleFilter=this.toggleFilter.bind(this);


		this.loadFilter();

	}
	loadFilter(){

		console.log("load filter....");

		$.ajax({
			url:this.filter_url,
			success: function(data){								

				var filter_=this.state.filter;
				filter_.type=data.rows;
				this.setState({filter:filter_});
				console.log("finish load filter: ");
				console.log(filter_);

				this.loadWork();

			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});
	}
	loadWork(){

		console.log("load work....");
		$.ajax({
			url:this.work_url,
			dataType:'json',
			cache:false,
			success: function(data){
				

				//retreive year
				var arr_=[];
				for(var val in data.rows){
					var y=data.rows[val].year;
					if(!arr_.includes(y)) arr_.push(y);
				}		
				var filter_=this.state.filter;
				var year_=arr_.map(function(val,index){
					return {id:val, text:val};
				});
				filter_.year=year_;				
				console.log("finish load work....");
				console.log(data.rows);

				this.setState({data:data.rows,filter:filter_});
				this.loadWorkTypeJunction();

			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});
	}
	loadWorkTypeJunction(){

		console.log("load work type junction....");

		$.ajax({
			url:this.work_type_url,
			dataType:'json',
			cache:false,
			success: function(data){
				
				//this.setState({work_type:data.rows});

				let filter_=this.state.filter;
				let load_work=this.state.data;

				for(var work in load_work){				
					var id_=load_work[work].id;
					load_work[work].type=data.rows.filter(function(val){ return val.work==id_; })
												  .map(function(val){ return val.type; });				
				}
				
				this.setState({data:load_work});
				console.log("finish load work type junction....");
				console.log(load_work);

			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.url, status, err.toString());
			}.bind(this)
		});		
	}

	componentWillMount(){
        initBackgroundType(1);
  	}
	render(){
		return(
			<div className="mainContainer">
				<Title text="WORK">
		     		<WorkFilter ref="_year" name="YEAR" val={this.state.filter.year} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     		<span className="filterGap">|</span>
		     		<WorkFilter ref="_type" name="TYPE" val={this.state.filter.type} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     	</Title>
		     	<div className="content center">
					<WorkList ref="_list" data={this.state.data} type={this.state.filter.type}
							  filter_type={this.state.filter} filter_val={this.state.filter_value}/>			
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
			let type=this.props.type; 
			workNodes=this.props.data
					.filter(function(work){
						if(name=='YEAR') return work.year==val;
						if(name=='TYPE') return work.type.includes(val);
						return true;
					})
					.map(function(work,index){
						if(work.type && work.type.length>0){
							
							var t_=work.type.map(function(tid){
								var ty_=type.find(function(val){
									return val.id==tid;
								});
								return ty_.text;
							});

							// var t_=type.find(function(val){
							// 	return val.id==work.type[0];
							// });

							return(
								<WorkThumb key={work.id} work={work} index={index} type_text={t_.join(' , ')}/>				
							);
						}else return(
								<WorkThumb key={work.id} work={work} index={index} type_text={''}/>				
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
	componentDidMount(){
		
	}
	render(){
		//console.log(this.props.index);

		// var foot=(this.props.work.type)?<span className="floatBottom">{this.props.work.year}&nbsp;/&nbsp;{this.props.work.type[0]}</span>:
		// 								<span className="floatBottom">{this.props.work.year}</span>;

		return(
			<div className={this.props.index%3==2?"workItem last-in-row":"workItem"}>
			<Link to={"/work/"+this.props.work.id}>
				<div className="workThumbContainer" 
					 onMouseEnter={this.onMouseEnter}
					 onMouseLeave={this.onMouseLeave}>
					<GlitchImage ref="_img" 
							last={200.0}
							src={DConst.FilePath+this.props.work.thumb_image.name}/>
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
							<span className="floatBottom">{this.props.work.year}&nbsp;/&nbsp;{this.props.type_text}</span>
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
							<WorkFilterNode className="filterName" key={index} ref={val.text} id={val.id} text={val.text} onClick={callback}  />		
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
			<span onClick={this.setActive}>
			<GlitchText ref="_text"
					className={this.props.className}
					text={String(this.props.text)}
					id={this.props.id}
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
		this.props.onClick(this.props.id);
		this.refs._text.setActive(true);
	}
	resetActive(){
		this.refs._text.setActive(false);
	}

}