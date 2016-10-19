import React from 'react'
import Title from './title'
import GoogleMap from 'google-map-react';
import GlitchText from './glitch_text'

export default class Contact extends React.Component{
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
  }
  componentWillMount(){
	initBackgroundType(2);	
  }
  render() {
    return(
    	<div className="mainContainer">    	            
     	<Title text="CONTACT">
     		<a href="https://vimeo.com/merlinsmustache" target="_blank">
     			<GlitchText className="socialLink" 
     						img_src="image/vimeo.png"
     						hover={true}
     						amp={1.0}
							line_height={3.0}/>
     		</a>
     		<a href="https://www.facebook.com/merlin.mustache/" target="_blank">
     			<GlitchText className="socialLink" 
     						img_src="image/facebook.png"
     						hover={true}
     						amp={1.0}
							line_height={3.0}/>
     		</a>
     		<a href="https://www.youtube.com/channel/UCSIxHgMr4UvZRsG5hWoVolQ" target="_blank">
     			<GlitchText className="socialLink" 
     						img_src="image/youtube.png"
     						hover={true}
     						amp={1.0}
							line_height={3.0}/>
     		</a>
     	</Title>
     	<div className="content center">
     		<div className="fullImage contactMap">
	     		<GoogleMap
	        		defaultCenter={{lat:25.047651,lng:121.565632}}
	        		defaultZoom={18}
	        		options={this.map_options}>
	        		<MapMarker lat={this.state.position.lat} lng={this.state.position.lng}/>
	        	</GoogleMap>
	        </div>

	     	<div className="contactDetail">
	     		<div>Work with us:</div>
	     		<div>merlin.mustache@mmlab.tw</div>
	     	</div>
			
			<div className="contactDetail">
				<div>Tel:</div>
	     		<div>+886 2 8768-1100 #135</div>
	     	</div>
	     	
	     	<div className="contactDetail">
	     		<div>Address:</div>
	     		<div>11070 台北市信義區東興路45號9F</div>
	     	</div>

     	</div>
     	</div>

    );
  }
}

class MapMarker extends React.Component{
	render(){
		return (
			<div className="mapMarker">
				<GlitchText  
					img_src="image/map_logo.png"
					hover={false}
					amp={1.0}
					line_height={5.0}/>							
			</div>
		);
	}
}