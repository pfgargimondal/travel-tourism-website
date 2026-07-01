import "./FlightFilter.css";
import { FollowUsInstagram } from "../../../component/FollowUsInstagram/FollowUsInstagram";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../../http";
import Loader from "../../../component/Loader/Loader";
export const FlightFilter = () => {
  const [searchParams] = useSearchParams();
  const [flightList, setFlightsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFareModal, setShowFareModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [fareApiData, setFareApiData] = useState({});

  const navigate = useNavigate();

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const tripType = searchParams.get("tripType");
  const travelType = searchParams.get("travelType");
  const cabinClass = searchParams.get("cabinClass");

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const payload = {
          origin,
          destination,
          departureDate,
          returnDate,
          adults,
          children,
          infants,
          tripType,
          travelType,
          cabinClass,
        };
        const response = await http.post("/flight-search", payload);
        setFlightsList(response.data.flightList);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchFlights();
  }, [
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    tripType,
    travelType,
    cabinClass,
  ]);

  const formatFlightDate = (dateTime) => {
    const [datePart] = dateTime.split(" ");
    const [month, day, year] = datePart.split("/");

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const handleFlightFareDetails = (flight) => {
    setSelectedFlight(flight);
    setShowFareModal(true);
  };

  useEffect(() => {
    const fetchFareData = async () => {
      if (!selectedFlight?.Fares?.length) return;
      try {
        const responses = await Promise.all(
          selectedFlight.Fares.map(async (fare) => {
            const fareId = fare.Fare_Id;
            const response = await http.post("/flight-fare-details", {
              fare_id: fareId,
              search_key: flightList.Search_Key,
              Flight_Key: selectedFlight.Flight_Key,
            });
            return {
              fareId,
              data: response.data,
            };
          }),
        );
        const mappedData = {};
        responses.forEach((item) => {
          mappedData[item.fareId] = item.data;
        });
        setFareApiData(mappedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFareData();
  }, [selectedFlight, flightList.Search_Key]);

  // eslint-disable-next-line
  const handleFlightDetails = (flight) => {
    navigate(`/flight-details/${flight.Flight_Id}`, {
      state: {
        flight,
      },
    });
  };

  if (loading) return <Loader />;

  console.log(fareApiData, "fareApiData");

  return (
    <div>
      <div className="sdfsdf655 djinsdjkncv">

        {/* <!-- ================= FLIGHT SEARCH SECTION ================= --> */}
        <section className="menu-section srch-filtr-wrpper">
          <div className="xvbzcnvxbdvffg">
            <div className="flight-main-card p-0">
              <div className="flight-content-area">
                <div className="flight-trip-type">
                  <div className="container d-flex align-items-center">
                    <div className="checkbox-wrapper-15 me-4 py-3">
                      <input
                        className="inp-cbx"
                        id="cbx-15"
                        name="flight"
                        type="radio"
                        style={{ display: "none" }}
                      />

                      <label className="cbx" htmlFor="cbx-15">
                        <span className="iucfjsdccsd">
                          <i className="bi bi-airplane"></i>
                        </span>

                        <span className="knkjsdfsdfged">One Way</span>
                      </label>
                    </div>

                    <div className="checkbox-wrapper-15 mx-4 py-3">
                      <input
                        className="inp-cbx"
                        id="cbx-16"
                        name="flight"
                        type="radio"
                        style={{ display: "none" }}
                      />

                      <label className="cbx" htmlFor="cbx-16">
                        <span className="iucfjsdccsd">
                          <i className="bi bi-arrow-repeat"></i>
                        </span>

                        <span className="knkjsdfsdfged">Round Trip</span>
                      </label>
                    </div>

                    <div className="checkbox-wrapper-15 ms-4 py-3">
                      <input
                        className="inp-cbx"
                        id="cbx-17"
                        name="flight"
                        type="radio"
                        style={{ display: "none" }}
                      />

                      <label className="cbx" htmlFor="cbx-17">
                        <span className="iucfjsdccsd">
                          <i className="fa-solid fa-spinner"></i>
                        </span>

                        <span className="knkjsdfsdfged">Multi City</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="diauhsdlfskogf py-4">
                  <div className="container">
                    <div className="form row">
                      <div className="col-lg-10">
                        <div className="row mb-4">
                          <div className="col-lg-5">
                            <div className="row">
                              <div className="col-md-5 col-5">
                                <label className="form-label">Departure From</label>

                                {/* <input type="text" className="form-control" placeholder="New Delhi DEL, Indira Gandhi International" /> */}
                                <select
                                  className="form-control"
                                >
                                  <option value="">Select Origin</option>

                                  {/* {origins.map((origin, index) => (
                                    <option key={index} value={origin.code}>
                                      {origin.details
                                        ? `${origin.code} - ${origin.details?.city}, ${origin.details?.country} - ${origin.details?.airport_name}`
                                        : origin.code}
                                    </option>
                                  ))} */}
                                </select>
                              </div>

                              <div className="col-md-2 col-2 text-center">
                                <div className="circle"
                                  style={{
                                    cursor: "pointer",
                                    marginTop: "25px"
                                  }}>
                                  <i className="fa-solid fa-right-left"></i>
                                </div>
                              </div>

                              <div className="col-md-5 col-5">
                                <div className="ps-3">
                                  <label className="form-label">Going To</label>
                                  {/* <input type="text" className="form-control" placeholder="New Delhi DEL, Indira Gandhi International" /> */}
                                  <select
                                    className="form-control"
                                  >
                                    <option value="">Select Destination</option>

                                    {/* {destinations.map((destination, index) => (
                                      <option key={index} value={destination.code}>
                                        {destination.details
                                          ? `${destination.code} - ${destination.details?.city}, ${destination.details?.country} - ${destination.details?.airport_name}`
                                          : destination.code}
                                      </option>
                                    ))} */}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-7">
                            <div className="row dnfggfshgjhfghdff">
                              <div className="col-md-4 col-md-4 col-sm-6 col-6">
                                <label className="form-label">Departure Date</label>

                                <input type="date" className="form-control" placeholder="New Delhi DEL, Indira Gandhi International" />

                                {/* <DatePicker
                                  selected={departureDate}
                                  // includeDates={
                                  //   availableDates.length > 0
                                  //     ? availableDates
                                  //     : undefined
                                  // }
                                  onChange={(date) => {
                                    // console.log(date); // Check if new date is coming
                                    // setDepartureDate(date);
                                  }}
                                  minDate={new Date()}
                                  dateFormat="dd MMM yyyy"
                                  className="form-control"
                                /> */}
                              </div>

                              <div className="col-md-4 col-md-4 col-sm-6 col-6">
                                <label className="form-label">Return Date</label>

                                <input type="date" className="form-control" placeholder="New Delhi DEL, Indira Gandhi International" />
                                {/* <DatePicker
                                  selected={returnDate}
                                  // onChange={(date) => setReturnDate(date)}
                                  minDate={new Date()}
                                  dateFormat="dd MMM yyyy"
                                  className="form-control"
                                /> */}
                              </div>

                              <div className="col-md-4 col-md-4 col-sm-6 col-6 position-relative">
                                <label className="form-label">Travellers & Class</label>

                                <div className="form-control hotel-input"
                                    // onClick={() => setFlightDrpdwn(prev => !prev)}
                                >
                                    {/* {adultCount} Adult{adultCount > 1 ? "s" : ""} •{" "} */}
                                    {/* {childrenCount} Child{childrenCount > 0 ? "ren" : ""} */}
                                    {/* {infantCount} Infant{infantCount > 0 ? "s" : ""} */}
                                </div>

                                {/* {flightDrpdwn && ( */}
                                  <div className="rg-drpdwn dfghdgfsfee position-absolute p-4 rounded-2 bg-white">
                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Adults</p>

                                              <span>12+ Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                              <button 
                                                // onClick={adultDecrease} 
                                                className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                              <input type="number"
                                              //  value={adultCount}
                                                placeholder="1" className="form-control" />

                                              <button 
                                                // onClick={adultIncrease} 
                                                className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                          </div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Children</p>

                                              <span>2 - 12 Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                              <button 
                                                // onClick={() => handleChildrenCount("decrease")}
                                                className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                              <input type="number" 
                                                // value={childrenCount} 
                                                className="form-control" />

                                              <button 
                                                // onClick={() => handleChildrenCount("increase")} 
                                                className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                          </div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Infant</p>

                                              <span>0 - 2 Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                              <button 
                                                // onClick={() => handleInfantCount("decrease")}
                                                className="btn-transparent"><i class="bi bi-dash-lg"></i></button>

                                              <input type="number"
                                              //  value={infantCount} 
                                                placeholder="1" className="form-control" />

                                              <button 
                                                // onClick={() => handleInfantCount("increase")}
                                                className="btn-transparent"><i class="bi bi-plus-lg"></i></button>
                                          </div>
                                      </div>

                                      <div className="doeiwjrpwere">
                                        <div className="checkbox-wrapper-15">
                                          <input
                                            className="inp-cbx"
                                            id="cbx-16c"
                                            name="flightad"
                                            type="radio"
                                            style={{ display: "none" }}
                                            checked={cabinClass === "0"}
                                            // onChange={() => setCabinClass("0")}
                                          />

                                          <label className="cbx" htmlFor="cbx-16c">
                                            <span>
                                              <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                <polyline points="1 5 4 8 11 1" />
                                              </svg>
                                            </span>
                                            <span>Economy</span>
                                          </label>
                                        </div>

                                        <div className="checkbox-wrapper-15">
                                          <input
                                            className="inp-cbx"
                                            id="cbx-16n"
                                            name="flightad"
                                            type="radio"
                                            style={{ display: "none" }}
                                            checked={cabinClass === "3"}
                                            // onChange={() => setCabinClass("3")}
                                          />

                                          <label className="cbx" htmlFor="cbx-16n">
                                            <span>
                                              <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                <polyline points="1 5 4 8 11 1" />
                                              </svg>
                                            </span>
                                            <span>Premium Economy</span>
                                          </label>
                                        </div>

                                        <div className="checkbox-wrapper-15">
                                          <input
                                            className="inp-cbx"
                                            id="cbx-16j"
                                            name="flightad"
                                            type="radio"
                                            style={{ display: "none" }}
                                            checked={cabinClass === "1"}
                                            // onChange={() => setCabinClass("1")}
                                          />

                                          <label className="cbx" htmlFor="cbx-16j">
                                            <span>
                                              <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                <polyline points="1 5 4 8 11 1" />
                                              </svg>
                                            </span>
                                            <span>Business</span>
                                          </label>
                                        </div>

                                        <div className="checkbox-wrapper-15">
                                          <input
                                            className="inp-cbx"
                                            id="cbx-16i"
                                            name="flightad"
                                            type="radio"
                                            style={{ display: "none" }}
                                            checked={cabinClass === "2"}
                                            // onChange={() => setCabinClass("2")}
                                          />

                                          <label className="cbx" htmlFor="cbx-16i">
                                            <span>
                                              <svg width="12px" height="9px" viewBox="0 0 12 9">
                                                <polyline points="1 5 4 8 11 1" />
                                              </svg>
                                            </span>
                                            <span>First Class</span>
                                          </label>
                                        </div>
                                      </div>

                                      <div className="text-end">
                                          <button 
                                            // onClick={() => setFlightDrpdwn(false)}
                                            className="btn btn-tour mt-3">APPLY</button>
                                      </div>
                                  </div>
                                {/* )} */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <h6 className="mb-3"><b>SPECIAL FARES</b></h6>

                          <div className="d-flex gap-2 flex-wrap dfkmkdf">
                            <div className="asdfhgjhhghgf">
                              <input
                                className="inp-cbx"
                                id="cbx-lh"
                                name="aghfhrr"
                                type="radio"
                                style={{ display: "none" }}
                              />

                              <label className="cbx" htmlFor="cbx-lh">
                                <span>Regular</span>
                              </label>
                            </div>

                            <div className="asdfhgjhhghgf">
                              <input
                                className="inp-cbx"
                                id="cbx-ku"
                                name="aghfhrr"
                                type="radio"
                                style={{ display: "none" }}
                              />

                              <label className="cbx" htmlFor="cbx-ku">
                                <span>Student</span>
                              </label>
                            </div>

                            <div className="asdfhgjhhghgf">
                              <input
                                className="inp-cbx"
                                id="cbx-kh"
                                name="aghfhrr"
                                type="radio"
                                style={{ display: "none" }}
                              />

                              <label className="cbx" htmlFor="cbx-kh">
                                <span>Armed Forces</span>
                              </label>
                            </div>

                            <div className="asdfhgjhhghgf">
                              <input
                                className="inp-cbx"
                                id="cbx-gd"
                                name="aghfhrr"
                                type="radio"
                                style={{ display: "none" }}
                              />

                              <label className="cbx" htmlFor="cbx-gd">
                                <span>Senior Citizen</span>
                              </label>
                            </div>

                            <div className="asdfhgjhhghgf">
                              <input
                                className="inp-cbx"
                                id="cbx-asd"
                                name="aghfhrr"
                                type="radio"
                                style={{ display: "none" }}
                              />

                              <label className="cbx" htmlFor="cbx-asd">
                                <span>Doctor & Nurses</span>
                              </label>
                            </div>
                          </div>
                        </div>                        
                      </div>

                      <div className="col-lg-2">
                        <button class="searchbt">Search Flight</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class=" py-5">
          <div class="container">
            <div class="fgdfgdfgd5">
              <div class="row g-3 align-items-end">
                <div class="col-lg-3 col-6">
                  <label class="form-label">City From</label>
                  <input type="text" class="form-control" placeholder="Kolkata" />
                </div>

                <div class="col-lg-3 col-6">
                  <label class="form-label">City To</label>
                  <input type="text" class="form-control" placeholder="Delhi" />
                </div>

                <div class="col-lg-3 col-6">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control" value="2026-02-28" />
                </div>

                <div class="col-lg-3 col-6">
                  <button class="searchbt">Search Flight</button>
                </div>
              </div>
            </div>

            <div class="airlines-row mt-5">
              <div class="airline-item">
                <img src="./images/americaair.jpg" alt="" />
                <div>
                  <h6>American Airline</h6>
                  <p>216 Flights</p>
                </div>
              </div>

              <div class="airline-item">
                <img src="./images/deltaair.png" alt="" />
                <div>
                  <h6>Delta Airlines</h6>
                  <p>569 Flights</p>
                </div>
              </div>

              <div class="airline-item">
                <img src="./images/emiratesair.jpg" alt="" />
                <div>
                  <h6>Emirates</h6>
                  <p>129 Flights</p>
                </div>
              </div>

              <div class="airline-item">
                <img src="./images/franceair.png" alt="" />
                <div>
                  <h6>Air France</h6>
                  <p>600 Flights</p>
                </div>
              </div>

              <div class="airline-item">
                <img src="./images/quaterair.jpg" alt="" />
                <div>
                  <h6>Qatar Airways</h6>
                  <p>200 Flights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flight-results-section py-5">
          <div class="container">
            <div class="row g-4">
              {/* <!-- ================= LEFT FILTER SIDEBAR ================= --> */}
              <div class="col-lg-3">
                <div class="filter-card sticky-top">
                  <div class="filter-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Filters</h5>
                    <a href="/" class="reset-link">
                      Reset
                    </a>
                  </div>

                  <div class="filter-section">
                    <label class="filter-label">Search by Airline Names</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search by Airline Names"
                    />
                  </div>

                  <div class="flight-filter-box">
                    <div class="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                      <div class="flight-filter-left">
                        <img
                          src="./images/upplane.png"
                          class="flight-filter-img"
                          alt=""
                        />
                        <span class="flight-filter-title">Departure Times</span>
                      </div>

                      <i class="fa-solid fa-caret-up flight-filter-icon"></i>
                    </div>

                    <div class="flight-filter-content">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">American Airlines</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">Delta Airlines</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">Emirates</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">Air France</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">Japan Airlines</label>
                      </div>
                    </div>
                  </div>
                  <div class="flight-filter-box">
                    <div class="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                      <div class="flight-filter-left">
                        <img
                          src="./images/upplane.png"
                          class="flight-filter-img"
                          alt=""
                        />
                        <span class="flight-filter-title">Flights Times</span>
                      </div>

                      <i class="fa-solid fa-caret-up flight-filter-icon"></i>
                    </div>

                    <div class="flight-filter-content">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">6.00pm-12.00am</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">10.10pm-2.3apm</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">11.00pm-3.10am</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">1.20am-4.40am</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">5.30am-12.00pm</label>
                      </div>
                    </div>
                  </div>

                  <div class="filter-section">
                    <div class="filter-title d-flex align-items-center">
                      <img src="./images/priceicon.png" alt="" />
                      <span>Fare Type</span>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" />
                      <label class="form-check-label">Show Refundable Only</label>
                    </div>

                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" />
                      <label class="form-check-label">
                        Show Non Refundable Only
                      </label>
                    </div>
                  </div>

                  <div class="flight-time-filter-box">
                    <div class="flight-time-filter-header d-flex justify-content-between align-items-center flight-time-toggle">
                      <div class="flight-time-left">
                        <img
                          src="./images/upplane.png"
                          class="flight-time-img"
                          alt=""
                        />
                        <span class="flight-time-title">Departure Times</span>
                      </div>

                      <i class="fa-solid fa-caret-up flight-time-icon"></i>
                    </div>

                    <div class="flight-time-content">
                      <select class="flight-time-select form-select">
                        <option>Anytime</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                      </select>
                    </div>
                  </div>

                  <div class="flight-arrival-filter-box">
                    <div class="flight-arrival-filter-header d-flex justify-content-between align-items-center flight-arrival-toggle">
                      <div class="flight-arrival-left">
                        <img
                          src="./images/downplane.png"
                          class="flight-arrival-img"
                          alt=""
                        />
                        <span class="flight-arrival-title">Arrival Times</span>
                      </div>

                      <i class="fa-solid fa-caret-up flight-arrival-icon"></i>
                    </div>

                    <div class="flight-arrival-content">
                      <select class="flight-arrival-select form-select">
                        <option>Anytime</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                      </select>
                    </div>
                  </div>

                  <div class="flight-review-filter-box">
                    <div class="flight-review-filter-header d-flex justify-content-between align-items-center flight-review-toggle">
                      <div class="flight-review-left">
                        <img
                          src="./images/reviewicon.png"
                          class="flight-review-img"
                          alt=""
                        />
                        <span class="flight-review-title">Reviews</span>
                      </div>

                      <i class="fa-solid fa-caret-up flight-review-icon"></i>
                    </div>

                    <div class="flight-review-content">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">⭐⭐⭐⭐⭐ 5 Star</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">⭐⭐⭐⭐ 4 Star</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">⭐⭐⭐ 3 Star</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">⭐⭐ 2 Star</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">⭐ 1 Star</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- ================= RIGHT SIDE GOES HERE ================= --> */}
              <div class="col-lg-9">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="fw-semibold mb-0">
                    {flightList?.TripDetails?.[0]?.Flights?.length} Flights Found
                    on Your Search
                  </h5>

                  <div class="sort-area">
                    <img src="./images/listicon.png" alt="" />
                    <span>Sort By :</span>
                    <select>
                      <option>Recommended</option>
                      <option>Lowest Price</option>
                      <option>Fastest</option>
                    </select>
                  </div>
                </div>

                <div class="save-banner mb-4">
                  <span>
                    Save an average of 15% on thousands of flights when you're
                    signed in
                  </span>
                  <button class="sign-btn">Sign In</button>
                </div>

                {flightList?.TripDetails?.[0]?.Flights?.map((flight, index) => {
                  const firstSegment = flight.Segments[0];
                  const lastSegment = flight.Segments[flight.Segments.length - 1];

                  const cheapestFare = flight.Fares[0]?.FareDetails[0];

                  return (
                    <div className="flight-card" key={index}>
                      <div className="flight-top d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-2">
                          <div className="heart">
                            <img src="./images/likeicon.png" alt="" />
                          </div>

                          {/* <span className="cheapest">
                                              {cheapestFare?.Refundable ? "Refundable" : "Cheapest"}
                                          </span> */}
                          <h5 className="mb-1 fw-semibold">
                            {flight.IsLCC
                              ? "Low Cost Carrier"
                              : "Full Service Airline"}
                          </h5>
                        </div>

                        {/* <span className="rating">5.0</span> */}
                      </div>

                      <div className="flight-body">
                        <h5 className="mb-4 fw-semibold">
                          {firstSegment.Origin_City.replace(
                            /\s*\(.*?\)/g,
                            "",
                          ).trim()}{" "}
                          to{" "}
                          {firstSegment.Destination_City.replace(
                            /\s*\(.*?\)/g,
                            "",
                          ).trim()}
                          , &nbsp;{" "}
                          {formatFlightDate(firstSegment.Departure_DateTime)}
                        </h5>

                        <div className="row align-items-center">
                          {/* Airline Details */}
                          <div className="col-lg-2">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={`https://images.kiwi.com/airlines/64/${firstSegment.Airline_Code}.png`}
                                className="airline-logo"
                                alt=""
                                onError={(e) => {
                                  e.target.src = "./images/indigo.png";
                                }}
                              />

                              <div className="gfjh55">
                                <div className="fw-semibold">
                                  {firstSegment.Airline_Name}
                                </div>

                                <small className="text-muted">
                                  {firstSegment.Airline_Code}
                                  {firstSegment.Flight_Number}
                                </small>
                              </div>
                            </div>

                            {/* <a href="/" className="compare-link">
                                                  Add to compare +
                                              </a> */}
                          </div>

                          {/* Time Section */}
                          <div className="col-lg-5">
                            <div className="time-wrapper">
                              <div className="text-center">
                                <h4 className="mb-0">
                                  {firstSegment.Departure_DateTime.split(" ")[1]}
                                </h4>

                                <small>
                                  Terminal {firstSegment.Origin_Terminal}
                                </small>
                              </div>

                              <div className="duration-wrapper text-center">
                                <small>
                                  {/* {flight.Segments
                                                              .map(segment => segment.Duration)
                                                              .join(" + ")} */}
                                  {flight.Segments.map((segment) => {
                                    const [hours, minutes] =
                                      segment.Duration.split(":");
                                    return `${hours}h ${minutes}m`;
                                  }).join(" + ")}
                                </small>

                                <div className="duration-line"></div>
                              </div>

                              <div className="text-center">
                                <h4 className="mb-0">
                                  {lastSegment.Arrival_DateTime.split(" ")[1]}
                                </h4>

                                <small>
                                  Terminal {lastSegment.Destination_Terminal}
                                </small>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-lg-2">
                            <div className="price-section">
                              <small>From</small>

                              <h4>
                                <strong>
                                  ₹ {cheapestFare?.Total_Amount?.toLocaleString()}
                                </strong>
                              </h4>
                            </div>
                          </div>

                          {/* Extra Information */}
                          <div className="col-lg-3 text-end">
                            <div className="row">
                              <div className="ontime mb-2">
                                <img
                                  src="./images/seat.png"
                                  alt=""
                                  style={{ maxHeight: "23px" }}
                                />
                                {flight.Fares[0]?.Seats_Available} Seats Left
                              </div>

                              <button
                                className="btn btn-tour"
                                onClick={() => handleFlightFareDetails(flight)}
                              >
                                View Price
                              </button>

                              <div className="stop-info mt-2">
                                <img src="./images/stop.png" alt="" />

                                {flight.Segments.length === 1
                                  ? "Non Stop"
                                  : `${flight.Segments.length - 1} Stop, ${flight.Segments.slice(
                                      0,
                                      -1,
                                    )
                                      .map((s) => s.Destination)
                                      .join(", ")}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="offer-strip">
                        Cabin: {cheapestFare?.FareClasses?.[0]?.CabinClass} |
                        Baggage: {cheapestFare?.Free_Baggage?.Check_In_Baggage}{" "}
                        Check-In | {cheapestFare?.Free_Baggage?.Hand_Baggage}{" "}
                        Cabin
                      </div>
                    </div>
                  );
                })}

                {showFareModal && selectedFlight && (
                  <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            Flight Details and Fare Options available for you!
                          </h5>

                          <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowFareModal(false)}
                          />
                        </div>

                        <div className="modal-body">
                          <h6>
                            {selectedFlight.Segments[0].Origin} -
                            {
                              selectedFlight.Segments[
                                selectedFlight.Segments.length - 1
                              ].Destination
                            }
                          </h6>

                          <p className="text-muted">
                            <img
                              src={`https://images.kiwi.com/airlines/64/${selectedFlight.Segments[0].Airline_Code}.png`}
                              className="airline-logo m-0"
                              alt=""
                              onError={(e) => {
                                e.target.src = "./images/indigo.png";
                              }}
                            />{" "}
                            {selectedFlight.Segments[0].Airline_Name} · Departure
                            at{" "}
                            {
                              selectedFlight.Segments[0].Departure_DateTime.split(
                                " ",
                              )[1]
                            }{" "}
                            - Arrival at{" "}
                            {
                              selectedFlight.Segments[
                                selectedFlight.Segments.length - 1
                              ].Arrival_DateTime.split(" ")[1]
                            }
                          </p>
                          <hr />
                          {selectedFlight.Fares.map((fare, fareIndex) => {
                            const apiFareDetails = fareApiData[fare.Fare_Id];
                            return (
                              <div
                                key={fareIndex}
                                className="border rounded p-3 mb-3"
                              >
                                <h6>Fare Option {fareIndex + 1}</h6>

                                {fare.FareDetails.map((detail, detailIndex) => (
                                  <div key={detailIndex} className="row">

                                    <div className="col-md-3">
                                      <div className="border rounded p-3 h-100">

                                          <h3 className="fw-bold mb-1">
                                              ₹ {detail.Total_Amount.toLocaleString()}
                                              <span
                                                  className="text-muted fw-normal"
                                                  style={{ fontSize: "14px" }}
                                              >
                                                  {" "}per adult
                                              </span>
                                          </h3>

                                          <div
                                              className="text-uppercase text-muted"
                                              style={{ fontSize: "13px" }}
                                          >
                                              {fare.ProductClass === "R"
                                                  ? "SAVER"
                                                  : fare.ProductClass === "F"
                                                  ? "FLEXI"
                                                  : fare.ProductClass === "P"
                                                  ? "PREMIUM"
                                                  : detail.FareClasses?.[0]?.CabinClass}
                                          </div>

                                      </div>
                                  </div>  
                                    {/* Baggage */}
                                    <div className="col-md-4">
                                      <h6 className="fw-bold">Baggage</h6>

                                      <div className="mb-2">
                                        ✅ {detail.Free_Baggage?.Hand_Baggage}{" "}
                                        Cabin Baggage
                                      </div>

                                      <div>
                                        ✅ {detail.Free_Baggage?.Check_In_Baggage}{" "}
                                        Check-in Baggage
                                      </div>
                                    </div>

                                    {/* Flexibility */}
                                    <div className="col-md-4">
                                      <h6 className="fw-bold">Flexibility</h6>

                                      <div className="mb-3">
                                        <strong>Cancellation Charges</strong>

                                        {detail.CancellationCharges?.map(
                                          (charge, idx) => (
                                            <div key={idx} className="mt-1">
                                              🟡{" "}
                                              {charge.ValueType === 1
                                                ? `${charge.Value}% of fare`
                                                : `₹${Number(charge.Value).toLocaleString()}`}{" "}
                                              if cancelled between{" "}
                                              <strong>
                                                {charge.DurationFrom}
                                              </strong>{" "}
                                              {charge.DurationTypeFrom === 0
                                                ? "hrs"
                                                : "days"}{" "}
                                              to{" "}
                                              <strong>{charge.DurationTo}</strong>{" "}
                                              {charge.DurationTypeTo === 0
                                                ? "hrs"
                                                : "days"}{" "}
                                              before departure
                                            </div>
                                          ),
                                        )}
                                      </div>

                                      {/* Reschedule Charges */}
                                      <div>
                                        <strong>Date Change Charges</strong>

                                        {detail.RescheduleCharges?.map(
                                          (charge, idx) => (
                                            <div key={idx} className="mt-1">
                                              🟡{" "}
                                              {charge.ValueType === 1
                                                ? `${charge.Value}% of fare`
                                                : `₹${Number(charge.Value).toLocaleString()}`}{" "}
                                              if changed between{" "}
                                              <strong>
                                                {charge.DurationFrom}
                                              </strong>{" "}
                                              {charge.DurationTypeFrom === 0
                                                ? "hrs"
                                                : "days"}{" "}
                                              to{" "}
                                              <strong>{charge.DurationTo}</strong>{" "}
                                              {charge.DurationTypeTo === 0
                                                ? "hrs"
                                                : "days"}{" "}
                                              before departure
                                            </div>
                                          ),
                                        )}
                                      </div>
                                    </div>

                                    {/* Seats & Meals */}
                                    <div className="col-md-4">
                                      <h6 className="fw-bold">
                                        Seats, Meals & More
                                      </h6>

                                      <div className="mb-2">
                                        🟡 Chargeable Seats
                                      </div>

                                      <div>
                                        🟡{" "}
                                        {fare.Food_onboard === "P"
                                          ? "Chargeable Meals"
                                          : "Complimentary Meals"}
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {apiFareDetails?.status && (
                                  <div className="mt-3">
                                    <h6>Fare Rules</h6>

                                    {apiFareDetails?.fareDetails?.FareRules?.map(
                                      (rule, ruleIndex) => (
                                        <div
                                          key={ruleIndex}
                                          className="border-top pt-2 mt-2"
                                          dangerouslySetInnerHTML={{
                                            __html: rule.FareRuleDesc,
                                          }}
                                        />
                                      ),
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setShowFareModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FollowUsInstagram />      
    </div>
  );
};
