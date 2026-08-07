import { FollowUsInstagram } from "../../../component/FollowUsInstagram/FollowUsInstagram";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import http from "../../../http";
import Loader from "../../../component/Loader/Loader";

import "./FlightFilter.css";



export const FlightFilter = () => {
  const [searchParams] = useSearchParams();
  const [flightList, setFlightsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFareModal, setShowFareModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [fareApiData, setFareApiData] = useState({}); 
  const [airportList, setAirportList] = useState([]);
  const [fareRules, setFareRules] = useState(null);
  const [flightFilterResToggle, setFlightFilterResToggle] = useState(false);
  const [resFilterToggle, setResFilterToggle] = useState(false);


  
  // useEffect(() => {
  //   const html = document.querySelector("html");
    
  //   if (html.classList.contains("overflow-hidden")) {
  //     html.classList.remove("overflow-hidden");
  //   } else {
  //     html.classList.add("overflow-hidden");
  //   }
  // }, [resFilterToggle]);



  const handleFareRules = (id) => {
    setFareRules(fareRules === id ? null : id);
  };


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


  const [selectedOrigin, setSelectedOrigin] = useState(origin || "");
  const [selectedDestination, setSelectedDestination] = useState(destination || "");
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(departureDate || "");
  const [selectedReturnDate, setSelectedReturnDate] = useState(returnDate || "");

  const [adultCount, setAdultCount] = useState(Number(adults) || 1);
  const [childrenCount, setChildrenCount] = useState(Number(children) || 0);
  const [infantCount, setInfantCount] = useState(Number(infants) || 0);

  const [selectedCabinClass, setSelectedCabinClass] = useState(cabinClass || "0");
     // eslint-disable-next-line
  const [selectedTripType, setSelectedTripType] = useState(tripType || "0");
  const [flightDrpdwn, setFlightDrpdwn] = useState(false);


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

  


  useEffect(() => {
    const fetchAirportList = async () => {
      try {
        const response = await http.get("/get-airport-list");

        if (response.data.status) {
          setAirportList(response.data.airportList || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAirportList();
  }, []);


  const origins = [
    ...new Map(
      airportList.map((item) => [
        item.origin,
        {
          code: item.origin,
          details: item.origin_details,
        },
      ])
    ).values(),
  ];

  const destinations = [
    ...new Map(
      airportList
        .filter((item) => item.origin === selectedOrigin)
        .map((item) => [
          item.destination,
          {
            code: item.destination,
            details: item.destination_details,
          },
        ])
    ).values(),
  ];

  const selectedOriginDetails = origins.find(
    (item) => item.code === selectedOrigin
  );

  const selectedDestinationDetails = destinations.find(
    (item) => item.code === selectedDestination
  );

     // eslint-disable-next-line
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
  const handleFlightDetails = (flight, search_key, fareId) => {
    navigate(`/flight-details/${flight.Flight_Id}`, {
      state: {
        flight,
        search_key,
        fareId,
        adults,
        children,
        infants,
      },
    });
  };



  const adultIncrease = () => {
    setAdultCount((prev) => prev + 1);
  };

  const adultDecrease = () => {
    setAdultCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleChildrenCount = (type) => {
    if (type === "increase") {
      setChildrenCount((prev) => prev + 1);
    } else {
      setChildrenCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleInfantCount = (type) => {
    if (type === "increase") {
      setInfantCount((prev) => prev + 1);
    } else {
      setInfantCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const handleSearchFlight = () => {
    const formatDate = (date) => {
      if (!date) return "";

      const d = new Date(date);

      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };

    const params = new URLSearchParams({
      origin: selectedOrigin,
      destination: selectedDestination,
      departureDate: formatDate(selectedDepartureDate),
      returnDate: formatDate(selectedReturnDate),
      adults: adultCount,
      children: childrenCount,
      infants: infantCount,
      tripType: selectedTripType,
      travelType,
      cabinClass: selectedCabinClass,
    });

    navigate(`/flight-filter?${params.toString()}`);
  };

  const handleSwap = () => {
    if (!selectedOrigin || !selectedDestination) return;

    const origin = selectedOrigin;
    const destination = selectedDestination;

    setSelectedOrigin(destination);
    setSelectedDestination(origin);
  };



  if (loading) return <Loader />;

  return (
    <div>
      <div className="sdfsdf655 djinsdjkncv">

        {/* <!-- ================= FLIGHT SEARCH SECTION ================= --> */}
        <section className="menu-section srch-filtr-wrpper">
          {window.innerWidth <= 600 && (
            <>
              <div className="disnikjfisdf my-3">
                <div className="container">
                  <div className="duinushducsdc bg-white p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fvgdfvd">
                        <div className="docmosdfsdf">
                          <h4 className="mb-1">{selectedOriginDetails?.details?.city} - {selectedDestinationDetails?.details?.city}</h4>

                          <p className="mb-0">16 Jul | 1 Adult | Economy</p>
                        </div>
                      </div>
                      
                      <div className="bgujhgb">
                        <div className="docmosdfsdf">
                          <span
                            className="d-flex flex-column align-items-center gap-1"
                            onClick={() => setFlightFilterResToggle(prev => !prev)}
                          ><i className="fa-solid fa-pencil"></i> Edit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${flightFilterResToggle ? "flight-filtr-responsve-backdrop" : "flight-filtr-responsve-backdrop flight-filtr-responsve-backdrop-hide"} position-fixed start-0 top-0 bottom-0 end-0`}></div>
            </>
          )}

          <div className={`${flightFilterResToggle ? "xvbzcnvxbdvffg xvbzcnvxbdvffg-show" : "xvbzcnvxbdvffg"}`}>
            {window.innerWidth <= 600 && (
              <div className="jdhbjejndkjwerewr d-flex align-items-center justify-content-between position-relative text-center p-3">
                <h5 className="mb-0">Modify Flight Search</h5>

                <i onClick={() => setFlightFilterResToggle(false)} className="fa-solid fa-xmark"></i>
              </div>
            )}
            
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

                                <select
                                  className="form-control"
                                  value={selectedOrigin}
                                  onChange={(e) => {
                                    setSelectedOrigin(e.target.value);
                                    setSelectedDestination("");
                                  }}
                                >
                                  <option value="">Select Origin</option>

                                  {origins.map((origin, index) => (
                                    <option key={index} value={origin.code}>
                                      {origin.details
                                        ? `${origin.code} - ${origin.details.city}, ${origin.details.country} - ${origin.details.airport_name}`
                                        : origin.code}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="col-md-2 col-2 text-center res-btwn-crcl">
                                <div className="circle" onClick={handleSwap}
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

                                  <select
                                    className="form-control"
                                    value={selectedDestination}
                                    onChange={(e) => setSelectedDestination(e.target.value)}
                                    disabled={!selectedOrigin}
                                  >
                                    <option value="">Select Destination</option>

                                    {destinations.map((destination, index) => (
                                      <option key={index} value={destination.code}>
                                        {destination.details
                                          ? `${destination.code} - ${destination.details.city}, ${destination.details.country} - ${destination.details.airport_name}`
                                          : destination.code}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-7">
                            <div className="row dnfggfshgjhfghdff">
                              <div className="col-md-4 col-md-4 col-sm-6 col-6">
                                <label className="form-label">Departure Date</label>

                                <DatePicker
                                  selected={
                                    selectedDepartureDate
                                      ? new Date(selectedDepartureDate)
                                      : null
                                  }
                                  onChange={(date) => setSelectedDepartureDate(date)}
                                  minDate={new Date()}
                                  dateFormat="dd MMM yyyy"
                                  className="form-control"
                                />
                              </div>

                              <div className="col-md-4 col-md-4 col-sm-6 col-6">
                                <label className="form-label">Return Date</label>

                                <DatePicker
                                  selected={
                                    selectedReturnDate
                                      ? new Date(selectedReturnDate)
                                      : null
                                  }
                                  onChange={(date) => setSelectedReturnDate(date)}
                                  minDate={new Date()}
                                  dateFormat="dd MMM yyyy"
                                  className="form-control"
                                />
                              </div>

                              <div className="col-md-4 col-md-4 col-sm-6 col-6 position-relative">
                                <label className="form-label">Travellers & Class</label>

                                {/* <div className="form-control hotel-input" */}
                                    {/* onClick={() => setFlightDrpdwn(prev => !prev)} */}
                                {/* > */}
                                    {/* {adultCount} Adult{adultCount > 1 ? "s" : ""} •{" "} */}
                                    {/* {childrenCount} Child{childrenCount > 0 ? "ren" : ""} */}
                                    {/* {infantCount} Infant{infantCount > 0 ? "s" : ""} */}
                                {/* </div> */}

                                <div className="form-control hotel-input vdxbfcsffff" onClick={() => setFlightDrpdwn(prev => !prev)}>
                                  {adultCount} Adult{adultCount > 1 ? "s" : ""} •{" "}
                                  {childrenCount} Child • {infantCount} Infant
                                </div>

                                {flightDrpdwn && (
                                  <div className="rg-drpdwn dfghdgfsfee position-absolute p-4 rounded-2 bg-white">
                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Adults</p>

                                              <span>12+ Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                              <button
                                                type="button"
                                                onClick={adultDecrease}
                                                className="btn-transparent"
                                              >
                                                <i className="bi bi-dash-lg"></i>
                                              </button>

                                              <input type="number"
                                               value={adultCount}
                                                placeholder="1" className="form-control" />

                                              <button
                                                type="button"
                                                onClick={adultIncrease}
                                                className="btn-transparent"
                                              >
                                                <i className="bi bi-plus-lg"></i>
                                              </button>
                                          </div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Children</p>

                                              <span>2 - 12 Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                            <button
                                              type="button"
                                              onClick={() => handleChildrenCount("decrease")}
                                              className="btn-transparent"
                                            >
                                              <i className="bi bi-dash-lg"></i>
                                            </button>

                                              <input type="number" 
                                                value={childrenCount} 
                                                className="form-control" />

                                            <button
                                              type="button"
                                              onClick={() => handleChildrenCount("increase")}
                                              className="btn-transparent"
                                            >
                                              <i className="bi bi-plus-lg"></i>
                                            </button>
                                          </div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between mb-3">
                                          <div className="diweirkwer d-flex flex-column">
                                              <p className="mb-0 dnfreqer">Infant</p>

                                              <span>0 - 2 Years</span>
                                          </div>

                                          <div className="defgeghwewr d-flex align-items-center px-2 py-1">
                                            <button
                                              type="button"
                                              onClick={() => handleInfantCount("decrease")}
                                              className="btn-transparent"
                                            >
                                              <i className="bi bi-dash-lg"></i>
                                            </button>

                                              <input type="number"
                                               value={infantCount} 
                                                placeholder="1" className="form-control" />

                                            <button
                                              type="button"
                                              onClick={() => handleInfantCount("increase")}
                                              className="btn-transparent"
                                            >
                                              <i className="bi bi-plus-lg"></i>
                                            </button>
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
                                            checked={selectedCabinClass === "0"}
                                            onChange={() => setSelectedCabinClass("0")}
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
                                            checked={selectedCabinClass === "3"}
                                            onChange={() => setSelectedCabinClass("3")}
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
                                            checked={selectedCabinClass === "1"}
                                            onChange={() => setSelectedCabinClass("1")}
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
                                            checked={selectedCabinClass === "2"}
                                            onChange={() => setSelectedCabinClass("2")}
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
                                            type="button"
                                            onClick={() => {
                                              setFlightDrpdwn(false);
                                              handleSearchFlight();
                                            }}
                                            className="btn btn-tour mt-3"
                                          >
                                            APPLY
                                          </button>
                                      </div>
                                  </div>
                                )}
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
                        <button className="searchbt" onClick={handleSearchFlight}>Search Flight</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cdsnxfggfsD pt-5 pb-3">
          <div className="container">
            <div className="airlines-row">
              <div className="airline-item">
                <img src="./images/americaair.jpg" alt="" />
                <div>
                  <h6>American Airline</h6>
                  <p>216 Flights</p>
                </div>
              </div>

              <div className="airline-item">
                <img src="./images/deltaair.png" alt="" />
                <div>
                  <h6>Delta Airlines</h6>
                  <p>569 Flights</p>
                </div>
              </div>

              <div className="airline-item">
                <img src="./images/emiratesair.jpg" alt="" />
                <div>
                  <h6>Emirates</h6>
                  <p>129 Flights</p>
                </div>
              </div>

              <div className="airline-item">
                <img src="./images/franceair.png" alt="" />
                <div>
                  <h6>Air France</h6>
                  <p>600 Flights</p>
                </div>
              </div>

              <div className="airline-item">
                <img src="./images/quaterair.jpg" alt="" />
                <div>
                  <h6>Qatar Airways</h6>
                  <p>200 Flights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flight-results-section py-5">
          <div className="container">
            <div className="row g-4">
              {/* <!-- ================= LEFT FILTER SIDEBAR ================= --> */}
              <div className="col-lg-3 jiksnzjisd">
                {window.innerWidth <= 991 && (
                  <div onClick={() => setResFilterToggle(false)} className={`${resFilterToggle ? "filter-card-res-backdrop" : "filter-card-res-backdrop filter-card-res-backdrop-hide"} position-fixed w-100 h-100 top-0 start-0 end-0 bottom-0`}></div>
                )}

                <div className="filter-card sticky-top">
                  <div onClick={() => setResFilterToggle(prev => !prev)} className="filter-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0"><i className="fa-solid d-none me-1 fa-sliders"></i> Filters</h5>

                    <a href="/" className="reset-link disabled">
                      <i className="fa-solid fa-arrow-rotate-left"></i> <b>Reset</b>
                    </a>
                  </div>

                  <div className={resFilterToggle ? "disennksjhkf" : "disennksjhkf disennksjhkf-hide"}>
                    {window.innerWidth <= 991 && (
                      <div className="dimodjhiuhsdf d-flex align-items-center justify-content-between p-3">
                        <h5 className="mb-0">Filter</h5>

                        <a href="/" className="reset-link disabled"><i className="fa-solid fa-arrow-rotate-left"></i> <b>Reset</b></a>
                      </div>
                    )}

                    <div className={`${(window.innerWidth <= 991) ? "px-3 pt-3" : ""} dijnsihfsdlf pb-4`}>
                      <div className="filter-section jniujoijik">
                        <label className="form-label">Search by Airline Names</label>
                        
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by Airline Names"
                        />
                      </div>

                      <div className="flight-filter-box flht-fltr-wrapper">
                        <div className="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                          <div className="flight-filter-left">
                            <img
                              src="./images/upplane.png"
                              className="flight-filter-img"
                              alt=""
                            />
                            <span className="flight-filter-title">Departure Times</span>
                          </div>

                          <i className="fa-solid fa-caret-up flight-filter-icon"></i>
                        </div>

                        <div className="flight-filter-content">
                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">American Airlines</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">Delta Airliness</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">Emirates</p>
                              </label>
                            </div>
                          </div>
                          
                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">Air France</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">Japan Airlines</p>
                              </label>
                            </div>
                          </div>                      
                        </div>
                      </div>
                      
                      <div className="flight-filter-box flht-fltr-wrapper">
                        <div className="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                          <div className="flight-filter-left">
                            <img
                              src="./images/upplane.png"
                              className="flight-filter-img"
                              alt=""
                            />
                            <span className="flight-filter-title">Flights Times</span>
                          </div>

                          <i className="fa-solid fa-caret-up flight-filter-icon"></i>
                        </div>

                        <div className="flight-filter-content">
                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">6.00pm-12.00am</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">10.10pm-2.3apm</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">11.00pm-3.10am</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">1.20am-4.40am</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">5.30am-12.00pm</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="filter-section">
                        <div className="flight-filter-title d-flex align-items-center mb-2">
                          <img src="./images/priceicon.png" alt="" />
                          <span>Fare Type</span>
                        </div>

                        <div className="form-check suggested-item ps-0">
                          <div className="checkbox-wrapper-33">
                            <label className="checkbox">
                              <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                              <span className="checkbox__symbol">
                                <svg
                                  aria-hidden="true"
                                  className="icon-checkbox"
                                  width="28px"
                                  height="28px"
                                  viewBox="0 0 28 28"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M4 14l8 7L24 7" />
                                </svg>
                              </span>

                              <p className="checkbox__textwrapper">Show Refundable Only</p>
                            </label>
                          </div>
                        </div>

                        <div className="form-check suggested-item ps-0">
                          <div className="checkbox-wrapper-33">
                            <label className="checkbox">
                              <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                              <span className="checkbox__symbol">
                                <svg
                                  aria-hidden="true"
                                  className="icon-checkbox"
                                  width="28px"
                                  height="28px"
                                  viewBox="0 0 28 28"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M4 14l8 7L24 7" />
                                </svg>
                              </span>

                              <p className="checkbox__textwrapper">Show Non Refundable Only</p>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="flight-time-filter-box mt-4">
                        <div className="flight-time-filter-header d-flex justify-content-between align-items-center flight-time-toggle">
                          <div className="flight-time-left">
                            <img
                              src="./images/upplane.png"
                              className="flight-time-img"
                              alt=""
                            />
                            <span className="flight-time-title">Departure Times</span>
                          </div>

                          <i className="fa-solid fa-caret-up flight-time-icon"></i>
                        </div>

                        <div className="flight-time-content">
                          <select className="flight-time-select form-select">
                            <option>Anytime</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Night</option>
                          </select>
                        </div>
                      </div>

                      <div className="flight-arrival-filter-box mt-4">
                        <div className="flight-arrival-filter-header d-flex justify-content-between align-items-center flight-arrival-toggle">
                          <div className="flight-arrival-left">
                            <img
                              src="./images/downplane.png"
                              className="flight-arrival-img"
                              alt=""
                            />
                            <span className="flight-arrival-title">Arrival Times</span>
                          </div>

                          <i className="fa-solid fa-caret-up flight-arrival-icon"></i>
                        </div>

                        <div className="flight-arrival-content">
                          <select className="flight-arrival-select form-select">
                            <option>Anytime</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Night</option>
                          </select>
                        </div>
                      </div>

                      <div className="flight-review-filter-box mt-3">
                        <div className="flight-review-filter-header d-flex justify-content-between align-items-center flight-review-toggle">
                          <div className="flight-review-left">
                            <img
                              src="./images/reviewicon.png"
                              className="flight-review-img"
                              alt=""
                            />
                            <span className="flight-filter-title">Reviews</span>
                          </div>

                          <i className="fa-solid fa-caret-up flight-review-icon"></i>
                        </div>

                        <div className="flight-review-content">
                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">⭐⭐⭐⭐⭐ 5 Star</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">⭐⭐⭐⭐ 4 Star</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">⭐⭐⭐ 3 Star</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">⭐⭐ 2 Star</p>
                              </label>
                            </div>
                          </div>

                          <div className="form-check suggested-item ps-0">
                            <div className="checkbox-wrapper-33">
                              <label className="checkbox">
                                <input value="American Airlines" className="checkbox__trigger visuallyhidden" type="checkbox" />

                                <span className="checkbox__symbol">
                                  <svg
                                    aria-hidden="true"
                                    className="icon-checkbox"
                                    width="28px"
                                    height="28px"
                                    viewBox="0 0 28 28"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M4 14l8 7L24 7" />
                                  </svg>
                                </span>

                                <p className="checkbox__textwrapper">⭐ 1 Star</p>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- ================= RIGHT SIDE GOES HERE ================= --> */}
              <div className="col-lg-9">
                <div className="ajhfbmuihehee d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-semibold mb-0">
                    {flightList?.TripDetails?.[0]?.Flights?.length} Flights Found
                    on Your Search
                  </h5>

                  <div className="sort-area">                    
                    <p className="mb-0">Sort By :</p>
                    
                    <select>
                      <option>Recommended</option>
                      <option>Lowest Price</option>
                      <option>Fastest</option>
                    </select>
                  </div>
                </div>

                <div className="save-banner mb-4">
                  <span>
                    Save an average of 15% on thousands of flights when you're
                    signed in
                  </span>
                  <button className="sign-btn">Sign In</button>
                </div>

                <div className="flight-filtr-wrppr">
                  {flightList?.TripDetails?.[0]?.Flights?.map((flight, index) => {
                    const firstSegment = flight.Segments[0];
                    const lastSegment = flight.Segments[flight.Segments.length - 1];

                    const cheapestFare = flight.Fares[0]?.FareDetails[0];

                    return (
                      <div className="flight-card" key={index}>
                        <div className="flight-top d-flex justify-content-between align-items-center mb-4">
                          <div className="uhncoikcdf d-flex align-items-center">
                            <div className="heart bg-white">
                              <img src="./images/likeicon.png" alt="" />
                            </div>

                            {/* <span className="cheapest">
                                                {cheapestFare?.Refundable ? "Refundable" : "Cheapest"}
                                            </span> */}
                            <p className="mb-0">
                              {flight.IsLCC
                                ? "Low Cost Carrier"
                                : "Full Service Airline"}
                            </p>
                          </div>

                          {/* <span className="rating">5.0</span> */}

                          <div className="stop-info">
                            {/* <img src="./images/stop.png" alt="" /> */}

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

                        <div className="flight-body">
                          <div className="duihnjaka">
                            <div className="row">
                              {/* Airline Details */}
                              <div className="col-lg-9 pe-lg-0">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                  <div className="uiajsdkcoijzczx d-flex gap-3 align-items-center justify-content-between">
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

                                      <p className="mb-0">
                                        <small className="sjkdnfslfs text-muted">
                                          {firstSegment.Airline_Code} {firstSegment.Flight_Number}
                                        </small>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="price-section d-flex flex-column align-items-end">
                                      <p className="mb-0">
                                        <small className="sjkdnfslfs">From</small>
                                      </p>                                      

                                      <h4 className="mb-0">
                                        <strong>
                                          ₹ {cheapestFare?.Total_Amount?.toLocaleString()}
                                        </strong>
                                      </h4>

                                      <small>per traveller</small>
                                    </div>                                    
                                  </div>
                                </div>

                                {/* <a href="/" className="compare-link">
                                                      Add to compare +
                                                  </a> */}

                                <div className="icsnduhh row align-items-center my-4">
                                  {/* Airline Details */}
                                  <div className="col-2">
                                    <div className="gfjh55 text-start ps-3">
                                      <h5 className="fw-semibold mb-0 d-flex flex-column gap-1">
                                        <span>
                                          {firstSegment.Origin_City.match(/\((.*?)\)/)?.[1] || ""}
                                        </span>

                                        <span>
                                          {firstSegment.Origin_City.replace(
                                            /\s*\(.*?\)/g,
                                            "",
                                          ).trim()}
                                        </span>

                                        {/* to
                                        {firstSegment.Destination_City.replace(
                                          /\s*\(.*?\)/g,
                                          "",
                                        ).trim()} */}
                                        {/* {formatFlightDate(firstSegment.Departure_DateTime)} */}
                                      </h5>

                                      <small style={{ fontWeight: 500, color: "var(--light-highlighted-text-color)" }}>Terminal {firstSegment.Origin_Terminal}</small>
                                    </div>

                                    {/* <a href="/" className="compare-link">
                                                          Add to compare +
                                                      </a> */}
                                  </div>

                                  {/* Time Section */}
                                  <div className="col-8">
                                    <div className="time-wrapper d-flex justify-content-between gap-4">
                                      <div className="text-center pt-1">
                                        <h5 className="mb-0">
                                          {firstSegment.Departure_DateTime.split(" ")[1]}
                                        </h5>                                        
                                      </div>

                                      <div className="duration-wrapper flex-fill text-center">
                                        <small className="dyusbnbsdhfc ufsidnfijsdfsdf">
                                          {/* {flight.Segments
                                                                      .map(segment => segment.Duration)
                                                                      .join(" + ")} */}
                                          {flight.Segments.map((segment) => {
                                            const [hours, minutes] =
                                              segment.Duration.split(":");
                                            return `${hours}h ${minutes}m`;
                                          }).join(" + ")}
                                        </small>

                                        <div className="dinsjihfnsidhfsdf d-flex align-items-center justify-content-center position-relative my-2">
                                          <span className="flgt-drtn-circle d-block"></span>      

                                          <span className="flgt-drtn-line d-block"></span>

                                          <span className="flgt-drtn-circle d-block"></span> 
                                          
                                          <div className="dijsenifjsdf hide-ini position-absolute text-center">
                                            <i className="bi bi-airplane-engines d-block text-white"></i>
                                          </div>

                                          <div className="dijsenifjsdf show-ini position-absolute text-center">
                                            <i className="bi bi-airplane-engines d-block text-white"></i>
                                          </div>                                          
                                        </div>

                                        <small className="dyusbnbsdhfc">
                                          <div className="stop-info mt-2">
                                            {/* <img src="./images/stop.png" alt="" /> */}

                                            {flight.Segments.length === 1
                                              ? "Non Stop"
                                              : `${flight.Segments.length - 1} Stop, ${flight.Segments.slice(
                                                  0,
                                                  -1,
                                                )
                                                  .map((s) => s.Destination)
                                                  .join(", ")}`}
                                          </div>
                                        </small>                                        
                                      </div>

                                      <div className="text-center pt-1">
                                        <h5 className="mb-0">
                                          {lastSegment.Arrival_DateTime.split(" ")[1]}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Price */}
                                  <div className="col-2">
                                    <div className="gfjh55 text-end">
                                      <h5 className="fw-semibold d-flex flex-column mb-0 gap-1">                                        
                                        <span>
                                          {firstSegment.Destination_City.match(/\((.*?)\)/)?.[1] || ""}
                                        </span>

                                        <span>
                                          {firstSegment.Destination_City.replace(
                                            /\s*\(.*?\)/g,
                                            "",
                                          ).trim()}
                                        </span>

                                        {/* {formatFlightDate(firstSegment.Departure_DateTime)} */}
                                      </h5>

                                      <small style={{ fontWeight: 500, color: "var(--light-highlighted-text-color)" }}>Terminal {lastSegment.Destination_Terminal}</small>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="col-lg-3">
                                <div className="dikijasdlfdsf text-end pt-3">
                                  <button
                                    className="btn btn-tour mb-2"
                                    onClick={() => handleFlightFareDetails(flight)}
                                  >
                                    View Price
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="offer-strip d-flex justify-content-between align-items-center">
                          <div className="doasjjishnidchsd d-flex align-items-center gap-2">
                            <div className="dosncjknzkczxc position-relative rounded-circle">
                              <img src="./images/seatb.png" className="position-absolute top-50 start-50 translate-middle img-fluid" alt="" />
                            </div>

                            <div className="dinsdlcjiodsfc">
                              <small>Cabin</small> <p className="mb-0">{cheapestFare?.FareClasses?.[0]?.CabinClass}</p>
                            </div>
                          </div>

                          <div className="doasjjishnidchsd d-flex align-items-center gap-2">
                            <div className="dosncjknzkczxc position-relative rounded-circle">
                              <img src="./images/luggageb.png" className="position-absolute top-50 start-50 translate-middle img-fluid" alt="" />
                            </div>

                            <div className="dinsdlcjiodsfc">
                              <small>Baggage</small> <p className="mb-0">{cheapestFare?.Free_Baggage?.Check_In_Baggage} Check-In</p>
                            </div>
                          </div>

                          <div className="doasjjishnidchsd d-flex align-items-center gap-2">
                            <div className="dosncjknzkczxc position-relative rounded-circle">
                              <img src="./images/school-bag.png" className="position-absolute top-50 start-50 translate-middle img-fluid" alt="" />
                            </div>

                            <div className="dinsdlcjiodsfc">
                              <small>Cabin Baggage</small> <p className="mb-0">{cheapestFare?.Free_Baggage?.Hand_Baggage}</p>
                            </div>
                          </div>

                          <div className="doasjjishnidchsd d-flex align-items-center gap-2">
                            <div className="dosncjknzkczxc position-relative rounded-circle">
                              <img src="./images/fire.png" className="position-absolute top-50 start-50 translate-middle img-fluid" alt="" />
                            </div>

                            <div className="dinsdlcjiodsfc">
                              <small>Seats Left</small> <p className="mb-0">{flight.Fares[0]?.Seats_Available} Seats Left</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/*flight fare modal*/}

                <div className={`${(showFareModal && selectedFlight) ? "flight-fare-modal-backdrop" : "flight-fare-modal-backdrop flight-fare-modal-backdrop-hide"} position-fixed top-0 start-0 end-0 bottom-0 w-100 h-100`}></div>

                {showFareModal && selectedFlight && (
                  <div className={`${(showFareModal && selectedFlight) ? "flight-fare-modal" : "flight-fare-modal flight-fare-modal-hide"} bg-white position-fixed start-50 top-50 translate-middle`}>
                    <div className="flight-modal-content">
                      <div className="flight-modal-header d-flex align-items-center justify-content-between px-4 py-3">
                        <h5 className="flight-modal-title mb-0">
                           <img src="./images/favicon.png" className="me-1" alt="" /> <b>Flight Details and Fare Options available for you!</b>
                        </h5>

                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowFareModal(false)}
                        />
                      </div>

                      <div className="flight-modal-body px-4 py-3">
                        <h5>
                          <b>{selectedFlight.Segments[0].Origin} - {selectedFlight.Segments[selectedFlight.Segments.length - 1].Destination}</b>
                        </h5>

                        <p className="nfkjiuiewnjer mb-4">
                          <img
                            src={`https://images.kiwi.com/airlines/64/${selectedFlight.Segments[0].Airline_Code}.png`}
                            className="airline-logo m-0 me-2"
                            alt=""
                            onError={(e) => {
                              e.target.src = "./images/indigo.png";
                            }}
                          />
                          {selectedFlight.Segments[0].Airline_Name} · Departure at
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
                        
                        <div className="icsklmdjfisdfsdf row">
                          {selectedFlight.Fares.map((fare, fareIndex) => {
                            const apiFareDetails = fareApiData[fare.Fare_Id];

                            return (
                              <div className="col-lg-4 mb-4">
                                <label htmlFor={fareIndex}
                                  key={fareIndex}
                                  className="iujnefjwrwer position-relative rounded mb-3 h-100"
                                >
                                  <input type="radio" id={fareIndex} value="" name="cfsdvfvsf" className="position-absolute d-none" />

                                  <div className="djiasndkcsi d-flex justify-content-between flex-column h-100">
                                    {fare.FareDetails.map((detail, detailIndex) => (
                                      <div key={detailIndex} className="ifuejwifhuer">
                                        <div className="sgdhsfasdff position-relative">
                                          <h5 className="fw-bold mb-0 p-3">
                                              ₹ {detail.Total_Amount.toLocaleString()}
                                              <span
                                                  className="cdhnzdfsfzxdd text-muted ms-1"
                                                  style={{ fontSize: "14px" }}
                                              >
                                                  per adult
                                              </span>
                                          </h5>

                                          <div className="ijcdsknejke position-absolute top-50 text-uppercase text-white px-3"
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

                                        <div className="doieasjdlmsoijf p-3">
                                          {/* Baggage */}
                                          <div className="djnskmlfdsf mb-3">
                                            <h6 className="mb-2">Baggage</h6>

                                            <div className="nxcvxfdcdd mb-1">
                                              <p className="mb-0 d-flex align-items-center">
                                                <i className="bi me-2 bi-check-circle-fill"></i>

                                                {detail.Free_Baggage?.Hand_Baggage} Cabin Baggage
                                              </p>
                                            </div>

                                            <div className="nxcvxfdcdd">
                                              <p className="mb-0 d-flex align-items-center">
                                                <i className="bi me-2 bi-check-circle-fill"></i>

                                                {detail.Free_Baggage?.Check_In_Baggage} Check-in Baggage
                                              </p>
                                            </div>
                                          </div>

                                          {/* Flexibility */}
                                          <div className="djnskmlfdsf">
                                            <h6 className="mb-2">Flexibility</h6>

                                            <div className="duihsfijsd py-2">
                                              <h6 className="mb-2">Cancellation Charges</h6>

                                              {detail.CancellationCharges?.map((charge, idx) => (
                                                <div key={idx} className="ccnxdfdzsd d-flex mt-1">
                                                  <i className="bi me-2 bi-dash-circle-fill"></i>

                                                  <p className="mb-0">
                                                    {charge.ValueType === 1
                                                      ? `${charge.Value}% of fare`
                                                      : isNaN(Number(charge.Value))
                                                        ? charge.Value
                                                        : `₹${Number(charge.Value).toLocaleString()}`}{" "}
                                                    if cancelled between{" "}
                                                    <strong>{charge.DurationFrom}</strong>{" "}
                                                    {charge.DurationTypeFrom === 0 ? "hrs" : "days"}{" "}
                                                    to{" "}
                                                    <strong>{charge.DurationTo}</strong>{" "}
                                                    {charge.DurationTypeTo === 0 ? "hrs" : "days"}{" "}
                                                    before departure
                                                  </p>
                                                </div>
                                              ))}
                                            </div>

                                            {/* Reschedule Charges */}
                                            <div className="duihsfijsd py-2">
                                              <h6 className="mb-2">Date Change Charges</h6>

                                              {detail.RescheduleCharges?.map(
                                                (charge, idx) => (
                                                  <div key={idx} className="ccnxdfdzsd d-flex mt-1">
                                                    <i className="bi me-2 bi-dash-circle-fill"></i>

                                                    <p className="mb-0">
                                                      {charge.ValueType === 1
                                                        ? `${charge.Value}% of fare`
                                                        : isNaN(Number(charge.Value))
                                                          ? charge.Value
                                                          : `₹${Number(charge.Value).toLocaleString()}`}{" "}
                                                      if changed between{" "}
                                                      <strong>{charge.DurationFrom}</strong>{" "}
                                                      {charge.DurationTypeFrom === 0 ? "hrs" : "days"}{" "}
                                                      to{" "}
                                                      <strong>{charge.DurationTo}</strong>{" "}
                                                      {charge.DurationTypeTo === 0 ? "hrs" : "days"}{" "}
                                                      before departure
                                                    </p>
                                                  </div>
                                                ),
                                              )}
                                            </div>
                                          </div>

                                          {/* Seats & Meals */}
                                          <div className="djnskmlfdsf zbzbszdsad py-2">
                                            <h6 className="mb-2">
                                              Seats, Meals & More
                                            </h6>

                                            <div className="mb-1">
                                              <i className="bi me-2 bi-check-circle-fill"></i>
                                              
                                              Chargeable Seats
                                            </div>

                                            <div>
                                              <i className="bi me-2 bi-check-circle-fill"></i>
                                              
                                              {fare.Food_onboard === "P"
                                                ? "Chargeable Meals"
                                                : "Complimentary Meals"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    {apiFareDetails?.status && (
                                      <>
                                      <div className="djnskmlfdsf">
                                        <div className="imdiajojidsf">
                                          <div className="d-flex align-items-center justify-content-between px-3 pb-3">
                                            <h6 className="d-flex align-items-center mb-0">
                                              <i className="bi me-1 text-center text-white bi-info-lg"></i> Fare Rules
                                            </h6>  

                                            {window.innerWidth > 991 && (
                                              <i onClick={() => handleFareRules(fareIndex)} className={`${fareRules === fareIndex ? "bi-chevron-left" : "bi-chevron-right"} bi`}></i>
                                            )}

                                            {window.innerWidth <= 991 && (
                                              <i onClick={() => handleFareRules(fareIndex)} className={`${fareRules === fareIndex ? "bi-x-lg" : "bi-chevron-down"} uinjocjso-icon bi`}></i>
                                            )}
                                          </div>     

                                          {fareRules === fareIndex && (
                                            <div className="xnfgsfsdcfe sdjkcnsidjcije position-absolute bg-white w-100 rounded-2 border-top p-3 pe-0">
                                              <div className="unjcisdosidd me-3 d-flex align-items-center justify-content-between mb-4">
                                                <h6 className="mb-0 d-flex align-items-center"><i className="bi me-1 d-inline-block text-center text-white bi-info-lg"></i> Fare Rules</h6>

                                                <i className="fa-solid fa-xmark" onClick={() => setFareRules(false)}></i>
                                              </div>

                                              {apiFareDetails?.fareDetails?.FareRules?.map(
                                                (rule, ruleIndex) => (
                                                  <div key={ruleIndex}
                                                    className="jifjisiudj"
                                                    dangerouslySetInnerHTML={{
                                                      __html: rule.FareRuleDesc,
                                                    }}
                                                  />
                                                ),
                                              )}
                                            </div>
                                          )}                                     
                                        </div>                            
                                      </div>

                                      <div className="okcmksxdcmkvsoij text-end p-3">
                                        <button className="btn-tour py-2" onClick={() => handleFlightDetails(selectedFlight, flightList?.Search_Key, fare.Fare_Id)}>Book Now</button>
                                      </div>  
                                      </>
                                    )} 
                                                                       
                                  </div>
                                  
                                </label>
                              </div>                                
                            );
                          })}
                        </div>
                      </div>

                      {/* <div className="flight-modal-footer text-center px-4 py-2">
                        <button className="btn-tour">Book Now</button>
                      </div> */}
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
