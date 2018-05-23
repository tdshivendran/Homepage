import React from "react";

class QuoteGen extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            url:'https://talaikis.com/api/quotes/random/',
            quote:'',
            author: ''
        }
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
                <p class="quoteContent">" {this.state.quote} "</p>
                <p class="quoteAuthor">- {this.state.author}</p>
                <button class="newQuoteButton" onClick={this.handleClick}>New Quote</button>
            </div>
        );
    }
}

export default QuoteGen;