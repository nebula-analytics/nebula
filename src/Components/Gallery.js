import React from 'react';
import LayoutInterface from "./LayoutInterface";
import themeData from "../constants/theme"

let options = {
    transitionDuration: '1s',
    layoutMode: 'masonry',
    masonry: {
        gutter: 2.5
    },
    stamp: ".stamp",
    percentPosition: true,

};

class Gallery extends React.Component {
    render() {
        const {children, onChildResize} = this.props;
        return (
            <LayoutInterface
                className={'grid'} // default ''
                elementType={'div'} // default 'div'
                options={options} // default {}
                disableImagesLoaded={false} // default false
            >
                {children}
            </LayoutInterface>
        );
    }
}


export default Gallery;