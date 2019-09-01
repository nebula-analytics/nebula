import * as React from "react";
import * as PropTypes from "prop-types";
import Img from 'react-image'
import CircularProgress from "@material-ui/core/CircularProgress";
import {Card} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";

import themeData from "../constants/theme"
import CardActionArea from "@material-ui/core/CardActionArea";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";

const styles = theme => {
    return {
        root: {
            border: "2px solid hsla(0, 0%, 0%, 0.5)",
            borderRadius: "5px",

            float: "left",
            marginBottom: `${themeData.cards.gutter}px`,
            minHeight: `${themeData.cards.size / 2}px`,
            width: `${themeData.cards.size}px`,
            display: "flex",
            flexDirection: "column"

        },
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
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    };
};

class BookCard extends React.Component {
    state = {
        open: false,
    };

    static propTypes = {
        book: PropTypes.object.isRequired,
        onResize: PropTypes.func,
    };

    onClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    render() {
        const {book, classes, onResize} = this.props;
        const {open} = this.state;

        const url = `http://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`;
        const large_url = `http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;

        const loader = <CircularProgress/>;
        const fallback = <div className={classes.text}>
            <h3>{book.title}</h3>
        </div>;

        return <Card className={classes.root}>
            <CardActionArea onClick={this.onClick} className={classes.clickable}>
                <Img src={url} alt={""} className={classes.image} loader={loader}
                     unloader={fallback}/>
            </CardActionArea>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={this.onClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} on>
                    <Card>
                        <CardActionArea className={classes.clickable}>
                            <Collapse in={true}>
                                <Img width={"100%"} src={large_url} alt={""} className={classes.image} loader={loader}
                                     unloader={<div className={classes.text}>
                                         <h3>No image available</h3>
                                     </div>}/>
                            </Collapse>
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="body1" id="transition-modal-title"
                                        gutterBottom>{book.title}</Typography>
                            <Typography variant="body2" component={"p"} id="transition-modal-title">More information
                                about {book.title}.</Typography>
                        </CardContent>
                    </Card>
                </Fade>
            </Modal>
        </Card>
    }
}

export default withStyles(styles)(BookCard)