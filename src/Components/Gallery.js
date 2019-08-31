import React from 'react';
import PackeryComponent from "./PackeryFix";
// import * as Packery from "PackeryFix.js"

let packeryOptions = {
    transitionDuration: 1,
    gutter: 5,
        stamp: ".stamp"
};

class Gallery extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <PackeryComponent
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={packeryOptions} // default {}
                disableImagesLoaded={false} // default false
            >
                {children}
            </PackeryComponent>
        );
    }
}


export default Gallery;