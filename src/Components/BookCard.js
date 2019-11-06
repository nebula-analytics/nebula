import * as React from "react";
import * as PropTypes from "prop-types";
import {Card, makeStyles} from "@material-ui/core";

import themeData from "../constants/theme"
import BookView from "./BookView";
import BookWrapper from "./BookWrapper";


const useStyles = makeStyles((theme) => {
    return {
        root: {
            borderRadius: "5px",

            float: "left",
            minHeight: `${themeData.cards.size / 2}px`,
            display: "flex",
            flexDirection: "column",
        }
    }
});


function BookCard(props) {
    const classes = useStyles();
    const {book, createModal, setFilter} = props;

    let dataWrapper = new BookWrapper(book);

    return <Card
        data-record_type={dataWrapper.type.value}
        data-doc_id={dataWrapper.doc_id.value}
        data-last_view={dataWrapper.when.valueOf()}
        className={`${classes.root} record`}
    >
        <BookView
            book={book}
            onClick={() => createModal(dataWrapper)}
            images={dataWrapper.images.value}
            title={dataWrapper.title.value}
            tag={dataWrapper.when.value.fromNow()}
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