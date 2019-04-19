import React, { Component } from 'react';
import './blue.css'

class BlueBar extends Component {
	constructor(props) {
        super(props);
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
					{/* <div className="container">
						<div className="row col-md-6 mx-auto">
							<form className="form col-md-12">
								<input
									placeholder="جستجو در جاب‌اونجا "
									// value={this.state.query}
									// onChange={this.handleInputChange}
								/>
							</form>
						</div>
					</div> */}
					<form class="form" method="POST">
						<div class="container">
							<div class="row">
								<div class="col-md-7 center">
									<input id="main-search" class="form-control" name="name" type="text" placeholder="جستجو در جاب‌اونجا" />
									<button type="button" class="btn search-btn">جستجو</button>
								</div>
							</div>
						</div>
						</form>
	            </div> 
    		);
    }
}

export default BlueBar;