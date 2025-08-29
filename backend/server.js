const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes=require('./routes/userRoutes');
const categoryRoutes=require('./routes/category');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/category"));

// Simple route
app.get("/", (req, res) => {
  res.send("MongoDB connection working ✅");
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
