import React, {Component} from 'react';
import BookCard from "./Components/BookCard";
import Gallery from "./Components/Gallery";
import {buildRecordRequestURL, buildTimeFilter, getQueryStringValue} from "./helpers/utils";
import BookModal from "./Components/BookModal";
import BookSizer from "./Components/BookSizer";
import HeaderBar from "./Navigation/HeaderBar";


class FetchData extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            modal: null,
            modal_open: false,
            filter: undefined,
            sort: undefined,
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

    openModal = (title, data, link, images) => {
        this.setState({
            modal: {
                title: title,
                data: data,
                link: link,
                images: images
            },
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

        let query_frequency = parseInt(getQueryStringValue("refresh_rate", 0)) * 1000;

        if(query_frequency < min_query_frequency){
            query_frequency = min_query_frequency;
        }

        let timeout = this.getSyncTimeout(query_frequency);

        console.log(`Fetch immediate, sync begins in ${timeout} ms`);

        this.timeout = setTimeout(
            () => {
                console.log(`[${new Date()}] Kick off synchronization`);
                this.fetchData();
                this.timeout = setInterval(this.fetchData, query_frequency)
            },
            timeout
        );
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    fetchData = () => {
        const saturation = parseInt(getQueryStringValue("saturation", 0));
        const brightness = parseInt(getQueryStringValue("brightness", 30));
        fetch(buildRecordRequestURL(buildTimeFilter()).toString()).then(
            response => {
                return response.json()
            }
        ).then(data => this.setState({
                books: data["_items"].map(
                    book => <BookCard
                        key={book['_id']}
                        book={book}
                        createModal={this.openModal}
                        saturation={saturation}
                        brightness={brightness}
                        setFilter={this.setFilter}
                        setSort={this.setSort}
                    />),
                connected: true,
                last_beacon: new Date()
            })
        ).catch(err => {
            console.log(err);
            this.setState({
                connected: false
            })
        });

    };

    render() {
        const saturation = parseInt(getQueryStringValue("saturation", 0));
        const brightness = parseInt(getQueryStringValue("brightness", 50));
        return <>
            <Gallery
                filter={this.state.filter}
            >
                {this.state.books && this.state.books}
                <HeaderBar
                    connected={this.state.connected}
                    last_connected={this.state.last_beacon}
                    brightness={brightness}
                    saturation={saturation}
                />
                <BookSizer/>
            </Gallery>
            <BookModal onClose={this.closeModal} open={this.state.modal_open} {...this.state.modal}/>
        </>
    }


}

export default FetchData
