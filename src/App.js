import React from 'react';

import './App.css';
import FetchData from "./FetchData";
import {ThemeProvider} from '@material-ui/styles';
import { Container, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme();

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
