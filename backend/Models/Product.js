const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true},
    image: { type: String, required: true, unique: true },
    category_id: { type: String, required: true },
    is_available: { type: String, enum: ["1", "0"], default: "1" },
    status: { type: String, enum: ["1", "0"], default: "1" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);
