import {
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    Collapse,
    IconButton,
    makeStyles,
    Tooltip,
} from "@material-ui/core";
import {
    AccessTime,
    Brightness4,
    BrightnessHigh,
    Cached,
    CalendarToday,
    ExpandLess,
    ExpandMore,
    History
} from "@material-ui/icons"

import * as React from "react";
import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import About from "./About";
import FilterSet from "./Filters/FilterSet";
import * as moment from "moment-timezone";
import {TimeIcon} from "@material-ui/pickers/_shared/icons/TimeIcon";

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
    const {
        visible, onResize, recordTypes, filters, toggleFilter, setShortDate, shortDate,
        toggleDarkMode, windowEnd, windowDuration, setRequestWindow, setWindowEnd
    } = props;
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

    let libraryTimeStart = moment.tz(windowEnd, 'Australia/Melbourne').format("LLLL z");
    let libraryTimeEnd = moment.tz(windowEnd, 'Australia/Melbourne').subtract(windowDuration).format("LLLL z");

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
                    <Tooltip title={"Change Date Format"}>
                        <IconButton onClick={() => setShortDate(!shortDate)}>
                            {shortDate ? <CalendarToday/> : <AccessTime/>}
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
                        <CardHeader title={"What time am I looking at?"}
                                    subheader={`This snapshot shows RMIT Library book data as it was between 
                                    ${libraryTimeEnd} and ${libraryTimeStart}`}
                                    avatar={<TimeIcon/>}
                        >
                        </CardHeader>
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
                            setRequestWindow={setRequestWindow}
                            setWindowEnd={setWindowEnd}
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

    setRequestWindow: PropTypes.func,
    setWindowEnd: PropTypes.func,
};

Submenu.defaultProps = {
    visible: false,
    when: undefined,
    connected: true,
    onResize: () => null,
    color: "grey"
};

export default Submenu