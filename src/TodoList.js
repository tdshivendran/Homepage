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
        console.log(i)
        todoItems.splice(i, 1);
        this.setState({items: todoItems});
    }

    render(){
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
        if (this.state.value != '') {
            todoItems.unshift({
                index: todoItems.length+1,
                values: this.state.value
            });
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




/*

function DoList(props){
    return(
        <ul>
            {props.lists.map(list => (
                <li>
                    {list.index}
                    <button>&times;</button>
                </li>
            ))}
        </ul>
    );
}

class ToDoList extends React.Component{
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={lists: props.lists, value: ''};
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
                        <input type="text" placeholder="Add your  here" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="Submit" value="+"/>
                </form>
                <DoList lists={this.state.lists}/>
            </div>
        );
    }
}*/

export default ToDoList;