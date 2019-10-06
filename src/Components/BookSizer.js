import {makeStyles} from "@material-ui/core";
import {useEffect, useState} from "react";
import themeData from "../constants/theme";


const findPercentWidth = () => {
    let adjusted = window.innerWidth - ((32 + themeData.cards.gutter) * 2);
    let num_cards = parseInt(adjusted / themeData.cards.size);
    console.log(`Calculated grid width: ${adjusted}; Expected column count: ${num_cards}`);
    return `${(100 / num_cards)}% - ${themeData.cards.gutter * num_cards}px + ${themeData.cards.gutter * 2}px`;
};


export default function BookSizer(props) {
    const [width, setWidth] = useState(findPercentWidth());

    useEffect(() => {
        const listener = () => {
            setWidth(findPercentWidth())
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, []);

    makeStyles((theme) => {
            return {
                "@global":
                    {
                        ".dynamic-book-width": {
                            width: `100%`,
                            [theme.breakpoints.up('xs')]: {
                                width: `calc(50% -  ${themeData.cards.gutter}px)`,
                            },
                            [theme.breakpoints.up('sm')]: {
                                width: `calc(${width})`,
                            }
                        },
                        ".dynamic-header-width": {
                            width: `100%`,
                            [theme.breakpoints.up('sm')]: {
                                width: `calc((${width}) * 2 + ${themeData.cards.gutter}px)`,
                            }
                        }
                    }
            }
        }
    )(() => null);
    return null
}