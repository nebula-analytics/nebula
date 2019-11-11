import React, {useEffect, useRef, useState} from 'react';
import custom_theme from "./constants/theme"

import './App.css';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/styles';
import {Container, responsiveFontSizes} from "@material-ui/core";
import {MuiPickersUtilsProvider,} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import DataLayer from "./DataLayer";

function App(props) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("app.darkmode") !== undefined);
    const ref = useRef(responsiveFontSizes(createMuiTheme(custom_theme)));
    useEffect(
        () => {
            if (darkMode) {
                custom_theme.palette.type = "dark";
                localStorage.setItem("app.darkmode", "yes")
            } else {
                custom_theme.palette.type = "light";
                localStorage.setItem("app.darkmode", undefined)
            }
            ref.current = responsiveFontSizes(createMuiTheme(custom_theme))
        }, [darkMode]
    );

    const toggleDarkMode = () => setDarkMode(!darkMode);


    return (
        <ThemeProvider theme={ref.current}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Container maxWidth={false}>
                    <DataLayer toggleDarkMode={toggleDarkMode}/>
                </Container>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
