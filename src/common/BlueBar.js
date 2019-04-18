import React, { Component } from 'react';
import './blue.css'

class BlueBar extends Component {
	constructor(props) {
        super(props);
    }

    render() {
    	return (this.props.isHome ? <div className="container-fluid blue blue_bar">
	            </div> : <div className="container-fluid blue home_blue_bar">
	            </div> 
    		);
    }
}

export default BlueBar;