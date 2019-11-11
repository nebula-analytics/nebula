import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import themeData from "../constants/theme";
import {stringToHslColor} from "../helpers/utils";


const findPercentWidth = () => {
    let adjusted = window.innerWidth - ((32 * 2));
    let num_cards = parseInt(adjusted / (themeData.cards.size + 6 + themeData.cards.gutter * 2));
    console.log(`Calculated grid width: ${adjusted}; Expected column count: ${num_cards}`);

    return `${(100 / num_cards)}% - ${themeData.cards.gutter * 2}px - 6px`;
};

function getRecordStyling(record_types, brightness, saturation) {
    const result = {};
    record_types.forEach(value => {
        let key = value.replace("\"", "");
        result[`[data-record_type="${key}"]`] = {
            backgroundColor: stringToHslColor(value, saturation, brightness),
            borderColor: stringToHslColor(value, saturation, brightness),
            color: "white"
        };
        result[`[label-record_type="${key}"]`] = {
            color: stringToHslColor(value, saturation, brightness),
        }
    });
    return result;
}


export default function BookStyler(props) {
    const [width, setWidth] = useState(findPercentWidth());
    const {records, brightness, saturation} = props;
    const [styling, setStyling] = useState(getRecordStyling(records.values, brightness, saturation));

    useEffect(() => {
        setStyling(getRecordStyling(records.values, brightness, saturation))
    }, [records, brightness, saturation]);


    useEffect(() => {
        const listener = () => {
            setWidth(findPercentWidth())
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, []);

    // noinspection JSCheckFunctionSignatures
    makeStyles(theme => (
            {
                "@global":
                    {
                        ".record": {
                            width: `calc(100% - 6px)`,
                            border: "5px solid",
                            borderColor: "rgba(0,0,0,0)",

                            [theme.breakpoints.up('xs')]: {
                                width: `calc(50% -  ${theme.cards.gutter}px - 6px)`,
                            },
                            [theme.breakpoints.up('sm')]: {
                                width: `calc(${width})`,
                            },
                        },
                        ".header": {
                            width: `100%`,
                            [theme.breakpoints.up('sm')]: {
                                width: `calc((${width}) * 2 + ${theme.cards.gutter}px + 3px*6)`,
                            }
                        },
                        ...styling

                    },

            }
        )
    )(() => null);
    return <div className={"dynamic-book-width"}/>
}