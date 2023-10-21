const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    products: [],
    selectedFeatures: [],
    total: { type: Number, required: true },
    //delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
