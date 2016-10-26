import React from 'react'
import {withRouter} from 'react-router'

import {Title,CopyRight} from '../components/title'
// import MainContainer from './main_container'

import GoogleMap from 'google-map-react';


class Contact extends React.Component{
  constructor(props){
		
		super(props);
	  	this.state={
  			position:{
	              lat: 25.047692,
	              lng: 121.566613
	        }
		};
		this.map_options={
			panControl: false,
      		mapTypeControl: false,
      		scrollwheel: true,
      		styles:[{
      			stylers:[{'saturation':-100}, 
      					 {'gamma':0.2},
      					 {'lightness':-100},
      					 {'visibility':'on'}]},
      			{featureType: "road",
				 elementType: "geometry",
				 stylers:[
				    {lightness: 50},
				    {visibility:"simplified"}
				 ]},
				{featureType: "road",
				 elementType: "labels.text.fill",
				 stylers:[
				    {lightness: 50}
				]},
				{featureType: "poi",
				 elementType: "all",
				 stylers:[
				    {visibility:'off'}
				]},
				{featureType: "landscape",
				 elementType: "geometry.stroke",
				 stylers:[
				    {lightness:100},
				    {visibility:'on'}
				]}
      		]
		};
  }
  componentDidMount(){
	this.setState({position:{lat: 25.047692,lng: 121.566613}});		
    // let main=this.refs._main;
    // this.props.route.onEnter=function(){
    //     main.enter();
    // };
    // this.props.route.onLeave=function(){
    //     main.leave();
    // };
  }
    
  componentWillMount(){
	initBackgroundType(2);	
  }
  render() {
  	 // 	<div className="contactMap">
		    //  		<GoogleMap
		    //     		defaultCenter={{lat:25.047651,lng:121.565632}}
		    //     		defaultZoom={18}
		    //     		options={this.map_options}>
		    //     		<MapMarker lat={this.state.position.lat} lng={this.state.position.lng}/>
		    //     	</GoogleMap>
		    // </div>
    return(
    	<div>    	            
	     
	    
	     	<div className="content center">
	     		<div className="contactHello">We<br/>should<br/>talk</div>
	     		<div className="contactEmail">[ merlin.mustache@mmlab.tw ]</div>
	     	    <div className="contactInfo">
	     	    	<div className="title">梅林斯行銷有限公司</div>
	     	    	<div>
			     		<div>
				     		<span>T</span>
				     		<span>02 8768-1100 #135</span>
			     		</div>
						<div>
				     		<span>A</span>
				     		<span>11070 台北市信義區東興路45號9F</span>
			     		</div>
			     		<div>
				     		<span>統一編號</span>
				     		<span>53913223</span>
			     		</div>
			     	</div>				     	
			    </div>
			    <div className="contactInfo">
	     	    	<div className="title">MERLINS'S MUSTACHE LAB</div>
	     	    	<div>
			     		<div>
				     		<span>T</span>
				     		<span>02 8768-1100 #135</span>
			     		</div>
						<div>
				     		<span>A</span>
				     		<span>9F., No.45, Dongxing Rd., Xinyi Dist., Taipei City 110, Taiwan (R.O.C)</span>
			     		</div>
			     	</div>				     	
			    </div>

			   	<img className="contactMap" src="image/map.png"/>

		     	<div className="socialLink">
		     		<div>
			     	<a href="https://vimeo.com/merlinsmustache" target="_blank">
		     			<img src="image/vimeo.png"/>
		     		</a>
		     		<a href="https://www.facebook.com/merlin.mustache/" target="_blank">
		     			<img src="image/facebook.png"/>
		     		</a>
		     		<a href="https://www.youtube.com/channel/UCSIxHgMr4UvZRsG5hWoVolQ" target="_blank">
		     			<img src="image/youtube.png"/>
		     		</a>
		     		</div>
	     		</div>
		     	
		     	 <CopyRight/>
	     	</div>
     	</div>

    );
  }
}

class MapMarker extends React.Component{
	render(){
		return (
			<div className="mapMarker">
				<img src="image/map_logo.png"/>				
			</div>
		);
		// <GlitchText  
				// 	img_src="image/map_logo.png"
				// 	hover={false}
				// 	amp={1.0}
				// 	line_height={5.0}/>							
	}
}

export default withRouter(Contact);