import {
    CardContent,
    Checkbox,
    FormControlLabel,
    makeStyles,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio
} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function PropertyFilters(props) {
    const {filters, toggleFilter} = props;
    const classes = useStyles();

    const changeHasImageFilter = (newState) => {
        const newFilterState = [];
        filters.forEach(({field, value}) => {
            if (field === "has_image") {
                newFilterState.push({field, value})
            }
        });
        if (newState !== "all") {
            newFilterState.push({field: "has_image", value: newState})
        }
        console.log(newFilterState);
        toggleFilter(...newFilterState)
    };

    let has_images = "all";

    filters.forEach(({field, value}) => {
        if (field === "has_image") {
            has_images = value;
        }
    });

    return <>
        <CardContent>
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Cards to Show</FormLabel>
                <RadioGroup aria-label="Visible Cards" name="select card content" value={has_images}
                            onChange={(e, value) => changeHasImageFilter(value)}>
                    <FormControlLabel control={<Radio color="primary"/>} value={"all"} label="All"/>
                    <FormControlLabel control={<Radio color="secondary"/>} value="true" label="Images Only"/>
                    <FormControlLabel control={<Radio color="secondary"/>} value="false" label="Text Only"/>
                </RadioGroup>
            </FormControl>
        </CardContent>
    </>
}

PropertyFilters.propTypes = {
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,
};

PropertyFilters.defaultProps = {};

export default PropertyFilters