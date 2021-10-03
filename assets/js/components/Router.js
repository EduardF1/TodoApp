import React from 'react';
import TodoContextProvider from "../contexts/TodoContext";
import TodoTable from "./TodoTable";
import SnackbarComponent from "./Snackbar";
import Navigation from "./Navigation";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    divider: theme.mixins.toolbar,
}));

const Router = () => {
    const classes = useStyles();
    return (
        <div>
            <Navigation/>
            <div className={classes.divider}/>
            <TodoContextProvider>
                <TodoTable/>
                <SnackbarComponent/>
            </TodoContextProvider>
        </div>
    );
};

export default Router;