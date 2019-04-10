import React, { Component } from 'react';
import './user_profile.css'

class User extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
        this.state = {loaded: false, skills: [], login: false, id: params.userId, hover: {enable: false, name: "", class: ""}}
        this.fetchData = this.fetchData.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    fetchData(){
        const axios = require('axios');
		axios.get(`http://localhost:8081/IERIA/user/${this.state.id}`)
    	.then(({ data: user }) => {
      		this.setState({ user });
      		this.setState({loaded: true});
      		if(this.state.id == '1'){
	        	this.setState({login: true})
	        }
	        console.log(this.state)
    	}).catch(error => this.setState({ error, loaded: true }));
    }

    componentDidMount(){
		this.fetchData()
    }

    hoverOn(keyName){
    	var endorsed = this.state.user.skills[keyName].endorsers.find(function(element) {
							return element == '1'; // 1 is login user 
							})
    	this.setState({hover: {enable: true, name: keyName, endorsed: endorsed, class: "badge badge-success ml-1 my-0 font py-1"}})
    	console.log(keyName)
    }

    hoverOff(keyName){ 
    	this.setState({hover: {enable: false, name: "", class: ""}})
    }

    handleClick(keyName){
    	const axios = require('axios');
    	console.log('onClick')
    	if(this.state.hover.endorsed) {
    		return
    	} else if(this.state.login){
			axios.delete(`http://localhost:8081/IERIA/skill/${this.state.id}/${keyName}`)
	    	.then(({ data: user }) => {
	      		this.setState({ user });
	      		this.setState({loaded: true});
	      		if(this.state.id == '1'){
		        	this.setState({login: true})
		        }
		        console.log(this.state)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	} else {
			axios.post(`http://localhost:8081/IERIA/skill/${this.state.id}/${keyName}/endorse`)
	    	.then(({ data: user }) => {
	      		this.setState({ user });
	      		this.setState({loaded: true});
	      		if(this.state.id == '1'){
		        	this.setState({login: true})
		        }
		        console.log(this.state)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	}
    }

	render() {
		console.log(this.state)
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
	                                {this.state.user.firstName + ' ' + this.state.user.lastName}
	                            </li>
	                            <li class="nickname">
	                                {this.state.user.jobTitle}
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
	                {this.state.login ?(
	                <div class="row">
			            <div class="col-12">
			                <div class="float-right">
			                    <div class="d-flex align-items-baseline mr-4">
			                    	<div class="description_skills font mr-1">
			                    		<b>
			                            	مهارت ها:
			                            </b>
			                        </div>
			                        <div class="card bg-light pl-1 mr-2 shadow-sm px-1 py-1">
			                            <form action="" method="" class="white_bar">
			                                <select name="" class="bg-light description_skills font pl-5 py-1">
			                                    <option value="-- انتخاب مهارت --">-- انتخاب مهارت --</option>
			                                    <option value="CSS" dir="ltr">CSS</option>
			                                    <option value="C++" dir="ltr">C++</option>
			                                </select>
			                                <button class="btn btn-primary description_skills font mr-1">افزودن مهارت</button>
			                            </form>
			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
			        ):(null)}
	                <div class="row font float-left ml-4">
	                    {Object.keys(this.state.user.skills).map((keyName, i) => (
							<div id={keyName} class="col-auto">
	            				<div class="bg-white shadow-sm px-1 font rounded-top rounded-bottom">
		            				<button class="btn btn-defualt btn-link" onClick={() => this.handleClick(keyName)}>
			            				<span class={(this.state.hover.enable && this.state.login&& keyName == this.state.hover.name) ? "badge badge-danger ml-1 my-0 font py-1"
			            				: !(this.state.user.skills[keyName].endorsers.find(function(element) {return element == '1'; // 1 is login user 
										}))?(this.state.hover.enable && keyName == this.state.hover.name)?this.state.hover.class:"badge blue ml-1 my-0 font py-1 text-info"
										:"badge badge-success ml-1 my-0 font py-1"} onMouseEnter={() => this.hoverOn(keyName)} onMouseLeave={() => this.hoverOff(keyName)}>			
											{(this.state.hover.enable && this.state.login && keyName == this.state.hover.name) ? "-" :(!this.state.hover.endorsed && this.state.hover.enable
											&& keyName == this.state.hover.name)?"+":this.state.user.skills[keyName].point}
										</span>
									</button>
									{keyName}
								</div>
							</div>  
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