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
        let {record_type, title, extra_fields, last_view, count} = book;
        let {subject, topic, date} = extra_fields;

        title = title || "";
        record_type = record_type || "Unknown";
        // "Wed, 23 Oct 2019 23:28:41 GMT"
        let when = moment(last_view, moment.RFC_2822);

        subject = subject || [];
        date = date || "Unknown";

        record_type = record_type.replace("_", " ");
        title = title.replace(/(<([^>]+)>)/ig, "");

        let link = generatePrimoLink(book) || '';

        let [images, setImages] = useState({values: []});

        useEffect(() => {
            updateWithImageURLs(extra_fields.delivery.link, setImages);
        }, []);

        this.doc_id = new BookRow(book._id);
        this.date = new BookRow(date).setLabel("publish date");
        this.link = new BookRow(link).setLabel("view this in primo").setMode("anchor");
        this.count = new BookRow(count).setLabel("number of views (in the last 30 minutes)");
        this.subjects = new BookRow(subject).setLabel("subjects").setMode("list");
        this.when = new BookRow(when).setLabel("last accessed").setMode("date");
        this.raw_when = new BookRow(when.valueOf()).setLabel("last accessed debug");
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
        this.setLabel.bind(this);
        this.setMode.bind(this);
    }

    setLabel(label) {
        this.label = label;
        return this
    }

    setMode(mode) {
        this.mode = mode;
        return this
    }

    makeRow() {
        if (this.label !== null) {
            return <TableRow key={this.mode + this.toString()}>
                <TableCell style={{textTransform: "capitalize"}}>{this.makeHeader()}</TableCell>
                <TableCell style={{textTransform: "capitalize"}}>{this.makeValue()}</TableCell>
            </TableRow>
        }
    }


    makeHeader() {
        return this.label
    }

    makeValue() {
        switch (this.mode) {
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
    }

    toString() {
        switch (this.mode) {
            case "date":
                return this.value.format("LLLL");
            case "list":
                return Array.toString(this.value);
            default:
                return this.value;

        }
    }

    valueOf() {
        switch (this.mode) {
            case "date":
                return this.value.valueOf();
            default:
                return this.value;
        }
    }
}