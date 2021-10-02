import React, {Component, createContext} from 'react';

export const TodoContext = createContext({});

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, name: 'do something 1'},
                {id: 2, name: 'do something 2'},
                {id: 3, name: 'do something 3'},
                {id: 4, name: 'do something 4'}
            ],
        }
    }

    //create
    createTodo(event, todoAddInfo) {
        event.preventDefault();
        let todos = [...this.state.todos];
        todoAddInfo ? todos.push(todoAddInfo) : console.error('Cannot add null or undefined todo object.');
        this.setState({
            todos: todos
        });

    }

    //read
    readTodo() {

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
            todos:todos,
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