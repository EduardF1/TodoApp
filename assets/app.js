import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {CssBaseline} from '@material-ui/core';

import TodoContextProvider from './contexts/TodoContext';
import TodoTable from './components/TodoTable';
import SnackbarComponent from "./components/Snackbar";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                    <SnackbarComponent/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));