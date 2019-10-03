import * as React from "react";
import * as PropTypes from "prop-types";
import {Card} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import themeData from "../constants/theme"
import BookView from "./BookView";
import BookModal from "./BookModal";
import {generatePrimoLink, stringToHslColor} from "../helpers/utils";
import {updateWithImageURLs} from "../helpers/thumbnails";

const styles = theme => {
    return {
        root: {
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

        }
    }
};

class BookCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            images: [],
        }
    }

    addImages = (urls = []) => {
        let srcSet = this.state.images;
        for (let index in urls) {
            let url = urls[index];
            if (!srcSet.includes(url)) {
                srcSet.push(url);
            }
        }
        if (srcSet.length > this.state.images.length) {
            this.setState({
                images: srcSet
            })
        }
    };

    static propTypes = {
        book: PropTypes.object.isRequired,
    };


    onClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    componentWillMount() {
        updateWithImageURLs(this.props.book.extra_fields.delivery.link, this.addImages)
    }


    render() {
        const {book, classes, saturation, brightness} = this.props;
        const {open} = this.state;

        let {record_type, title, extra_fields} = book;

        record_type = record_type.replace("_", " ");
        title = (title || "").replace(/(<([^>]+)>)/ig, "");

        let record_color_key = record_type;
        if (extra_fields.hasOwnProperty("subject")) {
            // record_color_key = extra_fields.subject[0]
        }


        // console.log(this.state.images);
        return <Card className={`${classes.root} book-dynamic`}>
            <BookView
                book={book}
                onClick={this.onClick}
                images={this.state.images}
                title={title}
                record_type={record_type}
                color={stringToHslColor(record_color_key, saturation, brightness)}
            />
            <BookModal
                open={open}
                onClose={this.onClick}

                images={this.state.images}
                title={title}
                record_type={record_type}
                description={extra_fields.description || "That's all we know..."}
                link={generatePrimoLink(book)}
            />
        </Card>
    }
}

export default withStyles(styles)(BookCard)