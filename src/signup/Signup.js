import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import './signup.css'
import Header from '../common/Header'
import Footer from '../common/Footer'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state ={
            firstname : "",
            firstnameClassName: "form-group has-warning",
            lastname : "",
            lastnameClassName: "form-group has-warning",
            username : "",
            usernameClassName: "form-group has-warning",
            password : "",
            passwordClassName : "form-group has-warning",
            passwordRepeat: "",
            passwordRepeatClassName : "form-group has-warning",
            jobTitle : "",
            jobTitleClassName : "form-group has-warning",
            proPic: "",
            proPicClassName: "form-group has-warning",
            bio : "",
            bioClassName : "form-group has-warning",
            validFirstname:false,
            validLastname:false,
            validUsername:false,
            validPassword:false,
            validJobTitle:false
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
    }
    
    handleFirstnameChange(event){
        this.setState({
            firstname : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                firstnameClassName : "form-group has-warning",
                validFirstname:false
            })
        }else {
            this.setState({
                firstClassName:"form-group has-success",
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
                lastnameClassName : "form-group has-warning",
                validLastname:false
            })
        }else {
            this.setState({
                lastnameClassName:"form-group has-success",
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
        if(event.target.value == "" || event.target.value != this.state.passwordRepeat){
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

    handlePasswordRepeatChange(event){
        this.setState({
            passwordRepeat : event.target.value
        });
        if(event.target.value == "" || event.target.value != this.state.password){
            this.setState({
                passwordRepeatClassName : "form-group has-warning",
                validPasswordRepeat:false
            })
        }else {
            this.setState({
                passwordRepeatClassName:"form-group has-success",
                validPasswordRepeat: true
            })
        }
    }

    handleJobTitleChange(event){
        this.setState({
            jobTitle : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                jobTitleClassName : "form-group has-warning",
                validJobTitle:false
            })
        }else {
            this.setState({
                jobTitleClassName:"form-group has-success",
                validJobTitle: true
            })
        }
    }

    handleProPicChange(event){
        this.setState({
            proPic : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                proPicClassName : "form-group has-warning",
                validProPic:false
            })
        }else {
            this.setState({
                proPicClassName:"form-group has-success",
                validProPic: true
            })
        }
    }

    handleBioChange(event){
        this.setState({
            bio : event.target.value
        });
        if(event.target.value == ""){
            this.setState({
                bioClassName : "form-group has-warning",
                validBio:false
            })
        }else {
            this.setState({
                bioClassName:"form-group has-success",
                validBio: true
            })
        }
    }

    submitForm() {
        const axios = require('axios');
        axios.put('/user', {
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
                        "ورود" : "#/login"
                    }
                }/>
                <div className="shadow-sm centered-form center-block">
                    <div className="container form-con col-md-7 col-md-offset-3">
                    <form className="form-horizontal font" id="signup">
                    <fieldset>
                    <legend className="text-center">ثبت نام</legend>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="name" className="float-right"><b>نام</b></label>
                            <input className="form-control input-md" id="FirstName" name="firstinput" placeholder="نام" type="text" required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="lastname" className="float-right"><b>نام خانوادگی</b></label>
                            <input className="form-control input-md" id="LastNmae" name="lastnametinput" placeholder="نام خانوادگی" type="text" required/>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="username" className="float-right"><b>نام کاربری</b></label>
                            <input className="form-control input-md" id="textinput" name="textinput" placeholder="نام کاربری" type="text" required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="password" className="float-right"><b>رمز</b></label>
                            <input className="form-control input-md" id="passwordinput" name="passwordinput" placeholder="رمز" type="password"  required/>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="form-group shadow-sm col-md-6">
                            <label for="repeat" className="float-right"><b>تکرار رمز</b></label>
                            <input className="form-control input-md" id="Repeatinput" name="Repeatinput" placeholder="تکرار رمز" type="password"  required/>
                        </div>
                        <div className="form-group shadow-sm col-md-6">
                            <label for="title" className="float-right"><b>عنوان شغلی</b></label>
                            <input className="form-control input-md" id="Repeatinput" name="JobTitle" placeholder="عنوان شغلی" type="text" required/>
                    </div>
                    </div>
                    <div className="form-group shadow-sm">
                        <label for="link" className="float-right"><b>لینک عکس</b></label>
                        <input className="form-control input-md" id="Repeatinput" name="ProfileLink" placeholder="'لینک' عکس پروفایل" type="text" required/>
                    </div>
                    <div className="form-group shadow-sm">
                        <label for="bio" className="float-right"><b>بایو</b></label>
                        <textarea className="form-control input-md" form="signup" name="Bio" placeholder="بیو"></textarea>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" checked="checked" name="remember" className="remember-me"/> مرا به خاطر بسپار
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