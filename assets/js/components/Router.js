import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';

import {makeStyles} from '@material-ui/core';

import NotFound from './NotFound';
import TodoContextProvider from '../contexts/TodoContext';
import TodoTable from './TodoTable';
import SnackbarComponent from './Snackbar';
import Navigation from './Navigation';

const TodoList = () => (
    <TodoContextProvider>
        <TodoTable/>
        <SnackbarComponent/>
    </TodoContextProvider>
);

const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}));

const Router = () => {
    const classes = useStyles();
    return (
        <BrowserRouter>
            <Navigation/>
            <div className={classes.divider}/>
            <Switch>
                <Redirect exact from={'/'} to={'/todo-list'}/>
                <Route exact path={'/todo-list'} component={TodoList}/>
                <Route exact path={'/tag-list'} component={null}/>
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Router;