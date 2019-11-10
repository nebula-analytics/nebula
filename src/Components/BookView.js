import * as React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Badge from "@material-ui/core/Badge";
import {Visibility} from "@material-ui/icons";
import {makeStyles, Tooltip} from "@material-ui/core";
import * as PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

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

    return <>
        <Button className={classes.tag} onClick={()=>{}}>
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
                    : count !== 1 && count}
            </div>
        </CardActionArea>
    </>

}

BookView.propTypes = {
    onClick: PropTypes.func,

    tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    count: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

BookView.defaultProps = {
    onClick: () => {}
};

export default BookView