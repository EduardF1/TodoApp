import React from 'react';
import {createTheme, CssBaseline, MuiThemeProvider, responsiveFontSizes} from "@material-ui/core";
import {red, green} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: green,
        secondary: {
            main: red['800']
        },
    }
});

// set responsive fonts (viewport changes' handling)
const responsiveTheme = responsiveFontSizes(theme);

const DefaultThemeProvider = (props) => {
    return (
        <MuiThemeProvider theme={responsiveTheme}>
            <CssBaseline/>
            {props.children}
        </MuiThemeProvider>
    )
};

export default DefaultThemeProvider;