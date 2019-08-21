import * as React from "react";
import GridList from "@material-ui/core/GridList";
import tileData from "./tileData";
import GridListTile from "@material-ui/core/GridListTile";
import {makeStyles} from "@material-ui/core";

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

let colour = [
    "rgb(142, 68, 173)",
    "rgb(243, 156, 18)",
    "rgb(211, 84, 0)",
    "rgb(0, 106, 63)",
    "rgb(41, 128, 185)",
    "rgb(192, 57, 43)",
    "rgb(135, 0, 0)",
    "rgb(39, 174, 96)"
];

class Tile extends React.Component {
    reset = () => {
        var wall = new window.Freewall("#freewall");
        wall.fitWidth()
    };


    render() {
        const {tile} = this.props;
        return <div className={"brick"} >
            <img src={tile.img} alt={tile.title} onLoad={this.reset}/>
        </div>
    }
}

class Tiles extends React.Component {

    activate = (event) => {
        var wall = new window.Freewall("#freewall");

        wall.reset({
            selector: '.brick',
            animate: true,
            cellW: 150,
            cellH: 'auto',
            onResize: function() {
                wall.fitWidth();
            },
            bottomToTop: false,

        });
        wall.fitWidth();
    };

    render() {
        return <span id={"freewall"} className={"free-wall"} onLoad={this.activate}>
            {tileData.map(tile => (
                <Tile tile={tile} key={tile.img}/>
            ))}
        </span>
    }
}

export default Tiles