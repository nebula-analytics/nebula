import CardContent from "@material-ui/core/CardContent";
import {Card, CardHeader, TextField} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RecordTypeFilter from "./Filters/RecordTypeFilter";


function FilterSet(props) {
    const {recordTypes, filters, toggleFilter} = props;


    return <Card>
        <CardHeader
            title={"Filter by Record Type"}
            subheader={"Show/hide any combination of records by toggling the buttons below!"}
            avatar={<FilterList/>}
        />
        <CardContent>
            <RecordTypeFilter recordTypes={recordTypes} filters={filters} toggleFilter={toggleFilter}/>
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
    filters: []
};

export default FilterSet