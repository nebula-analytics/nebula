import {makeStyles, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close, Menu, Sync, SyncProblem} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import {stringToHslColor} from "../helpers/utils";
import Typography from "@material-ui/core/Typography";
import Submenu from "./Submenu";
import * as React from "react";
import {useState} from "react";
import themeData from "../constants/theme";
import * as PropTypes from "prop-types";


const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: `${themeData.cards.gutter}px`,
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
    }
}));

function HeaderBar(props) {
    const {saturation, brightness, connected, last_connected, onResize} = props;
    const [showMenu, setShowMenu] = useState(false);
    const classes = useStyles();

    const connectionText = connected ? "" : "Not";
    const connectionIcon = connected ? <Sync/> : <SyncProblem/>;
    const connectionColor = connected ? "default" : "secondary";


    return (<Card className={`stamp ${classes.root} dynamic-header-width`}>
            <Toolbar style={{background: stringToHslColor("header", saturation, brightness)}}>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu ? <Close/> : <Menu/>}
                </IconButton>
                <div className={classes.grow}>
                    <Typography variant="h6" className={classes.title} color="inherit" noWrap>
                        Nebula
                    </Typography>
                </div>
                <Tooltip title={`${connectionText} Connected`}>
                    <IconButton aria-label={`${connectionText} Connected`} color={connectionColor}>
                        {connectionIcon}
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <Submenu
                visible={showMenu}
                connected={connected}
                when={last_connected}
                onResize={onResize}
                color={stringToHslColor("header", saturation/2, brightness)}
            />
        </Card>
    );

}

HeaderBar.propTypes = {
    connected: PropTypes.bool,
    last_connected: PropTypes.object,
    brightness: PropTypes.number,
    saturation: PropTypes.number,
    onResize: PropTypes.func
};

HeaderBar.defaultProps = {
    connected: false,
    last_connected: null,
    brightness: 100,
    saturation: 0,
    onResize: () => null
};

export default HeaderBar