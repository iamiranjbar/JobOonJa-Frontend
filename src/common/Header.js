import React, { Component } from 'react';

class Header extends Component {

	constructor(props){
        super(props);
    }

    render() {
    	return (
            <header>
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light header_bar">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="active"><a className="navbar-brand" href="#"><img className="logo" src="../../assets/logo/logo%20v1.png"/></a></li>
                        </ul>
                        <ul className="nav navbar-nav">
                            {Object.keys(this.props.otherPages).map((keyName, i) => (
                                <li key={i}><a className="header_text" href={this.props.otherPages[keyName]}>{keyName}</a></li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;