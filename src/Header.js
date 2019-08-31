import * as React from "react";
import {AppBar, makeStyles, Tooltip, withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {SyncProblem} from "@material-ui/icons"

const useStyles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    }
});

class Header extends React.Component {
    render() {
        const {classes} = this.props;
        console.log(classes);
        return (
            <header className={"stamp"}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <div className={classes.grow}>
                            <Typography variant="h6" color="inherit" noWrap>
                                Nebula
                            </Typography>
                        </div>
                        <Tooltip title={"Offline Mode"}>

                            <IconButton aria-label="App is offline" color="secondary">
                                <SyncProblem/>
                            </IconButton>
                        </Tooltip>

                    </Toolbar>
                </AppBar>
            </header>
        )
    }
}

export default withStyles(useStyles)(Header);