const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
     },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Object, required: true },
    features: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
    }],
    video: {type: String, required: true},
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
