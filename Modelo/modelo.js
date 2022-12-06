const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Schema1=mongoose.Schema1;

let modeloDatos = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      min: 4,
      max: 1024,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      minlenght: 4,
    },
    data: { type: Date, default: Date.now },
  },
  {
    collection: "Usuarios",
  }
);
module.exports = mongoose.model("modeloDatos", modeloDatos);

