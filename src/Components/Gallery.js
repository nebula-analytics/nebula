import React from 'react';
import LayoutInterface from "./LayoutInterface";

let options = {
    transitionDuration: '0.4s',
    layoutMode: 'masonry',
    masonry: {
        columnWidth: 50,
        gutter: 2.5
    },
    stamp: ".stamp",
};

class Gallery extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <LayoutInterface
                className={'my-gallery-class'} // default ''
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