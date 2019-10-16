import themeData from "../constants/theme";

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
        vid: book.extra_fields.institution || book.extra_fields.delivery_institution,
        context: book.extra_fields.context,
    });
    return url.toString()
};

export const findNumCards = () => {
    let adjusted = window.innerWidth - ((32 + themeData.cards.gutter) * 2);
    return parseInt(adjusted / themeData.cards.size);
};

export const buildRecordRequestURL = (filter) => {
    let protocol = window.location.protocol;
    let location = process.env.REACT_APP_API_LOCATION || ':8080';
    let host = process.env.REACT_APP_API_HOST || window.location.hostname;
    let max_results = getQueryStringValue("max_results") || findNumCards() * 10;

    const url = new URL(`${protocol}//${host}${location}/joint`);

    url.search = new URLSearchParams({
        "max_results": max_results,
        "page": "1",
        "sort": "-last_view",
    });
    return url
};

export const buildTimeFilter = (from, until) => {
    let params = new URLSearchParams(window.location.search);
    if (until === undefined) {
        if (params.has("end_at")) {
            until = new Date(params.get("end_at"))
        } else {
            until = new Date()
        }
    }
    if (from === undefined) {
        if (params.has("start_at")) {
            from = new Date(params.get("start_at"));
        } else {
            let window = 30;
            if (params.has("window")) {
                window = parseInt(params.get("window"))
            }
            from = until;
            from.setMinutes((until).getMinutes() - window);
        }
    }
    until = until.toUTCString();
    from = from.toUTCString();
    return {
        last_viewed: {"$gte": from, "$lte": until}
    };
};
