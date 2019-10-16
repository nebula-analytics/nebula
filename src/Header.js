import * as React from "react";
import {Tooltip, withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {Close, Sync, SyncProblem} from "@material-ui/icons"
import MenuIcon from '@material-ui/icons/Menu';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import GitHub from "./Components/Icons/Github";
import themeData from "./constants/theme"
import * as PropTypes from "prop-types";
import {stringToHslColor} from "./helpers/utils";
import Submenu from "./Navigation/Submenu";

const useStyles = theme => ({
    root: {
        marginBottom: `${themeData.cards.gutter}px`,
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            width: `${themeData.cards.size * 2 + themeData.cards.gutter * 4}px`,
        },
        float: "left",
        zIndex: 1000,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
    },
    timezone: {
        fontSize: ".8em !important",
        paddingLeft: ".2em"
    }
});

class Header extends React.Component {
    state = {
        showMenu: false,
    };

    static defaultProps = {
        online: false
    };
    static propTypes = {
        online: PropTypes.bool
    };


    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    };

    render() {

    }
}

export default withStyles(useStyles)(Header);