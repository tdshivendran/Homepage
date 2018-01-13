import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import QuoteGen from "./QuoteGen.js";
import ToDoList from "./TodoList.js";
import ClockGreet from "./ClockGreet.js";

function WelcomeNote(){
    return(
        <div>
            <h2>Welcome ! Have a good day..</h2>
        </div>
    );
}

const display = (
    <div>
        <div class="center-text" >
            <ClockGreet/>
            <WelcomeNote/>
        </div>
        <div class="center-below">
            <ToDoList/>
        </div>
        <div class="center-bottom">
            <QuoteGen/>
        </div>

    </div>

);

ReactDOM.render(display, document.getElementById('root'));




