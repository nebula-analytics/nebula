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
            disableImagesLoaded={false}
        >
            {children}
        </LayoutInterface>
    );
}

Gallery.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,

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
    layoutMode: 'masonry',
    masonry: {
        gutter: themeData.cards.gutter,
    },
    stamp: ".stamp",
    percentPosition: true,
    filter: "*",
};

export default Gallery;