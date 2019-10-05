import * as React from "react";
import Img from 'react-image'
import CircularProgress from "@material-ui/core/CircularProgress";

import themeData from "../constants/theme"
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import {Visibility} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
    clickable: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1
    },
    image: {
        width: "100%"
    },
    text: {
        color: "white",
        textAlign: "center",
        padding: `${themeData.cards.gutter}px`,
        width: "calc(100 % -10px);",
        marginTop: "10px"
    },

    tag: {
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "10",
        padding: "2px",
        background: "#00000070",
        borderBottomRightRadius: "5px",
        textTransform: "capitalize",
    },
    views: {
        position: "absolute",
        top: "0",
        right: "0",
        zIndex: "10",
        margin: theme.spacing(1)
    }
}));


function BookView(props) {
    const classes = useStyles();
    const {book, onClick, images, title, record_type, color} = props;

    const loader = <CircularProgress/>;
    const fallback = <div className={classes.text}><h3>{title}</h3></div>;


    return <CardActionArea onClick={onClick} className={classes.clickable} style={{background: color}}>
        <Typography className={classes.tag}>{record_type}</Typography>

        <Img src={images} alt={""} className={classes.image} loader={loader}
             unloader={fallback}
             container={(c) => <Zoom mountOnEnter={true} in={true} appear={true} timeout={1000}>{c}</Zoom>}
        />

        <div className={classes.views}>
            {book.count > 1 &&
            <Badge badgeContent={book.count} overlap={"circle"} color="primary">
                <Visibility/>
            </Badge>
            }
        </div>
    </CardActionArea>

}

export default BookView