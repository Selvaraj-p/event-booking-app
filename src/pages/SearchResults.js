import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search);
  const state = query.get("state");
  const city = query.get("city");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
      .then(res => res.json())
      .then(setEvents);
  }, [state, city]);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{events.length} events available in {city}</h1>
      {events.map(event => (
        <div key={event.id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <h3>{event.event_name}</h3>
          <p>{event.address}, {event.city}, {event.state}</p>
          <p>Rating: {event.rating}</p>
          <Link to={`/book/${event.id}`}>
            <button>Book FREE Event</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
