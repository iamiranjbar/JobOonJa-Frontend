import React, { Component } from 'react'
import './project_bid.css'
import Axios from 'axios';
class SendBid extends Component {
	constructor(props){
        super(props);
		this.state = {
			project: this.props.project,
			user: this.props.user,
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
        }
	}

	submitBid(){
		Axios.post(`http://localhost:8080/project/${this.state.project.id}/bid/${this.state.amount}`)
		.then(response =>{
			console.log(response);
            this.setState({
                errorMsg: 'امکان ارسال وجود ندارد'
            })
		})
		.catch(err => {
			console.log(err);
            this.setState({
                errorMsg: 'امکان ارسال وجود ندارد'
            })
		})
	}

    prepareBidHtml(){
    	if(this.state.project.bids != null && this.state.project.bids.find(
				function(element) {
					return element.user.id == this.state.user.id; 
				}))
    	{
    		return (
    			<React.Fragment>
    			<div class="row col-auto already-bid font mr-1">
    			<div>
                    <span class="flaticon-check-mark tick"></span>
                </div>
                <div class="row col-auto">
                شما قبلا پیشنهاد خود را ثبت کرده&zwnj;اید.
                </div>
                </div>
                </React.Fragment>
                )
    	} else if((Date.now() - this.state.project.deadline) > 0 || this.props.ended) {
    		return (
    			<React.Fragment>
    			<div class="row col-auto deadlined font mr-1">
    			<div className="row font">
    			<div>
                    <span class="flaticon-danger danger"></span>
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
		    	<div className="row col-12 bid-title">
		        ثبت پیشنهاد
		        </div>
		        <div className="row">
		            <input type="text" className="input-box" placeholder="پیشنهاد خود را وارد کنید" onChange={this.handleAmountChange}></input>
		            <div className="send-text">تومان</div>
		            <button className="send-btn" onClick={this.submitBid}>ارسال</button>
		        </div>
                <div className="row font">
                <div>
                    <span class="flaticon-danger danger"></span>
                </div>
				<div>
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