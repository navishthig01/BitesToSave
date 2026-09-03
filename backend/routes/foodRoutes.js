const express = require("express");

const {
    addFood,
    getFood,
    getFoodById,
    updateFood,
    deleteFood
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add a food donation
router.post("/", protect, addFood);

// Get all available food
router.get("/", getFood);

// Get a specific food donation
router.get("/:id", getFoodById);

// Update a food donation
router.put("/:id", protect, updateFood);

// Delete a food donation
router.delete("/:id", protect, deleteFood);

module.exports = router;