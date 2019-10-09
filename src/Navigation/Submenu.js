import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import GitHub from "../Components/Icons/Github";
import Collapse from "@material-ui/core/Collapse";
import * as React from "react";
import * as PropTypes from "prop-types";

function Submenu(props) {
    const {visible, when, connected, onResize, color} = props;

    const last_connected = when ? when.toLocaleString() : connected ? "Loading ..." : "Unable to connect to the library";

    return <Collapse in={visible} timeout="auto" onEntered={onResize} onExited={onResize}>
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                    {last_connected}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    A real-time visualisation of resources users are accessing from RMIT University Library's
                    collection.
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
                    This feature is coming soon!
                </Typography>
            </CardContent>
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