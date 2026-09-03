import { Link } from "react-router-dom";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "BitesToSave User",
        role: "ngo"
    };

    const isRestaurant = user.role === "restaurant";

    return (
        <div className="dashboard-page">

            <nav className="navbar">
                <div className="logo">
                    🍽️ BitesToSave
                </div>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/food">Find Food</Link>

                    {isRestaurant && (
                        <Link to="/add-food">
                            <button className="login-btn">
                                Donate Food
                            </button>
                        </Link>
                    )}
                </div>
            </nav>

            <main className="dashboard-container">

                <section className="dashboard-welcome">
                    <div>
                        <p className="tagline">
                            {isRestaurant
                                ? "RESTAURANT DASHBOARD"
                                : "NGO DASHBOARD"}
                        </p>

                        <h1>
                            Welcome, {user.name} 👋
                        </h1>

                        <p>
                            {isRestaurant
                                ? "Manage your food donations and help reduce food waste."
                                : "Discover surplus food and help provide meals to your community."}
                        </p>
                    </div>
                </section>

                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-icon">🍱</div>
                        <div>
                            <span>Total Donations</span>
                            <strong>{isRestaurant ? "12" : "24"}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🍽️</div>
                        <div>
                            <span>Meals Saved</span>
                            <strong>{isRestaurant ? "185" : "420"}</strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">📦</div>
                        <div>
                            <span>
                                {isRestaurant
                                    ? "Active Donations"
                                    : "Food Requests"}
                            </span>

                            <strong>
                                {isRestaurant ? "3" : "8"}
                            </strong>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">🤝</div>
                        <div>
                            <span>Community Impact</span>
                            <strong>{isRestaurant ? "9" : "15"}</strong>
                        </div>
                    </div>

                </section>

                <section className="dashboard-actions">

                    <div className="dashboard-section-title">
                        <p>QUICK ACTIONS</p>
                        <h2>
                            What would you like to do?
                        </h2>
                    </div>

                    <div className="action-grid">

                        {isRestaurant ? (
                            <>
                                <Link
                                    to="/add-food"
                                    className="action-card"
                                >
                                    <div className="action-icon">
                                        ➕
                                    </div>

                                    <h3>
                                        Add Food Donation
                                    </h3>

                                    <p>
                                        List your restaurant's
                                        surplus food for NGOs.
                                    </p>
                                </Link>

                                <Link
                                    to="/food"
                                    className="action-card"
                                >
                                    <div className="action-icon">
                                        📋
                                    </div>

                                    <h3>
                                        View Donations
                                    </h3>

                                    <p>
                                        See available food and
                                        donation activity.
                                    </p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/food"
                                    className="action-card"
                                >
                                    <div className="action-icon">
                                        🔎
                                    </div>

                                    <h3>
                                        Find Food
                                    </h3>

                                    <p>
                                        Search for available
                                        surplus food nearby.
                                    </p>
                                </Link>

                                <Link
                                    to="/change-password"
                                    className="action-card"
                                >
                                    <div className="action-icon">
                                        🔐
                                    </div>

                                    <h3>
                                        Account Settings
                                    </h3>

                                    <p>
                                        Update your BitesToSave
                                        account password.
                                    </p>
                                </Link>
                            </>
                        )}

                    </div>

                </section>

                <section className="impact-card">

                    <div>
                        <p className="tagline">
                            YOUR IMPACT
                        </p>

                        <h2>
                            Every meal rescued makes a difference.
                        </h2>

                        <p>
                            BitesToSave brings restaurants,
                            NGOs and communities together to
                            reduce food waste and feed people
                            in need.
                        </p>
                    </div>

                    <div className="impact-number">
                        <strong>605+</strong>
                        <span>Meals rescued</span>
                    </div>

                </section>

            </main>
        </div>
    );
}

export default Dashboard;