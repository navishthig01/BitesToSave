const FoodRequest = require("../models/FoodRequest");
const Food = require("../models/Food");

// ===============================
// CREATE FOOD REQUEST
// ===============================
const createRequest = async (req, res) => {
    try {
        const { foodId } = req.body;

        if (!foodId) {
            return res.status(400).json({
                message: "Food ID is required"
            });
        }

        // Only NGOs can request food
        if (req.user.role !== "ngo") {
            return res.status(403).json({
                message: "Only NGOs can request food"
            });
        }

        // Check if food exists
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }

        // Check if food is available
        if (food.status !== "available") {
            return res.status(400).json({
                message: "This food is no longer available"
            });
        }

        // Create request
        const request = await FoodRequest.create({
            food: foodId,
            ngo: req.user.id
        });

        res.status(201).json({
            message: "Food request created successfully",
            request
        });

    } catch (error) {
        console.error("Create request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ===============================
// GET ALL FOOD REQUESTS
// ===============================
const getRequests = async (req, res) => {
    try {
        const requests = await FoodRequest.find()
            .populate("food")
            .populate("ngo", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: requests.length,
            requests
        });

    } catch (error) {
        console.error("Get requests error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// ===============================
// UPDATE FOOD REQUEST
// ===============================
const updateRequest = async (req, res) => {
    try {
        const { status } = req.body;

        // Check valid status
        if (!["approved", "rejected", "completed"].includes(status)) {
            return res.status(400).json({
                message: "Invalid request status"
            });
        }

        // Find request
        const request = await FoodRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Food request not found"
            });
        }

        // Only restaurant or admin can update request
        if (!["restaurant", "admin"].includes(req.user.role)) {
            return res.status(403).json({
                message: "Only restaurants or admins can update requests"
            });
        }

        // Update request status
        request.status = status;

        await request.save();

        // If approved, mark food as requested
        if (status === "approved") {
            await Food.findByIdAndUpdate(request.food, {
                status: "requested"
            });
        }

        // If completed, mark food as claimed
        if (status === "completed") {
            await Food.findByIdAndUpdate(request.food, {
                status: "claimed"
            });
        }

        res.status(200).json({
            message: "Food request updated successfully",
            request
        });

    } catch (error) {
        console.error("Update request error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};
// ===============================
// EXPORT FUNCTIONS
// ===============================
module.exports = {
    createRequest,
    getRequests,
    updateRequest
};