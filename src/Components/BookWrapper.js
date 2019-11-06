import moment from "moment";
import {generatePrimoLink} from "../helpers/utils";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {useEffect, useState} from "react";
import Chip from "@material-ui/core/Chip";
import {Label} from "@material-ui/icons";
import {TableCell, TableRow} from "@material-ui/core";
import {updateWithImageURLs} from "../helpers/thumbnails";

export default class Book {
    constructor(book) {
        let {record_type, title, thumbnails, locations, significant_date, subjects, last_view, count} = book;

        title = title || "";
        record_type = record_type || "Unknown";
        // "Wed, 23 Oct 2019 23:28:41 GMT"
        let when = moment(last_view, moment.RFC_2822);

        let subject = subjects || [];
        let date = significant_date || "Unknown";

        record_type = record_type.replace("_", " ");
        title = title.replace(/(<([^>]+)>)/ig, "");

        let link = generatePrimoLink(book) || '';

        let [images, setImages] = useState({values: []});

        useEffect(() => {
            updateWithImageURLs(thumbnails, setImages);
        }, [thumbnails]);

        this.doc_id = new BookRow(book._id);
        this.date = new BookRow(date).setLabel("publish date");
        this.link = new BookRow(link).setLabel("view this in primo").setMode("anchor");
        this.count = new BookRow(count).setLabel("number of views (in the last 30 minutes)");
        this.subjects = new BookRow(subject).setLabel("subjects").setMode("list");
        this.where = new BookRow(locations).setLabel("Viewed from").setMode("list");
        this.when = new BookRow(when).setLabel("last accessed").setMode("date");
        this.type = new BookRow(record_type).setLabel("type of record");
        this.title = new BookRow(title);
        this.images = new BookRow(images.values);
    }
}

class BookRow {
    constructor(value) {
        this.value = value;
        this.label = null;
        this.mode = "string";
    }

    asKey = () => {
        return this.toString().replace("\"", "")
    };

    setLabel = (label) => {
        this.label = label;
        return this
    };

    setMode = (mode) => {
        this.mode = mode;
        return this
    };

    makeRow = () => {
        if (this.label !== null) {
            return <TableRow key={`${this.mode}_${this.label}`}>
                <TableCell style={{textTransform: "capitalize"}}>{this.makeHeader()}</TableCell>
                <TableCell style={{textTransform: "capitalize"}}>{this.makeValue()}</TableCell>
            </TableRow>
        }
    };


    makeHeader = () => {
        return this.label
    };

    makeValue = () => {
        switch (this.mode) {
            default:
            case "string":
                return <Typography>{this.value}</Typography>;
            case "anchor":
                return <Typography><a href={this.value}>{this.value}</a></Typography>;
            case "date":
                return <Typography>{this.value.format("LLLL")}</Typography>;
            case "list":
                return Object.values(this.value).map(
                    (item, i) => <Chip
                        key={i}
                        icon={<Label/>}
                        label={item.replace(/(<([^>]+)>)/ig, "")}
                        color="primary"
                        size={"small"}
                    />
                );
        }
    };

    toString = () => {
        switch (this.mode) {
            case "date":
                return this.value.format("LLLL");
            case "list":
                return Array.toString(this.value);
            default:
                return this.value;

        }
    };

    valueOf = () => {
        switch (this.mode) {
            case "date":
                return this.value.valueOf();
            default:
                return this.value;
        }
    };
}