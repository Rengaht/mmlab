import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

import Main from './modules/main'
import Home from './modules/home'
import About from './modules/about'
import Contact from './modules/contact'
import Blog from './modules/blog'
import Work from './modules/work'
import AWork from './modules/awork'




//import createBrowserHistory from 'history/lib/createBrowserHistory';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path='/' component={Main}>

      <IndexRoute component={Home} />

      <Route path='/contact' component={Contact} />
      <Route path='/about' component={About} />

      <Route path='/work' component={Work} />
      <Route path='/work/:id' component={AWork} />
    </Route>


  </Router>),
  document.getElementById('app')
);