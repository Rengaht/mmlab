import React from 'react'
import WorkThumb from './work_thumb'
import FadeReveal from './fade_reveal'
import * as DConst from '../request_constants'

var cachedRelatedData;

export default class RelateWork extends React.Component{
	constructor(props){
		super(props);
		this.state={};

		this.loadData=this.loadData.bind(this);
		this.loadRelated=this.loadRelated.bind(this);
	}
	loadData(){
		
		if(cachedRelatedData){
			this.loadRelated(cachedRelatedData);

		}else{
			//load related item by id		
			let url=DConst.URL+DConst.WorkPath+'/?'+DConst.Token+'&status=1&sort_order=DESC&columns_show=title_en,title_ch,thumb_image';
			// let url="data/work.json";	
			
			$.ajax({
				url:url,
				dataType:'json',
				cache:false,
				success: function(data){
					cachedRelatedData=data;		
					this.loadRelated(data);

				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.url, status, err.toString());
				}.bind(this)
			});
		}

	}
	loadRelated(data){

		var id_=this.props.id;
		var total_=data.rows.length;
		var this_=data.rows.findIndex(function(ele,index){
			return ele.id==id_;
		});

		var relate_work=[];
		for(var i=1;i<=3;++i){
			relate_work.push(data.rows[(this_+i)%total_]);
		}
		this.setState({work:relate_work});

	}
	componentDidMount(){
		this.loadData();		
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
			<FadeReveal className="AWorkRelated">
				<div className="more">More Projects</div>
				{relateNodes}
			</FadeReveal>
		);
	}
}