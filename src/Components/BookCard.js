import * as React from "react";
import * as PropTypes from "prop-types";
import Img from 'react-image'
import CircularProgress from "@material-ui/core/CircularProgress";
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import themeData from "../constants/theme"
import CardActionArea from "@material-ui/core/CardActionArea";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Zoom from "@material-ui/core/Zoom";
import Badge from "@material-ui/core/Badge";
import {Visibility} from "@material-ui/icons";

const styles = theme => {
    return {
        root: {
            border: "2px solid hsla(0, 0%, 0%, 0.5)",
            borderRadius: "5px",

            float: "left",
            marginBottom: `${themeData.cards.gutter}px`,
            minHeight: `${themeData.cards.size / 2}px`,
            // width: `${themeData.cards.size}px`,
            display: "flex",
            flexDirection: "column",
            width: `100%`,

            [theme.breakpoints.up('xs')]: {
                width: "48%",
            },
            [theme.breakpoints.up('sm')]: {
                width: `${themeData.cards.size}px`,
            }

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
            marginTop: "10px"
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
        const {book, classes} = this.props;
        const {open} = this.state;
        let image_url = "";
        let large_image_url = "";

        if (book.record_type === "book") {
            let isbn = book.identifiers.filter((id_object) => id_object.idType === "http://purl.org/dc/terms/type/isbn");
            if (isbn[0]) {
                isbn = isbn[0].id.replace("-", "").replace("-", "").replace("-", "")
                image_url = `https://proxy-ap.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.aspx?isbn=${isbn}/LC.JPG&client=primo`;
                large_image_url = `https://proxy-ap.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.aspx?isbn=${isbn}/LC.JPG&client=primo`;
            }


        }

        const type = book.record_type.replace("_", " ");
        const loader = <CircularProgress/>;
        const fallback = <div className={classes.text}>
            <h3>{book.title}</h3>
        </div>;

        return <Card className={classes.root}>
            <CardActionArea onClick={this.onClick} className={classes.clickable}>
                <Typography className={classes.tag}>{type}</Typography>
                <Img src={image_url} alt={""} className={classes.image} loader={loader}
                     unloader={fallback}/>
                {book.count > 1 &&
                <Badge className={classes.views} badgeContent={book.count} overlap={"circle"} color="primary">
                    <Visibility/>
                </Badge>
                }
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
                <Zoom in={open} timeout={300}>
                    <Card>
                        <CardActionArea className={classes.clickable}>
                            <Collapse in={true}>
                                <Img width={"100%"} src={large_image_url} alt={""} className={classes.image}
                                     loader={loader}
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
                            <Typography variant="body2" component={"p"} id="transition-modal-title">
                                {JSON.stringify(book)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Zoom>
            </Modal>
        </Card>
    }
}

export default withStyles(styles)(BookCard)