const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let horarios = new Schema(
  {
    nombre: {
      type: String,
    },
    cargo: {
      type: String,
    },
    turno: {
      type: String,
    },
    horario: {
      type: String,
    },
    dias: {
      type: String,
    },
    data: { type: Date, default: Date.now },
  },
  {
    collection: "Horarios",
  }
);

module.exports = mongoose.model("horarios", horarios);