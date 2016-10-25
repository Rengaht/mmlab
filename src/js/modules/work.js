import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {Title,CopyRight} from './title'
import GlitchImage from './glitch_image'
import GlitchText from './glitch_text'
import WorkThumb from './work_thumb'
import WorkFilter from './work_filter'

import * as DConst from '../request_constants'
import {RouteTransition} from 'react-router-transition'
import {TransitionMotion,spring} from 'react-motion'


export default class Work extends React.Component{
	constructor(props){
		super(props);

		
		// this.work_url=DConst.URL+DConst.WorkPath+'?'+DConst.Token+'&status=1&sort_order=DESC&columns_show=title_en,title_ch,year,thumb_image';
		// this.filter_url=DConst.URL+DConst.TypePath+'?'+DConst.Token;
		// this.work_type_url=DConst.URL+DConst.WorkTypePath+'?'+DConst.Token;

		this.work_url='data/work.json';
		this.filter_url='data/type.json';
		this.work_type_url='data/work_type.json';


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
			<div>	     	
		     	<div className="content center">
					<WorkList ref="_list" data={this.state.data} type={this.state.filter.type}
							  filter_type={this.state.filter} filter_val={this.state.filter_value}/>			
			 	</div>
			 	<div className="filter">
			 		<WorkFilter ref="_all" name="ALL" filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
			 		<WorkFilter ref="_year" name="YEAR" val={this.state.filter.year} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     		<WorkFilter ref="_type" name="TYPE" val={this.state.filter.type} filterHandler={this.applyFilter} showFilter={this.toggleFilter}/>
		     	</div>
		     	<CopyRight/>		     	
		     	
		     	<RouteTransition
		     		pathname={this.props.location.pathname}
					atEnter={{opacity:0,scale:0}}
					atLeave={{opacity:0,scale:0}}
					atActive={{opacity:1,scale:1}}
					mapStyles={styles=>({opacity:styles.opacity,
									visibility:'visible',
									background:'black'})}	
					className="AWorkContainer"
					>
		     	{this.props.children}
		     	</RouteTransition>
     		</div>
			
		);
	}
	toggleFilter(name){
		if(name!='TYPE'){
			this.refs._type.resetActive();
			this.refs._type.toggleShow(false);	
		} 
		if(name!='YEAR'){
			this.refs._year.resetActive(); 	
			this.refs._year.toggleShow(false);	
		} 
		if(name=='ALL') this.applyFilter('ALL','ALL');
		// this.applyFilter('','');
	}
	applyFilter(name,val){


		
		if(name!='TYPE') this.refs._type.resetActive();
		if(name!='YEAR') this.refs._year.resetActive(); 
		//console.log("apply filter! "+name+'  '+val);
		this.refs._list.applyFilter(name,val);
	}

}
class WorkList extends React.Component{
	constructor(props){
		super(props);
		this.state={
			'name':'ALL',
			'val':'ALL'
		};
		this.showNodes=[];
		
		this.willLeave=this.willLeave.bind(this);
		this.willEnter=this.willLeave.bind(this);
		this.createThumb=this.createThumb.bind(this);
		this.getStlyes=this.getStlyes.bind(this);
		this.getDefaultStyles=this.getDefaultStyles.bind(this);
	}
	createThumb(work_,index_){
		var t_=[];
		if(work_.type){
			let type=this.props.type; 
		 	t_=work_.type.map(function(tid){
								var ty_=type.find(function(val){
									return val.id==tid;
								});
								return ty_.text;
							});
		 }

		return (<WorkThumb key={work_.id} ref={work_.id}
							work={work_} index={index_} type_text={t_.join(' , ')}/>);
	}
	getStlyes(work_,index_){
		return[{
			key:index_.toString(),
			style:{opacity:spring(1)},
			data:this.createThumb(work_)
		}];
	}
	getDefaultStyles(work_,index_){
		return[{
			key:index_.toString(),
			style:{opacity:0},
			data:this.createThumb(work_)
		}];
	}
	willLeave(){
		console.log("thumb leave");
		return{opacity:spring(0)};
	}
	willEnter(){
		console.log("thumb enter");
		return{opacity:spring(1)};	
	}
	
	render(){		
		var workNodes=[];
		if(this.props.data!==undefined){
			let name=this.state.name;
			let val=this.state.val;
			
			let getStlyes=this.getStlyes;
			let getDefaultStyles=this.getDefaultStyles;
			let willLeave=this.willLeave;
			let willEnter=this.willEnter;

			let createThumb=this.createThumb;


			let showNodes=this.props.data
					.filter(function(work){
						if(name=='null') return false;
						if(name=='YEAR') return work.year==val;
						if(name=='TYPE') return work.type.includes(val);
						return true;
					});
			this.showNodes=showNodes;		

			workNodes=showNodes.map(function(work,index){
						return (<div className="workItem" key={index}>
									<div>
									{createThumb(work,index)}
									</div>
								</div>);			
			});
			
		}
		return(
			<div className="workList">
				{workNodes}
			</div>
		);
	}
	applyFilter(name,val){
		
		if(name==this.state.name && val==this.state.val) return;

		//hide all
		for(var work in this.showNodes){
			this.refs[this.showNodes[work].id].hide();
			// ReactDOM.findDOMNode(this.refs[this.showNodes[work].id]).classList.remove('show');
		}


		let this_=this;
		setTimeout(function(){
			//console.log(name+' '+val);
			this_.setState({'name':name,'val':val});	
		},350);		
	}
}


