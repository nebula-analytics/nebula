import React, { Component } from 'react';
import BookCard from "./Components/BookCard";

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
        setInterval(this.fetchData, 10000);

        // let bookCollection = data.map((element) => {
        //     return (
        //         <BookCard book={element}/>
        //     )
        // })
        // this.setState({books: bookCollection})
    }

    async fetchData() {
        try{
            const response = await fetch('http://localhost:5000/joint');
            const data = await response.json();
            let bookCollection = data['_items'].map((element) => {
                return (
                    <BookCard key={element['_id']} book={element}/>
                )
            })
            this.setState({books: bookCollection});
            console.log("State", this.state.books);

        } catch (e) {
            console.log(e);
        }
    }


    render(){
        return this.state.books;
    }


}

export default (FetchData)