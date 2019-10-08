import React from 'react';
import * as PropTypes from "prop-types"
import LayoutInterface from "./LayoutInterface";

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
    transitionDuration: '1s',
    stagger: 30,
    layoutMode: 'masonry',
    masonry: {
        gutter: 2.5,
    },
    stamp: ".stamp",
    percentPosition: true,
    filter: "*",
};

export default Gallery;