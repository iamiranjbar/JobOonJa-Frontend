import React, { Component } from 'react';
import Skill from '../common/Skill'
import BlueBar from '../common/BlueBar'
import './user_profile.css'

class User extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
		this.state = {
			loaded: false,
			login: false, 
			id: params.userId
		}
        this.fetchData = this.fetchData.bind(this);
        this.updateUserData = this.updateUserData.bind(this);
    }

    fetchData(){
        const axios = require('axios'); 
		axios.get(`http://localhost:8081/IERIA/user/${this.state.id}`)
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
    }

    componentDidMount() {
		this.fetchData()
    }

    updateUserData(userData) {
    	this.setState({ user: userData});
    }

	render() {
	    return (
	    	<React.Fragment>
	        <div className="white_bar">
	        <main className="white_bar">
	            <BlueBar/>
	            {this.state.loaded ?(
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
			                        <div className="card bg-light pl-1 mr-2 shadow-sm px-1 py-1">
			                            <form action="" method="" className="white_bar">
			                                <select name="" className="bg-light description_skills font pl-5 py-1">
			                                    <option value="-- انتخاب مهارت --">-- انتخاب مهارت --</option>
			                                    <option value="CSS" dir="ltr">CSS</option>
			                                    <option value="C++" dir="ltr">C++</option>
			                                </select>
			                                <button className="btn btn-primary description_skills font mr-1">افزودن مهارت</button>
			                            </form>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			        ):(null)}
	                <div className="row font float-left ml-4">
	                    {Object.keys(this.state.user.skills).map((keyName, i) => (
							<Skill skillData={this.state.user.skills[keyName]}
							userData={{id: this.state.id, login: this.state.login, hoverEnable: true}}
							updateUserData={this.updateUserData}/>  
						))}
	                </div>
	            </div>
	            ):(<p>loading...</p>)}
	        </main>
	        </div>
	        </React.Fragment>
	    );
	}
}

export default User;