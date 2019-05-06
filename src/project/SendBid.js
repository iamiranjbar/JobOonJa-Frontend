import React, { Component } from 'react'
import './project_bid.css'
import Axios from 'axios';
class SendBid extends Component {
	constructor(props){
        super(props);
		this.state = {
			amount: 0,
			errorMsg: "",
            validAmount: false
		}
		this.prepareBidHtml = this.prepareBidHtml.bind(this);
		this.submitBid = this.submitBid.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
        this.isNumeric = this.isNumeric.bind(this);
    }

    isNumeric(num){
      return !isNaN(num)
    }

	handleAmountChange(event){
		this.setState({
			amount: event.target.value
		});
        if(event.target.value == ""){
            this.setState({
                errorMsg: "مقدار پیشنهاد نمی تواند خالی باشد",
                validAmount:false
            })
        }else if(!this.isNumeric(event.target.value)){
            this.setState({
                errorMsg: "مقدار پیشنهاد یک عدد است",
                validAmount:false
            })
        } else {
            this.setState({
                errorMsg: "",
                validAmount:true
            })
        }
	}

	submitBid(){
        console.log(`http://localhost:8080/project/${this.props.project.id}/bid/${this.state.amount}`)
        const axios = require('axios');
		axios.post(`http://localhost:8080/project/${this.props.project.id}/bid/${this.state.amount}` ,
            {
                "Access-Control-Allow-Origin" : "*"
            })
		.then(response =>{
			console.log(response.data);
            this.props.updateProjectData(response.data)
		})
		.catch(err => {
			console.log(err);
            this.setState({
                errorMsg: 'امکان ارسال وجود ندارد'
            })
		})
	}

    prepareBidHtml(){
		var that = this
    	if(this.props.project.bids != null && this.props.project.bids.find(
				function(element) {
					return element.biddingUser == that.props.user.id
				}))
    	{
    		return (
    			<React.Fragment>
    			<div className="row col-auto already-bid font mr-1">
    			<div>
                    <span className="flaticon-check-mark tick"></span>
                </div>
                <div className="row col-auto">
                شما قبلا پیشنهاد خود را ثبت کرده&zwnj;اید.
                </div>
                </div>
                </React.Fragment>
				)
    	}else if((Date.now() - this.props.project.deadline) > 0 || this.props.ended) {
    		return (
    			<React.Fragment>
    			<div className="row col-auto deadlined font mr-1">
    			<div className="row font">
    			<div>
                    <span className="flaticon-danger danger"></span>
                </div>
                <div>
                مهلت ارسال پیشنهاد برای این پروژه به پایان رسیده&zwnj;است!
                </div>
                </div>
                </div>
                </React.Fragment>
                )
    	} else {
    		return (
		    	<React.Fragment>
		    	<div className="row col-12 bid-title font">
		        ثبت پیشنهاد
		        </div>
		        <div className="row font">
		            <input type="text font" className="input-box" placeholder="پیشنهاد خود را وارد کنید" onChange={this.handleAmountChange}></input>
		            <div className="send-text">تومان</div>
		            <button className="send-btn" onClick={this.submitBid}>ارسال</button>
		        </div>
                <div className="row font">
				<div className="deadlined">
					{this.state.errorMsg}
				</div>
                </div>
		        </React.Fragment>)
    	}
    }

    render() {
    	return(
    		this.prepareBidHtml()
    	);
    }
}

export default SendBid;