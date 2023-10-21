const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      desc: { type: String },
    },
    {
      timestamps: false,
      versionKey: false,
    }
  );
  
  const Category = mongoose.model("Category", categorySchema);
  exports.Category = Category;