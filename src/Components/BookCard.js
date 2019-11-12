import * as React from "react";
import * as PropTypes from "prop-types";
import {Card, makeStyles, Grow} from "@material-ui/core";
import BookView from "./BookView";
import BookWrapper from "./BookWrapper";
import Img from 'react-image'
import LoadingCard from "./LoadingCard";
import clsx from "clsx";


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
            textAlign: "center",
            padding: `${theme.cards.gutter}px`,
            width: "calc(100 % -10px);",
            marginTop: "10px"
        },
    }
});

export function GenericCard(props) {
    const classes = useStyles();
    let {children, type = "info", ...remaining} = props;

    if (typeof children === "string") {
        children = <div className={classes.text}><h3>{children}</h3></div>
    }

    const highLevelWrapper = child => <Card {...remaining} className={clsx(classes.root, "record")}> {child} </Card>;

    const viewWrapper = child => highLevelWrapper(
        <BookView
            count={1}
            tag={type}
        >
            {child}
        </BookView>);
    return viewWrapper(children)
}


function BookCard(props) {
    const classes = useStyles();
    const {book, createModal, shortFormDate} = props;
    const dataWrapper = new BookWrapper(book);


    const isotopeProps = {
        "data-record_type": dataWrapper.type.valueOf(),
        "data-doc_id": dataWrapper.doc_id.valueOf(),
        "data-last_view": dataWrapper.when.valueOf(),
        "data-order_first": 0,
        "className": `${classes.root} record`,
    };

    const highLevelWrapper = extraProps => child => <Card {...{...isotopeProps, ...extraProps}} > {child} </Card>;

    const viewWrapper = extraProps => child => highLevelWrapper(extraProps)(
        <Grow in={Boolean(child)} timeout={399000} appear={true}>
            <BookView
                onClick={() => createModal(dataWrapper)}
                count={dataWrapper.count.valueOf()}
                tag={shortFormDate ? dataWrapper.when.value.fromNow() : dataWrapper.when.value.calendar()}
            >
                {child}
            </BookView>
        </Grow>
    );

    const Loader = <LoadingCard numRows={5} {...isotopeProps}/>;

    const Plain = <div className={classes.text}>
        {/* Fix weird quotes in library books (we've escaped tags already)*/}
        <h3 dangerouslySetInnerHTML={{__html: dataWrapper.title.toString()}}/>
    </div>;


    return <Img image-record_type={dataWrapper.type.valueOf()}
                src={dataWrapper.images.valueOf()}
                className={classes.image}
                container={viewWrapper({"data-has_image": true})}
                unloaderContainer={viewWrapper({"data-has_image": false})}
                unloader={Plain}
                loaderContainer={highLevelWrapper({})}
                loader={Loader}
    />
}

BookCard.propTypes = {
    book: PropTypes.object.isRequired,
    createModal: PropTypes.func.isRequired,
    saturation: PropTypes.number,
    brightness: PropTypes.number,
    setFilter: PropTypes.func,
    setSort: PropTypes.func,
    shortFormDate: PropTypes.bool,
};

BookCard.defaultProps = {
    saturation: 0,
    brightness: 100,
    setFilter: () => {
    },
    setSort: () => {
    },
    shortFormDate: true,
};

export default BookCard;