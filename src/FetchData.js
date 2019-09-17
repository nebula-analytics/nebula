import React, { Component } from 'react';
import BookCard from "./Components/BookCard";
import { clearInterval } from 'timers';

class FetchData extends Component{
    constructor(){
        super();
        this.state = {
            books: [],
        };
    }

    componentDidMount()
    {
        this.fetchData()
        this.setState({timeout:setInterval(this.fetchData, 10000)});

        // let bookCollection = data.map((element) => {
        //     return (
        //         <BookCard book={element}/>
        //     )
        // })
        // this.setState({books: bookCollection})
    }

    componentWillUnmount(){
        clearInterval(this.state.timeout);
    }


    fetchData = () => {
        fetch('http://localhost:5000/joint').then(
            response => {
                return response.json()
            }
        ).then(
            data => {this.setState({
                books: data["_items"].map(book => <BookCard key={book['_id']} book={book}/>)
            })
        }
        ).catch(err => console.log(err))
    }

    render(){
        if(this.state.books !== undefined){
            return this.state.books
        }
        return
    }


}

export default (FetchData)