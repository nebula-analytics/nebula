import BookView from "./BookView";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import {useRef} from "react";
import * as PropTypes from "prop-types";

function LoadingCard(props) {
    const {numRows, textHeight, ...remainingProps} = props;
    let ref = useRef([]);
    if (!ref.current.length) {
        ref.current = [...Array(numRows).keys()].map(
            i => {
                const size = parseInt(Math.random() * (10 - 6) + 6) * 10;
                return <Skeleton key={i} variant={"text"} width={`${size}%`} height={textHeight}/>
            }
        )
    }
    return <BookView
        {...remainingProps}
        count={<Skeleton variant={"circle"} width={30} height={20}/>}
        tag={<Skeleton variant={"text"} width={50} height={10}/>}
    >
        <Skeleton variant={"text"} width={0} height={30}/>
        {ref.current}
        <Skeleton variant={"text"} width={0} height={20}/>
    </BookView>;
}

LoadingCard.propTypes = {
    className: PropTypes.string,
    numRows: PropTypes.number,
    textHeight: PropTypes.number,
};

LoadingCard.defaultProps = {
    className: "",
    numRows: 4,
    textHeight: 20,
};

export default LoadingCard