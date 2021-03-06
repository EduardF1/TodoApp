import React from 'react';
import {useContext} from 'react';

import {Button, Snackbar, SnackbarContent} from '@material-ui/core';

import {TodoContext} from '../contexts/TodoContext';
import {SNACKBAR_LABEL} from "../constants/constants";

function checkLevel(level) {
    switch (level) {
        case 'success':
            return 'green';
        case 'error':
            return 'red';
        default:
            return 'white';
    }
}

function SnackbarComponent() {
    const context = useContext(TodoContext);
    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            {context.message.text && (
                <SnackbarContent style={{backgroundColor: checkLevel(context.message.level), whiteSpace:'pre'}}
                                 message={context.message.text}
                                 action={[
                                     <Button
                                         onClick={() => context.setMessage({})}
                                         key='dismiss'
                                         color='inherit'
                                     >
                                         {SNACKBAR_LABEL}
                                     </Button>,
                                 ]}/>
            )}
        </Snackbar>
    );
}

export default SnackbarComponent;