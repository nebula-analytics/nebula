import {makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import themeData from "../constants/theme";
import {stringToHslColor} from "../helpers/utils";


const findPercentWidth = () => {
    let adjusted = window.innerWidth - ((32 * 2));
    let num_cards = parseInt(adjusted / (themeData.cards.size + themeData.cards.gutter * 2));
    console.log(`Calculated grid width: ${adjusted}; Expected column count: ${num_cards}`);

    return `${(100 / num_cards)}% - ${themeData.cards.gutter * 2}px`;
};

function getRecordStyling(record_types, brightness, saturation) {
    const result = {};
    record_types.map(value => {
        let key = value.replace("\"", "");
        result[`[data-record_type="${key}"]`] = {
            backgroundColor: stringToHslColor(value, saturation, brightness),
            borderColor: stringToHslColor(value, saturation, brightness + 25),
            border: "3px solid"
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
                            width: `100%`,
                            [theme.breakpoints.up('xs')]: {
                                width: `calc(50% -  ${themeData.cards.gutter}px)`,
                            },
                            [theme.breakpoints.up('sm')]: {
                                width: `calc(${width})`,
                            },
                        },
                        ".header": {
                            width: `100%`,
                            [theme.breakpoints.up('sm')]: {
                                width: `calc((${width}) * 2 + ${themeData.cards.gutter}px * 2.5)`,
                            }
                        },
                        ...styling

                    },

            }
        )
    )(() => null);
    return <div className={"dynamic-book-width"}/>
}