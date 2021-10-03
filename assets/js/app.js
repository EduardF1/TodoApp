import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {CssBaseline} from '@material-ui/core';

import TodoContextProvider from './contexts/TodoContext';
import TodoTable from './components/TodoTable';
import SnackbarComponent from './components/Snackbar';
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                    <TodoTable/>
                    <SnackbarComponent/>
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<DefaultThemeProvider><App/></DefaultThemeProvider>, document.getElementById('root'));