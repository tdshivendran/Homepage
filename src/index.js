import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function DoList(props){
    return(
        <ul>
            {props.lists.map(lists => (<li>{lists.value}</li>))}
        </ul>
    );
}

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={lists: [], value: ''};
    }

    handleSubmit(event){
        const item={value: this.state.value};
        this.setState(prevState => ({
            lists: prevState.lists.concat(item),
            value:''
            })
        );
        event.preventDefault();
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Add your Todo here" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="Submit" value="+"/>
                </form>
                <DoList lists={this.state.lists}/>
            </div>
        );
    }
}

class QuoteGen extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={url:'https://talaikis.com/api/quotes/random/', quote:'', author: ''}
    }

    componentDidMount(){
        fetch(this.state.url).then(function(res){
            return res.json();
        }).then(function (data) {
            this.setState(
                {quote:data.quote, author:data.author}
            );
        }.bind(this));
    }

    handleClick(){
        fetch(this.state.url).then(function(res){
            return res.json();
        }).then(function (data) {
            this.setState(
                {quote:data.quote, author:data.author}
            );
        }.bind(this));
    }

    render(){
        return(
            <div>
                <p>{this.state.quote}</p>
                <p>-{this.state.author}</p>
                <button onClick={this.handleClick}>New Quote</button>
            </div>
        );
    }
}

function WelcomeNote(){
    return(
        <div>
            <h2>Welcome to ! Happy Surfing..</h2>
        </div>
    );
}

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
                <h1>It is {this.state.date}</h1>
            </div>
        );
    }
}
const display = (
    <div>
        <div class="center-text" >
            <ClockGreet/>
            <WelcomeNote/>
        </div>
        <section>
            <div class="center-below">
                <ToDoList/>
            </div>
        </section>
        <div class="center-bottom">
            <QuoteGen/>
        </div>

    </div>

);

ReactDOM.render(display, document.getElementById('root'));




