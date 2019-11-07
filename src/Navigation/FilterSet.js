import CardContent from "@material-ui/core/CardContent";
import {Card, CardHeader, makeStyles, TextField} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList, Visibility, VisibilityOff} from "@material-ui/icons"
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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
        <CardHeader
            title={"By Time Period"}
            subheader={"Take a look into the past."}
            avatar={<FilterList/>}
        />
        <FormGroup row>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        label={"Start Date"}
                        type={"date"}
                        InputLabelProps={{shrink: true}}
                        margin={"normal"}
                        variant={"filled"}
                        fullWidth

                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        label={"Start Time"}
                        type={"time"}
                        InputLabelProps={{shrink: true}}
                        margin={"normal"}
                        variant={"filled"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={"End Date"}
                        type={"date"}
                        InputLabelProps={{shrink: true}}
                        margin={"normal"}
                        variant={"filled"}
                        fullWidth

                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        label={"End Time"}
                        type={"time"}
                        InputLabelProps={{shrink: true}}
                        margin={"normal"}
                        variant={"filled"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth>View</Button>
                </Grid>
            </Grid>
        </FormGroup>
    </Card>

}

FilterSet.propTypes = {
    recordTypes: PropTypes.object,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func
};

FilterSet.defaultProps = {
    filters: [{field: "record_type", value: "book"}]
};

export default FilterSet