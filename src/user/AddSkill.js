import React, { Component } from 'react';
import './user_profile.css'

class AddSkill extends Component {
	constructor(props){
        super(props);
        console.log(this.props.skillsData)
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
    	var sel = document.getElementById('sel');
    	if(sel){
    		if (sel.value === '1') {
    			return
    		}
	 		const axios = require('axios'); 
			axios.put(`http://localhost:8080/skill/${this.props.userId}/${sel.value}`)
			.then(response => {
				this.props.updateUserData(response.data)
			})
			.catch(err => {
				console.log(err)
			})
		}
    }

	render() {
		return(
		<React.Fragment>
		<div className="card bg-light pl-1 mr-2 shadow-sm px-1 py-1">
            <div className="white_bar">
                <select id="sel" className="bg-light description_skills font pl-5 py-1">
                    <option key="1" value="1">-- انتخاب مهارت --</option>
                    {this.props.skillsData.map( function(skill) {
                        return <option key={skill.name} value={skill.name} dir="ltr">{skill.name}</option>
                    })}
                </select>
                <button className="btn btn-primary description_skills font mr-1" onClick={() => this.onClickHandler()}>افزودن مهارت</button>
            </div>
        </div>
        </React.Fragment>);
	}
}

export default AddSkill;