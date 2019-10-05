import React from 'react';
import LayoutInterface from "./LayoutInterface";

let options = {
    transitionDuration: '1s',
    stagger: 30,
    layoutMode: 'masonry',
    masonry: {
        gutter: 2.5
    },
    stamp: ".stamp",
    percentPosition: true,

};

class Gallery extends React.Component {
    render() {
        const {children} = this.props;
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