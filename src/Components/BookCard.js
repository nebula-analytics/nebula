import * as React from "react";
import * as PropTypes from "prop-types";
import {Card, makeStyles} from "@material-ui/core";
import BookView from "./BookView";
import BookWrapper from "./BookWrapper";
import Img from 'react-image'
import Skeleton from "@material-ui/lab/Skeleton";
import Grow from "@material-ui/core/Grow";
import LoadingCard from "./LoadingCard";


const useStyles = makeStyles((theme) => {
    return {
        root: {
            borderRadius: "5px",

            float: "left",
            minHeight: `${theme.cards.size * 3 / 4}px`,
            display: "flex",
            flexDirection: "column",
        },
        image: {
            width: "100%"
        },
        text: {
            color: "white",
            textAlign: "center",
            padding: `${theme.cards.gutter}px`,
            width: "calc(100 % -10px);",
            marginTop: "10px"
        },
    }
});


function BookCard(props) {
    const classes = useStyles();
    const {book, createModal} = props;
    const dataWrapper = new BookWrapper(book);


    const isotopeProps = {
        "data-record_type": dataWrapper.type.valueOf(),
        "data-doc_id": dataWrapper.doc_id.valueOf(),
        "data-last_view": dataWrapper.when.valueOf(),
        "className": `${classes.root} record`,
    };

    const highLevelWrapper = child => <Card {...isotopeProps} > {child} </Card>;

    const viewWrapper = child => highLevelWrapper(
        <Grow in={Boolean(child)} timeout={399000} appear={true}>
            <BookView
                onClick={() => createModal(dataWrapper)}
                count={dataWrapper.count.valueOf()}
                tag={dataWrapper.when.value.fromNow()}
            >
                {child}
            </BookView>
        </Grow>
    );

    const Loader = <LoadingCard numRows={5} {...isotopeProps}/>;


    const Plain = <div className={classes.text}><h3>{dataWrapper.title.toString()}</h3></div>;


    return <Img image-record_type={dataWrapper.type.valueOf()}
                src={dataWrapper.images.valueOf()}
                className={classes.image}
                container={viewWrapper}
                unloaderContainer={viewWrapper}
                unloader={Plain}
                loaderContainer={highLevelWrapper}
                loader={Loader}
    />
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