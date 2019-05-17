import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Logout extends Component {
	constructor(props){
        super(props);
        localStorage.removeItem("jobOonJaToken");
    }

	render() {
	    return (
	    	<React.Fragment>
                <Redirect to="login" />
            </React.Fragment>
        );
	}
}

export default Logout;