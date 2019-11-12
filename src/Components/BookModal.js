import * as React from "react";
import Img from 'react-image'

import themeData from "../constants/theme"
import {
    Card,
    makeStyles,
    Backdrop,
    Zoom,
    CardContent,
    Modal,
    CardHeader,
    IconButton,
    Table,
    TableHead,
    Tooltip,
} from "@material-ui/core";
import {Close} from "@material-ui/icons";


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
    const {open, onClose, values} = props;

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
        keepMounted={false}
    >

        <Zoom in={open} timeout={600}>
            <Card className={classes.card}>
                {values &&
                <>
                    <CardContent className={classes.header}>
                        <Img width={"100%"} src={values.images.value} alt={""} className={classes.image}
                             container={(c) => <Zoom in={true} timeout={600}>{c}</Zoom>
                             }
                        />
                        <CardHeader
                            action={
                                <Tooltip title={"Close Modal"}>
                                    <IconButton aria-label="Close Modal" onClick={() => onClose()}>
                                        <Close/>
                                    </IconButton>
                                </Tooltip>
                            }
                            title={values.title.toString()}
                            subheader={values.type.toString()}
                            subheaderTypographyProps={{'label-record_type': values.type.valueOf()}}
                            className={classes.headerText}
                        />
                    </CardContent>
                    <CardContent className={classes.content}>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                {
                                    Object.values(values).map(value => value.makeRow())
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