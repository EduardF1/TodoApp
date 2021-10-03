import React from 'react';
import {NavLink} from 'react-router-dom';

import {Box} from '@material-ui/core';
import {Button, Typography} from '@mui/material';

import {NOT_FOUND_LABELS} from '../constants/constants';

const NotFound = () => {
    return (
        <Box textAlign={'center'}>
            <Typography variant={'h1'}>{NOT_FOUND_LABELS[0]}</Typography>
            <NavLink style={{textDecoration: 'none'}} to={'/'}>
                <Button color={'primary'} variant={'contained'} size={'large'}>{NOT_FOUND_LABELS[1]}</Button>
            </NavLink>
        </Box>
    );
};

export default NotFound;