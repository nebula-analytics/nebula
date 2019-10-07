import React from 'react';

import './App.css';
import Header from "./Header";
import FetchData from "./FetchData";
import Gallery from "./Components/Gallery";
// import data from "./constants/stub";
import Container from "@material-ui/core/Container";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeData from "./constants/theme"
import {ThemeProvider} from '@material-ui/styles';
// import BookCard from "./Components/BookCard";

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
