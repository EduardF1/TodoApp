import React, {createContext} from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../constants/constants';

export const TodoContext = createContext({});

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: {},
        };
        this.readTodo();
    }

    //create
    createTodo(event, todo) {
        event.preventDefault();
        axios.post(`${API_BASE_URL}/create`, todo)
            .then(response => {
                if (response.data.message.level === 'success') {
                    let data = [...this.state.todos];
                    data.push(response.data.todo);
                    this.setState({
                        todos: data,
                        message: response.data.message,
                    });
                } else {
                    this.setState({
                        message: response.data.message,
                    });
                }
            }).catch(error => {
            console.error(error);
        });
    }

    //read
    readTodo() {
        axios.get(`${API_BASE_URL}/read`)
            .then(response => {
                this.setState({
                    todos: response.data,
                });
            }).catch(error => {
            console.error(error);
        });
    }

    //update
    updateTodo(data) {
        axios.put(`${API_BASE_URL}/update/${data.id}`, data)
            .then(response => {
                if (response.data.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    });
                } else {
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === data.id;
                    });
                    todo.task = response.data.todo.task;
                    todo.description = response.data.todo.description;
                    this.setState({
                        todos: todos,
                        message: response.data.message,
                    });
                }
            }).catch(error => {
            console.error(error);
        });
    }

    //delete
    deleteTodo(data) {
        axios.delete(`${API_BASE_URL}/delete/${data.id}`)
            .then(response => {
                if (response.data.message.level === 'error') {
                    this.setState({
                        message: response.data.message,
                    });
                } else {
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === data.id;
                    });
                    todos.splice(todos.indexOf(todo), 1);
                    this.setState({
                        todos: todos,
                        message: response.data.message
                    });
                }
            }).catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => this.setState({message: message}),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;