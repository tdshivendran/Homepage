import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuoteGen from "./QuoteGen.js";
import ToDoList from "./TodoList.js";
import ClockGreet from "./ClockGreet.js";
import CalenderApp from "./Calender.js";
import WeatherApp from "./Weather";

let todoItems = [];
todoItems.push({index: 1, values: "Finish Homework"});
todoItems.push({index: 2, values: "Go shopping"});
todoItems.push({index: 3, values: "Buy flowers"});

function WelcomeNote(){
    return(
        <div>
            <h2>Welcome ! Have a good day..</h2>
        </div>
    );
}


class NavContent extends React.Component{
    constructor(props) {
        super(props);
        this.handleClickCalender = this.handleClickCalender.bind(this);
        this.handleClickToDo = this.handleClickToDo.bind(this);
        this.state = {
            dropdownCalender: '',
            dropdownToDo: ''
        };
    }

    handleClickCalender(){
        if (this.state.dropdownCalender === ''){
            this.setState({ dropdownCalender: [<CalenderApp/>]});
        }
        else {
            this.setState({ dropdownCalender: ''});
        }
    }

    handleClickToDo(){
        if (this.state.dropdownToDo === ''){
            this.setState({ dropdownToDo: [<ToDoList lists={todoItems}/>]});
        }
        else {
            this.setState({ dropdownToDo: ''});
        }
    }

    render(){
        return(
            <main>
                <div class="background-overlay show"></div>
                <div class="TopLeft">
                    <a href="#calender" class="calenderButton" onClick={this.handleClickCalender}>Calender</a>
                </div>
                <div class="TopLeftDrop">
                    {this.state.dropdownCalender}
                </div>
                <div class="TopRight">
                    <a href="#todo" class="ToDoButton" onClick={this.handleClickToDo}>Todo</a>
                </div>
                <div class="TopRightDrop">
                    {this.state.dropdownToDo}
                </div>
                <div class="TimeWrap">
                    <div class="ClockContent">
                        <ClockGreet/>
                    </div>
                    <div>
                        <WelcomeNote/>
                    </div>
                    {/*<WeatherApp/>*/}
                </div>
                <div class="bottomWrap">
                    <div class="Quote">
                        <QuoteGen/>
                    </div>
                </div>
            </main>
        );
    }
}

export default todoItems;
ReactDOM.render(<NavContent/>, document.getElementById('root'));





