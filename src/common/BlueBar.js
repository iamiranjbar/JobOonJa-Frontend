import React, { Component } from 'react';
import './blue.css'

class BlueBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText : "",
			validSearch: false
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.search = this.search.bind(this);
    }

	handleSearch(event){
		this.setState({
			searchText : event.target.value
		});
		if(event.target.value == ""){
            this.setState({
				validSearch:false
			})
            // },()=>{this.props.handleProjectSearch(this.state.searchText)})
        }else {
            this.setState({
				validSearch: true
			})
            // },()=>{this.props.getAllProjects()})
        }
	}

	search(){
		console.log(">>>>>")
		console.log(this.state.validSearch)
		console.log(this.state.searchText)
		console.log("<<<<<")
		if (this.state.validSearch)
			this.props.handleProjectSearch(this.state.searchText)
		else
			this.props.getAllProjects();
	}

    render() {
    	return (this.props.notHome ? 
				<div className="container-fluid blue blue_bar">
	            </div> : 
				<div className="container-fluid blue home_blue_bar">
					<div className="row top-hiding"></div>
					<div className="row tit">
						<div className="title-text">جاب‌اونجا خوب است!</div>
					</div>
					<div className="row desc">
						<div className="desc-text">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
							طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
						</div>
					</div>
					<form class="form">
						<div class="container">
							<div class="row">
								<div class="col-md-7 center">
									<input 
										id="main-search" 
										class="form-control" 
										name="name" 
										type="text" 
										placeholder="جستجو در جاب‌اونجا"
										onChange={this.handleSearch}
									/>
									<button type="button" class="btn search-btn" onClick={this.search}>جستجو</button>
								</div>
							</div>
						</div>
					</form>
	            </div> 
    		);
    }
}

export default BlueBar;