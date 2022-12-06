const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let needle = new Schema(
    {
        name: {
            type: String,
        },
        cod: {
            type: Number,
        },
        g09: {
            type: Number,
        },
        g05: {
            type: Number,
        },
        a75: {
            type: Number,
        },
        a76: {
            type: Number,
        },
        a09: {
            type: Number,
        },
        a06: {
            type: Number,
        },
        a12: {
            type: Number,
        },
        a16: {
            type: Number,
        },
        obs: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
    },
    {
        collection: "Needle",
    }
);

module.exports = mongoose.model("needle", needle);