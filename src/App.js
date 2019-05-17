import React, { Component } from 'react';
import { Router, Link, Route} from 'react-router-dom'
import { createHashHistory } from 'history'
import Login from "./login/login"
import User from './user/User'
import Project from './project/Project'
import Home from './home/Home'
import Signup from './signup/Signup'
import Logout from './login/logout'

class App extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <Router history = {createHashHistory()}>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/Signup" component={Signup}/>
                <Route exact path="/logout" component={Logout}/>
                <Route exact path="/user/:userId" component={User}/>
                <Route exact path="/project/:projectId" component={Project}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/" component={Home}/>
            </Router>
        );
    }
}
class Dashboard extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <div id="page-wrapper">
                    <div className="row">
                        <div className="panel">
                            <div className="panel-heading">
                                <h2 className="conter-text">Main Page</h2>
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