import * as React from "react";
import {useState} from "react";
import * as PropTypes from "prop-types";
import {Card, makeStyles} from "@material-ui/core";

import themeData from "../constants/theme"
import BookView from "./BookView";
import {generatePrimoLink, stringToHslColor} from "../helpers/utils";
import {updateWithImageURLs} from "../helpers/thumbnails";
import moment from "moment";
import BookWrapper from "./BookWrapper";


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



function BookCard(props) {
    const classes = useStyles();
    const {book, saturation, brightness, createModal, setFilter} = props;
    // const {title, tag, modal_data} = getBookDisplayDetails(book);

    let dataWrapper = new BookWrapper(book);

    return <Card
        data-record_type={dataWrapper.type.value}
        data-last_view={dataWrapper.when.valueOf()}
        className={`${classes.root} dynamic-book-width grid-item`}
    >
        <BookView
            book={book}
            onClick={() => createModal(dataWrapper)}
            images={dataWrapper.images.value}
            title={dataWrapper.title.value}
            tag={dataWrapper.when.value.fromNow()}
            color={stringToHslColor(dataWrapper.type, saturation, brightness)}
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