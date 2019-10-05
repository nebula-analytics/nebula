import * as React from "react";
import Img from 'react-image'

import themeData from "../constants/theme"
import Typography from "@material-ui/core/Typography";
import {Card, makeStyles, TableCell} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import {Label, Launch} from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles((theme) => ({
    image: {
        display: "inline-flex",
        flexGrow: 1,
        maxWidth: "200px",
        maxHeight: "500px"
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
        flexDirection: "column",
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
        flexDirection: "column",
        width: "80%",
    },
    content: {
        flexGrow: 4,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll"
    },
    header: {
        display: "inline-flex",
        flexDirection: "row",
    },
    headerText: {
        flexGrow: 1,
        textTransform: "capitalize",
    },
    keyCell: {
        textTransform: "capitalize",
    },
    valueCell: {}
}));


function BookModal(props) {
    const classes = useStyles();
    const {title, data, link, images, onClose, open} = props;

    return <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        onClose={onClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >

        <Zoom in={open} timeout={600}>
            <Card className={classes.card}>
                {data !== undefined &&
                <>
                    <CardContent className={classes.header}>
                        <Img width={"100%"} src={images} alt={""} className={classes.image}
                             container={(c) => <Zoom in={true} timeout={600}>{c}</Zoom>
                             }
                        />
                        <CardHeader
                            action={
                                <IconButton aria-label="view externally" href={link}>
                                    <Launch/>
                                </IconButton>
                            }
                            title={title}
                            subheader={`Last Accessed: ${data['last accessed']}`}
                            className={classes.headerText}
                        />
                    </CardContent>
                    <CardContent className={classes.content}>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                {
                                    Object.keys(data).map(
                                        key => {
                                            let value = data[key];
                                            let repr = <Typography>{value}</Typography>;
                                            let has_content = Boolean(value);
                                            if (typeof value === "object") {
                                                repr = Object.values(value).map(
                                                    (item, i) => <Chip
                                                        key={i}
                                                        icon={<Label/>}
                                                        label={item.replace(/(<([^>]+)>)/ig, "")}
                                                        color="primary"
                                                        size={"small"}
                                                    />
                                                );
                                                has_content = Boolean(repr.length)
                                            }
                                            return has_content && <TableRow key={key}>
                                                <TableCell className={classes.keyCell}>{key}</TableCell>
                                                <TableCell className={classes.valueCell}>{repr}</TableCell>
                                            </TableRow>
                                        }
                                    )
                                }
                            </TableHead>
                        </Table>
                    </CardContent>
                </>
                }
            </Card>
        </Zoom>
    </Modal>

}


export default BookModal