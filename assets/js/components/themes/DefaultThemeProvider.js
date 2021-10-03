import React from 'react';
import {createTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        type: 'dark'
    }
});

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            {props.children}
        </MuiThemeProvider>
    )
};

export default DefaultThemeProvider;