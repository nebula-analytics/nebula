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

const theme = createMuiTheme(themeData);

class App extends React.Component {
    state = {
        showMenu: false
    };

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    };


    render() {
        const {showMenu} = this.state;

        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <Container>
                        <Gallery>
                            <Header toggleMenu={this.toggleMenu} showMenu={showMenu}/>
                            {this.state.showMenu && <span/>}
                            {
                                data.map((element) => {
                                        const url = `http://covers.openlibrary.org/b/isbn/${element.isbn}-M.jpg?default=false`;
                                        const loader = <CircularProgress className={"load"}/>;
                                        const fallback = <div className={"alt text"}><h3>{element.title}</h3></div>;

                                        return <div className={"grid-item card"} style={{height: "auto"}}
                                                    key={element.isbn}>
                                            <Img src={url} alt={""} style={{"width": "100%"}} loader={loader}
                                                 unloader={fallback}/>
                                        </div>
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
