import React from 'react';
import Img from 'react-image'
import CircularProgress from "@material-ui/core/CircularProgress";

import './App.css';
import Header from "./Header";
import Gallery from "./Components/Gallery";
import data from "./constants/stub";
import Container from "@material-ui/core/Container";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeData from "./constants/theme"
import {ThemeProvider} from '@material-ui/styles';
import BookCard from "./Components/BookCard";

const theme = createMuiTheme(themeData);

class App extends React.Component {

    render() {

        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Container>
                        <Gallery>
                            <Header/>
                            {
                                data.map((element) => {
                                        return <BookCard book={element}/>
                                    }
                                )
                            }
                        </Gallery>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default App;
