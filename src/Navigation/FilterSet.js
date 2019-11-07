import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Card, CardHeader, makeStyles} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {} from "@material-ui/icons"
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {useState} from "react";
import TabPanel from "./TabPanel";
import {FilterList} from "@material-ui/icons";
import {Visibility} from "@material-ui/icons";
import {VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        background: "white",
    },
    checkSet: {
        color: "black",
        width: "100%",
    },
    group: {
        flexDirection: "row",
        width: "100%"
    },
    checkbox: {
        textTransform: "capitalize"
    }
}));

function FilterSet(props) {
    const {recordTypes, filters, toggleFilter} = props;
    const classes = useStyles();

    const enabledRecordFilters = [];
    filters.forEach(({field, value}) => {
        if (field === "record_type") {
            enabledRecordFilters.push(value);
        }
    });

    return <Card>
        <CardHeader
            title={"By Record Type"}
            subheader={"Select any combination to show!"}
            avatar={<FilterList/>}
        />
        <CardContent>
            <FormGroup row>
                {Object.keys(recordTypes).map(type =>
                    <FormControlLabel
                        control={<Checkbox
                            icon={<VisibilityOff label-record_type={type}/>}
                            checkedIcon={<Visibility label-record_type={type}/>}
                            checked={enabledRecordFilters.includes(type)}
                            onChange={() => toggleFilter("record_type", type)}
                        />}
                        label={type.replace("_", " ") + `(${recordTypes[type]})`}
                        className={classes.checkbox}
                    />
                )}
            </FormGroup>

        </CardContent>
    </Card>

}

FilterSet.propTypes = {
    recordTypes: PropTypes.object,
    filters: PropTypes.object,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func
};

FilterSet.defaultProps = {
    filters: [{field: "record_type", value: "book"}]
};

export default FilterSet