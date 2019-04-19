import React, { Component } from 'react';
import Skill from '../common/Skill'
import Timer from '../common/Timer'
import './projectCard.css'

class ProjectCard extends Component {
	constructor(props){
		super(props);
		this.state = {
			timerBadgeClass : "badge badge-blue font text-info ml-1 my-0 mr-1"
		}
		this.changeTimerBackground = this.changeTimerBackground.bind(this);
	}

	changeTimerBackground(isFinished){
		if(isFinished)
			this.setState({
				timerBadgeClass: "badge badge-danger font text-info ml-1 my-0 mr-1"
			})
	}

    render() {
    	return (
            <React.Fragment>
	        <div className="container frame shadow-sm">
	            <div className="row">
	                <div className="col-2">
	                    <img className="projectCard-image" src={this.props.projectData.imageUrl}></img>
	                </div>
	                <div className="col-10">
	                    <ul className="project-list-text font">
	              			<li>
								<div className="row">
									<div className="project-name-text col-9">
										{this.props.projectData.title}
									</div>
									<div className="col-3">
										<span className="badge badge-blue font text-info ml-1 my-0 mr-1">
										<Timer seconds={this.props.projectData.deadline - Date.now()} brief={true} changeIcon={this.changeTimerBackground}/>
										</span>
									</div>
								</div>
					        </li>
	                        <li className="project-desc-text">
								{this.props.projectData.description}
	                        </li>
							<li>
								<div className="project-budget-alter-text">
								بودجه: {this.props.projectData.budget} تومان
								</div>
							</li>
							<li>
								<div className="row col-12">
									<div className="font skill-text">
										مهارت‌ها:
									</div>
									<div className="row font">
										<div className = "d-flex">
											{Object.keys(this.props.projectData.skills).map((keyName, i) => (
												<Skill skillData={this.props.projectData.skills[keyName]}
												userData={{id: '1', login: true, hoverEnable: false, badgeEnable: false, alterBackground: true}}/>
											))}
										</div>
									</div>
								</div>
							</li>
	                    </ul>
	                </div>
	            </div>
	        </div>
			<div className="row"><div className="col-auto with-margin"></div></div>
        </React.Fragment>
        )
    }
}

export default ProjectCard;