import React, {Component, useContext} from 'react';
import {TodoContext} from "../contexts/TodoContext";

function TodoTable() {
    const context = useContext(TodoContext);

    return (
        <div>
            {context.todos.map(element => (
                <div>{element.task}</div>
            ))}
        </div>
    );
}

export default TodoTable;