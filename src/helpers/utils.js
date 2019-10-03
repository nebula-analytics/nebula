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
    const url = new URL(`https://${host}/primo-explore/fulldisplay/?`);

    url.search = new URLSearchParams({
        docid: book.doc_id,
        vid: book.extra_fields.institution,
        context: book.extra_fields.context,
        lang: "en_US",
    });
    return url.toString()
};