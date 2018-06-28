import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuoteGen from "./QuoteGen.js";
import ToDoList from "./TodoList.js";
import ClockGreet from "./ClockGreet.js";
import CalenderApp from "./Calender.js";
import WeatherApp from "./Weather";

let todoItems = [];

let retrievedData = localStorage.getItem("dashboard2287todo");
let todo = JSON.parse(retrievedData);

if(todo === null){
    todoItems.push({index: 1, values: "Finish Homework"});
    todoItems.push({index: 2, values: "Go shopping"});
    todoItems.push({index: 3, values: "Buy flowers"});
    localStorage.setItem("dashboard2287todo", JSON.stringify(todoItems));
}
else {
    for (let i=0; i<todo.length; i++){
        todoItems.push(todo[i]);
    }
}

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
        // this.componentWillMount = this.componentWillMount.bind(this);
        this.state = {
            dropdownCalender: '',
            dropdownToDo: '',
            image:''
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

    componentWillMount(){

        let retrievedimageData = localStorage.getItem("dashboard2287image");
        let count = localStorage.getItem("dashboard2287imagecount");
        let images = JSON.parse(retrievedimageData);

        if(images === null || (count === null || Number(count) >= '30')){
            let url = process.env.REACT_APP_BG_IMAGE_URL + process.env.REACT_APP_BG_IMAGE_ID;
            fetch(url).then(function(res){
                return res.json();
            }).then(function (data) {
                if(data.errors){
                    if (images !== null){
                        let x = Math.floor((Math.random() * 30)+1);
                        this.setState({image: images[x].urls.raw});
                    }
                    else {
                        console.log("Be Happy1")
                    }
                }
                else{
                    this.setState({image: data[0].urls.raw});
                    localStorage.setItem("dashboard2287image", JSON.stringify(data));
                    localStorage.setItem("dashboard2287imagecount", 1);
                }
            }.bind(this)).catch(function(error){
                if (images !== null){
                    let x = Math.floor((Math.random() * 10)+1);
                    this.setState({image: images[x].urls.raw});
                }
                else {
                    console.log("Be Happy2")
                }
            }.bind(this));
        }
        else {
            if (images !== null){
                if(images[count].urls.raw){
                    this.setState({image: images[count].urls.raw});
                }
            }
            count++;
            localStorage.setItem("dashboard2287imagecount", count);
        }
    }

    render(){
        return(
            <main>
                <div id="bg" style={{
                    backgroundImage: `url(${this.state.image})`
                }}>
                </div>
                <div class="background-overlay show"></div>

                <div class="TopLeft">
                    <a href="#calender" class="calenderButton" onClick={this.handleClickCalender}>Calendar</a>
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
                    <WeatherApp/>
                </div>
                <div class="bottomWrap">
                    <div class="Quote">
                        <QuoteGen/>
                        <p id="aboutDev">To know more about this website, <a href="https://tdshivendran.github.io/aboutme/" target="_blank" rel="noopener noreferrer">contact developer</a></p>
                    </div>
                </div>
            </main>
        );
    }
}

export default todoItems;
ReactDOM.render(<NavContent/>, document.getElementById('root'));





