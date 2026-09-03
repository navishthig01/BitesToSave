const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        foodName: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        expiryTime: {
            type: Date,
            required: true
        },

        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["available", "requested", "claimed", "expired"],
            default: "available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Food", foodSchema);