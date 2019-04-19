import React, { Component } from 'react';
import BlueBar from '../common/BlueBar'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
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
	            <BlueBar notHome = {false}/>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="user-list">
                                <div>
                                    <form class="form" method="POST">
                                        <input id="user-search" class="form-control" name="name" type="text" placeholder="جستجو نام کاربر" />
                                    </form>
                                </div>
                                <div>
                                    {this.state.usersLoaded ?this.state.users.map( function(user) {
                                        return <UserCard userData={user}/>
                                    }): null}
                                </div>
                            </div>
                        </div>
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