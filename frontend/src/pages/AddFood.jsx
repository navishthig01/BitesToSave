import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFood() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        foodName: "",
        foodType: "",
        quantity: "",
        mealcount: "",
        isVegetarian: false,
        pickupDeadline: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/supabase/donations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        food_name: formData.foodName,
                        food_type: formData.foodType,
                        quantity: Number(formData.quantity),
                        mealcount: Number(formData.mealcount),
                        is_vegetarian: formData.isVegetarian,
                        pickup_deadline: formData.pickupDeadline
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add donation");
                setLoading(false);
                return;
            }

            setMessage("Food donation added successfully!");

            setFormData({
                foodName: "",
                foodType: "",
                quantity: "",
                mealcount: "",
                isVegetarian: false,
                pickupDeadline: ""
            });

        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server");
        }

        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Add Food Donation</h1>
                <p>Give your surplus food a second chance.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="foodName"
                        placeholder="Food Name"
                        value={formData.foodName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="foodType"
                        placeholder="Food Type"
                        value={formData.foodType}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                    <input
                        type="number"
                        name="mealcount"
                        placeholder="Number of Meals"
                        value={formData.mealcount}
                        onChange={handleChange}
                        min="1"
                        required
                    />

                    <label>
                        <input
                            type="checkbox"
                            name="isVegetarian"
                            checked={formData.isVegetarian}
                            onChange={handleChange}
                        />
                        Vegetarian
                    </label>

                    <label>Pickup Deadline</label>

                    <input
                        type="datetime-local"
                        name="pickupDeadline"
                        value={formData.pickupDeadline}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Adding Donation..." : "Add Donation"}
                    </button>
                </form>

                {message && (
                    <p className="success-message">{message}</p>
                )}

                {error && (
                    <p className="error-message">{error}</p>
                )}

                <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default AddFood;