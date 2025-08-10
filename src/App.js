import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "../src/styles.css"; // traditional CSS file import

const BOOKINGS_KEY = "bookings";

function TopNav() {
  return (
    <nav className="nav-bar">
      <div className="logo">XEventBooking</div>
      <ul className="nav-links">
        <li><Link to="/">Find Events</Link></li>
        <li><a href="#venues">Venues</a></li>
        <li><a href="#tickets">Tickets</a></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
      </ul>
    </nav>
  );
}

function Landing() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((r) => r.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (!selectedState) return;
    fetch(`https://eventdata.onrender.com/cities/${encodeURIComponent(selectedState)}`)
      .then((r) => r.json())
      .then(setCities);
  }, [selectedState]);

  function onSubmit(e) {
    e.preventDefault();
    if (!selectedState || !selectedCity) return alert("Please select state and city");
    navigate(`/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`);
  }

  return (
    <div className="container">
      <h1>Find Events</h1>
      <form onSubmit={onSubmit} className="form">
        <div id="state" className="form-group">
          <label>State</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div id="city" className="form-group">
          <label>City</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button id="searchBtn" type="submit" className="btn">Search</button>
      </form>
    </div>
  );
}

function useQuery() {
  return new URLSearchParams(window.location.search);
}

function SearchResults() {
  const query = useQuery();
  const state = query.get("state") || "";
  const city = query.get("city") || "";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!state || !city) return;
    fetch(`https://eventdata.onrender.com/events?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then(setEvents);
  }, [state, city]);

  return (
    <div className="container">
      <h1>{events.length} events available in {city}</h1>
      <div className="events-list">
        {events.map((ev, idx) => (
          <div key={idx} className="event-card">
            <h3>{ev.EventName}</h3>
            <p>{ev.Address}</p>
            <p>{ev.City}, {ev.State}</p>
            <p>Rating: {ev.OverallRating}</p>
            <Link to={`/book/${idx}`} state={{ event: ev }}>
              <button className="btn">Book FREE Event</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function Book() {
  const navigate = useNavigate();
  const event = window.history.state?.usr?.event;
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("09:00 AM");
  const slots = ["09:00 AM", "11:00 AM", "02:00 PM", "05:00 PM"];

  function saveBooking() {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
    bookings.push({ event, date: selectedDate, time: selectedSlot });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    navigate("/my-bookings");
  }

  return (
    <div className="container">
      <h1>Book: {event?.EventName}</h1>
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <p>Today</p><p>Morning</p><p>Afternoon</p><p>Evening</p>
      <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
        {slots.map(s => <option key={s}>{s}</option>)}
      </select>
      <button className="btn" onClick={saveBooking}>Confirm Booking</button>
    </div>
  );
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"));
  }, []);

  return (
    <div className="container">
      <h1>My Bookings</h1>
      {bookings.map((b, idx) => (
        <div key={idx} className="event-card">
          <h3>{b.event.EventName}</h3>
          <p>{b.date} - {b.time}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <TopNav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

export default App;
