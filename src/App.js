import React from 'react';

import './App.css';
import FetchData from "./FetchData";
import Container from "@material-ui/core/Container";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeData from "./constants/theme"
import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme(themeData);


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
