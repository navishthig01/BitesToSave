const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const foodRequestRoutes = require("./routes/foodRequestRoutes");
const supabaseRoutes = require("./routes/supabaseRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Food donation routes
app.use("/api/food", foodRoutes);

// Food request routes
app.use("/api/requests", foodRequestRoutes);

// Supabase routes
app.use("/api/supabase", supabaseRoutes);

// Main test route
app.get("/", (req, res) => {
    res.json({
        message: "BitesToSave backend is running!"
    });
});

// Server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});