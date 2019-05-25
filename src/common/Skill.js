import React, { Component } from 'react';
import './skill.css'

class Skill extends Component {
		constructor(props){
      super(props);
      this.state = {
        	hover: {
					enable: false,
					endorsed: false
				},
				skillData: this.props.skillData,
				userData: this.props.userData
					}
					this.hoverOn = this.hoverOn.bind(this);
					this.hoverOff = this.hoverOff.bind(this);
			this.handleClick = this.handleClick.bind(this);
			this.prepareSpan = this.prepareSpan.bind(this);
			this.prepareSpanText = this.prepareSpanText.bind(this)
			this.prepareBackground = this.prepareBackground.bind(this)
    }

    prepareSpanText() {
		var spanText = "";
		var userId = localStorage.getItem("jobOonJaUserId");
		if (this.props.userData.id  == userId && this.props.userData.login) {
			spanText = this.props.skillData.point
			if (this.state.hover.enable)
				spanText = "-"
		} else {
			spanText = this.props.skillData.point
			if (this.state.hover.enable){
				spanText = "+"
			}
		}
		return this.state.userData.hoverEnable ? spanText : this.state.skillData.point
    }

    prepareSpan() {
			var spanClass = "";
			var userId = localStorage.getItem("jobOonJaUserId");
			if (this.props.userData.id  == userId && this.props.userData.login) {
				spanClass = "badge badge-blue font text-info ml-1 my-0 mr-1"
				if (this.state.hover.enable)
					spanClass = "badge badge-danger font ml-1 my-0 mr-1"
			} else {
				spanClass = "badge badge-blue font text-info ml-1 my-0 mr-1"
				if (this.props.skillData.endorsers.find(
					function(element) {
						return element == userId;
					}) || this.state.hover.enable){
					spanClass = "badge badge-success font ml-1 my-0 mr-1"
					}
			}
			return this.state.userData.hoverEnable ? spanClass : "badge badge-blue font text-info ml-1 my-0 mr-1"
		}

		prepareBackground(){
			return (this.props.userData.alterBackground) ?
			"home-span-font home-font-color shadow-sm font rounded-top rounded-bottom"
			: "span-font bg-white shadow-sm font rounded-top rounded-bottom"
		}

    hoverOn(keyName){
			var userId = localStorage.getItem("jobOonJaUserId");
    	if(!this.state.userData.hoverEnable)
    		return	
    	var endorsed = this.props.skillData.endorsers.find(
						function(element) {
							return element == userId;
						})
		
    	this.setState({
			hover: {
				enable: true, 
				endorsed: endorsed
			}
		})
    }

    hoverOff(){
    	if(!this.state.userData.hoverEnable)
    		return
    	this.setState({
			hover: {
				enable: false,
			}
		})
    }

    handleClick(keyName){
    	if(!this.state.userData.hoverEnable)
    		return
    	const axios = require('axios');
    	console.log('onClick')
    	if(this.state.hover.endorsed) {
    		return
    	} else if(this.props.userData.login){
			axios.delete(`http://localhost:8080/IERIA/skill/${this.props.userData.id}/${keyName}`,
			{
				"Access-Control-Allow-Origin" : "*"
			})
	    	.then(response => {
				  // this.setState({ user: response.data});
				  this.props.updateUserData(response.data)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	} else {
			axios.post(`http://localhost:8080/IERIA/skill/${this.props.userData.id}/${keyName}/endorse` ,
			{
				"Access-Control-Allow-Origin" : "*"
			})
	    	.then(response => {
				// this.setState({ user: response.data});
				this.props.updateUserData(response.data)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	}
    }

    render() {
    	return (
				<div id={this.props.skillData.name} className="mx-1">
					<div className={this.prepareBackground()}>
						{this.props.skillData.name}
						{this.props.userData.badgeEnable ? (
									<span className={this.prepareSpan()}
									onClick={() => this.handleClick(this.props.skillData.name)}
									onMouseEnter={() => this.hoverOn(this.props.skillData.name)} 
									onMouseLeave={() => this.hoverOff()}>			
								{this.prepareSpanText()}
						</span>) : null}
					</div>
				</div>);
    }
}

export default Skill;