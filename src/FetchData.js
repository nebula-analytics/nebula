import React, {Component} from 'react';
import BookCard from "./Components/BookCard";
import Gallery from "./Components/Gallery";
import themeData from "./constants/theme";
import {getQueryStringValue} from "./helpers/utils";
import BookModal from "./Components/BookModal";
import BookSizer from "./Components/BookSizer";
import HeaderBar from "./Navigation/HeaderBar";


class FetchData extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            modal: null,
            modal_open: false
        };
    }

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

    findNumCards = () => {
        let adjusted = window.innerWidth - ((32 + themeData.cards.gutter) * 2);
        return parseInt(adjusted / themeData.cards.size);
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

        const query_frequency = 10000;

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


    buildTimeFilter(from, until) {
        let params = new URLSearchParams(window.location.search);
        if (until === undefined) {
            if (params.has("end_at")) {
                until = new Date(params.get("end_at"))
            } else {
                until = new Date()
            }
        }
        if (from === undefined) {
            if (params.has("start_at")) {
                from = new Date(params.get("start_at"));
            } else {
                let window = 30;
                if (params.has("window")) {
                    window = parseInt(params.get("window"))
                }
                from = until;
                from.setMinutes((until).getMinutes() - window);
            }
        }
        until = until.toUTCString();
        from = from.toUTCString();
        return {
            last_viewed: {"$gte": from, "$lte": until}
        };
    }

    buildRecordRequestURL(filter) {
        let protocol = window.location.protocol;
        let location = process.env.REACT_APP_API_LOCATION || ':8080';
        let host = process.env.REACT_APP_API_HOST || window.location.hostname;
        let max_results = getQueryStringValue("max_results") || this.findNumCards() * 10;

        const url = new URL(`${protocol}//${host}${location}/joint`);

        url.search = new URLSearchParams({
            "max_results": max_results,
            "page": "1",
            "sort": "-last_view",
        });
        return url
    }

    fetchData = () => {
        const saturation = parseInt(getQueryStringValue("saturation", 0));
        const brightness = parseInt(getQueryStringValue("brightness", 50));
        fetch(this.buildRecordRequestURL(this.buildTimeFilter()).toString()).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                this.setState({
                        books: data["_items"].map(
                            book => <BookCard
                                key={book['_id']}
                                book={book}
                                createModal={this.openModal}
                                saturation={saturation}
                                brightness={brightness}
                            />),
                        connected: true,
                        last_beacon: new Date()
                    }
                )
            }
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
            <Gallery>
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
