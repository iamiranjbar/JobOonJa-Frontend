import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route} from 'react-router'
import { createHashHistory } from 'history'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
   <Router history = {createHashHistory()}>
      <Route path = "/" component = {App}/>
   </Router>
), document.getElementById('root'));

serviceWorker.unregister();
