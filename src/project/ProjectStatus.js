import React, { Component } from 'react'
import Timer from '../common/Timer'
import './project_bid.css'
import './flaticon.css'

class ProjectStatus extends Component {
	constructor(props){
        super(props);
		this.state = {
			project: this.props.project,
			winnerName: "",
			timeClass: "time-text"
		}
		this.changeIcon = this.changeIcon.bind(this);
		this.findWinner = this.findWinner.bind(this);
    }

    changeIcon(ended) {
    	if (ended) {
    		this.setState({timeClass: "time-reached-text"})
    		this.props.updateState(true)
    	}
    }

    findWinner() {
    	if (this.state.project.winner != null) {
    		this.setState({winnerName: this.state.project.winner.firstName + ' ' + this.state.project.winner.lastName})
    	}
    }

    render() {
    	this.findWinner();
        return (
        <React.Fragment>
        <li className={this.state.timeClass}>
            <span className="flaticon-deadline"></span>
            <Timer seconds={/*this.state.project.deadline - Date.now()*/60} brief={false} changeIcon={this.changeIcon}/>
        </li>
        <li className="budget-text">
            <span className="flaticon-money-bag"></span>
            بودجه: {this.state.project.budget} تومان
        </li>
        {this.state.winnerName != "" ?(
        <li class="winner-text">
            <span class="flaticon-check-mark"></span>
            برنده: وحید محمدی
        </li>
        ):(null)}
        </React.Fragment>
        );
    }
}

export default ProjectStatus;