import {Card, CardHeader, CardContent, FormGroup, Grid, Button, CardActions} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import RecordTypeFilter from "./RecordTypeFilter";
import {DateTimePicker} from "@material-ui/pickers";
import moment from "moment";
import Slider from "@material-ui/core/Slider";


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
        <Card>
            <CardHeader
                title={"Alternate time periods"}
                subheader={"Information will update automatically."}
                avatar={<FilterList/>}
            />
            <CardContent>

                <DateTimePicker
                    label="Latest Record"
                    disableFuture
                    showTodayButton
                    value={windowEnd}
                    onChange={setTimeFilter("end")}
                    fullWidth
                />
                {windowDuration.humanize()}
                <Slider
                    getAriaLabel={v => moment.duration(v, "m").humanize()}
                    getAriaValueText={v => moment.duration(v, "m").humanize()}
                    onChangeCommitted={(v) => console.log(v)}
                    defaultValue={windowDuration.asMinutes()}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={30}
                    max={300}
                />
            </CardContent>
        </Card>
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