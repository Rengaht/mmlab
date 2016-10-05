import React from 'react'
import Title from './title'
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps'

export default class Contact extends React.Component{
  constructor(props){
		super(props);
	  	this.state={
	  		'markers':[
	  			{
		            position: {
		              lat: 25.047692,
		              lng: 121.566613
		            },
		            defaultAnimation: 2,
		            key: Date.now()
	          	}
	        ]
	  	};
  }
  render() {
    return(
    	<div className="mainContainer">
     	<Title text="CONTACT">
     		<a href="https://vimeo.com/merlinsmustache" target="_blank">
     			<img className="socialLink" src="image/vimeo.png"/>
     		</a>
     		<a href="https://www.facebook.com/merlin.mustache/" target="_blank">
     		<img className="socialLink" src="image/facebook.png"/>
     		</a>
     		<a href="https://www.youtube.com/channel/UCSIxHgMr4UvZRsG5hWoVolQ" target="_blank">
     		<img className="socialLink" src="image/youtube.png"/>
     		</a>
     	</Title>
     	<div className="content center">
	     	<GoogleMapLoader
		        containerElement={
		          <div
		            className="fullImage contactMap"
		          />
		        }
		        googleMapElement={
		          <GoogleMap
		            defaultZoom={30}
		            defaultCenter={{ lat: 25.047692,lng: 121.566613}}	
		            disableDefaultUI={true}	            
		          >
		            {this.state.markers.map((marker, index) => {
		              return (
		                <Marker {...marker}/>
		              );
		            })}
		          </GoogleMap>
		        }
		     />

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