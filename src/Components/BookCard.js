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
        const {book} = this.props;
        let {record_type, title, extra_fields, last_view, count} = book;

        record_type = record_type.replace("_", " ");
        title = (title || "").replace(/(<([^>]+)>)/ig, "");


        let {subject, topic, date} = extra_fields;

        if (!date) {
            date = "Unknown"
        }

        if (!subject) {
            subject = []
        }

        if (!topic) {
            topic = []
        }
         const modal_info = {
            published: date,
            "number of views (in current window)": count,
            subjects: subject,
            topics: topic,
            "last accessed": last_view,
             "type of record": record_type
        };
        this.props.createModal(
            title, modal_info, generatePrimoLink(book), this.state.images
        )
    };

    componentWillMount() {
        updateWithImageURLs(this.props.book.extra_fields.delivery.link, this.addImages)
    }


    render() {
        const {book, classes, saturation, brightness} = this.props;

        let {record_type, title, extra_fields, last_view, count} = book;

        record_type = record_type.replace("_", " ");
        title = (title || "").replace(/(<([^>]+)>)/ig, "");

        let record_color_key = record_type;

        let {subject, topic, date} = extra_fields;

        if (!date) {
            date = "Unknown"
        }

        if (!subject) {
            subject = []
        }

        if (!topic) {
            topic = []
        }

        const modal_info = {
            published: date,
            "number of views (in current window)": count,
            subjects: subject,
            topics: topic,
            "last accessed": last_view
        };
        return <Card className={`${classes.root} book-dynamic`}>
            <BookView
                book={book}
                onClick={this.onClick}
                images={this.state.images}
                title={title}
                record_type={record_type}
                color={stringToHslColor(record_color_key, saturation, brightness)}
            />
        </Card>
    }
}

export default withStyles(styles)(BookCard)