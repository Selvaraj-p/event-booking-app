import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border p-4 rounded shadow-md bg-white hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{b.event.name}</h3>
              <p>
                <strong>Address:</strong> {b.event.address}
              </p>
              <p>
                <strong>Location:</strong> {b.event.city}, {b.event.state}
              </p>
              <p>
                <strong>Date:</strong> {b.date}
              </p>
              <p>
                <strong>Time:</strong> {b.time}
              </p>
              <p>
                <strong>Rating:</strong> {b.event.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
