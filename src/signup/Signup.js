import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './signup.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Redirect } from 'react-router-dom'

const axios = require('axios');
const bcrypt = require('bcryptjs');

class Signup extends Component {
    constructor(props){
        super(props);
        this.state ={
            firstname : "",
            firstnameClassName: "form-control input-md",
            lastname : "",
            lastnameClassName: "form-control input-md",
            username : "",
            usernameClassName: "form-control input-md",
            password : "",
            passwordClassName : "form-control input-md",
            passwordRepeat: "",
            passwordRepeatClassName : "form-control input-md",
            jobTitle : "",
            jobTitleClassName : "form-control input-md",
            proPic: "",
            bio : "",
            validFirstname:false,
            validLastname:false,
            validUsername:false,
            validPassword:false,
            validJobTitle:false,
            hashPass: ""
        };
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
        this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
        this.handleProPicChange = this.handleProPicChange.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }
    
    handleFirstnameChange(event){
        this.setState({
            firstname : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                firstnameClassName : "form-control input-md error",
                validFirstname:false
            })
        }else {
            this.setState({
                firstnameClassName:"form-control input-md success",
                validFirstname: true
            })
        }
    }

    handleLastnameChange(event){
        this.setState({
            lastname : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                lastnameClassName : "form-control input-md error",
                validLastname:false
            })
        }else {
            this.setState({
                lastnameClassName:"form-control input-md success",
                validLastname: true
            })
        }
    }

    handleUsernameChange(event){
        this.setState({
            username : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                usernameClassName : "form-control input-md error",
                validUsername:false
            })
        }else {
            this.setState({
                usernameClassName:"form-control input-md success",
                validUsername: true
            })
        }
        axios.get(`http://172.20.255.100:8080/IERIA/validate/${event.target.value}`)
        .then(response => {
            console.log(response.data)
            if (response.data)
                this.setState({
                    usernameClassName:"form-control input-md error",
                    validUsername: false
                })
            else
            this.setState({
                usernameClassName:"form-control input-md success",
                validUsername: true
            })
        })
        .catch(err =>{
            console.log("hello");
            console.log(err)
        })
    }

    handlePasswordChange(event){
        var hash = bcrypt.hashSync(event.target.value, 10);
        this.setState({
            password : event.target.value,
            hashPass: hash
        });
        if(event.target.value == ""){
            this.setState({
                passwordClassName : "form-control input-md error",
                passwordRepeatClassName:"form-control input-md error",
                validPassword:false
            })
        }else {
            if (event.target.value != this.state.passwordRepeat){
                this.setState({
                    passwordClassName:"form-control input-md error",
                    passwordRepeatClassName:"form-control input-md error",
                    validPassword: false 
                })
            }
            else{
                this.setState({
                    passwordClassName:"form-control input-md success",
                    passwordRepeatClassName:"form-control input-md success",
                    validPassword: true
                })
            }
        }
    }

    handlePasswordRepeatChange(event){
        this.setState({
            passwordRepeat : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                passwordClassName : "form-control input-md error",
                passwordRepeatClassName:"form-control input-md error",
                validPassword:false
            })
        }else if(event.target.value != this.state.password) {
            this.setState({
                passwordClassName : "form-control input-md error",
                passwordRepeatClassName:"form-control input-md error",
                validPassword:false
            })
        }else {
            this.setState({
                passwordClassName : "form-control input-md success",
                passwordRepeatClassName:"form-control input-md success",
                validPassword:true
            })
        }
    }

    handleJobTitleChange(event){
        this.setState({
            jobTitle : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                jobTitleClassName : "form-control input-md error",
                validJobTitle:false
            })
        }else {
            this.setState({
                jobTitleClassName:"form-control input-md success",
                validJobTitle: true
            })
        }
    }

    handleProPicChange(event){
        this.setState({
            proPic : event.target.value
        });
    }

    handleBioChange(event){
        this.setState({
            bio : event.target.value
        });
    }

    submitForm(event) {
        event.preventDefault()
        console.log("*************<<<<<<<<<")
        axios.post('http://172.20.255.100:8080/IERIA/signup', null,
        {
            params: {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                username: this.state.username,
                password: this.state.hashPass,
                title: this.state.jobTitle,
                imageLink: this.state.proPic,
                bio: this.state.bio
            }
        })
          .then(function (response) {
            console.log(response);
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
            <button className="btn btn-lg btn-info btn-block" type="submit"
                    disabled={!this.state.validUsername || !this.state.validPassword
                        || !this.state.validFirstname || !this.state.validLastname || !this.state.jobTitle} 
                    >ثبت</button>
        ));

        return (
            <React.Fragment>
                <Header otherPages = {
                    {
                        "ورود" : "#/login"
                    }
                }/>
                {this.renderRedirect()}
                <div className="shadow-sm centered-form center-block">
                    <div className="container form-con col-md-7 col-md-offset-3">
                    <form className="form-horizontal font" id="signup" onSubmit={($event) => this.submitForm($event)}>
                    <fieldset>
                    <legend className="text-center">ثبت نام</legend>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="name" className="float-right"><b>نام</b></label>
                            <input className={this.state.firstnameClassName} id="FirstName" name="firstinput" placeholder="نام" type="text" onChange={this.handleFirstnameChange} required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="lastname" className="float-right"><b>نام خانوادگی</b></label>
                            <input className={this.state.lastnameClassName} id="LastNmae" name="lastnametinput" placeholder="نام خانوادگی" type="text" onChange={this.handleLastnameChange} required/>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="username" className="float-right"><b>نام کاربری</b></label>
                            <input className={this.state.usernameClassName} id="textinput" name="textinput" placeholder="نام کاربری" type="text" onChange={this.handleUsernameChange} required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="password" className="float-right"><b>رمز</b></label>
                            <input className={this.state.passwordClassName} id="passwordinput" name="passwordinput" placeholder="رمز" type="password" onChange={this.handlePasswordChange} required/>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="repeat" className="float-right"><b>تکرار رمز</b></label>
                            <input className={this.state.passwordRepeatClassName} id="Repeatinput" name="Repeatinput" placeholder="تکرار رمز" type="password" onChange={this.handlePasswordRepeatChange}  required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="title" className="float-right"><b>عنوان شغلی</b></label>
                            <input className={this.state.jobTitleClassName} id="Repeatinput" name="JobTitle" placeholder="عنوان شغلی" type="text" onChange={this.handleJobTitleChange} required/>
                    </div>
                    </div>
                    <div className="form-group shadow-sm">
                        <label for="link" className="float-right"><b>لینک عکس</b></label>
                        <input className="form-control input-md" id="Repeatinput" name="ProfileLink" placeholder="'لینک' عکس پروفایل" type="text" onChange={this.handleProPicChange} required/>
                    </div>
                    <div className="form-group shadow-sm">
                        <label for="bio" className="float-right"><b>بایو</b></label>
                        <textarea className="form-control input-md" form="signup" name="Bio" placeholder="بیو" onChange={this.handleBioChange}></textarea>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" checked="false" name="remember" className="remember-me"/> مرا به خاطر بسپار
                        </label>
                    </div>
                    <Button />
                    </fieldset>
                    </form>
                    </div>
                </div>
                <div id="demo" className="carousel slide slideshow center-fit" data-ride="carousel">
                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="image" src={require("../common/755-11.jpg")} alt="ssh1"/>
                        </div>
                        <div className="carousel-item">
                            <img className="image" src={require("../common/992-11.jpg")} alt="ssh2"/>
                        </div>
                        <div className="carousel-item">
                            <img className="image" src={require("../common/2304-11.jpg")} alt="ssh3"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev on-top" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next on-top" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
                <Footer />
	        </React.Fragment>
        );
    }
}

export default Signup;