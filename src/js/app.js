import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

import Main from './pages/main'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Blog from './pages/blog'
import Work from './pages/work'
import AWork from './pages/awork'




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