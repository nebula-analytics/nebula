import {Card, CardContent, CardHeader, FormControl, InputLabel, makeStyles, Slider} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import RecordTypeFilter from "./RecordTypeFilter";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function FilterSet(props) {
    const {recordTypes, filters, toggleFilter, setWindowEnd, setRequestWindow, windowDuration, windowEnd} = props;
    const classes = useStyles();

    return <Card>
        <Card>
            <CardHeader
                title={"Change Snapshot Period"}
                subheader={"Information will update automatically."}
                avatar={<FilterList/>}
            />
            <CardContent>
                <KeyboardDateTimePicker
                    variant="inline"
                    inputVariant="outlined"
                    ampm={false}
                    label="Snapshot Starts At"
                    disableFuture
                    value={windowEnd}
                    onChange={setWindowEnd}
                    fullWidth
                    maxDateMessage={"You can't view the future :("}
                    autoOk
                />

            </CardContent>
            <CardContent>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="window-duration-slider" id={"window-duration-slider-label"}>Snapshot Duration
                        (minutes)</InputLabel>
                    <Slider
                        getAriaLabel={v => moment.duration(v, "m").humanize()}
                        getAriaValueText={v => moment.duration(v, "m").humanize()}
                        onChangeCommitted={(e, v) => setRequestWindow(v)}
                        defaultValue={windowDuration.asMinutes()}
                        valueLabelDisplay="auto"
                        id={"window-duration-slider"}
                        aria-labelledby={"window-duration-slider-label"}
                        step={10}
                        marks={true}
                        min={30}
                        max={300}
                    />
                </FormControl>
            </CardContent>
        </Card>

        <CardHeader
            title={"Filter by Record Type"}
            subheader={"Show/hide any combination of records by toggling the buttons below!"}
            avatar={<FilterList/>}
        />
        <CardContent>
            <RecordTypeFilter recordTypes={recordTypes} filters={filters} toggleFilter={toggleFilter}/>
        </CardContent>
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
    setWindowEnd: PropTypes.func,
    setRequestWindow: PropTypes.func,
};

FilterSet.defaultProps = {
    filters: [],
    filterDates: {start: null, end: null},
    setWindowEnd: () => {
    },
    setRequestWindow: () => {
    }
};

export default FilterSet