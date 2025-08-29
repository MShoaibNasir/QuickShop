const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    status: { type: String, enum: ["1", "0"], default: "1" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
