import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", background: "#2563eb", color: "#fff" }}>
      <span style={{ fontWeight: "bold", marginRight: "1rem" }}>Event Booker</span>
      <Link to="/" style={{ marginRight: "1rem", color: "#fff" }}>Find Events</Link>
      <Link to="/my-bookings" style={{ color: "#fff" }}>My Bookings</Link>
    </nav>
  );
};

export default Navbar;
