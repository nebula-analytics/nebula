import React, {Component} from 'react';
import BookCard from "./Components/BookCard";
import Header from "./Header";
import Gallery from "./Components/Gallery";

class FetchData extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
        };
    }

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
            if(params.has("end_at")){
                until= new Date(params.get("end_at"))
            }else {
                until = new Date()
            }
        }
        if (from === undefined) {
            if (params.has("start_at")) {
                from = new Date(params.get("start_at"));
            } else {
                let window = 30;
                if(params.has("window")){
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
        let location = process.env.REACT_APP_API_LOCATION || ':8080';
        const url = new URL(`http://${window.location.hostname}${location}/joint`);

        url.search = new URLSearchParams({
            "max_results": "200",
            "page": "1",
            "sort": "-last_view",
            "where": JSON.stringify(filter)
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
        return <Gallery>
            {this.state.books && this.state.books}
            <Header
                online={this.state.connected}
                when={this.state.last_beacon}
            />
        </Gallery>
    }


}

export default (FetchData)
