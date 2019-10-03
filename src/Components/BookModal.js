import * as React from "react";
import Img from 'react-image'
import CircularProgress from "@material-ui/core/CircularProgress";

import themeData from "../constants/theme"
import Typography from "@material-ui/core/Typography";
import {Card, makeStyles} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
    image: {
        display: "inline-flex",
        flexGrow: 1,
        width: "200px",

    },
    text: {
        color: "white",
        textAlign: "center",
        padding: `${themeData.cards.gutter}px`,
        width: "calc(100 % -10px);",
        marginTop: "10px"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    clickable: {
        display: "inline-flex",
        flexDirection: "column",
        flexShrink: 1
    },
    card: {
        display: "inline-flex",
        flexDirection: "row",
        width: "80%",
    },
    content: {
        flexGrow: 4,
        display: "flex",
        flexDirection: "column",
    }
}));


function BookModal(props) {
    const classes = useStyles();
    const {title, description, link, images, onClose, open} = props;

    const loader = <CircularProgress/>;


    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Zoom in={open} timeout={500}>
            <Card className={classes.card}>
                <CardMedia className={classes.clickable}>
                    <Collapse in={true}>
                        <Img width={"100%"} src={images} alt={""} className={classes.image}
                             loader={loader}
                             unloader={<div className={classes.text}>
                             </div>}/>
                    </Collapse>
                </CardMedia>
                <CardContent className={classes.content}>
                    <Typography variant="h4" id="transition-modal-title"
                                gutterBottom>{title}</Typography>
                    <Typography variant="body2" component={"p"} id="transition-modal-title" gutterBottom={true}>
                        <a href={link}>View on Primo</a>
                    </Typography>
                    <Typography variant="body2" component={"p"} id="transition-modal-title">
                        <i>{description}</i>
                    </Typography>
                </CardContent>
            </Card>
        </Zoom>
    </Modal>

}


export default BookModal