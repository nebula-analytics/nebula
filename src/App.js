import React from 'react';
import custom_theme from "./constants/theme"

import './App.css';
import FetchData from "./FetchData";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/styles';
import {Container, responsiveFontSizes} from "@material-ui/core";

let theme = createMuiTheme(custom_theme);
theme = responsiveFontSizes(theme)

class App extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth={false}>
                    <FetchData/>
                </Container>
            </ThemeProvider>
        );
    }
}

export default App;
