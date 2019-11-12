import { CardHeader, Link } from "@material-ui/core";
import * as React from "react";
import {Group, Info, QuestionAnswer} from "@material-ui/icons"
import Creators from "./Creators";
import GitHub from "../Components/Icons/Github";

function About(props) {
    return <React.Fragment>
        <CardHeader
            title={"What is Nebula?"}
            subheader={"Nebula provides real-time glimpse into the current state of the " +
            "libraries online access systems."}
            avatar={<QuestionAnswer/>}
        />
        <CardHeader
            title={"What do the cards mean?"}
            subheader={"Each card here represents a book someone (or a few people) have " +
            "clicked on to read more about in the library search system"}
            avatar={<QuestionAnswer/>}

        />
        <CardHeader
            title={"About the creators"}
            avatar={<Group/>}
            subheader={<Creators/>}
        />
        <CardHeader
            title={"Open Source"}
            subheader={<>Nebula's source code is freely available and licensed under GPLv3. View
                it <Link href={"https://github.com/nebula-analytics"} target="_blank" rel="noopener noreferrer">
                    on Github</Link> and bring it to your library!</>}
            avatar={<GitHub/>}

        />
        <CardHeader
            title={"Inspiration"}
            avatar={<Info/>}

            subheader={
                <>
                    This project was inspired by and borrows heavily from Unstacked at NSW Library.
                    <Link href="https://unstacked.dxlab.sl.nsw.gov.au/" target="_blank"
                          rel="noopener noreferrer" color={"inherit"}>
                        "Unstacked NSW"
                    </Link> by <Link href="http://adamhinshaw.com/" target="_blank"
                                     rel="noopener noreferrer" color={"inherit"}>
                    Adam Hinshaw
                </Link> and <Link href="http://elisalee.net/" target="_blank"
                                  rel="noopener noreferrer" color={"inherit"}>
                    Elisa Lee
                </Link>, <Link href="https://github.com/slnsw" target="_blank"
                               rel="noopener noreferrer" color={"inherit"}>
                    NSW Library
                </Link> is in the <Link href="http://creativecommons.org/publicdomain/zero/1.0/"
                                        target="_blank"
                                        rel="noopener noreferrer" color={"inherit"}>
                    Public Domain, CC0
                </Link>
                </>
            }
        />
    </React.Fragment>
}

About.propTypes = {};

About.defaultProps = {};

export default About