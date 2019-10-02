import React, {Component} from 'react';
import BookCard from "./Components/BookCard";
import Header from "./Header";
import Gallery from "./Components/Gallery";
import themeData from "./constants/theme";

class FetchData extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            width: this.findPercentWidth()
        };
    }


    findPercentWidth = () => {
        let adjusted = window.innerWidth - ((32 + themeData.cards.gutter) * 2);
        let num_cards = parseInt(adjusted/themeData.cards.size);
        console.log(`Calculated grid width: ${adjusted}; Expected column count: ${num_cards}`);
        return `${(100/num_cards)}% - ${themeData.cards.gutter*4}px`;
    };

    onResize = () => {
        let width = this.findPercentWidth();
        this.setState({
            width: width
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
        window.addEventListener('resize', this.onResize);

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
        window.removeEventListener('resize', this.onResize);

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

        const url = new URL(`${protocol}//${host}${location}/joint`);

        url.search = new URLSearchParams({
            "max_results": "200",
            "page": "1",
            "sort": "-last_view",
        });
        return url
    }

    fetchData = () => {
        fetch(this.buildRecordRequestURL(this.buildTimeFilter()).toString()).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                this.setState({
                        books: data["_items"].map(book => < BookCard key={book['_id']} book={book}
                        />),
                        connected: true,
                        last_beacon:
                            new Date()
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
        return <>
            <style>
                .book-dynamic {`{width:calc(${this.state.width})}`}
                .header-dynamic {`{width:calc((${this.state.width})*2 + ${themeData.cards.gutter}px * 4)}`}
            </style>
            <Gallery>
                {this.state.books && this.state.books}
                <Header
                    online={this.state.connected}
                    when={this.state.last_beacon}
                />
            </Gallery>
        </>
    }


}

export default (FetchData)
