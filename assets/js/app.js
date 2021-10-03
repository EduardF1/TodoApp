import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";
import Router from "./components/Router";

class App extends Component {
    render() {
        return (
          <Router/>
        );
    }
}

ReactDOM.render(<DefaultThemeProvider><App/></DefaultThemeProvider>, document.getElementById('root'));