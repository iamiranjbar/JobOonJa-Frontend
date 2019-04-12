import React, { Component } from 'react';
import './skill.css'

class Skill extends Component {
	constructor(props){
        super(props);
        console.log(props);
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
    }

    prepareSpanText() {
    	var spanText = "";
		if (this.props.userData.id  === "1" && this.props.userData.login) {
			spanText = this.state.skillData.point
			if (this.state.hover.enable)
				spanText = "-"
		} else {
			spanText = this.state.skillData.point
			if (this.state.hover.enable){
				spanText = "+"
			}
		}
		return this.state.userData.hoverEnable ? spanText : this.state.skillData.point
    }

    prepareSpan() {
		var spanClass = "";
		if (this.props.userData.id  === "1" && this.props.userData.login) {
			spanClass = "badge badge-blue font text-info badge-padding ml-1 my-0 mr-1"
			if (this.state.hover.enable)
				spanClass = "badge badge-danger font badge-padding ml-1 my-0 mr-1"
		} else {
			spanClass = "badge badge-blue font text-info badge-padding ml-1 my-0 mr-1"
			if (this.props.skillData.endorsers.find(
				function(element) {
					return element === '1'; // 1 is login user 
				}) || this.state.hover.enable){
				spanClass = "badge badge-success font badge-padding ml-1 my-0 mr-1"
				}
		}
		return this.state.userData.hoverEnable ? spanClass : "badge badge-blue font text-info badge-padding badge-padding ml-1 my-0 mr-1"
	}

    hoverOn(keyName){
    	if(!this.state.userData.hoverEnable)
    		return	
    	var endorsed = this.props.skillData.endorsers.find(
						function(element) {
							return element == '1'; // 1 is login user 
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
    	} else if(this.state.login){
			axios.delete(`http://localhost:8081/IERIA/skill/${this.state.id}/${keyName}`)
	    	.then(response => {
				  // this.setState({ user: response.data});
				  this.props.updateUserData(response.data)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	} else {
			axios.post(`http://localhost:8081/IERIA/skill/${this.state.id}/${keyName}/endorse`)
	    	.then(response => {
				// this.setState({ user: response.data});
				this.props.updateUserData(response.data)
	    	}).catch(error => this.setState({ error, loaded: true }));
    	}
    }

    render() {
    	return (<div id={this.state.skillData.name} className="col-auto">
    				<div className="bg-white shadow-sm font rounded-top rounded-bottom">
        				<span className={this.prepareSpan()}
        					onClick={() => this.handleClick(this.state.skillData.name)}
        					onMouseEnter={() => this.hoverOn(this.state.skillData.name)} 
							onMouseLeave={() => this.hoverOff()}>			
								{this.prepareSpanText()}
						</span>
						{this.state.skillData.name}
					</div>
				</div>);
    }
}

export default Skill;