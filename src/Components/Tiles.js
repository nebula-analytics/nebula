import * as React from "react";
import tileData from "../tileData";
import {makeStyles} from "@material-ui/core/index";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {},
}));

class Tile extends React.Component {
    reset = () => {
        // console.log("Fit");
        let wall = new window.Freewall("#freewall");
        wall.fitWidth();
    };


    render() {
        const {tile} = this.props;
        let width = 100 + Math.floor(Math.random() * Math.floor(10)) * 10;
        let height = 100 + Math.floor(Math.random() * Math.floor(10)) * 10;
        return <div className={"grid-item"} style={{height: "auto"}}>
            {/*<img src={`https://source.unsplash.com/random/${width}x${height}?prevent-cache=1`} alt={tile.title}/>*/}
            <img src={tile.img} alt={tile.title} style={{"maxWidth": "100%"}}/>
        </div>
    }
}

class Tiles extends React.Component {

    activate = (event) => {
        var wall = new window.Freewall("#freewall");
        //
        wall.reset({
            selector: '.brick',
            cellW: 200,
            // cellH: 'auto',
            gutterX: 20,
            gutterY: 20,
            // // onResize: function () {
            // // },
            // bottomToTop: true

        });

    };

    render_freewall() {
        return <div id={"freewall"} className={"free-wall"} onLoad={this.activate}>
            {tileData.map(tile => (
                <Tile tile={tile} key={tile.img}/>
            ))}
        </div>
    }

    render() {
        return <div className="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
            <div className={"grid-item"}>Hello World</div>
            {tileData.map(tile => (
                <Tile tile={tile} key={tile.img}/>
            ))}
        </div>
    }
}

export default Tiles