import React, {Fragment} from "react";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {Button, Snackbar, SnackbarContent} from "@material-ui/core";

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
                <SnackbarContent style={{backgroundColor: checkLevel(context.message.level)}} message={context.message.text.map((text, index) => (
                    <Fragment key={index + ' ' + text}>
                        <span>{text}</span><br/>
                    </Fragment>
                ))} action={[
                    <Button color={'inherit'} onClick={() => {
                        context.setMessage({})
                    }} key={'dismiss'}>Dismiss</Button>
                ]}/>
            )}
        </Snackbar>
    )
}

export default SnackbarComponent;