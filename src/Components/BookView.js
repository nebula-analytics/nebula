import * as React from "react";

import themeData from "../constants/theme"
import CardActionArea from "@material-ui/core/CardActionArea";
import Badge from "@material-ui/core/Badge";
import {Visibility} from "@material-ui/icons";
import {makeStyles, Tooltip} from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
    clickable: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
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
        color: "white",
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
    const {children, count, tag, onClick} = props;

    // const loader = <Skeleton variant="text" width={200} height={200}/>;
    // const loader = <CircularProgress/>;
    // const fallback = ;

    const filterByThisRecordType = () => {
        // setFilter(`[data-record_type=${tag.replace(" ", "_")}]`);
    };


    return <>
        <Button className={classes.tag} onClick={filterByThisRecordType}>
            {tag}
        </Button>
        <CardActionArea onClick={onClick} className={classes.clickable}>
            {children}


            <div className={classes.views}>
                {count > 1 ?
                    <Badge badgeContent={count} overlap={"circle"} color="primary" anchorOrigin={{
                        horizontal: "right", vertical: "top"
                    }}>
                        <Tooltip title={`${count} views`}>
                            <Visibility/>
                        </Tooltip>
                    </Badge>
                    : count == null && <Skeleton variant={"circle"} width={20} height={20}/>}
            </div>
        </CardActionArea>
    </>

}

BookView.propTypes = {
    onClick: PropTypes.func.isRequired,

    tag: PropTypes.string,
    count: PropTypes.number,
};

BookView.defaultProps = {
    onClick: () => {
    }
};

export default BookView