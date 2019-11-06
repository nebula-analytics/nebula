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

export const buildTimeFilter = (from, until) => {
    let params = new URLSearchParams(window.location.search);
    console.log(from, until)
    if (until === undefined) {
        if (params.has("end_at")) {
            until = moment(params.get("end_at"))
        } else {
            until = moment()
        }
    }
    if (from === undefined) {
        if (params.has("start_at")) {
            from = moment(params.get("start_at"));
        } else {
            let window = 30;
            if (params.has("window")) {
                window = parseInt(params.get("window"))
            }
            from = until.subtract(window, "minutes");
        }
    }
    until = until.toISOString();
    from = from.toISOString();
    console.log(from, ">", until)
    return {
        aggregate: JSON.stringify({"$start": from, "$end": until})
    };
};
