import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon, makeStyles
} from '@material-ui/core';

import {Menu as MenuIcon, List as ListIcon, Label as LabelIcon} from '@material-ui/icons';
import {APP_TITLE} from "../constants/constants";

const useStyles = makeStyles(theme => ({
    menuIcon: {
        marginRight: theme.spacing(2),
    },
    list: {
        width:'200px'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
    },
}));
const Navigation = () => {
    // styles
    const classes = useStyles();
    // state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerItems = [
        {text:'TodoList', icon: <ListIcon/>, link:'/todo-list'},
        {text: 'Tags', icon: <LabelIcon/>, link: '/tag-list'}
    ];
    return (
        <AppBar position={'fixed'}>
            <Toolbar>
                <IconButton  onClick={toggleDrawer} className={classes.menuIcon} edge={'start'}><MenuIcon/></IconButton>
                <Typography variant= {'h6'} color={'textPrimary'}>{APP_TITLE}</Typography>
                <Box flexGrow={1}/>
                <Button size={'large'}>Login</Button>
            </Toolbar>
            <Drawer anchor={'left'} variant={'temporary'} onClose={toggleDrawer} open={drawerOpen}>
                <List className={classes.list}>
                    {drawerItems.map(drawerItem => (
                        <Link className={classes.link} to={drawerItem.link}  key={drawerItem.text}>
                            <ListItem onClick={toggleDrawer} button>
                                <ListItemIcon>{drawerItem.icon}</ListItemIcon>
                                <ListItemText>{drawerItem.text}</ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navigation;