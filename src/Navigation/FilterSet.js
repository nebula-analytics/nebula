import CardContent from "@material-ui/core/CardContent";
import {Card, CardHeader} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RecordTypeFilter from "./Filters/RecordTypeFilter";
import {DateTimePicker} from "@material-ui/pickers";
import moment from "moment";
import CardActions from "@material-ui/core/CardActions";


function FilterSet(props) {
    const {recordTypes, filters, toggleFilter, filterDates, setTimeFilter} = props;

    const {start, end} = filterDates;

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
                                value={end}
                                onChange={setTimeFilter("end")}
                            />

                        </Grid>

                        <Grid item xs={6}>
                            <DateTimePicker
                                value={start}
                                disableFuture
                                onChange={setTimeFilter("start")}
                                label="Earliest Record"
                                showTodayButton
                                maxDate={end || moment()}
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
    toggleFilter: PropTypes.func
};

FilterSet.defaultProps = {
    filters: [],
    filterDates: {start: null, end: null},
    setTimeFilter: () => {
    },
};

export default FilterSet