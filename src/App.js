import React from 'react';
import './App.css';
import Header from "./Header";
import Gallery from "./Components/Gallery";
import Img from 'react-image'
import data from "./constants/stub";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
    return (
        <div className="App">
            <Gallery>
                <Header/>

                {
                    data.map((element) => {
                            const url = `http://covers.openlibrary.org/b/isbn/${element.isbn}-M.jpg`;
                            const loader =  <CircularProgress className={"load"} />;
                            return <div className={"grid-item image-element-class"} style={{height: "auto"}}
                                        key={element.isbn}>
                                <Img src={url} alt={""} style={{"width": "100%"}} loader={loader} unloader={loader}/>
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
