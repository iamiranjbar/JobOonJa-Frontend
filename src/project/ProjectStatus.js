import React, { Component } from 'react'
import Timer from '../common/Timer'
import './project_bid.css'
import './flaticon.css'

class ProjectStatus extends Component {
	constructor(props){
        super(props);
		this.state = {
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
        console.log(this.props.project.winner)
    	if (this.props.project.winner != null) {
    		this.setState({winnerName: this.props.project.winner.firstName + ' ' + this.props.project.winner.lastName})
    	}
    }

    componentDidMount(){
        this.findWinner()
    }

    render() {
        return (
        <React.Fragment>
        <li className={this.state.timeClass}>
            <span className="flaticon-deadline"></span>
            <Timer seconds={this.props.project.deadline - Date.now()} brief={false} changeIcon={this.changeIcon}/>
        </li>
        <li className="budget-text">
            <span className="flaticon-money-bag"></span>
            بودجه: {this.props.project.budget} تومان
        </li>
        {this.state.winnerName != "" ?(
        <li class="winner-text">
            <span class="flaticon-check-mark"></span>
            برنده: {this.state.winnerName}
        </li>
        ):(null)}
        </React.Fragment>
        );
    }
}

export default ProjectStatus;