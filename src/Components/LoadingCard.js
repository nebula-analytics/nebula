import {Card} from "@material-ui/core";
import BookView from "./BookView";
import Skeleton from "@material-ui/lab/Skeleton";
import * as React from "react";
import * as PropTypes from "prop-types";
import {useState} from "react";

function LoadingCard(props) {
    const {className, numRows, textHeight} = props;
    const [textRows] = useState([...Array(numRows).keys()].map(
        i => {
            const size = Math.random() * (100 - 60) + 60;
            return <Skeleton variant={"text"} width={`${size}%`} height={textHeight}/>
        }
    ));
    return <Card className={className}>
        <BookView
            count={<Skeleton variant={"circle"} width={30} height={20}/>}
            tag={<Skeleton variant={"text"} width={50} height={10}/>}
        >
            <Skeleton variant={"text"} width={0} height={30}/>
            {textRows}
            <Skeleton variant={"text"} width={0} height={20}/>
        </BookView>
    </Card>;
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