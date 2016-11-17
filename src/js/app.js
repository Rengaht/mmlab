import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,IndexRoute,useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'

import Main from './pages/main'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Work from './pages/work'
import AWork from './pages/awork'




//import createBrowserHistory from 'history/lib/createBrowserHistory';

window._from_home_or_work=undefined;
window._global_page_count=undefined;
window._last_page=undefined;

function routerUpdate(){
	console.log(this.router.location);

	let loc=this.router.location.pathname;
	if(loc.match(/(^\/work\/)(.*[0-9]$)/gm)){
		if(loc!=window._last_page){			
			if(!window._global_page_count) window._global_page_count=0;
			window._global_page_count++;
			console.log("awork page: "+ window._global_page_count);

			window._last_page=loc;
		}
	}else{
		window._global_page_count=undefined;		
	}
	// if(!loc.match(/(^\/work\/)(.*[0-9]$)/gm)){
	// 	window._from_home_or_work=loc;
	// }

}

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render((
	<Router history={hashHistory} onUpdate={routerUpdate}>
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