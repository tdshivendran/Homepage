import React from "react";
import todoItems from "./index"


class ViewList extends React.Component{
    constructor(props){
        super(props);
        this.Remove=this.Remove.bind(this);
        this.state={
            items: todoItems,
            listItems: ''
        };
    }

    Remove(key){
        let i=todoItems.map(function(o) { return o.index; }).indexOf(key);
        todoItems.splice(i, 1);
        localStorage.setItem("dashboard2287todo", JSON.stringify(todoItems));
        this.setState({items: todoItems});
    }

    render(){
        if(todoItems.length){
            return (
                <div>
                    <ul>
                        {this.state.items.map(list => (
                            <li key={list.index}>
                            <span class="listValues">
                                {list.values}
                            </span>
                                <button class="removeButton" key={list.index} onClick={this.Remove.bind(this, list.index)}>&times;</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p style={{ color:'white', paddingBottom: '0.5rem'}}>No To-Do's here.</p>
                </div>
            );
        }

    }
}

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            value: ''
        };
    }

    handleSubmit(event){
        if (this.state.value !== '') {
            todoItems.unshift({
                index: todoItems.length+1,
                values: this.state.value
            });
            localStorage.setItem("dashboard2287todo", JSON.stringify(todoItems));
            this.setState(prevState => ({
                    value:''
                })
            );
        }
        event.preventDefault();
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    render(){
        return(
            <div>
                <form class="todoForm" onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" placeholder="Add your Todo here" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="Submit" value="+"/>
                </form>
                <ViewList lists={todoItems}/>
            </div>
        );
    }
}

export default ToDoList;