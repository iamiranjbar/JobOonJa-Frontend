import React, { Component } from 'react';
import './user_profile.css'

class User extends Component {
	constructor(props){
        super(props);
        this.state = {loaded: false, skills: []}
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
    	const { match: { params } } = this.props;
        const axios = require('axios');
		axios.get(`http://localhost:8081/IERIA/user/${params.userId}`)
    	.then(({ data: user }) => {
      		this.setState({ user });
      		this.setState({loaded: true});
    	}).catch(error => this.setState({ error, loaded: true }));
    }

    componentDidMount(){
		this.fetchData()
    }

	render() {
		console.log(this.state.skills)
	    return (
	    	<React.Fragment>
	        <div class="white_bar">
	        <main class="white_bar">
	            <div class="container-fluid blue blue_bar">
	            </div>
	            {this.state.loaded ?(
	            <div class="container">
	                <div class="row">
	                    <div class="col-3">
	                        <div>
	                            <img class="img-thumbnail user_image_profile" src={this.state.user.profilePicURL}></img>
	                            <div class="border_on_profile_pic"></div>
	                            <div class="border_on_profile_pic_2"></div>
	                        </div>
	                    </div>
	                    <div class="col-9">
	                        <ul class="name_text font">
	                            <li class="full_name">
	                                محمدرضاکیانی
	                            </li>
	                            <li class="nickname">
	                                اعلی حضرت
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="row">
	                    <div class="col-12">
	                        <ul class="description font">
	                            <li class="description_text col-md-12">
	                            	{this.state.user.bio}
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="row font float-left ml-4">
	                    {Object.keys(this.state.user.skills).map((keyName, i) => (
							<div id={keyName} class="col-auto">
            				<div class="bg-white shadow-sm px-1 font rounded-top rounded-bottom"><span class={!(this.state.user.skills[keyName].endorsers.find(function(element) {
							return element == '1'; // 1 is login user 
							}))?"badge blue ml-1 my-0 font py-1 text-info":"badge badge-success ml-1 my-0 font py-1"}>{this.state.user.skills[keyName].point}</span>{keyName}</div></div>  
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