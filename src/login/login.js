import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './login.css'
import Header from '../common/Header'
import Footer from '../common/Footer'

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username : "",
            usernameClassName: "form-control ltr-dir",
            password : "",
            passwordClassName : "form-control ltr-dir",
            validUsername:false,
            validPassword:false,
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    
    handleUsernameChange(event){
        this.setState({
            username : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                usernameClassName : "form-control ltr-dir error",
                validUsername:false
            })
        }else {
            this.setState({
                usernameClassName:"form-control ltr-dir success",
                validUsername: true
            })
        }
    }

    handlePasswordChange(event){
        this.setState({
            password : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                passwordClassName : "form-control ltr-dir error",
                validPassword:false
            })
        }else {
            this.setState({
                passwordClassName:"form-control ltr-dir success",
                validPassword: true 
            })
        }
    }

    submitForm() {
        const axios = require('axios');
        axios.post('/user', {
            username: this.state.username,
            lastName: this.state.password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        const Button = withRouter(({ history}) => (
            <button className="btn btn-lg btn-info btn-block" disabled={!this.state.validUsername || !this.state.validPassword} onClick={()=> this.submitForm(history)}>ثبت</button>
        ));

        return (
            <React.Fragment>
                <Header otherPages = {
                    {
                        "ثبت نام" : "#/signup"
                    }
                }/>
                <div className="main">
                    {/* <div id="demo" className="carousel slide slideshow center-fit" data-ride="carousel">
                        <ul class="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" class="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                        </ul>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img className="image" src={require("../common/755-11.jpg")} alt="ssh1"/>
                            </div>
                            <div className="carousel-item">
                                <img className="image" src={require("../common/992-11.jpg")} alt="ssh2"/>
                            </div>
                            <div className="carousel-item">
                                <img className="image" src={require("../common/2304-11.jpg")} alt="ssh3"/>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>  */}
                    <div id="page-wrapper" className="upper-form">
                        <div className="row">
                            <div className="panel col-md-4 mx-auto top-element">
                                <div className="panel-heading text-center">
                                    <h4>ورود</h4>
                                </div>
                                <div className="panel-body">
                                    <div>
                                        <div>
                                            <div className="form-group has-success">
                                                <label>Username</label>
                                                <input className={this.state.usernameClassName} name="username"   onChange={this.handleUsernameChange} placeholder="Username"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input  className={this.state.passwordClassName} name="password" onChange={this.handlePasswordChange} type="password" placeholder="Password"/>
                                            </div>
                                            <div className="form-group">
                                            <Button/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
	        </React.Fragment>
        );
    }
}

export default Login;