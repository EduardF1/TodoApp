import PropTypes from 'prop-types';
import React, {useContext} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

import {TodoContext} from '../contexts/TodoContext';
import {DELETE_DIALOG_BUTTON_LABELS, DELETE_DIALOG_TITLE} from '../constants/constants';

function DeleteDialog(props) {
    const context = useContext(TodoContext);
    const hide = () => {
        props.setDeleteConfirmationIsShown(false)
    };

    return (
        <Dialog
            onClose={hide}
            fullWidth={true}
            maxWidth={'sm'}
            open={props.open}>
            <DialogTitle>{DELETE_DIALOG_TITLE}</DialogTitle>
            <DialogContent>
                {props.todo.name}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>{DELETE_DIALOG_BUTTON_LABELS[0]}</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.todo.id, name: props.todo.name});
                    hide();
                }}
                >{DELETE_DIALOG_BUTTON_LABELS[1]}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }),
};
export default DeleteDialog;