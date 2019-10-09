import * as Isotope from "isotope-layout"
import * as React from "react";
import * as PropTypes from 'prop-types';

class LayoutInterface extends React.Component {
    displayName = 'LayoutInterface';

    static propTypes = {
        disableImagesLoaded: PropTypes.bool,
        options: PropTypes.object,
        onChildResize: PropTypes.func
    };

    static defaultProps = {
        disableImagesLoaded: false,
        options: {
            layoutMode: 'masonry'
        },
        className: '',
        elementType: 'div',
    };

    constructor(props) {
        super(props);
        this.reference = React.createRef();
        this.domChildren = [];
    }


    getNewDomChildren = () => {
        let node = this.reference.current;
        let children = this.props.options.itemSelector ? node.querySelectorAll(this.props.options.itemSelector) : node.children;
        return Array.prototype.slice.call(children);
    };

    diffDomChildren = () => {
        let oldChildren = this.domChildren.filter(function (element) {
            /*
             * take only elements attached to DOM
             * (aka the parent is the isotope/masonry container, not null)
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
        let prepended = domDiff.filter(function (newChild) {
            let prepend = (beginningIndex === newChildren.indexOf(newChild));

            if (prepend) {
                // increase the index
                beginningIndex++;
            }

            return prepend;
        });

        let appended = domDiff.filter(function (el) {
            return prepended.indexOf(el) === -1;
        });

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
            this.isotope.remove(diff.removed);
        }

        if (diff.appended.length > 0) {
            this.isotope.appended(diff.appended);
        }

        if (diff.prepended.length > 0) {
            this.isotope.prepended(diff.prepended);
        }

        this.isotope.reloadItems();
        this.isotope.layout();
    };

    componentDidMount = () => {
        this.domChildren = this.getNewDomChildren();
        this.isotope = new Isotope(
            this.reference.current,
            this.props.options,
        );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.performLayout();
        if (prevProps.options.filter !== this.props.options.filter) {
            this.isotope.destroy();
            this.isotope = new Isotope(
                this.reference.current,
                this.props.options,
            );
            // this.option(this.props.options);
            // this.isotope._filter(this.items);
            // this.isotope.layout()
        }
    };


    relayout = (isotope) => () => {
        if (isotope) {
            isotope.reloadItems();
            isotope.layout();
        }
    };

    onLoad = (_this) => () => {
        _this.performLayout();
        _this.forceUpdate();
    };

    render() {

        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                onResize: this.relayout(this.isotope),
            });
        });
        return <div className={this.props.className} ref={this.reference} onLoad={this.onLoad(this)}>
            {children}
        </div>
        // return React.createElement(this.props.elementType, {
        //     className: this.props.className,
        //     ref: this.reference,
        //     onLoad: this.onLoad(this),
        // }, children);
    }
}

export default LayoutInterface;
