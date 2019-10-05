import fetchJsonp from "fetch-jsonp";

export const rewritePrimoURLs = (primoURL) => {
    let url = new URL(primoURL);
    if (url.hostname.startsWith("proxy-") && url.hostname.endsWith(".hosted.exlibrisgroup.com")) {
        if (url.pathname.startsWith("/exl_rewrite/")) {
            /* If the above conditions are met we need to rewrite the url to avoid issues with CORS */
            let path = url.pathname;
            let host;
            path = path.replace("/exl_rewrite/", "");
            host = path.split("/", 1).pop();
            path = path.slice(host.length);
            url.hostname = host;
            url.pathname = path;
        }
    }

    if (url.hostname === "syndetics.com") {
        url = fixSyndetics(url);
    }

    if (url.hostname === "books.google.com") {
        url = fixGoogleBooks(url);
    }

    return url
};

export const fixSyndetics = (syndURL) => {
    if (syndURL.searchParams.has("client")) {
        syndURL.searchParams.set("client", "primo");
    }

    if (syndURL.searchParams.has("isbn")) {
        /* Fix Syndetics */
        let isbn = syndURL.searchParams.get("isbn");
        isbn = isbn.replace("-", "");
        isbn = isbn.replace("-", "");
        isbn = isbn.replace("-", "");
        isbn = isbn.replace("/SC.JPG", "/LC.JPG");
        syndURL.searchParams.set("isbn", isbn)
    }
    return syndURL
};

export const fixGoogleBooks = (gbooksURL) => {
    gbooksURL.searchParams.delete("callback");
    return gbooksURL;
};

export const updateWithImageURLs = (links, callback) => {
    callback(
        links.map((link) => {
            if (link["displayLabel"] === "thumbnail") {
                if (link["linkURL"] && link["linkURL"] !== "no_cover") {
                    let url = rewritePrimoURLs(link["linkURL"]);
                    if (url.hostname === "books.google.com") {
                        if (isValidGBooksURL(url)) {
                            updateWithGBooksURLs(url, callback);
                        }
                        return undefined
                    }
                    return url.toString()
                }
            }
            return undefined
        }).filter((l) => l)
    )
};

export const updateWithALMAImages = (alma_id) => {
    if (alma_id !== undefined) {

    }
}


export const updateWithGBooksURLs = (url, callback) => {
    fetchJsonp(url.toString()).then(
        (response) => {
            return response.json()
        }
    ).then((json) => {
        for (let key in json) {
            if (json[key].thumbnail_url) {
                callback([json.thumbnail_url]);
            }
        }
    }).catch((ex) => {
        console.log('Unable to request google book data', url, ex)
    })
};

export const isValidGBooksURL = (url) => {
    if (url.searchParams.has("bibkeys")) {
        let keys = url.searchParams.get("bibkeys").split(",");
        for (let index in keys) {
            let identifier = keys[index].split(":");
            if (identifier[1]) {
                return true;
            }
        }
    }
    return false
};