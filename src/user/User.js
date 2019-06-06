import React, { Component } from 'react';
import Skill from '../common/Skill'
import BlueBar from '../common/BlueBar'
import './user_profile.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import AddSkill from './AddSkill'
import { Redirect } from 'react-router-dom'

const axios = require('axios'); 

class User extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
        var tok = localStorage.getItem("jobOonJaToken")
		this.state = {
			hasJWT: false,
			token: "",
			loaded: false,
			login: false,
			fetchError: false, 
			id: params.userId,
			hasJWT: (tok != null) ? true : false,
			token: (tok != null) ? tok : "",
			userId: localStorage.getItem("jobOonJaUserId")
		}
        this.fetchData = this.fetchData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
		this.fetchSkills = this.fetchSkills.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
        axios.defaults.headers.common = {'authorization': `Bearer ${this.state.token}`}
    }

    fetchData(){
		axios.get(`http://185.166.107.169:30085/IERIA/user/${this.state.id}`)
		.then(response => {
			// console.log(response)
			this.setState({ user : response.data });
      		this.setState({loaded: true});
      		if(this.state.id == this.state.userId){
	        	this.setState({login: true})
	        }
	        // console.log(this.state)
		})
		.catch(err => {
			console.log(err)
			this.setState({fetchError: true})
		})
		this.fetchSkills();
    }

    fetchSkills() {
    	axios.get(`http://185.166.107.169:30085/IERIA/skill/${this.state.id}`)
		.then(response => {
			this.setState({ skills : response.data });
		})
		.catch(err => {
			console.log(err)
		})	
    }

    componentDidMount() {
		this.fetchData()
    }

    updateUserData(userData) {
		console.log("*********")
		this.fetchSkills();
		this.setState({ user: userData});
		console.log(this.state.user)
    }

    renderRedirect(){
    	console.log("Redirect")
        if (this.state.fetchError == true)
            return  <Redirect to="/login" />;
        else
        	return null;
    }

	render() {
	    return (
	    	<React.Fragment>
	    	{this.renderRedirect()}
			<Header otherPages = {{
				"حساب کاربری" : "#/user/"+this.state.userId,
				"خروج" : "#/logout"
			}}/>
	        <div className="white_bar">
	        <main className="white_bar">
	            <BlueBar notHome = {true}/>
	            {(this.state.loaded && this.state.skills) ?(
	            <div className="container">
	                <div className="row">
	                    <div className="col-3">
	                        <div>
	                            <img className="img-thumbnail user_image_profile" src={this.state.user.profilePicURL}></img>
	                            <div className="border_on_profile_pic"></div>
	                            <div className="border_on_profile_pic_2"></div>
	                        </div>
	                    </div>
	                    <div className="col-9">
	                        <ul className="name_text font">
	                            <li className="full_name">
	                                {this.state.user.firstName + ' ' + this.state.user.lastName}
	                            </li>
	                            <li className="nickname">
	                                {this.state.user.jobTitle}
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	                <div className="row">
	                    <div className="col-12">
	                        <ul className="description font">
	                            <li className="description_text col-md-12">
	                            	{this.state.user.bio}
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	                {this.state.login ?(
	                <div className="row">
			            <div className="col-12">
			                <div className="float-right">
			                    <div className="d-flex align-items-baseline mr-4">
			                    	<div className="description_skills font mr-1">
			                    		<b>
			                            	مهارت ها:
			                            </b>
			                        </div>
			                        {(this.state.loaded && this.state.skills) ?
			                        	<AddSkill userId={this.state.id} skillsData={this.state.skills} updateUserData={this.updateUserData}/>
			                        	: null
			                        }
			                    </div>
			                </div>
			            </div>
			        </div>
			        ):(null)}
	                <div className="row font float-left ml-4 ltr-dir">
	                    {Object.keys(this.state.user.skills).map((keyName, i) => (
							<Skill skillData={this.state.user.skills[keyName]}
							userData={{id: this.state.id, login: this.state.login, hoverEnable: true, badgeEnable: true, alterBackground: false}}
							updateUserData={this.updateUserData}/>  
						))}
	                </div>
	            </div>
	            ):(<p>loading...</p>)}
	        </main>
	        </div>
			<Footer />
	        </React.Fragment>
	    );
	}
}

export default User;