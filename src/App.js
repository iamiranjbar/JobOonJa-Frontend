import React, { Component } from 'react';
import { Router, Link, Route} from 'react-router-dom'
import { createHashHistory } from 'history'
import Login from "./login"
import User from './user/User'

class App extends Component {
    constructor(props){
        super(props); 
    }
    
    render() {
        return (
            <Router history = {createHashHistory()}>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/user" component={User}/>
                <Route exact path="/" component={Home}/>
            </Router>
        );
    }
}
class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Devil May Cry</Link>
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div id="page-wrapper">
                    <div className="row">
                        <div className="panel">
                            <div className="panel-heading">
                                <h2>Main Page</h2>
                            </div>
                            <div className="panel-body ">
                                <div className="col-md-4">
                                    <div>
                                        <div className="form-group">
                                            <ul role="nav">
                                                <li><Link to="/Login"> Login</Link></li>
                                                <li><Link to="/SignUp"> SignUp</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default App;