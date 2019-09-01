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
import GitHub from "./Components/Icons/Github";

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
    state = {
        showMenu: false
    };

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    };

    render() {
        const {classes, onResize} = this.props;
        const {showMenu} = this.state;


        return (<Card className={`stamp ${classes.root}`}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.toggleMenu}
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
                <Collapse in={showMenu} timeout="auto" onEntered={onResize} onExited={onResize}>
                    <CardContent>
                        <Typography variant="body1" color="textPrimary" component="p">
                            <span>31 August 2019, </span>
                            <span>11:25am</span>
                            <span className={classes.timezone}>(UTC+11)</span>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            A real-time visualisation of resources users are accessing from RMIT University Library's
                            collection.
                        </Typography>
                    </CardContent>
                    <Divider variant="fullWidth" component="div"/>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Tooltip title={"Github"}>
                                <IconButton href={"https://github.com/nebula-analytics/nebula"} aria-label="Github link"
                                            color="default">
                                    <GitHub/>
                                </IconButton>
                            </Tooltip>
                            Explore Nebula's source code on Github
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