import React from 'react';
import './App.css';
import Header from "./Header";
import Gallery from "./Components/Gallery";
import data from "./constants/stub";

function App() {
    // I've modified the basic CRA to include some material-ui elements
    return (
        <div className="App">
            <Gallery>
                <Header/>

                {
                    data.map((element) => {
                            const url = `http://covers.openlibrary.org/b/isbn/${element.isbn}-M.jpg`;
                            return <div className={"grid-item image-element-class"} style={{height: "auto"}} key={element.isbn}>
                                <img src={url} alt={element.title} style={{"width": "100%"}}/>
                                <div className={"title"}>{element.title}</div>
                            </div>
                        }
                    )
                }
            </Gallery>
        </div>
    );
}

export default App;
