import { useState } from "react";
import { Link } from "react-router-dom";

function FoodList() {
    const [foods] = useState([
        {
            id: 1,
            name: "Vegetable Rice",
            type: "Cooked Meal",
            quantity: 25,
            meals: 25,
            vegetarian: true,
            location: "Anekal",
            deadline: "Today, 7:00 PM"
        },
        {
            id: 2,
            name: "Chapati & Dal",
            type: "Cooked Meal",
            quantity: 30,
            meals: 30,
            vegetarian: true,
            location: "Electronic City",
            deadline: "Today, 8:30 PM"
        },
        {
            id: 3,
            name: "Fresh Bread",
            type: "Bakery",
            quantity: 15,
            meals: 15,
            vegetarian: true,
            location: "Bommasandra",
            deadline: "Tomorrow, 9:00 AM"
        }
    ]);

    return (
        <div className="food-page">

            <nav className="navbar">
                <div className="logo">
                    🍽️ BitesToSave
                </div>

                <div className="nav-links">
                    <Link to="/">Home</Link>

                    <Link to="/add-food">
                        <button className="login-btn">
                            Donate Food
                        </button>
                    </Link>
                </div>
            </nav>

            <div className="food-container">

                <div className="food-header">
                    <div>
                        <p className="tagline">
                            AVAILABLE DONATIONS
                        </p>

                        <h1>Find Food Near You</h1>

                        <p>
                            Discover surplus food donated by restaurants
                            and help make every meal count.
                        </p>
                    </div>

                    <Link to="/add-food">
                        <button className="primary-btn">
                            + Add Donation
                        </button>
                    </Link>
                </div>

                <div className="food-grid">

                    {foods.map((food) => (
                        <div className="food-card" key={food.id}>

                            <div className="food-card-top">
                                <span className="food-emoji">
                                    🍱
                                </span>

                                <span className="available-badge">
                                    Available
                                </span>
                            </div>

                            <h2>{food.name}</h2>

                            <p className="food-type">
                                {food.type}
                            </p>

                            <div className="food-details">

                                <div>
                                    <strong>{food.quantity}</strong>
                                    <span>Items</span>
                                </div>

                                <div>
                                    <strong>{food.meals}</strong>
                                    <span>Meals</span>
                                </div>

                                <div>
                                    <strong>
                                        {food.vegetarian ? "Yes" : "No"}
                                    </strong>
                                    <span>Vegetarian</span>
                                </div>

                            </div>

                            <div className="food-location">
                                📍 {food.location}
                            </div>

                            <div className="food-deadline">
                                ⏰ Pickup by {food.deadline}
                            </div>

                            <button className="claim-btn">
                                Request Food
                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default FoodList;