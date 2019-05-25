import React, { Component } from 'react';
import Skill from '../common/Skill'
import BlueBar from '../common/BlueBar'
import SendBid from './SendBid'
import Footer from '../common/Footer'
import Header from '../common/Header'
import ProjectStatus from './ProjectStatus'
import './project_bid.css'
import './flaticon.css'
import { Redirect } from 'react-router-dom'

const axios = require('axios'); 

class Project extends Component {
	constructor(props){
        super(props);
        const { match: { params } } = this.props;
		var tok = localStorage.getItem("jobOonJaToken")
		this.state = {
			hasJWT: false,
			token: "",
			loaded: false,
			ended: false,
			fetchError: false,
			id: params.projectId,
			hasJWT: (tok != null) ? true : false,
			token: (tok != null) ? tok : "",
			userId: localStorage.getItem("jobOonJaUserId")
		}
        this.fetchData = this.fetchData.bind(this);
        this.updateState = this.updateState.bind(this);
		this.updateProjectData = this.updateProjectData.bind(this);
		this.renderRedirect = this.renderRedirect.bind(this);
        axios.defaults.headers.common = {'authorization': `Bearer ${this.state.token}`}
    }

    fetchData(){
		axios.get(`http://localhost:8080/IERIA/project/${this.state.id}`)
		.then(response => {
			this.setState({ project : response.data });
      		this.setState({loaded: true});
		})
		.catch(err => {
			console.log(err)
			this.setState({fetchError: true});
		})
    }

    updateProjectData(projectData) {
		console.log("*********")
		this.setState({ project: projectData});
		console.log(this.state.project)
    }

    updateState(endedState){
    	this.setState({ended: endedState});
    }

    componentDidMount() {
		this.fetchData()
    }

    renderRedirect(){
        if (this.state.fetchError == true)
            return  <Redirect to="/login" />;
        else
        	return null
    }

	render() {
	    return (
	    	<React.Fragment>
	    	{this.renderRedirect()}
			<Header otherPages = {{
				"حساب کاربری" : "#/user/" + this.state.userId,
				"خروج" : "#/logout"
			}}/>
	        <div className="gray-bar">
	        <main>
	        <BlueBar notHome = {true}/>
	        <div className="container white-main-form main-form-alter">
	            <div className="row">
	                <div className="col-3">
	                    <img className="img-thumbnail project-image" src={this.state.loaded ? this.state.project.imageUrl : ""}></img>
	                </div>
	                <div className="col-9">
	                    <ul className="list-text font">
	              			<li className="name-text">
					           {this.state.loaded ? this.state.project.title : ""}
					        </li>
					        {this.state.loaded ? <ProjectStatus project={this.state.project} updateState={this.updateState}/> : null}
	                        <li className="desc-title">
	                            توضیحات
	                        </li>
	                        <li className="desc-text">
	                            <p>
	                                {this.state.loaded ? this.state.project.description : ""}
	                            </p>
	                        </li>
	                    </ul>
	                </div>
	            </div>
	            <div className="row req-bar">
	                <div className="row col-12">
	                    <div className="req-head font">
	                        مهارت‌های لازم:
	                    </div>
	                </div>
	            </div>
	            <div className="row font req-alter req-dir">
					<div className="ml-4 d-flex">
						{this.state.loaded ? Object.keys(this.state.project.skills).map((keyName, i) => (
							<Skill skillData={this.state.project.skills[keyName]}
							userData={{id: this.state.userId, login: true, hoverEnable: false, badgeEnable: true, alterBackground: false}}/>
						)) : null}
					</div>
	            </div>
	            {this.state.loaded ? <SendBid project={this.state.project} user={{id: this.state.userId}} updateProjectData={this.updateProjectData} ended={this.state.ended}/> : null}
	        </div>
	    </main>
        </div>
		<Footer />
        </React.Fragment>
    );
	}
}

export default Project;