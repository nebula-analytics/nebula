import {
    CardHeader,
    makeStyles,
    Tooltip,
    Collapse,
    Card,
    CardActionArea,
    CardActions,
    IconButton,
} from "@material-ui/core";
import * as React from "react";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Brightness4, BrightnessHigh, Cached, ExpandLess, ExpandMore} from "@material-ui/icons"
import About from "./About";
import FilterSet from "./Filters/FilterSet";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
    light: {
        display: theme.palette.type === "light" ? undefined : "none"
    },
    dark: {
        display: theme.palette.type === "dark" ? undefined : "none"
    }
}));

function Submenu(props) {
    const {visible, onResize, recordTypes, filters, toggleFilter, toggleDarkMode, windowEnd, windowDuration} = props;
    const classes = useStyles();
    const [showAbout, setShowAbout] = useState(
        JSON.parse(localStorage.getItem("Submenu.about") || "true")
    );
    const [showFilters, setShowFilters] = useState(
        JSON.parse(localStorage.getItem("Submenu.filters") || "false")
    );

    useEffect(
        () => {
            console.log("Store menu state");
            localStorage.setItem("Submenu.filters", JSON.stringify(showFilters));
            localStorage.setItem("Submenu.about", JSON.stringify(showAbout));
        }, [showFilters, showAbout, onResize]
    );


    return <Collapse in={visible} timeout="auto" onEntered={onResize} onExited={onResize}>
        <div className={classes.root}>

            <Card>
                <CardActions>
                    <Tooltip title={"Change theme"}>
                        <IconButton onClick={toggleDarkMode}>
                            <Brightness4 className={classes.dark}/>
                            <BrightnessHigh className={classes.light}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Clear stored settings (menu state, stored filters, etc)"}>
                        <IconButton onClick={() => {
                            window.localStorage.clear();
                            toggleDarkMode(true);
                            setShowAbout(true);
                            setShowFilters(false);
                            toggleFilter(...filters)
                        }}>
                            <Cached/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Card>
                    <CardActionArea onClick={() => setShowAbout(!showAbout)}>
                        <CardHeader title={"About Nebula (Library Live)"}
                                    titleTypographyProps={{variant: "h6"}}
                                    avatar={showAbout ? <ExpandMore/> : <ExpandLess/>}
                        />
                    </CardActionArea>
                    <Collapse in={showAbout} timeout="auto" onEntered={onResize} onExited={onResize}>
                        <About/>
                    </Collapse>
                </Card>

                <Card>
                    <CardActionArea onClick={() => setShowFilters(!showFilters)}>
                        <CardHeader title={"Filter Records"}
                                    titleTypographyProps={{variant: "h6"}}
                                    avatar={showFilters ? <ExpandMore/> : <ExpandLess/>}
                        />
                    </CardActionArea>
                    <Collapse in={showFilters} timeout="auto" onEntered={onResize} onExited={onResize}>
                        <FilterSet
                            recordTypes={recordTypes}
                            filters={filters}
                            toggleFilter={toggleFilter}
                            windowEnd={windowEnd}
                            windowDuration={windowDuration}
                        />
                    </Collapse>
                </Card>
            </Card>
        </div>
    </Collapse>
}

Submenu.propTypes = {
    visible: PropTypes.bool,
    connected: PropTypes.bool,
    when: PropTypes.object,
    onResize: PropTypes.func,
    color: PropTypes.string,
    recordTypes: PropTypes.object,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,
    toggleDarkMode: PropTypes.func,
    windowEnd: PropTypes.object,
    windowDuration: PropTypes.object,
};

Submenu.defaultProps = {
    visible: false,
    when: undefined,
    connected: true,
    onResize: () => null,
    color: "grey"
};

export default Submenu