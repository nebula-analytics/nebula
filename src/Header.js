import * as React from "react";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class Header extends React.Component {
    render() {
        return (
            <header>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Nebula
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        )
    }
}

export default Header;