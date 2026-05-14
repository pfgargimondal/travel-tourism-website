import { useEffect, useState } from "react";
import { ServiceCategories } from '../ServiceCategories/ServiceCategories';
import Loader from "../Loader/Loader";
import { useNavigate, useSearchParams } from "react-router-dom";
export const HotelSearch = (cities) => {
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    // eslint-disable-next-line
    const [selectedCity, setSelectedCity] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [rooms, setRooms] = useState("1 Room 2 Adults");
    const [price, setPrice] = useState("₹0 - ₹2500");


    useEffect(() => {
        if (!search.trim()) {
            setFilteredCities([]);
            return;
        }

        const filtered = cities.filter((city) =>
            city.city_name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredCities(filtered.slice(0, 10));
    }, [search, cities]);


    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setSearch(city.city_name);
        setShowDropdown(false);
    };




    // set existing query params in fields
    useEffect(() => {
        setSearch(searchParams.get("city") || "");
        setCheckIn(searchParams.get("checkin") || "");
        setCheckOut(searchParams.get("checkout") || "");
        setRooms(searchParams.get("rooms") || "1 Room 2 Adults");
        setPrice(searchParams.get("price") || "₹0 - ₹2500");
    }, [searchParams]);

    const handleSearch = () => {
        navigate(
        `/hotel-filter?city=${encodeURIComponent(
            search
        )}&checkin=${checkIn}&checkout=${checkOut}&rooms=${encodeURIComponent(
            rooms
        )}&price=${encodeURIComponent(price)}`
        );
    };

  return (
    <div>
        {loading && <Loader />}
        <div class="jfdbvjfbv788">
            <section class="menu-section">
            <div class="container my-5">
                <ServiceCategories />

                <div class="flight-main-card">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <label>
                    <input type="radio" checked /> Upto 4 Rooms
                    </label>
                    <label>
                    <input type="radio" /> Group Deals{" "}
                    <span class="badge bg-danger">new</span>
                    </label>
                </div>

                <div class="row align-items-center g-4">
                    <div class="col-md-3 position-relative">
                    <label>City, Property Name Or Location</label>
                    <input
                        type="text"
                        className="form-control hotel-input"
                        placeholder="Enter City (e.g Goa)"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowDropdown(true);
                        }}
                        />

                        {showDropdown && filteredCities.length > 0 && (
                        <div className="city-dropdown">
                            {filteredCities.map((city) => (
                            <div
                                key={city.city_code}
                                className="city-item"
                                onClick={() => handleSelectCity(city)}
                            >
                                {city.city_name}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>

                    <div class="col-md-2">
                    <label>Check-In</label>
                    <input
                        type="date"
                        id="checkin"
                        class="form-control hotel-input big-date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                    </div>

                    <div class="col-md-2">
                    <label>Check-Out</label>
                    <input
                        type="date"
                        id="checkout"
                        class="form-control hotel-input big-date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                    </div>

                    <div class="col-md-3">
                    <label>Rooms & Guests</label>
                    <select class="form-control hotel-input"
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                    >
                        <option>1 Room 2 Adults</option>
                        <option>1 Room 1 Adult</option>
                        <option>2 Rooms 4 Adults</option>
                    </select>
                    </div>

                    <div class="col-md-2">
                    <label>Price Per Night</label>
                    <select class="form-control hotel-input" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                        <option>₹0 - ₹2500</option>
                        <option>₹2500 - ₹5000</option>
                        <option>₹5000+</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>
            </section>
            <div class="ghaadasd">
            <div class="text-center mt-4 ">
                <button class="flight-search-btn"  onClick={handleSearch}>SEARCH</button>
            </div>
            </div>
        </div>
    </div>
  )
}
