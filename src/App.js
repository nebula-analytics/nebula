import React from 'react';

import './App.css';
import FetchData from "./FetchData";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/styles';
import {Container} from "@material-ui/core";

const theme = createMuiTheme();

class App extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth={false} style={}>
                    <FetchData/>
                </Container>
            </ThemeProvider>
        );
    }
}

export default App;
