import {Visibility} from "@material-ui/icons";
import * as React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import * as PropTypes from "prop-types";

import {
    List,
    Checkbox,
    ListItemIcon,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    item: {
        textTransform: "capitalize"
    }
}));

function RecordTypeFilter(props) {
    let {recordTypes, filters, toggleFilter} = props;
    const classes = useStyles();

    const enabledRecordFilters = [];
    filters.forEach(({field, value}) => {
        if (field === "record_type") {
            enabledRecordFilters.push(value);
        }
    });
    const handleToggle = (type) => () => toggleFilter({field: "record_type", value: type});
    return (
        <List className={classes.root}>
            {
                Object.keys(recordTypes).length === 0 &&
                [1, 2, 3].map(i => <ListItem key={i} role={undefined} dense disableGutters button onClick={null}>
                        <ListItemIcon>
                            <Skeleton variant="rect" width={30} height={30}/>
                        </ListItemIcon>
                        <Skeleton variant="text" width={"calc(100% - 80px)"} height={30}/>
                        <ListItemSecondaryAction>
                            <Skeleton variant="circle" width={40} height={30}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
            {Object.keys(recordTypes).sort().map(type => {
                const labelId = `checkbox-list-label-${type}`;
                const checked = enabledRecordFilters.includes(type);

                return (
                    <ListItem key={type} role={undefined} dense button
                              onClick={handleToggle(type)}>
                        <ListItemIcon>
                            <Checkbox
                                label-record_type={type}
                                edge="start"
                                tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                                checked={checked}
                                onChange={handleToggle(type)}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} className={classes.item}
                                      primary={type.replace("_", " ") + ` (${recordTypes[type]})`}/>
                        <ListItemSecondaryAction>
                            {checked && <Visibility label-record_type={type}
                                                    edge="end" aria-label="visibility status"/>}
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    )
}

RecordTypeFilter.propTypes = {
    recordTypes: PropTypes.object,
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,

};

RecordTypeFilter.defaultProps = {};

export default RecordTypeFilter