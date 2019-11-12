import {LinearProgress, makeStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Close, Menu} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import Submenu from "./Submenu";
import * as React from "react";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import moment from "moment";
import BookCard from "../Components/BookCard";


const useStyles = makeStyles(theme => ({
    root: {
        // marginBottom: `${themeData.cards.gutter}px`,
        float: "left",
        zIndex: 1000,
        color: "white",
        background: "none",
        boxShadow: "none",
        position: "absolute",
        top: "0%",
        left: "0%",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
        maxWidth: "100%"
    }
}));

function HeaderBar(props) {
    const {upstream, onResize, recordTypes, filters, toggleFilter} = props;
    const {state, last_reached} = upstream;
    const [showMenu, setShowMenu] = useState(JSON.parse(localStorage.getItem("header.showMenu") || "true"));
    const classes = useStyles();
    const {toggleDarkMode} = props;

    useEffect(() => {
        localStorage.setItem("header.showMenu", JSON.stringify(showMenu))
    }, [showMenu]);

    return (<Card className={`${classes.root} stamp header`}
                  data-always_visible={true}
                  data-order_first={10}
        >
            <Toolbar>
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
                    <img alt={"RMIT Library Live"} src={"/rmit-branding.png"} className={classes.title}/>
                </div>
            </Toolbar>
            <LinearProgress color={state === "connecting" ? "primary" : "secondary"}
                            style={{opacity: state === "synced" ? 0 : 100}}
                            {...state === "connecting"?{} :{variant: "determinate", value: 100}}/>
            <Submenu
                visible={showMenu}
                connected={state === "synced"}
                when={last_reached}
                onResize={onResize}
                recordTypes={recordTypes}
                filters={filters}
                toggleFilter={toggleFilter}
                toggleDarkMode={toggleDarkMode}
            />
        </Card>
    );

}

HeaderBar.propTypes = {
    onResize: PropTypes.func,
    recordTypes: PropTypes.object,
    upstream: PropTypes.object,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,
    toggleDarkMode: PropTypes.func,
};

HeaderBar.defaultProps = {
    onResize: () => null,
    recordTypes: {},
    upstream: {
        state: "desynced",
        last_attempt: null,
        last_reached: null
    },
    filters: [],
};

export default HeaderBar
