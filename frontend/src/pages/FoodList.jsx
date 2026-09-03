import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function FoodList() {
    const [foods, setFoods] = useState([
        {
            id: 1,
            name: "Vegetable Rice",
            type: "Cooked Meal",
            quantity: 25,
            meals: 25,
            vegetarian: true,
            location: "Anekal",
            deadline: "Today, 7:00 PM",
            status: "available"
        },
        {
            id: 2,
            name: "Chapati & Dal",
            type: "Cooked Meal",
            quantity: 30,
            meals: 30,
            vegetarian: true,
            location: "Electronic City",
            deadline: "Today, 8:30 PM",
            status: "available"
        },
        {
            id: 3,
            name: "Fresh Bread",
            type: "Bakery",
            quantity: 15,
            meals: 15,
            vegetarian: true,
            location: "Bommasandra",
            deadline: "Tomorrow, 9:00 AM",
            status: "available"
        },
        {
            id: 4,
            name: "Paneer Curry",
            type: "Cooked Meal",
            quantity: 20,
            meals: 20,
            vegetarian: true,
            location: "Anekal",
            deadline: "Today, 6:30 PM",
            status: "available"
        },
        {
            id: 5,
            name: "Veg Sandwiches",
            type: "Snacks",
            quantity: 18,
            meals: 18,
            vegetarian: true,
            location: "Electronic City",
            deadline: "Today, 9:00 PM",
            status: "available"
        },
        {
            id: 6,
            name: "Mixed Rice Meals",
            type: "Cooked Meal",
            quantity: 12,
            meals: 12,
            vegetarian: false,
            location: "Bommasandra",
            deadline: "Tomorrow, 10:00 AM",
            status: "available"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("All");
    const [vegetarianOnly, setVegetarianOnly] = useState(false);

    const handleRequest = (id) => {
        setFoods((currentFoods) =>
            currentFoods.map((food) =>
                food.id === id
                    ? {
                        ...food,
                        status: "requested"
                    }
                    : food
            )
        );
    };

    const resetFilters = () => {
        setSearchTerm("");
        setLocationFilter("All");
        setVegetarianOnly(false);
    };

    const filteredFoods = useMemo(() => {
        return foods.filter((food) => {
            const matchesSearch =
                food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                food.type.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLocation =
                locationFilter === "All" ||
                food.location === locationFilter;

            const matchesVegetarian =
                !vegetarianOnly || food.vegetarian;

            return (
                matchesSearch &&
                matchesLocation &&
                matchesVegetarian
            );
        });
    }, [foods, searchTerm, locationFilter, vegetarianOnly]);

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

                {/* HEADER */}
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

                {/* FILTERS */}
                <div className="food-filters">

                    <div className="search-box">
                        <span>🔎</span>

                        <input
                            type="text"
                            placeholder="Search food or food type..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />
                    </div>

                    <select
                        value={locationFilter}
                        onChange={(e) =>
                            setLocationFilter(e.target.value)
                        }
                    >
                        <option value="All">
                            All Locations
                        </option>

                        <option value="Anekal">
                            Anekal
                        </option>

                        <option value="Electronic City">
                            Electronic City
                        </option>

                        <option value="Bommasandra">
                            Bommasandra
                        </option>
                    </select>

                    <label className="vegetarian-filter">
                        <input
                            type="checkbox"
                            checked={vegetarianOnly}
                            onChange={(e) =>
                                setVegetarianOnly(e.target.checked)
                            }
                        />

                        Vegetarian only
                    </label>

                    <button
                        type="button"
                        className="reset-btn"
                        onClick={resetFilters}
                    >
                        Reset
                    </button>
                </div>

                {/* RESULT INFO */}
                <div className="food-result-bar">
                    <div>
                        <strong>
                            {filteredFoods.length}
                        </strong>{" "}
                        {filteredFoods.length === 1
                            ? "donation"
                            : "donations"}{" "}
                        available
                    </div>

                    {(searchTerm ||
                        locationFilter !== "All" ||
                        vegetarianOnly) && (
                        <span>
                            Filters applied
                        </span>
                    )}
                </div>

                {/* FOOD CARDS */}
                {filteredFoods.length > 0 ? (
                    <div className="food-grid">

                        {filteredFoods.map((food) => (
                            <div
                                className="food-card"
                                key={food.id}
                            >
                                <div className="food-card-top">
                                    <span className="food-emoji">
                                        🍱
                                    </span>

                                    <span
                                        className={
                                            food.status === "requested"
                                                ? "requested-badge"
                                                : "available-badge"
                                        }
                                    >
                                        {food.status === "requested"
                                            ? "Requested"
                                            : "Available"}
                                    </span>
                                </div>

                                <h2>{food.name}</h2>

                                <p className="food-type">
                                    {food.type}
                                </p>

                                <div className="food-details">

                                    <div>
                                        <strong>
                                            {food.quantity}
                                        </strong>

                                        <span>
                                            Items
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            {food.meals}
                                        </strong>

                                        <span>
                                            Meals
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            {food.vegetarian
                                                ? "Yes"
                                                : "No"}
                                        </strong>

                                        <span>
                                            Vegetarian
                                        </span>
                                    </div>

                                </div>

                                <div className="food-location">
                                    📍 {food.location}
                                </div>

                                <div className="food-deadline">
                                    ⏰ Pickup by {food.deadline}
                                </div>

                                <button
                                    className={
                                        food.status === "requested"
                                            ? "claim-btn requested-btn"
                                            : "claim-btn"
                                    }
                                    onClick={() =>
                                        handleRequest(food.id)
                                    }
                                    disabled={
                                        food.status === "requested"
                                    }
                                >
                                    {food.status === "requested"
                                        ? "✓ Food Requested"
                                        : "Request Food"}
                                </button>
                            </div>
                        ))}

                    </div>
                ) : (
                    <div className="empty-food-state">
                        <div className="empty-food-icon">
                            🔍
                        </div>

                        <h2>
                            No food donations found
                        </h2>

                        <p>
                            Try changing your search or filters
                            to find available donations.
                        </p>

                        <button
                            className="primary-btn"
                            onClick={resetFilters}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default FoodList;