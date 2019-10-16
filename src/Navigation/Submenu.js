import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GitHub from "../Components/Icons/Github";
import Collapse from "@material-ui/core/Collapse";
import * as React from "react";
import * as PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        background: "white",
    }
}));

function Submenu(props) {
    const {visible, when, connected, onResize} = props;
    const classes = useStyles();

    const last_connected = when ? when.toLocaleString() : connected ? "Loading ..." : "Unable to connect to the library";

    return <Collapse in={visible} timeout="auto" onEntered={onResize} onExited={onResize}>
        <div className={classes.root}>
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                    What is this?
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    You're looking at a real-time visualization of resource access at the RMIT library, as users view books
                    online a card for the book is added on this site.
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                    What time is it at the RMIT Library?
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {last_connected}
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                    About Nebula
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Project Nebula was a 2019 student project at RMIT thought up by the RMIT library with the goal
                    of visualizing resource usage in real-time.
                </Typography>
            </CardContent>
            <Divider variant="fullWidth" component="div"/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Tooltip title={"Github"}>
                        <IconButton href={"https://github.com/nebula-analytics/nebula"} aria-label="Github link"
                                    color="default">
                            <GitHub/>
                        </IconButton>
                    </Tooltip>
                    Explore Nebula's source code on Github
                </Typography>
            </CardContent>
            <Divider variant="fullWidth" component="div"/>
            <CardContent>
                <Typography gutterBottom variant="body1" component="p">
                    Filters
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    You can filter by record type by hitting the button in the top corner!
                </Typography>
            </CardContent>
        </div>
    </Collapse>
}

Submenu.propTypes = {
    visible: PropTypes.bool,
    connected: PropTypes.bool,
    when: PropTypes.object,
    onResize: PropTypes.func,
    color: PropTypes.string
};

Submenu.defaultProps = {
    visible: false,
    when: undefined,
    connected: true,
    onResize: () => null,
    color: "grey"
};

export default Submenu