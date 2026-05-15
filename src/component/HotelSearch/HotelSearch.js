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
    const [hotelGstsRmmsDrpdwn, setHotelGstsRmmsDrpdwn] = useState(false);
    const [roomCount, setRoomCount] = useState(1);
    const [adultCount, setAdultCount] = useState(1);
    const [childrenCount, setChildrenCount] = useState(1);

    /*room count*/

    const roomIncrease = () => {
        setRoomCount(prev => prev + 1);
    };

    const roomDecrease = () => {
        setRoomCount(prev => prev > 1 ? prev - 1 : 1);
    };


    /*adult count*/

    const adultIncrease = () => {
        setAdultCount(prev => prev + 1);
    };

    const adultDecrease = () => {
        setAdultCount(prev => prev > 1 ? prev - 1 : 1);
    };


    /*children count*/

    const childIncrease = () => {
        setChildrenCount(prev => prev + 1);
    };

    const childDecrease = () => {
        setChildrenCount(prev => prev > 1 ? prev - 1 : 1);
    };


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
        <div className="jfdbvjfbv788">
            <section className="menu-section">
            <div className="container my-5">
                <ServiceCategories />

                <div className="flight-main-card">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="checkbox-wrapper-15">
                        <input
                            className="inp-cbx"
                            id="cbx-sadw"
                            name="htl"
                            type="checkbox"
                            style={{ display: "none" }}
                        />

                        <label className="cbx" htmlFor="cbx-sadw">
                            <span>
                            <svg width="12px" height="9px" viewBox="0 0 12 9">
                                <polyline points="1 5 4 8 11 1" />
                            </svg>
                            </span>
                            <span>Upto 4 Rooms</span>
                        </label>
                    </div>
                    
                    <div className="checkbox-wrapper-15 d-flex align-items-center">
                        <input
                            className="inp-cbx"
                            id="cbx-fdf"
                            name="htl"
                            type="checkbox"
                            style={{ display: "none" }}
                        />

                        <label className="cbx" htmlFor="cbx-fdf">
                            <span>
                            <svg width="12px" height="9px" viewBox="0 0 12 9">
                                <polyline points="1 5 4 8 11 1" />
                            </svg>
                            </span>
                            <span>Group Deals</span>
                        </label>

                        <span className="badge ms-1 bg-danger">new</span>
                    </div>
                </div>

                <div className="row align-items-center g-4">
                    <div className="col-md-3 position-relative">
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

                    <div className="col-md-2">
                    <label>Check-In</label>
                    <input
                        type="date"
                        id="checkin"
                        className="form-control hotel-input big-date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                    </div>

                    <div className="col-md-2">
                    <label>Check-Out</label>
                    <input
                        type="date"
                        id="checkout"
                        className="form-control hotel-input big-date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                    </div>

                    <div className="col-md-3 position-relative">
                        <label>Rooms & Guests</label>

                        {/* <select className="form-control hotel-input"
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                        >
                            <option>1 Room 2 Adults</option>
                            <option>1 Room 1 Adult</option>
                            <option>2 Rooms 4 Adults</option>
                        </select> */}

                        <div className="form-control hotel-input"
                            onClick={() => setHotelGstsRmmsDrpdwn(prev => !prev)}
                        >
                            1 Room 2 Adults
                        </div>

                        {hotelGstsRmmsDrpdwn && (
                            <div className="rg-drpdwn position-absolute p-4 rounded-2 bg-white">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <p className="mb-0 dnfreqer">Room</p>

                                    <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                        <button onClick={roomDecrease} className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                        <input type="number" value={roomCount} placeholder="1" className="form-control" />

                                        <button onClick={roomIncrease} className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <p className="mb-0 dnfreqer">Adults</p>

                                    <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                        <button onClick={adultDecrease} className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                        <input type="number" value={adultCount} className="form-control" />

                                        <button onClick={adultIncrease} className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="diweirkwer d-flex flex-column">
                                        <p className="mb-0 dnfreqer">Children</p>

                                        <span>0 - 17 Years Old</span>
                                    </div>

                                    <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                        <button onClick={childDecrease} className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                        <input type="number" value={childrenCount} placeholder="1" className="form-control" />

                                        <button onClick={childIncrease} className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>
                                
                                <h6 className="klkifyter mb-0">Please provide right number of children along with their right age for best options and prices.</h6>

                                <div className="text-end">
                                    <button onClick={() => setHotelGstsRmmsDrpdwn(false)} className="btn btn-tour mt-3">APPLY</button>
                                </div>
                            </div>
                        )}                        
                    </div>

                    <div className="col-md-2">
                    <label>Price Per Night</label>
                    <select className="form-select hotel-input" 
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
            <div className="ghaadasd">
            <div className="text-center mt-4 ">
                <button className="flight-search-btn"  onClick={handleSearch}>SEARCH</button>
            </div>
            </div>
        </div>
    </div>
  )
}
