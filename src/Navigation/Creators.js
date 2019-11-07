import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    desc: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "pre",
        width: `${theme.cards.size*2 - 80 }px`,
        height: theme.typography.htmlFontSize + "px"
    }
}));


export default function (props) {
    const [members, setMembers] = useState(JSON.parse(localStorage.getItem("about.creators") || "[]"));

    useEffect(() => {
        if(members.length){
            return
        }
        // fetch("https://api.github.com/orgs/nebula-analytics/public_members").then(
        //     response => response.json()
        // ).then(
        ["Hammer-Inc", "smlMorrison", "doanphuctam", "jeffphan8816"].forEach(value => fetch(`https://api.github.com/users/${value}`).then(
            response => {
                if (response.ok) {
                    return response.json()
                }
                throw Error("Creator doesn't exist anymore")
            }).then(
            profile => setMembers(m => {
                let values = [{
                    link: profile.html_url || "",
                    image: profile.avatar_url || "",
                    name: profile.name || profile.login || "",
                    bio: profile.bio || "",
                }, ...m];
                localStorage.setItem("about.creators", JSON.stringify(values));

                return values
            })
        ).catch(
            e => console.log(e)
        ))
        // )
    }, [members]);


    const classes = useStyles();
    return <List className={classes.root}>
        {members && members.length === 0 && <ListItem alignItems="flex-start"
                                                      dense button
        > <ListItemAvatar>
            <Skeleton variant="circle" width={40} height={40}/>
        </ListItemAvatar>
            <ListItemText>
                <Skeleton variant="text" width={100} height={20}/>
                <Skeleton variant="text" width={"100%"} height={20}/>
            </ListItemText>
        </ListItem>}

        {members.map(profile =>
            <ListItem key={profile.link} alignItems="flex-start"
                      dense button disableGutters
                      onClick={() => window.open(profile.link)}
            > <ListItemAvatar>
                <Avatar alt={profile.name[0]} src={profile.image}/>
            </ListItemAvatar>
                <ListItemText
                    primary={profile.name}
                    secondaryTypographyProps={{className: classes.desc}}
                    secondary={profile.bio}
                />
            </ListItem>
        )}

    </List>
};