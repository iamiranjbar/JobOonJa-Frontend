import React, { Component } from 'react';
import './user_profile.css'

class User extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
		this.state = {
			loaded: false, 
			skills: [], 
			login: false, 
			id: params.userId, 
			hover: {
				enable: false, 
				name: "", 
				class: ""
			}
		}
        this.fetchData = this.fetchData.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.prepareSpan = this.prepareSpan.bind(this);
    }

    fetchData(){
        const axios = require('axios'); 
		axios.get(`http://localhost:8080/user/${this.state.id}`)
		.then(response => {
			// console.log(response)
			this.setState({ user : response.data });
      		this.setState({loaded: true});
      		if(this.state.id == '1'){
	        	this.setState({login: true})
	        }
	        // console.log(this.state)
		})
		.catch(err => {
			console.log(err)
		})
    }

    componentDidMount(){
		this.fetchData()
    }

	prepareSpan(keyName) {
		var spanClass = "";
		if (this.state.id  == "1" && this.state.login) {
			spanClass = "badge blue ml-1 my-0 font py-1 text-info"
			if (this.state.hover.enable)
				spanClass = "badge badge-danger ml-1 my-0 font py-1"
		} else {
			spanClass = "badge blue ml-1 my-0 font py-1 text-info"
			if (this.state.user.skills[keyName].endorsers.find(
				function(element) {
					return element === '1'; // 1 is login user 
				}) || this.state.hover.enable){
				spanClass = "badge badge-success ml-1 my-0 font py-1"
				}
		}
		return spanClass
	}

    hoverOn(keyName){
    	var endorsed = this.state.user.skills[keyName].endorsers.find(
						function(element) {
							return element == '1'; // 1 is login user 
						})
		
    	this.setState({
			hover: {
				enable: true, 
				name: keyName,
				endorsed: endorsed, 
				class: ""
			}
		})
    	// console.log(keyName)
    }

    hoverOff(keyName){ 
    	this.setState({
			hover: {
				enable: false, 
				name: "", 
				class: ""
			}
		})
    }

    handleClick(keyName){
    	const axios = require('axios');
    	console.log('onClick')
    	if(this.state.hover.endorsed) {
    		return
    	} else if(this.state.login){
			axios.delete(`http://localhost:8080/skill/${this.state.id}/${keyName}`)
	    	.then(response => {
				  this.setState({ user: response.data,
								loaded: true });
	      		if(this.state.id == '1'){
		        	this.setState({login: true})
		        }
		        // console.log(this.state)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	} else {
			axios.post(`http://localhost:8080/skill/${this.state.id}/${keyName}/endorse`)
	    	.then(response => {
				this.setState({ user: response.data,
							  loaded: true });
				if(this.state.id == '1'){
				  this.setState({login: true})
			  }
			  // console.log(this.state)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	}
    }

	render() {
		// console.log(this.state)
	    return (
	    	<React.Fragment>
	        <div className="white_bar">
	        <main className="white_bar">
	            <div className="container-fluid blue blue_bar">
	            </div>
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
							<div id={keyName} className="col-auto">
	            				<div className="bg-white shadow-sm px-1 font rounded-top rounded-bottom">
		            				<button className="btn btn-defualt btn-link" onClick={() => this.handleClick(keyName)}>
										<span 
											className={this.prepareSpan(keyName)} 
											onMouseEnter={() => this.hoverOn(keyName)} 
											onMouseLeave={() => this.hoverOff(keyName)}>			
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