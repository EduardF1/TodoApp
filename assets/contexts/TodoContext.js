import React, {Component, createContext} from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../constants/constants';

export const TodoContext = createContext({});

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        }
        this.readTodo();
    }

    //create
    createTodo(event, todoAddInfo) {
        event.preventDefault();
        axios.post(`${API_BASE_URL}/create`, todoAddInfo).then(response => {
            let todos = [...this.state.todos];
            todos.push(response.data.todo);
            this.setState({
                todos:todos
            })
        }).catch(error => {
            console.log(error);
        })
    }

    //read
    readTodo() {
        axios.get(`${API_BASE_URL}/read`)
            .then(response => response.status === 200 ?
                this.setState({todos: response.data}) :
                console.error(`Something went wrong, error code: ${response.status}, error message: ${response.statusText}.`))
            .catch(error => console.error(error));
    }

    //update
    updateTodo(todoEditInfo) {
        let todos = [...this.state.todos];
        let todoToUpdate = todos.find(todo => {
            return todo.id === todoEditInfo.id
        });

        todoToUpdate.name = todoEditInfo.name;
        this.setState({
            todos: todos,
        });
    }

    //delete
    deleteTodo(todoDeleteInfo) {
        let todos = [...this.state.todos];
        let todoToDelete = todos.find(todo => {
            return todo.id === todoDeleteInfo.id;
        });

        todos.splice(todos.indexOf(todoToDelete), 1);
        this.setState({
            todos: todos,
        })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this)
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;