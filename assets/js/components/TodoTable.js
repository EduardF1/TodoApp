import {makeStyles, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

import React, {Fragment, useContext, useState} from 'react';
import {TodoContext} from '../contexts/TodoContext';

import DeleteDialog from './DeleteDialog';
import {TABLE_HEADERS} from "../constants/constants";
import {amber} from "@mui/material/colors";

const useStyles = makeStyles(theme => ({
    thead: {
        backgroundColor: amber['800']
    }
}));

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodoTask, setAddTodoTask] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoTask, setEditTodoTask] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    const classes = useStyles();

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {task: addTodoTask, description: addTodoDescription});
        setAddTodoTask('');
        setAddTodoDescription('');
    };

    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, task: editTodoTask, description: editTodoDescription});
        setEditIsShown(false);
    };

    return (
        <Fragment>
            <Table size="small">
                {/*HEAD*/}
                <TableHead>
                    {/*ADD*/}
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField variant="outlined"
                                           type="text"
                                           size="small"
                                           value={addTodoTask}
                                           onChange={(event) => {
                                               setAddTodoTask(event.target.value);
                                           }}
                                           label="Task"
                                           fullWidth={true}/>
                            </form>
                        </TableCell>
                        <TableCell>
                            <form>
                                <TextField variant="outlined"
                                           size="small"
                                           type="text"
                                           value={addTodoDescription}
                                           onChange={(event) => {
                                               setAddTodoDescription(event.target.value);
                                           }}
                                           label="Description"
                                           fullWidth={true}
                                           multiline={true}/>
                            </form>
                        </TableCell>
                        <TableCell width={130} align="right">
                            <IconButton color="primary" onClick={onCreateSubmit}>
                                <AddIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    <TableRow className={classes.thead}>
                        <TableCell width={200}>{TABLE_HEADERS[0]}</TableCell>
                        <TableCell>{TABLE_HEADERS[2]}</TableCell>
                        <TableCell align="right">{TABLE_HEADERS[1]}</TableCell>
                    </TableRow>
                </TableHead>
                {/*BODY*/}
                <TableBody>
                    {/*DATA*/}
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo ' + index}>

                            {/*NAME*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                        <TextField
                                            type="text"
                                            fullWidth={true}
                                            autoFocus={true}
                                            value={editTodoTask}
                                            onChange={(event) => {
                                                setEditTodoTask(event.target.value);
                                            }}
                                        />
                                    </form>
                                    :
                                    <Typography>{todo.task}</Typography>
                                }
                            </TableCell>
                            {/*DESCRIPTION*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <TextField
                                        type="text"
                                        fullWidth={true}
                                        value={editTodoDescription}
                                        onChange={(event) => setEditTodoDescription(event.target.value)}
                                        multiline={true}
                                    />
                                    :
                                    <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>

                            <TableCell align="right">
                                {editIsShown === todo.id ?
                                    <Fragment>
                                        <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                                            <DoneIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => setEditIsShown(false)}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <IconButton color="primary" onClick={() => {
                                            setEditIsShown(todo.id);
                                            setEditTodoTask(todo.task);
                                            setEditTodoDescription(todo.description);
                                        }}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => {
                                            setDeleteConfirmationIsShown(true);
                                            setTodoToBeDeleted(todo);
                                        }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Fragment>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {deleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted}
                              open={deleteConfirmationIsShown}
                              setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
                />
            )}
        </Fragment>
    );
}

export default TodoTable;