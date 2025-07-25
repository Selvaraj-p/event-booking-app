import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css"; // Assuming you have a CSS file for styles

const Home = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://eventdata.onrender.com/states")
      .then((res) => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then((res) => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/search?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Swiper spaceBetween={20} slidesPerView={1} loop autoplay={{ delay: 3000 }}>
        <SwiperSlide><img src="https://via.placeholder.com/800x200?text=Event+1" alt="Banner 1" /></SwiperSlide>
        <SwiperSlide><img src="https://via.placeholder.com/800x200?text=Event+2" alt="Banner 2" /></SwiperSlide>
      </Swiper>

      <form onSubmit={handleSubmit}>
        <div id="state">
          <label>Select State:</label><br />
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">--Select State--</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div id="city" style={{ marginTop: "1rem" }}>
          <label>Select City:</label><br />
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">--Select City--</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button id="searchBtn" type="submit" style={{ marginTop: "1rem" }}>Search</button>
      </form>
    </div>
  );
};

export default Home;
