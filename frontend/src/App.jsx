import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import ChangePassword from './pages/ChangePassword'
import AddFood from './pages/AddFood'
import FoodList from './pages/FoodList'

import './App.css'


function Home() {
  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">

        <div className="logo">
          🍽️ BitesToSave
        </div>

        <div className="nav-links">

          <a href="#home">Home</a>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#about">
            About
          </a>

          <Link to="/food">
            Find Food
          </Link>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

        </div>

      </nav>


      {/* Hero */}
      <section
        className="hero-section"
        id="home"
      >

        <div className="hero-content">

          <p className="tagline">
            SAVE FOOD • FEED COMMUNITIES
          </p>

          <h1>
            Give Surplus Food
            <span> A Second Chance.</span>
          </h1>

          <p className="hero-text">
            BitesToSave connects restaurants with local NGOs
            and shelters to make sure surplus food reaches
            people who need it.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Donate Food
              </button>
            </Link>

            <Link to="/food">
              <button className="secondary-btn">
                Find Food
              </button>
            </Link>

          </div>

        </div>


        <div className="hero-card">

          <div className="food-icon">
            🥗
          </div>

          <h2>
            Every Bite Matters
          </h2>

          <p>
            Together, we can reduce food waste
            and help our communities.
          </p>

        </div>

      </section>


      {/* How It Works */}
      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <p>
            HOW IT WORKS
          </p>

          <h2>
            From Surplus to Someone's Plate
          </h2>

        </div>


        <div className="steps">

          <div className="step-card">

            <div className="step-number">
              1
            </div>

            <h3>
              Restaurants Donate
            </h3>

            <p>
              Restaurants list their safe surplus food
              on BitesToSave.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              2
            </div>

            <h3>
              NGOs Discover
            </h3>

            <p>
              Local NGOs and shelters find available
              food nearby.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              3
            </div>

            <h3>
              Communities Benefit
            </h3>

            <p>
              Food is collected and delivered to
              people who need it.
            </p>

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        className="features-section"
        id="about"
      >

        <div className="section-heading">

          <p>
            WHY BITESTOSAVE?
          </p>

          <h2>
            Making Every Donation Count
          </h2>

        </div>


        <div className="features">

          <div className="feature">

            <div>
              🌱
            </div>

            <h3>
              Reduce Food Waste
            </h3>

            <p>
              Help restaurants turn surplus food
              into meaningful donations.
            </p>

          </div>


          <div className="feature">

            <div>
              🤝
            </div>

            <h3>
              Connect Communities
            </h3>

            <p>
              Bring restaurants, NGOs and shelters
              together on one platform.
            </p>

          </div>


          <div className="feature">

            <div>
              📍
            </div>

            <h3>
              Find Nearby Food
            </h3>

            <p>
              Make it easier for NGOs to discover
              donations in their area.
            </p>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer>

        <h2>
          🍽️ BitesToSave
        </h2>

        <p>
          Rescue food. Feed communities. Make a difference.
        </p>

        <p className="copyright">
          © 2026 BitesToSave
        </p>

      </footer>

    </div>
  )
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />


        {/* Restaurant */}
        <Route
          path="/add-food"
          element={<AddFood />}
        />


        {/* NGO */}
        <Route
          path="/food"
          element={<FoodList />}
        />

      </Routes>

    </BrowserRouter>

  )
}


export default App