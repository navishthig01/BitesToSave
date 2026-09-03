import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function FoodList() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [requestMessage, setRequestMessage] = useState("");
    const [requestingId, setRequestingId] = useState(null);
    const [requestedIds, setRequestedIds] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:5000/api/food"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch food"
                    );
                }

                setFoods(data.food || []);
            } catch (error) {
                console.error("Fetch food error:", error);
                setError(
                    "Unable to load food donations from the server."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const handleRequest = async (foodId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setRequestMessage("Please login as an NGO to request food.");
            return;
        }

        try {
            setRequestingId(foodId);
            setRequestMessage("");
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/requests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        foodId: foodId
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setRequestMessage(
                    data.message || "Unable to request food."
                );
                return;
            }

            setRequestedIds((currentIds) => [
                ...currentIds,
                foodId
            ]);

            setRequestMessage(
                "Food request created successfully!"
            );
        } catch (error) {
            console.error("Request food error:", error);
            setRequestMessage(
                "Unable to connect to the server."
            );
        } finally {
            setRequestingId(null);
        }
    };

    const filteredFoods = useMemo(() => {
        return foods.filter((food) => {
            const name =
                food.foodName?.toLowerCase() || "";

            const description =
                food.description?.toLowerCase() || "";

            return (
                name.includes(searchTerm.toLowerCase()) ||
                description.includes(searchTerm.toLowerCase())
            );
        });
    }, [foods, searchTerm]);

    return (
        <div className="food-page">

            <nav className="navbar">

                <div className="logo">
                    🍽️ BitesToSave
                </div>

                <div className="nav-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/add-food">
                        <button className="login-btn">
                            Donate Food
                        </button>
                    </Link>

                </div>

            </nav>

            <div className="food-container">

                {/* Header */}

                <div className="food-header">

                    <div>

                        <p className="tagline">
                            AVAILABLE DONATIONS
                        </p>

                        <h1>
                            Find Food Near You
                        </h1>

                        <p>
                            Discover surplus food donated by
                            restaurants and help make every
                            meal count.
                        </p>

                    </div>

                    <Link to="/add-food">
                        <button className="primary-btn">
                            + Add Donation
                        </button>
                    </Link>

                </div>

                {/* Search */}

                <div className="food-filters">

                    <div className="search-box">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Search food..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>

                    <button
                        type="button"
                        className="reset-btn"
                        onClick={() => setSearchTerm("")}
                    >
                        Reset
                    </button>

                </div>

                {/* Request Message */}

                {requestMessage && (
                    <div className="request-success-message">
                        ✓ {requestMessage}
                    </div>
                )}

                {/* Result Count */}

                {!loading && !error && (
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

                    </div>
                )}

                {/* Loading */}

                {loading && (
                    <div className="empty-food-state">

                        <div className="empty-food-icon">
                            ⏳
                        </div>

                        <h2>
                            Loading donations...
                        </h2>

                        <p>
                            Getting the latest food donations
                            from BitesToSave.
                        </p>

                    </div>
                )}

                {/* Error */}

                {!loading && error && (
                    <div className="empty-food-state">

                        <div className="empty-food-icon">
                            ⚠️
                        </div>

                        <h2>
                            Unable to load donations
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            className="primary-btn"
                            onClick={() =>
                                window.location.reload()
                            }
                        >
                            Try Again
                        </button>

                    </div>
                )}

                {/* Food Cards */}

                {!loading &&
                    !error &&
                    filteredFoods.length > 0 && (

                        <div className="food-grid">

                            {filteredFoods.map((food) => {

                                const requested =
                                    requestedIds.includes(
                                        food._id
                                    );

                                const isRequesting =
                                    requestingId === food._id;

                                return (
                                    <div
                                        className="food-card"
                                        key={food._id}
                                    >

                                        <div className="food-card-top">

                                            <span className="food-emoji">
                                                🍱
                                            </span>

                                            <span
                                                className={
                                                    requested
                                                        ? "requested-badge"
                                                        : "available-badge"
                                                }
                                            >
                                                {requested
                                                    ? "Requested"
                                                    : food.status ||
                                                      "Available"}
                                            </span>

                                        </div>

                                        <h2>
                                            {food.foodName}
                                        </h2>

                                        <p className="food-type">
                                            Food Donation
                                        </p>

                                        <p>
                                            {food.description}
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
                                                    {food.quantity}
                                                </strong>

                                                <span>
                                                    Meals
                                                </span>
                                            </div>

                                            <div>
                                                <strong>
                                                    —
                                                </strong>

                                                <span>
                                                    Vegetarian
                                                </span>
                                            </div>

                                        </div>

                                        <div className="food-location">
                                            📍{" "}
                                            {food.restaurant?.name ||
                                                "Restaurant"}
                                        </div>

                                        <div className="food-deadline">
                                            ⏰ Pickup before{" "}
                                            {food.expiryTime
                                                ? new Date(
                                                    food.expiryTime
                                                ).toLocaleString()
                                                : "Not specified"}
                                        </div>

                                        <button
                                            className={
                                                requested
                                                    ? "claim-btn requested-btn"
                                                    : "claim-btn"
                                            }
                                            onClick={() =>
                                                handleRequest(
                                                    food._id
                                                )
                                            }
                                            disabled={
                                                requested ||
                                                isRequesting
                                            }
                                        >
                                            {requested
                                                ? "✓ Food Requested"
                                                : isRequesting
                                                    ? "Requesting..."
                                                    : "Request Food"}
                                        </button>

                                    </div>
                                );
                            })}

                        </div>
                    )}

                {/* Empty */}

                {!loading &&
                    !error &&
                    filteredFoods.length === 0 && (

                        <div className="empty-food-state">

                            <div className="empty-food-icon">
                                🔍
                            </div>

                            <h2>
                                No food donations found
                            </h2>

                            <p>
                                Try another search.
                            </p>

                            <button
                                className="primary-btn"
                                onClick={() =>
                                    setSearchTerm("")
                                }
                            >
                                Clear Search
                            </button>

                        </div>
                    )}

            </div>
        </div>
    );
}

export default FoodList;