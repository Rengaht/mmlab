import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,IndexRoute,useRouterHistory,applyRouterMiddleware} from 'react-router'
import { createHashHistory } from 'history'
import { useScroll } from 'react-router-scroll';

import Main from './pages/main'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Work from './pages/work'
import AWork from './pages/awork'




//import createBrowserHistory from 'history/lib/createBrowserHistory';

window._from_home_or_work=undefined;
window._global_page_count=undefined;
window._last_page=[];
window._last_page_scroll=0;

function routerUpdate(){
	//console.log(this.router.location);

	let loc_=this.router.location.pathname;
	let last_=window._last_page[window._last_page.length-1];

	console.log(last_+" -> "+loc_);

	if(loc_==last_) return;
	_last_page.push(loc_);
	

	// if(loc_.match(/(^\/work\/)(.*[0-9]$)/gm)){

	// 	loc_="/awork"
	// 	_last_page.push(loc_);

	// 	// // if(loc!=window._last_page[window._last_page]){			
	// 	// 	if(!window._global_page_count) window._global_page_count=0;
	// 	// 	window._global_page_count++;
	// 	// 	console.log("awork page: "+ window._global_page_count);			
	// 	// // }
	// }else{
	// 	_last_page.push(loc_);
	// 	// window._global_page_count=undefined;		

	// }
	
	var dest_=0;

	if(loc_==="/work") dest_=1;
	if(loc_==="/about" || loc_==="/contact") dest_=2;
	if(loc_.match(/(^\/work\/)(.*[0-9]$)/gm)){
		dest_=3;		
	} 


	
	if(last_){
		if(_Background_Type==3){
			//stop video
			let video_=document.getElementById('_YoutubeIframe');
			if(video_){
				let src_=video_.src;
				video_.src=src_;
			}
		}
		if(_Background_Type==3 && dest_==3){
			// setTimeout(function(){
				// document.body.scrollTop=0;
			// },Const.FadeOutDelay+Const.FadeOutInterval);	
			return;
		}
		endBackground();		

		setTimeout(function(){
			initBackground(dest_);
			// document.body.scrollTop=0;
		},Const.FadeOutDelay+Const.FadeOutInterval);
	}else{
		initBackground(dest_);
		// document.body.scrollTop=0;
	}
	

	
}


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render((
	<Router history={hashHistory} onUpdate={routerUpdate}
			render={applyRouterMiddleware(useScroll())}>
		<Route path="/" component={Main}>    
			
			<IndexRoute component={Home}/>
		
	    	<Route path="/contact" component={Contact}/>
	    	<Route path="/about" component={About}/>	    	
	    	
	    	<Route path="/work" component={Work}/>
	    	<Route path="/work/:id" component={AWork}/>	
    	</Route>
    	    	
	    	
  	</Router>), 
	document.getElementById('app')
);