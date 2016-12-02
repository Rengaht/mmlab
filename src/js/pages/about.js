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
                <img src="./image/about2.jpg"/>   
                <div className="part">
                    <div className="title">梅林鬍子實驗室</div>                
        	     	<div className="text">
        	     	“梅林的鬍子啊！”我們時常讚嘆：想像力沒有極限。<br/>
                透過數位科技的重組、編寫、創造，我們試著讓想像座落於現實！<br/><br/>
                梅林鬍子實驗室成立於2013年，由廣告代理商、程式設計師、工業設計、遊戲開發者、視覺藝術…等各種領域背景的成員組成。在這裡，我們致力進行各項創意原型開發，樂於與不同領域產生連結，將狂想實踐為創意解決方案！<br/><br/>
                我們想要透過科技，放大廣告世界的想像力，翻新說故事的方法，開發人類感官尚未觸及的領域！<br/>
                現在就跟著我們一起「梅林的鬍子」吧！
                </div>
                </div>

                <div className="part">
                    <div className="title">Merlin's Mustache Lab</div>
        	     	<div className="text">
        	     “Oh Merlin’s beard!” -  is how we praise the infinite imagination.<br/>
With reconstruction, reformation, and creation of technology, we bring imagination to reality. <br/><br/>
Merlin’s Mustache Lab was founded in 2013 with members from various fields: advertising, programming, industrial design, game development, and visual arts. We devote ourselves to invent prototypes in diverse fields, and are willing to jam with different industries for creative solutions. <br/> <br/>
We aim to amplify imagination for advertising, revitalize storytelling, and explore the unexplored human senses.  <br/>
Let’s “Wow” together!
        	     	</div>
                </div>
         	</div>

     	</MainContainer>
     )
  }
}

export default withRouter(About);