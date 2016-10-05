import React from 'react'
import Title from './title'

export default React.createClass({
  render() {
    return(
    	<div className="mainContainer">
         	<Title text="ABOUT">
         		<span className="aboutTopSub">梅林鬍子實驗室</span>
         		<span className="aboutTopSub">Merlin's Mustache Lab</span>
         	</Title>
         	<div className="content center">
    	     	<img className="fullImage" src="./image/about.jpg"/>
    	     	<div className="part">
    	     	在哈利波特的魔法世界中，「梅林的鬍子」翻成麻瓜話就是"Oh my god! 這真是太驚奇" 翹鬍子實驗室相信數位現代世界的魔法。透過科技法術與心靈咒語，創造觸動人心的未來科學。跟著我們一起「梅林的鬍子」吧!
    	     	</div>
    	     	<div className="part">
    	     	"Merlin's Mustache" is a twist origin from "Merlin's Beard" in Harry Potter's magical world.
    	It means “Oh my god” putting in muggle’s words Simply to describe that something is bloody amazing.
    	Merlin’s Mustache Lab believes digital technology is the magic of modern real world. Through the wizards of technology and spells of spiritual mind, it creates future emotive science.

        Follow us to scream "Merlin's Mustache".
    	     	</div>
                <div className="part serviceTitle">服務內容 - AR/ VR/ 互動裝置</div>
                <div className="part text Chinese">在實體的世界中，透過我們對數位技術的想像拓展人們的感官經驗</div>

         	</div>
     	</div>
     )
  }
})