const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Feature = mongoose.model("Feature", featureSchema);
exports.Feature = Feature;