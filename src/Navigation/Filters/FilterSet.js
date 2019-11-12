import {Card, CardContent, CardHeader} from "@material-ui/core";
import * as React from "react";
import * as PropTypes from "prop-types";
import {FilterList} from "@material-ui/icons"
import RecordTypeFilter from "./RecordTypeFilter";
import SnapshotSelector from "./SnapshotSelector";
import PropertyFilters from "./PropertyFilters";

function FilterSet(props) {
    const {recordTypes, filters, toggleFilter, setWindowEnd, setRequestWindow, windowDuration, windowEnd} = props;

    return <Card>

        <CardHeader
            title={"Change Snapshot Period"}
            subheader={"Information will update automatically."}
            avatar={<FilterList/>}
        />
        <SnapshotSelector setWindowEnd={setWindowEnd} setRequestWindow={setRequestWindow}
                          windowDuration={windowDuration} windowEnd={windowEnd}/>

        <CardHeader
            title={"Filter by Content"}
            subheader={"Show/Hide records based on thier visible properties"}
            avatar={<FilterList/>}
        />
        <PropertyFilters filters={filters} toggleFilter={toggleFilter}/>

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
    filters: PropTypes.array,
    toggleFilter: PropTypes.func,
    windowEnd: PropTypes.object,
    windowDuration: PropTypes.object,
    setWindowEnd: PropTypes.func,
    setRequestWindow: PropTypes.func,
};

FilterSet.defaultProps = {
    filters: []
};

export default FilterSet