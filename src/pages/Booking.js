import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetch("https://eventdata.onrender.com/events?state=&city=")
      .then(res => res.json())
      .then(data => setEvent(data.find(e => e.id.toString() === id)));
  }, [id]);

  const getDates = () => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      arr.push(d.toISOString().split("T")[0]);
    }
    return arr;
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return alert("Select both date and time");
    const booking = {
      id: Date.now(),
      event,
      date: selectedDate,
      time: selectedTime
    };
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    navigate("/my-bookings");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {event ? (
        <>
          <h2>{event.event_name}</h2>
          <p>{event.address}, {event.city}</p>

          <label>Select Date:</label><br />
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">--Select Date--</option>
            {getDates().map(d => <option key={d}>{d}</option>)}
          </select>

          <p style={{ marginTop: "1rem" }}>Select Time:</p>
          {["Morning", "Afternoon", "Evening"].map(t => (
            <button key={t} onClick={() => setSelectedTime(t)} style={{ marginRight: "1rem" }}>
              <p>{t}</p>
            </button>
          ))}

          <div>
            <button onClick={handleBook} style={{ marginTop: "1rem" }}>Confirm Booking</button>
          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Booking;
