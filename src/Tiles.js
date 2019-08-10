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
    gridList: {
    },
}));

class Tiles extends React.Component {
    render() {
        return <GridList className={""} cols={3}>
            {tileData.map(tile => (
                <GridListTile style={{height:"auto !important"}} key={tile.img} cols={tile.cols || 1}>
                    <img src={tile.img} alt={tile.title}/>
                </GridListTile>
            ))}
        </GridList>
    }
}

export default Tiles