import React, {Component} from 'react';
import BookCard from "./Components/BookCard";
import {clearInterval} from 'timers';
import Header from "./Header";
import Gallery from "./Components/Gallery";

class FetchData extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
        };
    }

    componentDidMount() {
        this.fetchData();
        this.setState({timeout: setInterval(this.fetchData, 10000)});
    }

    componentWillUnmount() {
        clearInterval(this.state.timeout);
    }


    fetchData = () => {
        fetch('http://localhost:5000/joint').then(
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
        if (this.state.books !== undefined) {
            return <Gallery>
                {this.state.books}
                <Header online={this.state.connected}/>
            </Gallery>
        }
        return <Gallery>
            <Header online={this.state.connected}/>
        </Gallery>
    }


}

export default (FetchData)