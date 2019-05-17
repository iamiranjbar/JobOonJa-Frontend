import React, { Component } from 'react';
import Skill from '../common/Skill'
import BlueBar from '../common/BlueBar'
import './user_profile.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import AddSkill from './AddSkill'
const axios = require('axios'); 

class User extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
		this.state = {
			hasJWT: false,
			token: "",
			loaded: false,
			login: false, 
			id: params.userId
		}
        this.fetchData = this.fetchData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
		this.fetchSkills = this.fetchSkills.bind(this);
		var tok = localStorage.getItem("jobOonJaToken")
        if (tok != null){
            this.setState({
                hasJWT: true,
                token: tok
            })
        }
        axios.defaults.headers.common = {'authorization': `Bearer ${this.state.token}`}
    }

    fetchData(){
		axios.get(`http://localhost:8080/user/${this.state.id}`)
		.then(response => {
			// console.log(response)
			this.setState({ user : response.data });
      		this.setState({loaded: true});
      		if(this.state.id === '1'){
	        	this.setState({login: true})
	        }
	        // console.log(this.state)
		})
		.catch(err => {
			console.log(err)
		})
		this.fetchSkills();
    }

    fetchSkills() {
    	axios.get(`http://localhost:8080/skill/${this.state.id}`)
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

	render() {
	    return (
	    	<React.Fragment>
			<Header otherPages = {{
				"حساب کاربری" : "#/user/1",
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