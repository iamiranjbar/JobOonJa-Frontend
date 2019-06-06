import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './login.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Redirect } from 'react-router-dom'

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
        this.renderRedirect = this.renderRedirect.bind(this);
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
        axios.post("http://185.166.107.169:30085/IERIA/login", {
            "Access-Control-Allow-Origin" : "*",
        'Access-Control-Request-Headers': '*'}, {
            params:{
                username: this.state.username,
                password: this.state.password
            }
          })
          .then(function (response) {
            localStorage.setItem("jobOonJaToken", response.data[0]);
            localStorage.setItem("jobOonJaUserId", response.data[1]);
            window.location.reload();
            // console.log(localStorage.getItem("jobOonJaToken"))
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    renderRedirect(){
        if (localStorage.getItem("jobOonJaToken")!=null)
            return  <Redirect to="home" />;
    }

    render() {
        const Button = withRouter(({ history}) => (
            <button className="btn btn-lg btn-info btn-block" 
            disabled={!this.state.validUsername || !this.state.validPassword} 
            onClick={()=> this.submitForm()}>ثبت</button>
        ));

        return (
            <React.Fragment>
                <Header otherPages = {
                    {
                        "ثبت نام" : "#/signup"
                    }
                }/>
                <div className="main">
                    {this.renderRedirect()}
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