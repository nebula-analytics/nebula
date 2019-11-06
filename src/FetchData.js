import React, {Component, createRef} from 'react';
import BookCard from "./Components/BookCard";
import Gallery from "./Components/Gallery";
import {buildRecordRequestURL, buildTimeFilter, getQueryStringValue} from "./helpers/utils";
import BookModal from "./Components/BookModal";
import HeaderBar from "./Navigation/HeaderBar";
import BookStyler from "./Components/BookStyler";
import * as themeData from "./constants/theme";


class FetchData extends Component {
    constructor(props) {
        super(props);
        this.headerRef = createRef();
        this.state = {
            upstream: {
                state: "connecting"
            },
            books: [],
            modal: null,
            modal_open: false,
            filter: undefined,
        };
    }

    setFilter = (filter = undefined) => {
        if (typeof filter === "string") {
            filter = `${filter}, .stamp`
        }
        if (filter === this.state.filter) {
            filter = null

        }
        this.setState({
            filter: filter
        })
    };

    setSort = (sort = undefined) => {
        this.setState({
            sort: sort
        })
    };

    openModal = (bookData) => {
        this.setState({
            modal: bookData,
            modal_open: true
        })
    };

    closeModal = () => {
        this.setState({
            modal_open: false
        })
    };

    getSyncTimeout = (query_frequency) => {
        let params = new URLSearchParams(window.location.search);
        if (params.has("sync_key")) {
            try {
                let common_date = new Date(parseInt(params.get("sync_key")));

                let now = new Date();
                let ms = now.valueOf() - common_date.valueOf();
                return query_frequency - (ms % query_frequency)
            } catch (e) {
                console.log(e);
            }
        }
        return 0
    };

    componentDidMount() {

        const min_query_frequency = 10000;

        let query_frequency = parseInt(getQueryStringValue("refresh_interval", 0)) * 1000;

        if (query_frequency < min_query_frequency) {
            query_frequency = min_query_frequency;
        }

        let timeout = this.getSyncTimeout(query_frequency);

        console.log(`Calculated refresh interval: ${query_frequency} ms`);
        console.log(`Time remaining until first request: ${timeout} ms`);

        if (timeout > 3000) {
            console.log("Next timeout exceeds time boundary (> 3000 ms in future), fetching now");
            this.fetchData()
        }

        this.timeout = setTimeout(
            () => {
                console.log(`[${new Date()}] Kick off synchronization`);
                this.fetchData();
                this.timeout = setInterval(this.fetchData, query_frequency)
            },
            timeout
        );
    }

    getRecordTypeCounts = () => {
        const types = {};
        if (this.state.books) {
            this.state.books.map(record => {
                if (!types.hasOwnProperty(record.record_type)) {
                    types[record.record_type] = 0
                }
                types[record.record_type] += 1
            })
        }
        return types
    };

    componentWillUnmount() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    fetchData = () => {
        const destination = buildRecordRequestURL(buildTimeFilter()).toString();
        this.setState({
            upstream: {
                state: "connecting",
                last_reached: this.state.upstream.last_reached,
                last_attempt: this.state.upstream.last_attempt,
            },
        });
        fetch(destination).then(
            response => {
                return response.json()
            }
        ).then(data => this.setState({
                books: data["_items"],
                upstream: {state: "synced", last_reached: new Date(), last_attempt: new Date()},
                last_beacon: new Date()
            })
        ).catch(err => {
            console.log(err);
            this.setState({
                upstream: {
                    state: "desynced",
                    last_reached: this.state.upstream.last_reached,
                    last_attempt: new Date()
                },
            })
        });

    };

    render() {
        const saturation = parseInt(getQueryStringValue("saturation", 0));
        const brightness = parseInt(getQueryStringValue("brightness", 50));
        const typeCounts = this.getRecordTypeCounts();
        return <>
            <Gallery
                filter={this.state.filter}
                packery={{
                    gutter: themeData.cards.gutter,
                    columnWidth: `.record`,
                }}
                sortBy={["header", "time", "id"]}
            >
                {this.state.books && this.state.books.map(
                    book => <BookCard
                        key={book['_id']}
                        book={book}
                        createModal={this.openModal}
                        setFilter={this.setFilter}
                        setSort={this.setSort}
                    />)}
                <HeaderBar
                    upstream={this.state.upstream}
                    recordTypes={typeCounts}
                />
            </Gallery>
            <BookStyler
                records={{values: Object.keys(typeCounts)}}
                brightness={brightness}
                saturation={saturation}
            />
            <BookModal onClose={this.closeModal} open={this.state.modal_open} values={this.state.modal}/>
        </>
    }


}

export default FetchData
