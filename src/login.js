import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            username : "",
            usernameClassName: "form-group has-warning",
            password : "",
            passwordClassName : "form-group has-warning",
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
                usernameClassName : "form-group has-warning",
                validUsername:false
            })
        }else {
            this.setState({
                usernameClassName:"form-group has-success",
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
                passwordClassName : "form-group has-warning",
                validPassword:false
            })
        }else {
            this.setState({
                passwordClassName:"form-group has-success",
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
            <button className="btn btn-lg btn-success btn-block" disabled={!this.state.validUsername || !this.state.validPassword} onClick={()=> this.submitForm(history)}> Login</button>
        ));

        return (  
            <div>
                <div id="page-wrapper">
                    <div className="row">
                        <div className="panel col-md-4 mx-auto">
                            <div className="panel-heading">
                                <h2>ثبت نام</h2>
                            </div>
                            <div className="panel-body">
                                <div>
                                    <div>
                                        <div className={this.state.usernameClassName}>
                                            <label>Username</label>
                                            <input className="form-control" name="username"   onChange={this.handleUsernameChange} placeholder="Username"/>
                                        </div>
                                        <div className={this.state.passwordClassName}>
                                            <label>Password</label>
                                            <input  className="form-control" name="password" onChange={this.handlePasswordChange} type="password" placeholder="Password"/>
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
        );
    }
}

export default Login;
