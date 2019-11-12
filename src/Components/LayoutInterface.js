import * as Isotope from "isotope-layout"
import "isotope-packery"
import * as React from "react";
import * as PropTypes from 'prop-types';

class LayoutInterface extends React.Component {
    displayName = 'LayoutInterface';

    static propTypes = {
        options: PropTypes.object,
        stampClassName: PropTypes.string,
        onChildResize: PropTypes.func
    };

    static defaultProps = {
        options: {
            layoutMode: 'masonry'
        },
        className: '',
        elementType: 'div',
        stampClassName: "stamp"
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
            moved: moved,
        };
    };

    performLayout = () => {
        let diff = this.diffDomChildren();

        if (diff.appended.length > 0) {
            this.isotope.insert(diff.appended);
        }
        if (diff.prepended.length > 0) {
            this.isotope.insert(diff.prepended);
        }
        if (diff.removed.length > 0) {
            this.isotope.remove(diff.removed);
        }

        if (this.props.options.stamp) {
            let stamped = this.reference.current.querySelectorAll(this.props.options.stamp);
            this.isotope.stamp(stamped);
        }

        if (diff.prepended.length > 0 || diff.appended.length > 0){
            this.isotope.reloadItems();
            this.isotope.arrange();
        }else{
            this.isotope.layout()
        }
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
            this.isotope.arrange({filter: this.props.options.filter})
        }
    };


    relayout = (isotope) => () => {
        if (isotope) {
            isotope.layout();
        }
    };

    onLoad = (_this) => () => {
        _this.performLayout();
        _this.forceUpdate();
    };

    render() {

        const children = React.Children.map(this.props.children, child => {
            return child !== null && React.cloneElement(child, {
                onResize: this.relayout(this.isotope),
            });
        });
        return <div className={this.props.className} ref={this.reference} onLoad={this.onLoad(this)}>
            {children}
        </div>
    }
}

export default LayoutInterface;
