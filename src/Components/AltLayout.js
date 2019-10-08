import * as PropTypes from "prop-types"
import {createRef, default as React, useEffect} from "react";
import mixitup from "mixitup"
import BookCard from "./BookCard";

const ref = createRef();

function AltLayout(props) {
    let context = AltLayout;
    context.dom = createRef();

    let {books, openModal, saturation=0, brightness=0, setFilter, setSort} = props;

    const render = (book) => {
        return <BookCard
            key={book['_id']}
            book={book}
            createModal={openModal}
            saturation={saturation}
            brightness={brightness}
            setFilter={setFilter}
            setSort={setSort}
        />
    };

    useEffect(
        () => {
            const mixer = mixitup(ref.current, {
                data: {
                    uidKey: '_id'
                },
                render: {
                    target: render
                },
                selectors: {
                    target: 'div'
                }
            });
            mixer.dataset(books)
        }
    );

    return <div ref={ref}>

    </div>
}

AltLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.elementType),
    parent: PropTypes.object,
    filter: PropTypes.any,
    sort: PropTypes.any,

    options: PropTypes.object,
};

AltLayout.defaultProps = {
    options: {
        itemClass: 'muuri-outer',
        itemVisibleClass: 'muuri-item-shown',
        itemHiddenClass: 'muuri-item-hidden',
        itemPositioningClass: 'muuri-item-positioning',
        itemDraggingClass: 'muuri-item-dragging',
        itemReleasingClass: 'muuri-item-releasing',
        itemPlaceholderClass: 'muuri-item-placeholder'
    }
};
export default AltLayout