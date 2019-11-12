import {CardContent, FormControl, InputLabel, makeStyles, Slider} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2),
        width: "100%"
    },
}));

function SnapshotSelector(props) {
    const { setWindowEnd, setRequestWindow, windowDuration, windowEnd} = props;
    const classes = useStyles();

    return <>
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
        </CardContent>
    </>
}

SnapshotSelector.propTypes = {
    windowEnd: PropTypes.object,
    windowDuration: PropTypes.object,
    setWindowEnd: PropTypes.func,
    setRequestWindow: PropTypes.func,
};

SnapshotSelector.defaultProps = {
    setWindowEnd: () => {
    },
    setRequestWindow: () => {
    }
};

export default SnapshotSelector