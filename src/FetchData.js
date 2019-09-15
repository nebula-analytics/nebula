import React, { Component } from 'react';
import BookCard from "./Components/BookCard";

class FetchData extends Component{
    constructor(){
        super();
        this.state = {
            books: [],
        };
    }

    componentWillMount()
    {
        fetch('http://localhost:5000/api/data')
        .then(results => {
            console.log(results);
            return results.json();
        }).then(data => {
            let bookCollection = data['data'].map((element) => {
                return (
                    <BookCard book={element}/>
                )
            })
            this.setState({books: bookCollection});
            console.log("State", this.state.books);
        })

        // let bookCollection = data.map((element) => {
        //     return (
        //         <BookCard book={element}/>
        //     )
        // })
        // this.setState({books: bookCollection})
    }


    render(){
        return this.state.books;
    }


}

export default (FetchData)