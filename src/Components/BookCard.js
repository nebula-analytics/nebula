import * as React from "react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {Card, makeStyles} from "@material-ui/core";

import themeData from "../constants/theme"
import BookView from "./BookView";
import {generatePrimoLink, stringToHslColor} from "../helpers/utils";
import {updateWithImageURLs} from "../helpers/thumbnails";


const useStyles = makeStyles((theme) => {
    return {
        root: {
            borderRadius: "5px",

            float: "left",
            marginBottom: `${themeData.cards.gutter}px`,
            minHeight: `${themeData.cards.size / 2}px`,
            // width: `${themeData.cards.size}px`,
            display: "flex",
            flexDirection: "column",
        }
    }
});

const getBookDisplayDetails = book => {
    let {record_type, title, extra_fields, last_view, count} = book;
    let {subject, topic, date} = extra_fields;

    title = title || "";
    record_type = record_type || "Unknown";

    subject = subject || [];
    topic = topic || [];
    date = date || "Unknown";

    record_type = record_type.replace("_", " ");
    title = title.replace(/(<([^>]+)>)/ig, "");

    const modal_data = {
        "publish date": date,
        "view this in primo": generatePrimoLink(book),
        "number of views (in current window)": count,
        "subjects": subject,
        "last accessed": last_view,
        "type of record": record_type
    };

    return {
        title, record_type, subject, topic, date, modal_data
    }
};


function BookCard(props) {
    const classes = useStyles();
    const {book, saturation, brightness, createModal, setFilter} = props;
    const {title, record_type, modal_data} = getBookDisplayDetails(book);

    const [images,] = useState(updateWithImageURLs(book.extra_fields.delivery.link));

    return <Card
        data-record_type={record_type}
        className={`${classes.root} dynamic-book-width grid-item`}
    >
        <BookView
            book={book}
            onClick={() => createModal(
                title, modal_data, modal_data["view this in primo"], images
            )}
            images={images}
            title={title}
            record_type={record_type}
            color={stringToHslColor(record_type, saturation, brightness)}
            setFilter={setFilter}
        />
    </Card>;
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    createModal: PropTypes.func.isRequired,
    saturation: PropTypes.number,
    brightness: PropTypes.number,
    setFilter: PropTypes.func,
    setSort: PropTypes.func
};

BookCard.defaultProps = {
    saturation: 0,
    brightness: 100,
    setFilter: () => {
    },
    setSort: () => {
    }
};

export default BookCard;