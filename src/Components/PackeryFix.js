import * as Packery from "packery"
import * as imagesloaded from "imagesloaded"
import * as React from "react";
import PropTypes from 'prop-types';

const refName = 'packeryContainer';

class PackeryComponent extends React.Component {

    packery = false;

    domChildren = [];

    displayName = 'PackeryComponent';

    propTypes = {
        disableImagesLoaded: PropTypes.bool,
        options: PropTypes.object
    };

    getDefaultProps = () => {
        return {
            disableImagesLoaded: false,
            options: {},
            className: '',
            elementType: 'div'
        };
    };

    initializePackery = (force) => {
        if (!this.packery || force) {
            this.packery = new Packery(
                this.refs[refName],
                this.props.options
            );

            this.domChildren = this.getNewDomChildren();
        }
    };

    getNewDomChildren = () => {
        let node = this.refs[refName];
        let children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
        return Array.prototype.slice.call(children);
    };

    diffDomChildren = () => {
        let oldChildren = this.domChildren.filter(function (element) {
            /*
             * take only elements attached to DOM
             * (aka the parent is the packery container, not null)
             */
            return !!element.parentNode;
        });

        let newChildren = this.getNewDomChildren();

        let removed = oldChildren.filter(function (oldChild) {
            return !~newChildren.indexOf(oldChild);
        });

        let domDiff = newChildren.filter(function (newChild) {
            return !~oldChildren.indexOf(newChild);
        });

        let beginningIndex = 0;

        // get everything added to the beginning of the DOMNode list
        let prepended = domDiff.filter(function (newChild, i) {
            let prepend = (beginningIndex === newChildren.indexOf(newChild));

            if (prepend) {
                // increase the index
                beginningIndex++;
            }

            return prepend;
        });

        // we assume that everything else is appended
        let appended = domDiff.filter(function (el) {
            return prepended.indexOf(el) === -1;
        });

        /*
         * otherwise we reverse it because so we're going through the list picking off the items that
         * have been added at the end of the list. this complex logic is preserved in case it needs to be
         * invoked
         *
         * let endingIndex = newChildren.length - 1;
         *
         * domDiff.reverse().filter(function(newChild, i){
         *     let append = endingIndex == newChildren.indexOf(newChild);
         *
         *     if (append) {
         *         endingIndex--;
         *     }
         *
         *     return append;
         * });
         */

        // get everything added to the end of the DOMNode list
        let moved = [];

        if (removed.length === 0) {
            moved = oldChildren.filter(function (child, index) {
                return index !== newChildren.indexOf(child);
            });
        }

        this.domChildren = newChildren;

        return {
            old: oldChildren,
            new: newChildren,
            removed: removed,
            appended: appended,
            prepended: prepended,
            moved: moved
        };
    };

    performLayout = () => {
        let diff = this.diffDomChildren();

        if (diff.removed.length > 0) {
            this.packery.remove(diff.removed);
            this.packery.reloadItems();
        }

        if (diff.appended.length > 0) {
            this.packery.appended(diff.appended);
            this.packery.reloadItems();
        }

        if (diff.prepended.length > 0) {
            this.packery.prepended(diff.prepended);
        }

        if (diff.moved.length > 0) {
            this.packery.reloadItems();
        }

        this.packery.layout();
    };

    imagesLoaded = () => {
        if (this.props.disableImagesLoaded) return;

        imagesloaded(
            this.refs[refName],
            function (instance) {
                this.packery.layout();
            }.bind(this)
        );
    };

    componentDidMount = () => {
        this.initializePackery();
        this.imagesLoaded();
    };

    componentDidUpdate = () => {
        this.performLayout();
        this.imagesLoaded();
    };

    componentWillReceiveProps = () => {
        this._timer = setTimeout(() => {
            this.packery.reloadItems();
            this.isMounted && this.isMounted() && this.forceUpdate();
        }, 0);
    };

    componentWillUnmount = () => {
        clearTimeout(this._timer);
    };

    render() {
        return React.createElement(this.props.elementType, {
            className: this.props.className,
            ref: refName
        }, this.props.children);
    }
}

export default PackeryComponent;
