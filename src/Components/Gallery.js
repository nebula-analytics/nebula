import React from 'react';
import * as PropTypes from "prop-types"
import LayoutInterface from "./LayoutInterface";
import * as themeData from "../constants/theme"

function Gallery(props) {
    const {children, ...options} = props;
    return (
        <LayoutInterface
            className={'grid'}
            elementType={'div'}
            options={options}
        >
            {children}
        </LayoutInterface>
    );
}

Gallery.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    stamped: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),

    filter: PropTypes.any,
    sort: PropTypes.object,
    transitionDuration: PropTypes.string,
    stagger: PropTypes.number,
    layoutMode: PropTypes.string,
    masonry: PropTypes.object,
    stamp: PropTypes.string,
    percentPosition: PropTypes.bool,
};

Gallery.defaultProps = {
    transitionDuration: '2s',
    layoutMode: 'packery',
    packery: {
        gutter: themeData.cards.gutter,
        columnWidth: `.dynamic-book-width`,
    },
    // stamp: ".stamp",
    percentPosition: true,
    filter: "*",
    getSortData: {
        header: "[data-is_first]",
        time: "[data-last_view]",
        id: "[data-doc_id]"
    },
    sortBy: [],
    sortAscending: false
};

export default Gallery;