import React from 'react';
import * as PropTypes from "prop-types"
import LayoutInterface from "./LayoutInterface";
import * as themeData from "../constants/theme"

function Gallery(props) {
    const {children, filter, ...options} = props;
    let filterString = getFilterStringv2(filter);
    if(filterString){
       filterString += ", [data-always_visible=\"true\"]"
    }
    return (
        <LayoutInterface
            className={'grid'}
            elementType={'div'}
            options={{filter: filterString, ...options}}
        >
            {children}
        </LayoutInterface>
    );
}

const getFilterStringv2 = filters => Object.values(filters.reduce((state, {field, value}) => {
    return {
        ...state,
        [field]: [...(state[field] || []), `[data-${field}="${value}"]`]
    }
}, {})).sort(
    (v1, v2) => v1.length > v2.length ? 1 : v2.length > v1.length ? -1 : 0
).reduce((query, values) => {
    const result = [];
    values.forEach(selector => {
        if (query.length) {
            query.forEach(existing => {
                result.push(`${selector}${existing}`)
            })
        } else {
            result.push(selector)
        }
    });
    console.log(query, values);
    return result
}, []).join(",");

const getFilterString = (filters) => {
    if (!filters.length) {
        return "*"
    } else {
        return [{
            field: "always_visible",
            value: "true"
        }, ...filters].map(f => `[data-${f.field}="${f.value}"]`).join(", ")
    }
};

Gallery.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    stamped: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),

    filter: PropTypes.arrayOf(PropTypes.object),
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
    layoutMode: 'packery',
    packery: {
        gutter: themeData.cards.gutter,
        columnWidth: `.dynamic-book-width`,
    },
    percentPosition: true,
    getSortData: {
        header: "[data-order_first]",
        time: "[data-last_view]",
        id: "[data-doc_id]",
    },
    sortAscending: false,
    sortBy: [],
    filter: [],
};

export default Gallery;