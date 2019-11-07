import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {CardHeader, makeStyles} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import * as React from "react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {ExpandLess, ExpandMore, Group, Info, QuestionAnswer} from "@material-ui/icons"
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Link from "@material-ui/core/Link";
import Creators from "./Creators";
import Card from "@material-ui/core/Card";
import About from "./About";
import CardActionArea from "@material-ui/core/CardActionArea";
import FilterSet from "./FilterSet";
import {useEffect} from "react";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function Submenu(props) {
    const {visible, onResize, recordTypes, filters, toggleFilter} = props;
    const classes = useStyles();
    const [showAbout, setShowAbout] = useState(
        JSON.parse(localStorage.getItem("Submenu.about") || "true")
    );
    const [showFilters, setShowFilters] = useState(
        JSON.parse(localStorage.getItem("Submenu.filters") || "false")
    );

    useEffect(
        () => {
            localStorage.setItem("Submenu.filters", JSON.stringify(showFilters));
            localStorage.setItem("Submenu.about", JSON.stringify(showAbout));
        }, [showFilters, showAbout, onResize]
    );


    return <Collapse in={visible} timeout="auto" onEntered={onResize} onExited={onResize}>
        <div className={classes.root}>

            <Card>
                <Card>
                    <CardActionArea onClick={() => setShowAbout(!showAbout)}>
                        <CardHeader title={"About Nebula (Library Live)"}
                                    avatar={showAbout ? <ExpandMore/> : <ExpandLess/>}
                        />
                    </CardActionArea>
                    <Collapse in={showAbout} timeout="auto" onEntered={onResize} onExited={onResize} >
                        <About/>
                    </Collapse>
                </Card>

                <Card>
                    <CardActionArea onClick={() => setShowFilters(!showFilters)}>
                        <CardHeader title={"Filtering"}
                                    avatar={showFilters ? <ExpandMore/> : <ExpandLess/>}
                        />
                    </CardActionArea>
                    <Collapse in={showFilters} timeout="auto" onEntered={onResize} onExited={onResize}>
                        <FilterSet
                            recordTypes={recordTypes}
                            filters={filters}
                            toggleFilter={toggleFilter}
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
    toggleFilter: PropTypes.func
};

Submenu.defaultProps = {
    visible: false,
    when: undefined,
    connected: true,
    onResize: () => null,
    color: "grey"
};

export default Submenu