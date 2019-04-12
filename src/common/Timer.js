import React, { Component } from 'react'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            time: {},
            seconds: this.props.seconds,
            ended: false,
            brief: this.props.brief,
            setIcon: this.props.changeIcon
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.prepareTimerHtml = this.prepareTimerHtml.bind(this);
        console.log(this.state.seconds)
        this.startTimer()
        console.log(this.state.ended)
    }

    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        } else {
            this.state.ended = true;
            this.props.changeIcon(true);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
            clearInterval(this.timer);
            this.setState({ended: true});
            this.props.changeIcon(true);
        }
    }

    prepareTimerHtml() {
        if (this.state.ended) {
            return(
            <React.Fragment>
            <b>مهلت تمام&zwnj;شده</b>
            </React.Fragment>
            );

        } else if (this.state.brief) {
            return (
                <React.Fragment>
                <b>زمان باقی مانده: </b>
                {this.state.time.m}:{this.state.time.s}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                <b>زمان باقی مانده: </b>
                {this.state.time.m} دقیقه و {this.state.time.s} ثانیه
                </React.Fragment>
            );
        }

    }

    render() {
        return this.prepareTimerHtml();
    }
}

export default Timer;