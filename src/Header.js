import * as React from "react";
import {Tooltip, withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Close, SyncProblem} from "@material-ui/icons"
import MenuIcon from '@material-ui/icons/Menu';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";

const useStyles = theme => ({
    root: {
        marginBottom: "5px",
        width: "415" +
            "px",
        float: "left",
    },
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
    },
    timezone: {
        fontSize: ".8em !important",
        paddingLeft: ".2em"
    }
});

class Header extends React.Component {
    render() {
        const {toggleMenu, classes, showMenu} = this.props;
        return (<Card className={`stamp ${classes.root}`}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleMenu}
                    >
                        {showMenu ? <Close/> : <MenuIcon/>}
                    </IconButton>
                    <div className={classes.grow}>
                        <Typography variant="h6" className={classes.title} color="inherit" noWrap>
                            Nebula
                        </Typography>
                    </div>
                    <Tooltip title={"Offline Mode"}>

                        <IconButton aria-label="App is offline" color="secondary">
                            <SyncProblem/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Collapse in={showMenu} timeout={0} unmountOnExit>
                    <CardContent>
                        <Typography variant="body1" color="textPrimary" component="p">
                            <span>31 August 2019, </span>
                            <span>11:25am</span>
                            <span className={classes.timezone}>(UTC+11)</span>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            A real-time visualisation of resources users are accessing from the State Library of
                            Queensland’s collection.
                        </Typography>
                    </CardContent>
                    <Divider variant="fullWidth" component="div"/>
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="p">
                            Filters
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            TODO
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default withStyles(useStyles)(Header);