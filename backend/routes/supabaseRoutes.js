const express = require("express");
const supabase = require("../config/supabaseClient");

const router = express.Router();

// ==========================================
// GET PROFILES
// ==========================================
router.get("/profiles", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Profiles")
            .select("*")
            .limit(10);

        if (error) {
            console.error("Supabase Profiles error:", error.message);

            return res.status(500).json({
                message: "Supabase request failed",
                error: error.message
            });
        }

        res.json({
            message: "Supabase connected successfully",
            profiles: data
        });

    } catch (error) {
        console.error("Profiles server error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ==========================================
// GET DONATIONS
// ==========================================
router.get("/donations", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("Donations")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase Donations error:", error.message);

            return res.status(500).json({
                message: "Could not fetch donations",
                error: error.message
            });
        }

        res.json({
            message: "Donations fetched successfully",
            donations: data
        });

    } catch (error) {
        console.error("Donations server error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ==========================================
// ADD DONATION
// ==========================================
router.post("/donations", async (req, res) => {
    try {
        const {
            food_name,
            food_type,
            quantity,
            mealcount,
            is_vegetarian,
            pickup_deadline
        } = req.body;

        // Basic validation
        if (!food_name || !food_type || !quantity || !mealcount || !pickup_deadline) {
            return res.status(400).json({
                message: "Please provide all required donation details"
            });
        }

        const { data, error } = await supabase
            .from("Donations")
            .insert([
                {
                    food_name: food_name,
                    food_type: food_type,
                    quantity: Number(quantity),
                    mealcount: Number(mealcount),
                    is_vegetarian: Boolean(is_vegetarian),
                    pickup_deadline: pickup_deadline,
                    status: "available"
                }
            ])
            .select();

        if (error) {
            console.error("Supabase donation error:", error.message);

            return res.status(500).json({
                message: "Could not add donation",
                error: error.message
            });
        }

        res.status(201).json({
            message: "Donation added successfully",
            donation: data[0]
        });

    } catch (error) {
        console.error("Donation server error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


module.exports = router;