const Food = require("../models/Food");
const { generateFoodDescription } = require("../services/geminiService");

// ===============================
// ADD FOOD DONATION
// ===============================
const addFood = async (req, res) => {
    try {
        const {
            foodName,
            description,
            quantity,
            expiryTime
        } = req.body || {};

        // Check required fields
        if (!foodName || !quantity || !expiryTime) {
            return res.status(400).json({
                message: "Please provide food name, quantity and expiry time"
            });
        }

        // Only restaurants can add food
        if (req.user.role !== "restaurant") {
            return res.status(403).json({
                message: "Only restaurants can add food donations"
            });
        }

        // Generate description using Gemini if not provided
        let finalDescription = description;

        if (!finalDescription) {
            try {
                finalDescription = await generateFoodDescription(foodName);
            } catch (error) {
                console.error("Gemini description generation failed:", error.message);

                // Fallback description if Gemini is temporarily unavailable
                finalDescription = `Fresh surplus ${foodName} available for donation.`;
            }
        }

        // Create food donation
        const food = await Food.create({
            foodName,
            description: finalDescription,
            quantity,
            expiryTime,
            restaurant: req.user.id
        });

        res.status(201).json({
            message: "Food donation added successfully",
            food
        });

    } catch (error) {
        console.error("Add food error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET ALL AVAILABLE FOOD
// ===============================
const getFood = async (req, res) => {
    try {
        const food = await Food.find({
            status: "available"
        })
            .populate("restaurant", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: food.length,
            food
        });

    } catch (error) {
        console.error("Get food error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET FOOD BY ID
// ===============================
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id)
            .populate("restaurant", "name email");

        if (!food) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }

        res.status(200).json({
            food
        });

    } catch (error) {
        console.error("Get food by ID error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// UPDATE FOOD DONATION
// ===============================
const updateFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }

        // Only the restaurant that created the food can update it
        if (food.restaurant.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own food donations"
            });
        }

        const {
            foodName,
            description,
            quantity,
            expiryTime,
            status
        } = req.body || {};

        if (foodName !== undefined) {
            food.foodName = foodName;
        }

        if (description !== undefined) {
            food.description = description;
        }

        if (quantity !== undefined) {
            food.quantity = quantity;
        }

        if (expiryTime !== undefined) {
            food.expiryTime = expiryTime;
        }

        if (status !== undefined) {
            food.status = status;
        }

        await food.save();

        res.status(200).json({
            message: "Food donation updated successfully",
            food
        });

    } catch (error) {
        console.error("Update food error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// DELETE FOOD DONATION
// ===============================
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }

        // Only the restaurant that created the food can delete it
        if (food.restaurant.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own food donations"
            });
        }

        await food.deleteOne();

        res.status(200).json({
            message: "Food donation deleted successfully"
        });

    } catch (error) {
        console.error("Delete food error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// EXPORT FUNCTIONS
// ===============================
module.exports = {
    addFood,
    getFood,
    getFoodById,
    updateFood,
    deleteFood
};