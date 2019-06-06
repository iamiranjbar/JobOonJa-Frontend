import React, { Component } from 'react';
import BlueBar from '../common/BlueBar'
import Header from '../common/Header'
import Footer from '../common/Footer'
import ProjectCard from './ProjectCard'
import UserCard from './UserCard'
import './home.css'
import { Redirect } from 'react-router-dom'

const axios = require('axios'); 

class User extends Component {
	constructor(props){
        super(props);
        var tok = localStorage.getItem("jobOonJaToken")
        this.state = {
            hasJWT: tok!=null,
            token: tok,
            projectsLoaded: false,
            usersLoaded: false,
            userSearchText: "",
            fetchError: false,
            validUserSearch: false,
            offset: 0,
            limit: 5,
            userId: localStorage.getItem("jobOonJaUserId")
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleUserSearchChange = this.handleUserSearchChange.bind(this);
        this.handleUserSearch = this.handleUserSearch.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.handleProjectSearch = this.handleProjectSearch.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.showMore = this.showMore.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
        axios.defaults.headers.common = {'authorization': `Bearer ${this.state.token}`}
    }

    fetchData(){ 
        this.getAllProjects();
        this.getAllUsers();
    }

    componentDidMount() {
		this.fetchData()
    }

    handleUserSearchChange(event){
		this.setState({
            userSearchText : event.target.value,
            usersLoaded: false
		});
		if(event.target.value == ""){
            this.setState({
                validUserSearch:false
            },()=>{this.getAllUsers();})
        }else {
            this.setState({
                validUserSearch: true
            },()=> {
                this.handleUserSearch();
            })
        }
    }

    handleUserSearch(){
        axios.get(`http://185.166.107.169:30085/IERIA/user/search/` + this.state.userSearchText)
		.then(response => {
			this.setState({ 
                users : response.data,
                usersLoaded: true
            });
		})
		.catch(err => {
			console.log(err)
            this.setState({fetchError: true});
        })
    }
    
    getAllUsers(){
        axios.get(`http://185.166.107.169:30085/IERIA/user`)
		.then(response => {
			this.setState({ 
                users:response.data,
                usersLoaded: true
            });
		})
		.catch(err => {
			console.log(err)
            this.setState({fetchError: true});
        })
    }

    handleProjectSearch(searchField){
        axios.get(`http://185.166.107.169:30085/IERIA/project/search/` + searchField)
		.then(response => {
			this.setState({ 
                projects : response.data,
                projectsLoaded: true
            });
		})
		.catch(err => {
			console.log(err)
            this.setState({fetchError: true});
        })
    }

    getAllProjects(){
        console.log(this.state.limit)
        axios.get(`http://185.166.107.169:30085/IERIA/projects/` + this.state.limit)
		.then(response => {
			this.setState({ projects : response.data });
      		this.setState({projectsLoaded: true});
		})
		.catch(err => {
			console.log(err)
            this.setState({fetchError: true});
        })
    }

    showMore(){
        this.setState({
            limit: this.state.limit + 5
        },()=> {
            this.getAllProjects();
        })
    }

    renderRedirect(){
        if (this.state.fetchError == true)
            return  <Redirect to="login" />;
        else
            return null
    }

	render() {
	    return (
	    	<React.Fragment>
            {this.renderRedirect()}
			<Header otherPages = {
                {
                    "حساب کاربری" : "#/user/" + this.state.userId,
				    "خروج" : "#/logout"
                }
            }/>
	        <div className="white_bar">
	        <main className="white_bar">
                <BlueBar 
                    notHome = {false} 
                    handleProjectSearch={(searchField)=>this.handleProjectSearch(searchField)}
                    getAllProjects={()=>this.getAllProjects()}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="user-list">
                                <div>
                                    <form class="form">
                                        <input 
                                            id="user-search" 
                                            class="form-control" 
                                            name="name" 
                                            type="text" 
                                            placeholder="جستجو نام کاربر" 
                                            onChange={this.handleUserSearchChange}
                                        />
                                    </form>
                                </div>
                                <div>
                                    {this.state.usersLoaded ? 
                                        this.state.users.map( function(user) {
                                            return <UserCard userData={user}/>
                                        })
                                    : null}
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="projectsList">
                                {this.state.projectsLoaded ? this.state.projects.map( function(project) {
                                    return <ProjectCard projectData={project}/>
                                }) : null}
                                <button type="button" class="btn search-btn" onClick={this.showMore}>نمایش بیشتر</button>
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