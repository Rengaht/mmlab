import React from 'react'
import {withRouter} from 'react-router'
import MainContainer from '../components/main_container'

class About extends React.Component{
  componentWillMount(){
        //initBackgroundType(2);
        
  }
  componentDidMount(){
        // let main=this.refs._main;
        // this.props.route.onEnter=function(){
        //     main.enter();
        // };
        // this.props.route.onLeave=function(){
        //     main.leave();
        // };
  } 
  render(){
    return(
    	<MainContainer title="about">    
           
            <div className="blurBack">
                <img src="./image/about.jpg"/>
            </div>
         	<div className="content center about">    	 
                <img src="./image/about_.jpg"/>   
                <div className="part">
                    <div className="title">梅林鬍子實驗室</div>                
        	     	<div className="text">
        	     	在哈利波特的魔法世界中，「梅林的鬍子」翻成麻瓜話就是"Oh my god! 這真是太驚奇" 翹鬍子實驗室相信數位科技是現代世界的魔法。透過科技法術與心靈咒語，創造觸動人心的未來科學。跟著我們一起「梅林的鬍子」吧!
        	     	</div>
                </div>

                <div className="part">
                    <div className="title">Merlin's Mustache Lab</div>
        	     	<div className="text">
        	     	"Merlin's Mustache" is a twist origin from "Merlin's Beard" in Harry Potter's magical world.
        	It means “Oh my god” putting in muggle’s words Simply to describe that something is bloody amazing.
        	Merlin’s Mustache Lab believes digital technology is the magic of modern real world. Through the wizards of technology and spells of spiritual mind, it creates future emotive science.

            Follow us to scream "Merlin's Mustache".
        	     	</div>
                </div>
         	</div>

     	</MainContainer>
     )
  }
}

export default withRouter(About);