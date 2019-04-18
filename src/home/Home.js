import React, { Component } from 'react';
import BlueBar from '../common/BlueBar'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ProjectCard from '../home/ProjectCard'
import './home.css'

class User extends Component {
	constructor(props){
        super(props);
        this.state = {
            projectsLoaded: false,
            usersLoaded: false
        }
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        const axios = require('axios'); 
		axios.get(`http://localhost:8080/project`)
		.then(response => {
			this.setState({ projects : response.data });
      		this.setState({projectsLoaded: true});
		})
		.catch(err => {
			console.log(err)
        })
        axios.get(`http://localhost:8080/user`)
		.then(response => {
			this.setState({ users : response.data });
      		this.setState({usersLoaded: true});
		})
		.catch(err => {
			console.log(err)
        })
    }

    componentDidMount() {
		this.fetchData()
    }

	render() {
        console.log(this.state.projects)
	    return (
	    	<React.Fragment>
			<Header otherPages = {
                {
                    "حساب کاربری" : "#",
				    "خروج" : "#"
                }
            }/>
	        <div className="white_bar">
	        <main className="white_bar">
	            <BlueBar isHome = {false}/>
                <div className="container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-9">
                            <div className="projectsList">
                                {this.state.projectsLoaded ? this.state.projects.map( function(project) {
                                    return <ProjectCard projectData={project}/>
                                }) : null}
                            </div>
                        </div>
                    </div>
                </div>
	        </main>
	        </div>
			<Footer />
	        </React.Fragment>
	    );
	}
}

export default User;