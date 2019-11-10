import themeData from "../constants/theme";
import moment from "moment";

export const getQueryStringValue = (string, d = undefined) => {
    const params = new URLSearchParams(window.location.search);
    if (params.has(string)) {
        return params.get(string);
    } else {
        return d
    }
};


export const stringToHslColor = (str, s = 20, l = 50) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};

export const generatePrimoLink = (book) => {
    const region = process.env.REACT_APP_PRIMO_REGION || "apac";
    const host = process.env.REACT_APP_PRIMO_HOST || `primo-direct-${region}.hosted.exlibrisgroup.com`;
    const url = new URL(`https://${host}/primo-explore/fulldisplay?`);

    url.search = new URLSearchParams({
        docid: book.doc_id,
        vid: book.institution || "RMITU",
        context: book.context || "PC",
    });
    return url.toString()
};

export const findNumCards = () => {
    let adjusted = window.innerWidth - ((32 + themeData.cards.gutter) * 2);
    return parseInt(adjusted / themeData.cards.size);
};

export const buildRecordRequestURL = (filter) => {
    let protocol = "https:";
    let location = process.env.REACT_APP_API_LOCATION || '/api';
    let host = process.env.REACT_APP_API_HOST || window.location.hostname;
    let max_results = getQueryStringValue("max_results") || findNumCards() * 10;

    const url = new URL(`${protocol}//${host}${location}/views`);

    url.search = new URLSearchParams({
        "max_results": max_results,
        "page": "1",
        "sort": "-last_view",
        ...filter
    });
    return url
};

export const buildTimeFilter = (start, end) => {
    let startParam = getQueryStringValue("start_at");
    let window = moment.duration(30, "m");

    let endParam = getQueryStringValue("end_at");
    start = (start || startParam) && moment(start || startParam);
    end = (end || endParam) && moment(end || endParam);
    if (!start && !end) {
        end = moment();

    }
    if (!start) {
        start = end.clone().subtract(window);
    }

    if (!end) {
        end = start.clone().add(window);
    }

    let aggregation = {
        "$start": start.toISOString(),
        "$end": end.toISOString()
    };


    return {
        aggregate: JSON.stringify(aggregation)
    };
};
