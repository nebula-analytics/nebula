import React, {useEffect, useState} from 'react';
import custom_theme from "./constants/theme"

import './App.css';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider} from '@material-ui/styles';
import {Container, responsiveFontSizes} from "@material-ui/core";
import {MuiPickersUtilsProvider,} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import DataLayer from "./DataLayer";

const getTheme = isDarkMode => {
    const base_custom_theme = JSON.parse(JSON.stringify(custom_theme));
    if (isDarkMode) {
        base_custom_theme.palette.type = "dark";
    } else {
        base_custom_theme.palette.type = "light";
    }
    return base_custom_theme
};

function App(props) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("app.darkmode") !== "off");
    const darkTheme = responsiveFontSizes(createMuiTheme(getTheme(true)));
    const lightTheme = responsiveFontSizes(createMuiTheme(getTheme(false)));
    useEffect(
        () => {
            if (darkMode)
                localStorage.removeItem("app.darkmode");
            else
                localStorage.setItem("app.darkmode", "off");
        }, [darkMode]
    );

    const toggleDarkMode = (reset) => {
        if (reset === true) {
            setDarkMode(true)
        } else {
            setDarkMode(!darkMode);
        }
    };


    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Container maxWidth={false}>
                    <DataLayer toggleDarkMode={toggleDarkMode}/>
                </Container>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
