import React from "react";
import {useContext} from "react";
import {TodoContext} from "../contexts/TodoContext";
import {Button, Snackbar, SnackbarContent} from "@material-ui/core";

function SnackbarComponent() {
    const context = useContext(TodoContext);
    return (
        <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
            <SnackbarContent message={context.message.text} action={[
                <Button onClick={() => {context.setMessage({})}} key={'dismiss'}>Dismiss</Button>
            ]}/>
        </Snackbar>
    )
}

export default SnackbarComponent;