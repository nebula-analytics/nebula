import { Card, CardHeader, CardContent, FormGroup, Grid, Button, CardActions } from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import RecordTypeFilter from "./RecordTypeFilter";
import {DateTimePicker} from "@material-ui/pickers";
import moment from "moment";


function FilterSet(props) {
    const {recordTypes, filters, toggleFilter, setTimeFilter, windowDuration, windowEnd} = props;

    const windowStart = windowEnd.clone().add(windowDuration);

    return <Card>
        <CardHeader
            title={"Filter by Record Type"}
            subheader={"Show/hide any combination of records by toggling the buttons below!"}
            avatar={<FilterList/>}
        />
        <CardContent>
            <RecordTypeFilter recordTypes={recordTypes} filters={filters} toggleFilter={toggleFilter}/>
        </CardContent>
        <FormGroup row>
            <Card>
                <CardHeader
                    title={"By Time Period"}
                    subheader={"Take a look into the past."}
                    avatar={<FilterList/>}
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <DateTimePicker
                                label="Latest Record"
                                disableFuture
                                showTodayButton
                                value={windowEnd}
                                onChange={setTimeFilter("end")}
                            />

                        </Grid>

                        <Grid item xs={6}>
                            <DateTimePicker
                                value={windowStart}
                                disableFuture
                                onChange={setTimeFilter("start")}
                                label="Earliest Record"
                                showTodayButton
                                maxDate={windowEnd}
                            />
                        </Grid>
                        <CardActions>
                            <Button fullWidth>Update Times</Button>
                        </CardActions>

                    </Grid>
                </CardContent>
            </Card>
        </FormGroup>
    </Card>

}

FilterSet.propTypes = {
    recordTypes: PropTypes.object,
    filterDates: PropTypes.object,
    setTimeFilter: PropTypes.func,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,
    windowEnd: PropTypes.object,
    windowDuration: PropTypes.object,
};

FilterSet.defaultProps = {
    filters: [],
    filterDates: {start: null, end: null},
    setTimeFilter: () => {
    },
};

export default FilterSet