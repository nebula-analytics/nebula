import React, {useState} from 'react';
import BookCard, {GenericCard} from "./Components/BookCard";
import Gallery from "./Components/Gallery";
import {getQueryStringValue} from "./helpers/utils";
import BookModal from "./Components/BookModal";
import HeaderBar from "./Navigation/HeaderBar";
import BookStyler from "./Components/BookStyler";
import * as themeData from "./constants/theme";
import * as PropTypes from "prop-types"
import moment from "moment";

function RecordDisplayLayer(props) {
    /*
    * Responsible for displaying records (books)
    */
    const [modalState, setModalState] = useState(null);
    const [filters, setFilterState] = useState([]);
    const [sorts, setSortState] = useState(["header", "time", "id"]);
    const [[saturation, brightness],] = useState([
        getQueryStringValue("saturation", 100),
        getQueryStringValue("brightness", 40)
    ]);
    const [shortDate, setShortDate] = useState(true);

    const {records = [], toggleDarkMode, upstream, windowDuration, windowEnd, setRequestWindow, setWindowEnd} = props;

    const recordTypes = getRecordTypes(records);

    return <React.Fragment>
        <BookStyler records={{values: Object.keys(recordTypes)}} brightness={brightness} saturation={saturation}/>
        <BookModal onClose={() => setModalState(null)} open={modalState !== null} values={modalState}/>
        <Gallery
            filter={filters}
            sortBy={sorts}
            packery={{
                gutter: themeData.cards.gutter,
                columnWidth: `.record`,
            }}
        >
            <HeaderBar
                upstream={upstream}
                recordTypes={recordTypes}
                filters={filters}
                toggleFilter={toggleFilter(filters, setFilterState)}
                toggleDarkMode={toggleDarkMode}
                windowEnd={windowEnd}
                windowDuration={windowDuration}
                setRequestWindow={setRequestWindow}
                setWindowEnd={setWindowEnd}
                setShortDate={setShortDate}
                shortDate={shortDate}
            />
            {isDesynced(upstream) && <GenericCard data-always_visible={true} data-order_first={8}>
                We're unable to contact the library site right now! We'll keep trying until we can reach it
            </GenericCard>}
            {records.map(createBook({
                createModal: setModalState,
                setFilter: setFilterState,
                setSort: setSortState,
                shortFormDate: shortDate
            }))}
        </Gallery>

    </React.Fragment>
}

const isDesynced = upstream => upstream.state !== "synced" ?
    upstream.last_reached === undefined ?
        upstream.last_attempt !== undefined
        : upstream.last_reached.isBefore(moment().subtract(30, 's'))
    : false;

const createBook = (props) => book => <BookCard key={book["_id"]} book={book} {...props}/>;

const isEqual = ({field: field1, value: value1}) => ({field: field2, value: value2}) => !(field1 === field2 && value1 === value2);

const getRecordTypes = records => records.reduce(
    /* Transform the records array into an mapping from type key to count of type */
    (state, {record_type, ...value}) => ({
        ...state,
        [record_type]: (state[record_type] || 0) + 1
    }), {}
);

const toggleFilter = (filters, setFilterState) => (...selectors) => setFilterState(selectors.reduce((state, value) => {
    /* Toggle a filter */
    const filtered = state.filter(isEqual(value));
    if (filtered.length !== state.length) {
        /* Toggle off */
        console.log("Off", value, filtered);
        return filtered
    } else {
        console.log("On", value, filtered);
        /* Toggle on */
        return [value, ...filtered]
    }
}, filters));


RecordDisplayLayer.propTypes = {
    toggleDarkMode: PropTypes.func,
    setRequestWindow: PropTypes.func,
    setWindowStart: PropTypes.func,
    setWindowEnd: PropTypes.func,
    records: PropTypes.arrayOf(PropTypes.object),
    upstream: PropTypes.object,
    windowEnd: PropTypes.object,
    windowDuration: PropTypes.object,
};

RecordDisplayLayer.defaultProps = {};
export default RecordDisplayLayer
