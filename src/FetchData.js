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
        if(params.has("sync_key")) {
            try {
                let common_date = new Date(parseInt(params.get("sync_key")));

                let now = new Date();
                let ms = now.valueOf() - common_date.valueOf();
                return query_frequency - (ms % query_frequency)
            }catch (e) {
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


    fetchData = () => {
        fetch(`http://${window.location.hostname}:8080/joint?max_results=200&page=1&sort=-last_view`).then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                this.setState({
                        books: data["_items"].map(book => <BookCard key={book['_id']} book={book}/>),
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
        return <Gallery>
            {this.state.books && this.state.books}
            <Header online={this.state.connected} when={this.state.last_beacon}/>
        </Gallery>
    }


}

export default (FetchData)
