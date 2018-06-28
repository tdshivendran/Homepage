import React from "react";

class QuoteGen extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
        this.state={
            quote:'',
            author: ''
        }
    }

    componentDidMount(){
        this.handleClick();
    }

    handleClick(){
        let myHeaders = new Headers();
        myHeaders.append('X-Mashape-Key',process.env.REACT_APP_QUOTE_API);
        myHeaders.append('Content-Type','text/plain');
        fetch(process.env.REACT_APP_QUOTE_URL,{
                method: 'GET',
                headers: myHeaders
            }
        ).then(function(result){
            return result.json();
        }).then(function (data) {
            this.setState(
                {quote:data[0].quote, author:data[0].author}
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