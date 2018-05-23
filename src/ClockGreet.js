import React from "react";

class ClockGreet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date().toLocaleTimeString()};
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        console.log(this.state.date);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (
            <div>
                <p>{this.state.date}</p>
            </div>
        );
    }
}

export default ClockGreet;