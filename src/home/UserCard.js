import React, { Component } from 'react';
import './userCard.css'

class UserCard extends Component {
	constructor(props){
		super(props);
	}

    render() {
    	return (
            <React.Fragment>
	        <div className="container frame shadow-sm">
	            <div className="row">
	                <div className="col-3">
	                    <img className="userCard-image" src={this.props.userData.profilePicURL}></img>
	                </div>
	                <div className="col-9">
	                    <div className="flex user-list-text font">
	              			<div className="user-name-text">
							  	<a href={"#/user/"+this.props.userData.id}>
									{this.props.userData.firstName + ' ' + this.props.userData.lastName}
								</a>
					        </div>
	                        <div className="user-desc-text">
								{this.props.userData.jobTitle}
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
			<div className="row"><div className="col-auto userwith-margin"></div></div>
        </React.Fragment>
        )
    }
}

export default UserCard;