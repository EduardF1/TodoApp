import React, {Component, createContext} from 'react';
import axios from 'axios';

import {API_BASE_URL} from '../constants/constants';

export const TodoContext = createContext({});

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            message: {}
        }
        this.readTodo();
    }

    //create
    createTodo(event, todoAddInfo) {
        event.preventDefault();
        axios.post(`${API_BASE_URL}/create`, todoAddInfo).then(response => {
            if (response.data.message.level === 'success') {
                let todos = [...this.state.todos];
                todos.push(response.data.todo);
                this.setState({
                    todos: todos,
                    message: response.data.message
                })
            } else {
                this.setState({
                    message: response.data.message
                })
            }
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
        axios.put(`${API_BASE_URL}/update/${todoEditInfo.id}`, todoEditInfo)
            .then(response => {
                if (response.status === 200) {
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                        return todo.id === todoEditInfo.id;
                    });
                    todo.name = todoEditInfo.name;
                    this.setState({
                        todos: todos,
                    })
                } else {
                    console.error(`Something went wrong, status code: ${response.status}, error: ${response.statusText}`);
                }
            }).catch(error => {
            console.error(error);
        });
    }

    //delete
    deleteTodo(todoDeleteInfo) {
        axios.delete(`${API_BASE_URL}/delete/${todoDeleteInfo.id}`)
            .then(response => {
                if (response.status === 200) {
                    let todos = [...this.state.todos];
                    let todoToDelete = todos.find(todo => {
                        return todo.id === todoDeleteInfo.id;
                    });

                    todos.splice(todos.indexOf(todoToDelete), 1);
                    this.setState({
                        todos: todos,
                    })
                } else {
                    console.error(`Something went wrong, status code: ${response.status}, error: ${response.statusText}`);
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