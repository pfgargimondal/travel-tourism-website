import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./FlightDetails.css";
import http from "../../../http";

export const FlightDetails = () => {

    const [imprtntInfoModal, setImprtntInfoModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [allCouponModal, setAllCouponModal] = useState(false);
    // eslint-disable-next-line
    const [flightRePrice, setflightRePrice] = useState(null);
      // eslint-disable-next-line
    const { flightId } = useParams();
    const location = useLocation();
    const search_key = location.state?.search_key;
    const flight = location.state?.flight;
    const fareId = location.state?.fareId;
    const firstSegment = flight.Segments[0];
    const lastSegment = flight.Segments[flight.Segments.length - 1];
    const cheapestFare = flight.Fares[0]?.FareDetails[0];

    const travelDate = new Date(flight.TravelDate);

    useEffect(() => {
        const fetchFareData = async () => {
          try {
            const response = await http.post("/flight-reprice-details", {
                fare_id: fareId,
                search_key: search_key,
                Flight_Key: flight.Flight_Key,
            });
            setflightRePrice(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchFareData();
    }, [flight.Flight_Key, search_key, fareId]);


    const formattedDate = travelDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    const parseDate = (dateStr) => {
        const [datePart, timePart] = dateStr.split(" ");
        const [month, day, year] = datePart.split("/");
        return new Date(`${year}-${month}-${day}T${timePart}`);
    };

    const departureDate = parseDate(firstSegment.Departure_DateTime);
    const arrivalDate = parseDate(lastSegment.Arrival_DateTime);

    const totalMinutes = Math.floor((arrivalDate - departureDate) / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const totalDuration = `${hours}h ${minutes}m`;
    const stops = flight.Segments.length - 1;

    const departureTime = firstSegment.Departure_DateTime.split(" ")[1];
    const arrivalTime = lastSegment.Arrival_DateTime.split(" ")[1];



    useEffect(() => {
        const html = document.querySelector("html");

        imprtntInfoModal ? html.classList.add("overflow-hidden") : html.classList.remove("overflow-hidden");;

        return () => {
            html.classList.remove("overflow-hidden")
        };
    }, [imprtntInfoModal]);
// eslint-disable-next-line
    const handleImprtntInfoModalToggle = () => {
        setImprtntInfoModal(prev => !prev);
    };

    const handleSelectedModal = (value) => {
        setSelectedCoupon(prev => (prev === value) ? null : value);
    };

    useEffect(() => {
        const html = document.querySelector("html");

        allCouponModal ? html.classList.add("overflow-hidden") : html.classList.remove("overflow-hidden");

        return () => {
            html.classList.remove("overflow-hidden")
        };
    }, [allCouponModal]);
    

    const handleAllModalToggle = () => {
        setAllCouponModal(prev => !prev);
    };



    return (
        <div className="sdfsdf655">
            <div className="container">
                <div className="asfdgsqwe">
                    <ul className="ps-0 d-flex align-items-center gap-3">
                        <li className="active">Hotels</li>

                        <li>
                            <i className="bi bi-arrow-right"></i>
                        </li>

                        <li>Flight Details</li>
                    </ul>
                </div>

                <div className="fgerfer88 flight-wrppr">
                    <div className="row">
                        {/* Main Content - Left Column */}
                        <div className="col-lg-9">
                            <div className="sdfhgfrfrftr">
                                <div className="hotel-card">
                                    <div className="card-box">
                                        {/* HEADER */}
                                        <div className="flight-header">
                                            <div className="ciuajmcokzxc d-flex gap-2 align-items-center">
                                                <img
                                                    src={`https://images.kiwi.com/airlines/64/${firstSegment.Airline_Code}.png`}
                                                    className="airline-logo m-0"
                                                    alt=""
                                                    onError={(e) => {
                                                        e.target.src = "./images/indigo.png";
                                                    }}
                                                />
                                            
                                                <div>
                                                    <h4 className="fw-bold mb-1">{firstSegment.Origin_City.replace(/\s*\(.*?\)/g, "").trim()} → {firstSegment.Destination_City.replace(/\s*\(.*?\)/g, "").trim()}</h4>
                                                
                                                    <p className="mb-0">
                                                        {formattedDate} |{" "}
                                                        <span>
                                                            {stops === 0 ? "Non Stop" : `${stops} Stop${stops > 1 ? "s" : ""}`} · {totalDuration}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="diwehidmsad d-flex flex-column text-end">
                                                <span className="badge-green mb-2">CANCELLATION FEES APPLY</span>

                                                <Link to="/">View Fare Rules</Link>
                                            </div>
                                        </div>

                                        {/* AIRLINE */}
                                        <div className="mt-4 d-flex justify-content-between">
                                            <div className="duiewjkijdasx d-flex align-items-center">
                                                <p className="mb-0"><strong>{firstSegment.Airline_Name}</strong> <span>{firstSegment.Airline_Code} {firstSegment.Flight_Number}</span></p>

                                                <span className="badge bg-light text-dark ms-3 p-1">Airbus {firstSegment.Aircraft_Type}</span>
                                            </div>

                                            <h6 className="mb-0">
                                                {cheapestFare?.FareClasses?.[0]?.CabinClass} • <span style={{ color: '#0ea5a4' }}>{cheapestFare?.FareClasses?.[0]?.FareBasis}</span>
                                            </h6>
                                        </div>

                                        {/* TIMELINE */}
                                        <div className="timeline mt-4">
                                            <div>
                                                <div className="time">{departureTime}</div>
                                                <div className="airport">{firstSegment.Origin_City.replace(/\s*\(.*?\)/g, "").trim()}</div>
                                            </div>

                                            <div className="duration text-center">{totalDuration}</div>

                                            <div>
                                                <div className="time">{arrivalTime}</div>
                                                <div className="airport">{firstSegment.Destination_City.replace(/\s*\(.*?\)/g, "").trim()}</div>
                                            </div>
                                        </div>

                                        {/* BAGGAGE */}
                                        <div className="baggage">
                                            🧳 Cabin: {cheapestFare?.Free_Baggage?.Hand_Baggage} / Adult &nbsp;&nbsp; | &nbsp;&nbsp; 🧳 Check-in: {cheapestFare?.Free_Baggage?.Check_In_Baggage}
                                        </div>

                                        {/* NOTICE */}
                                        <div className="notice">
                                            <span>Got excess baggage? Don't stress, buy extra check-in baggage allowance</span>
                                            <a href="/">ADD BAGGAGE</a>
                                        </div>

                                        {/* POLICY */}
                                        {/* <div className="policy-box">
                                            <div className="d-flex justify-content-between">
                                                <strong>Cancellation & Date Change Policy</strong>
                                                <a href="#">View Policy</a>
                                            </div>

                                            <div className="mt-2 mb-2">BOM-CCU</div>

                                            <div className="d-flex justify-content-between fw-semibold small text-center">
                                                <span className="flex-fill">₹ 4,349</span>
                                                <span className="flex-fill">₹ 5,349</span>
                                                <span className="flex-fill">₹ 13,994</span>
                                                <span className="flex-fill">₹ 1,994</span>
                                            </div>

                                            <div className="progress-line"></div>

                                            <div className="d-flex justify-content-between small text-muted text-center">
                                                <span className="flex-fill">Now</span>
                                                <span className="flex-fill">
                                                    18 Mar
                                                    <br />
                                                    <small>20:15</small>
                                                </span>
                                                <span className="flex-fill">
                                                    19 Mar
                                                    <br />
                                                    <small>17:15</small>
                                                </span>
                                                <span className="flex-fill">
                                                    19 Mar
                                                    <br />
                                                    <small>20:15</small>
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>                                

                                {/* Free Date Change Section */}
                                <div className="sdbfsdhfsd">
                                    <div className="dsbfsd">
                                        <h6>
                                            <b>Unsure of your travel plans?</b> Get full flexibility with our special add-ons
                                        </h6>
                                    </div>
                                    <div className="dfbsdfgsdf">
                                        <div className="row">
                                            <div className="col-lg-11">
                                                <div className="fgsdfsdf">
                                                    <div className="dfsdf">
                                                        <h6>Free Date Change</h6>
                                                    </div>
                                                    <div className="fsdf">Free Date Change Included</div>
                                                </div>
                                                <div className="dfsdfsdf">
                                                    <p>
                                                        <span className="fsdfdsf">Great! Save up to ₹ 3349 </span> on date change charges up to 3 hours before
                                                        departure. You just pay the fare difference!{' '}
                                                        <span className="fsdfdsf55">View T&C</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-1">
                                                <div className="fsdfsdfsd">
                                                    <div className="sdfsdf">
                                                        <img src="./images/travel-plan-fdc-card.png" alt="" />
                                                    </div>
                                                    <div className="dfgbdfgdf">
                                                        <h4>₹ 391</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Important Information */}
                                <div className="fgdfgdfg">
                                    <div className="sdfgsdf">
                                        <h6>Important Information</h6>
                                    </div>

                                    <div className="bdfsdf855e">
                                        {[1, 2, 3].map((_, idx) => (
                                            <div className="dfgf555" key={idx}>
                                                <div className="row">
                                                    <div className="col-lg-1">
                                                        <div className="sdfsdf">
                                                            <img src="./images/alert.png" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-11">
                                                        <div className="asdbasd55">
                                                            <h6>Check travel guidelines and baggage information below:</h6>
                                                            <p>
                                                                Carry no more than 1 check-in baggage and 1 hand baggage per passenger. If violated, airline may levy
                                                                extra charges.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Hotel Offers */}
                                <div className="dfgudfg588r">
                                    <div className="gdfgdfgd">
                                        <div className="gfdgdf">
                                            <h6>Book a Flight & unlock these offers</h6>
                                        </div>
                                    </div>
                                    <div className="sdbff5sdf">
                                        <div className="row">
                                            <div className="col-lg-10">
                                                <div className="dfsfdf6985">
                                                    <div className="fdfg">
                                                        <h6>
                                                            <span>
                                                                <i className="fa-solid fa-check"></i> Exclusive rates
                                                            </span>{' '}
                                                            on Select Properties in Navi Mumbai
                                                        </h6>
                                                    </div>
                                                    <div className="sdbfhsdf8sd">
                                                        <div className="row">
                                                            {[1, 2, 3].map((_, idx) => (
                                                                <div className="col-lg-4" key={idx}>
                                                                    <div className="dfbgsdf28">
                                                                        <div className="row">
                                                                            <div className="col-lg-5 col-5">
                                                                                <div className="fsdfsd55f">
                                                                                    <img src="./images/Screenshot (11).png" alt="" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-lg-7 col-7">
                                                                                <div className="dfgsdf89">
                                                                                    <div className="dfdf">
                                                                                        <p>Aurika, Mumbai Inter</p>
                                                                                    </div>
                                                                                    <div className="fndf78">
                                                                                        {[...Array(5)].map((_, i) => (
                                                                                            <i className="fa-solid fa-star" key={i}></i>
                                                                                        ))}
                                                                                    </div>
                                                                                    <div className="sfsdf4">
                                                                                        <h6>₹ 6,973</h6>
                                                                                        <p>₹ 10,384</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="dfsdfsdf5">
                                                    <h6>
                                                        <span>
                                                            <i className="fa-solid fa-check"></i> Extra 12% off
                                                        </span>{' '}
                                                        using code BOOKSTAYS
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trip Secure */}
                                <div className="fgdfg584d">
                                    <div className="trip-card">
                                        {/* Header */}
                                        <div className="dgdfgdfgdf">
                                            <div className="dfsdfds555f">
                                                <i className="fa-solid fa-shield-halved text-primary"></i>
                                                <div className="trip-header">Trip Secure</div>
                                            </div>
                                            <div className="dfgbdfhgdfg">
                                                <img src="images/insocom.jpg" alt="" />
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-3">
                                            <span className="price">₹ 299</span>
                                            <span className="small-text">/Traveller (18% GST included)</span>
                                        </div>

                                        {/* Features */}
                                        <div className="sdnhfsdsdfsdf">
                                            <div className="row">
                                                <div className="col-lg-10">
                                                    <div className="dfgd5465">
                                                        <div className="row">
                                                            <div className="col-lg-4">
                                                                <div className="dfsdf5855">
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="ssd8984e">
                                                                                <img src="./images/24-hours.png" alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <div className="fds88ee">
                                                                                <h6>
                                                                                    <span>24x7 </span> Support
                                                                                </h6>
                                                                                <p>Delayed/lost baggage Assistance</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="dfsdf5855">
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="ssd8984e">
                                                                                <img src="./images/worker.png" alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <div className="fds88ee">
                                                                                <h6>
                                                                                    Flat <span> ₹ 50,000</span>
                                                                                </h6>
                                                                                <p>Delayed/lost baggage Assistance</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4">
                                                                <div className="dfsdf5855">
                                                                    <div className="row">
                                                                        <div className="col-lg-3">
                                                                            <div className="ssd8984e">
                                                                                <img src="./images/luggage.png" alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-9">
                                                                            <div className="fds88ee">
                                                                                <h6>
                                                                                    Flat <span> ₹ 2,000</span>
                                                                                </h6>
                                                                                <p>Delayed/lost baggage Assistance</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div className="sdnsdjsd">
                                                        View All Benefits <i className="fa-solid fa-right-long"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendation */}
                                        <div className="recommend mt-3">Recommended for your travel within India</div>

                                        {/* Radio Buttons */}
                                        <div className="mt-3">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="trip" id="yes" />
                                                <label className="form-check-label" htmlFor="yes">
                                                    Yes, Secure my trip.
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="trip" id="no" />
                                                <label className="form-check-label" htmlFor="no">
                                                    No, I will book without trip secure.
                                                </label>
                                            </div>
                                        </div>

                                        {/* Reviews */}
                                        <div className="mt-4">
                                            <small className="text-muted">Preferred by millions of travellers</small>

                                            <div className="row mt-2 g-3">
                                                <div className="col-md-6">
                                                    <div className="review-box">
                                                        "Your willingness to go above and beyond made a big difference."
                                                        <br />
                                                        <small>- Amit Paul</small>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="review-box">
                                                        "Claim settlement was incredibly fast. Smooth experience."
                                                        <br />
                                                        <small>- Prateek Keshari</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-3 small-text">
                                            Trip Secure is non-refundable. By selecting it, you confirm all travelers are Indian nationals.
                                        </div>
                                    </div>
                                </div>

                                {/* Akasa Priority */}
                                <div className="fndyff987er">
                                    <div className="trip-card d-flex justify-content-between align-items-center">
                                        {/* Left Content */}
                                        <div className="d-flex gap-3 align-items-start">
                                            {/* Logo */}
                                            <div className="sdfsdfdsf">
                                                <img src="./images/unnamed.webp" alt="" />
                                            </div>

                                            <div>
                                                {/* Title */}
                                                <div className="fw-bold" style={{ fontSize: '18px' }}>
                                                    Akasa Priority @ Just ₹ 875
                                                </div>

                                                {/* Subtitle */}
                                                <div className="text-muted small mb-2">
                                                    Skip queues, get your bags first, and board early with Akasa Priority.
                                                </div>

                                                {/* Features Row */}
                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png"
                                                            width="18"
                                                            alt=""
                                                        />
                                                        <span className="small">Priority Check-in</span>
                                                    </div>

                                                    <span>+</span>

                                                    <div className="d-flex align-items-center gap-1">
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
                                                            width="18"
                                                            alt=""
                                                        />
                                                        <span className="small">Priority Bag Service</span>
                                                    </div>

                                                    <span>+</span>

                                                    <div className="d-flex align-items-center gap-1">
                                                        <img
                                                            src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                                                            width="18"
                                                            alt=""
                                                        />
                                                        <span className="small">Priority Boarding</span>
                                                    </div>

                                                    <span>=</span>

                                                    <strong>₹ 875</strong>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <button className="btn btn-outline-primary rounded-pill px-4">+ADD</button>
                                    </div>
                                </div>

                                {/* Traveller Details */}
                                <div className="huikgh56">
                                    <div className="card-box">
                                        <h5 className="mb-3">Traveller Details</h5>

                                        {/* Login Box */}
                                        <div className="login-box mb-3">
                                            <span>🔒 Log in to view your saved traveller list, unlock amazing deals & much more!</span>
                                            <a href="/">LOGIN NOW</a>
                                        </div>

                                        {/* Adult Section */}
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div className="section-title">👤 ADULT (12 yrs+)</div>
                                            <small>0/1 added</small>
                                        </div>

                                        {/* Important */}
                                        <div className="important-box mb-3">
                                            <strong>Important:</strong> Enter name as mentioned on your passport or Government approved IDs.
                                        </div>

                                        {/* Add Adult */}
                                        <div className="add-box mb-4">
                                            <p className="mb-2">You have not added any adults to the list</p>
                                            <a href="/" className="add-link" onClick={() => alert('Add adult functionality')}>
                                                + ADD NEW ADULT
                                            </a>
                                        </div>

                                        {/* Contact Form */}
                                        <p className="mb-2 fw-semibold">Booking details will be sent to</p>

                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label">Country Code</label>
                                                <select className="form-select">
                                                    <option>India(91)</option>
                                                    <option>USA(1)</option>
                                                    <option>UK(44)</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Mobile No</label>
                                                <input type="text" className="form-control" placeholder="Mobile No" />
                                            </div>

                                            <div className="col-md-4">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" placeholder="Email" />
                                            </div>
                                        </div>

                                        {/* GST */}
                                        <div className="form-check mt-3">
                                            <input className="form-check-input" type="checkbox" id="gstCheck" />
                                            <label className="form-check-label checkbox-label" htmlFor="gstCheck">
                                                I have a GST number <span className="text-muted">(Optional)</span>
                                            </label>
                                        </div>

                                        {/* GST Field */}
                                        <div id="gstField" className="mt-3 d-none">
                                            <input type="text" className="form-control" placeholder="Enter GST Number" />
                                        </div>
                                    </div>
                                </div>

                                {/* State Section */}
                                <div className="dhdsfsd788">
                                    <div className="state-box mt-4">
                                        <h6 className="fw-semibold">
                                            Your State{' '}
                                            <small className="text-muted fw-normal">
                                                (Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)
                                            </small>
                                        </h6>

                                        <div className="mt-2">
                                            <label className="form-label">Select the State</label>
                                            <select className="form-select state-select">
                                                <option selected>West Bengal</option>
                                                <option>Maharashtra</option>
                                                <option>Delhi</option>
                                                <option>Karnataka</option>
                                                <option>Tamil Nadu</option>
                                            </select>
                                        </div>

                                        <div className="form-check mt-3">
                                            <input className="form-check-input" type="checkbox" id="saveBilling" />
                                            <label className="form-check-label" htmlFor="saveBilling">
                                                Confirm and save billing details to your profile
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Right Column */}
                        <div className="col-lg-3">
                            <div className="sticky-top">
                                {/* SUMMARY */}
                                <div className="fgdfgdf mb-3">
                                    <div className="summary overflow-hidden">
                                        <h6 className="mb-0 px-3 py-2"><i className="bi me-1 bi-wallet"></i> Fare Summary</h6>

                                        <div className="diewnjrjwer px-3">
                                            <table className="table mb-0">
                                                <tr>
                                                    <td><b>1 Room X 1 Night</b></td>

                                                    <td>₹ 7,299</td>
                                                </tr>

                                                <tr className="diewrwerwer">
                                                    <td><b>Total Discount</b> <i className="fa-solid fa-info"></i></td>

                                                    <td>-₹ 4,041</td>
                                                </tr>

                                                <tr>
                                                    <td><b>Price After Discount</b></td>

                                                    <td>₹ 3,258</td>
                                                </tr>

                                                <tr>
                                                    <td><b>Taxes & Fees</b></td>

                                                    <td>₹ 204</td>
                                                </tr>

                                                <tr className="ojdeopekwrer">
                                                    <td><b>Grand Total</b></td>

                                                    <td><b>₹ 3,462</b></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                {/* COUPON */}
                                <div className="dfdff5585">
                                    <div className="coupon-box">
                                        <div className="coupon-banner">
                                            <img src="./images/SL_040621_42020_15.jpg" alt="" />
                                            {/* <h5 class="mt-2">Coupons and Offers</h5> */}
                                        </div>

                                        <div className="hjhjk overflow-hidden mt-3">
                                            <h6 className="mb-0 px-3 py-2"><i className="bi me-1 bi-tags"></i>Coupon Codes</h6>

                                            <div className="bg-white px-3 mt-3">
                                                <div className="deiwhrwerwer position-relative mb-3">
                                                    <div className="position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter coupon code"
                                                            value={selectedCoupon ? selectedCoupon : ""}
                                                            onChange={() => setSelectedCoupon(null)}
                                                            disabled={selectedCoupon ? true : false}
                                                        />

                                                        <button onClick={() => setSelectedCoupon(null)} className={selectedCoupon ? "btn remove-coupon-btn position-absolute" : "btn position-absolute"}>{selectedCoupon ? "Remove" : "Apply"}</button>
                                                    </div>

                                                    {selectedCoupon && <p className="copn-msge my-2">Congratulations! Instant Discount of Rs. ₹229 has been applied successfully.</p>}
                                                </div>

                                                <div className="deiwhrwerwer">
                                                    <label htmlFor="c1" className="coupon-card">
                                                        <input type="radio" checked={selectedCoupon === "MMTTRAVEL"} onChange={() => handleSelectedModal("MMTTRAVEL")} name="ucfewfrew" id="c1" className="d-none position-absolute" />

                                                        <div className="coupon-top d-flex align-items-center justify-content-between mb-1">
                                                            <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                                                <img
                                                                    src="./images/discount.png"
                                                                    className="coupon-icon"
                                                                    alt=""
                                                                />
                                                                <strong className="frgrfg5559">MMTTRAVEL</strong>
                                                            </div>

                                                            <span className="discount">₹229 off</span>
                                                        </div>
                                                        <p className="desc mb-0">
                                                            Log in to get up to 15% OFF.
                                                            <br />
                                                            Offer valid for new users only
                                                        </p>
                                                    </label>

                                                    <label htmlFor="c2" className="coupon-card">
                                                        <input type="radio" checked={selectedCoupon === "MMTSECUREV"} onChange={() => handleSelectedModal("MMTSECUREV")} name="ucfewfrew" id="c2" className="d-none position-absolute" />

                                                        <div className="coupon-top d-flex align-items-center justify-content-between">
                                                            <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                                                <img
                                                                    src="./images/discount.png"
                                                                    className="coupon-icon"
                                                                    alt=""
                                                                />
                                                                <strong className="frgrfg5559">MMTSECUREV</strong>
                                                            </div>
                                                            <span className="discount">₹229 off</span>
                                                        </div>
                                                        <p className="desc mb-0">
                                                            Get an instant discount of ₹229 on your flight booking
                                                            <br />
                                                            and Trip Secure combo
                                                        </p>
                                                    </label>

                                                    <label htmlFor="c3" className="coupon-card">
                                                        <input type="radio" checked={selectedCoupon === "MMTSECUREL"} onChange={() => handleSelectedModal("MMTSECUREL")} name="ucfewfrew" id="c3" className="d-none position-absolute" />

                                                        <div className="coupon-top d-flex align-items-center justify-content-between">
                                                            <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                                                <img
                                                                    src="./images/discount.png"
                                                                    className="coupon-icon"
                                                                    alt=""
                                                                />
                                                                <strong className="frgrfg5559">MMTSECUREL</strong>
                                                            </div>
                                                            <span className="discount">₹229 off</span>
                                                        </div>
                                                        <p className="desc mb-0">
                                                            Get an instant discount of ₹229 on your flight booking
                                                            <br />
                                                            and Trip Secure combo
                                                        </p>
                                                    </label>

                                                    <label htmlFor="c4" className="coupon-card">
                                                        <input type="radio" checked={selectedCoupon === "MMTSECUREJ"} onChange={() => handleSelectedModal("MMTSECUREJ")} name="ucfewfrew" id="c4" className="d-none position-absolute" />

                                                        <div className="coupon-top d-flex align-items-center justify-content-between">
                                                            <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                                                <img
                                                                    src="./images/discount.png"
                                                                    className="coupon-icon"
                                                                    alt=""
                                                                />
                                                                <strong className="frgrfg5559">MMTSECUREJ</strong>
                                                            </div>
                                                            <span className="discount">₹ 229 off</span>
                                                        </div>
                                                        <p className="desc mb-0">
                                                            Get an instant discount of ₹229 on your flight booking
                                                            <br />
                                                            and Trip Secure combo
                                                        </p>
                                                    </label>
                                                </div>

                                                <div className="fgderhsraerr text-center">
                                                    <button onClick={handleAllModalToggle} className="btn sgsfeqaedqrrr pb-2">View All Coupons</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* all coupon modal start */}

            <div className={`${allCouponModal ? "all-coupon-modal-backdrop" : "all-coupon-modal-backdrop all-coupon-modal-backdrop-hide"} position-fixed w-100 h-100 top-0 start-0 bottom-0 end-0`}></div>

            <div className={`${allCouponModal ? "all-coupon-modal" : "all-coupon-modal all-coupon-modal-hide"} d-flex flex-column bg-white top-0 bottom-0 px-4 py-3 position-fixed`}>
                <div className="all-coupon-modal-header d-flex align-items-center justify-content-between">
                    <h5 className="mb-0"><b>All Coupons</b></h5>

                    <i onClick={handleAllModalToggle} className="fa-solid fa-xmark"></i>
                </div>

                <div className="all-coupon-modal-body">
                    <div className="mt-3">
                        <div className="deiwhrwerwer position-relative mb-3">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter coupon code"
                                    value={selectedCoupon ? selectedCoupon : ""}
                                    onChange={() => setSelectedCoupon(null)}
                                    disabled={selectedCoupon ? true : false}
                                />  

                                <button onClick={() => setSelectedCoupon(null)} className={selectedCoupon ? "btn remove-coupon-btn position-absolute" : "btn position-absolute"}>{selectedCoupon ? "Remove" : "Apply"}</button>
                            </div>

                            {selectedCoupon && <p className="copn-msge my-2">Congratulations! Instant Discount of Rs. ₹229 has been applied successfully.</p>}                              
                        </div>                                            
                
                        <div className="deiwhrwerwer hjiejfriwejrwer pe-2">
                            <label htmlFor="c1" className="coupon-card">
                                <input type="radio" checked={selectedCoupon === "MMTTRAVEL"} onChange={() => handleSelectedModal("MMTTRAVEL")} name="ucfewfrew" id="c1" className="d-none position-absolute" />

                                <div className="coupon-top d-flex align-items-center justify-content-between mb-1">
                                    <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                        <img
                                            src="./images/discount.png"
                                            className="coupon-icon"
                                            alt=""
                                        />
                                        <strong className="frgrfg5559">MMTTRAVEL</strong>
                                    </div>

                                    <span className="discount">₹229 off</span>
                                </div>
                                <p className="desc mb-0">
                                    Log in to get up to 15% OFF.
                                    <br />
                                    Offer valid for new users only
                                </p>
                            </label>
                    
                            <label htmlFor="c2" className="coupon-card">
                                <input type="radio" checked={selectedCoupon === "MMTSECUREV"} onChange={() => handleSelectedModal("MMTSECUREV")} name="ucfewfrew" id="c2" className="d-none position-absolute" />

                                <div className="coupon-top d-flex align-items-center justify-content-between">
                                    <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                        <img
                                            src="./images/discount.png"
                                            className="coupon-icon"
                                            alt=""
                                        />
                                        <strong className="frgrfg5559">MMTSECUREV</strong>
                                    </div>
                                    <span className="discount">₹229 off</span>
                                </div>
                                <p className="desc mb-0">
                                    Get an instant discount of ₹229 on your flight booking
                                    <br />
                                    and Trip Secure combo
                                </p>
                            </label>

                            <label htmlFor="c3" className="coupon-card">
                                <input type="radio" checked={selectedCoupon === "MMTSECUREL"} onChange={() => handleSelectedModal("MMTSECUREL")} name="ucfewfrew" id="c3" className="d-none position-absolute" />

                                <div className="coupon-top d-flex align-items-center justify-content-between">
                                    <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                        <img
                                            src="./images/discount.png"
                                            className="coupon-icon"
                                            alt=""
                                        />
                                        <strong className="frgrfg5559">MMTSECUREL</strong>
                                    </div>
                                    <span className="discount">₹229 off</span>
                                </div>
                                <p className="desc mb-0">
                                    Get an instant discount of ₹229 on your flight booking
                                    <br />
                                    and Trip Secure combo
                                </p>
                            </label>

                            <label htmlFor="c4" className="coupon-card">
                                <input type="radio" checked={selectedCoupon === "MMTSECUREJ"} onChange={() => handleSelectedModal("MMTSECUREJ")} name="ucfewfrew" id="c4" className="d-none position-absolute" />

                                <div className="coupon-top d-flex align-items-center justify-content-between">
                                    <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                        <img
                                            src="./images/discount.png"
                                            className="coupon-icon"
                                            alt=""
                                        />
                                        <strong className="frgrfg5559">MMTSECUREJ</strong>
                                    </div>
                                    <span className="discount">₹ 229 off</span>
                                </div>
                                <p className="desc mb-0">
                                    Get an instant discount of ₹229 on your flight booking
                                    <br />
                                    and Trip Secure combo
                                </p>
                            </label>

                            <label htmlFor="c5" className="coupon-card">
                                <input type="radio" checked={selectedCoupon === "MMTSECURER"} onChange={() => handleSelectedModal("MMTSECURER")} name="ucfewfrew" id="c5" className="d-none position-absolute" />

                                <div className="coupon-top d-flex align-items-center justify-content-between">
                                    <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                        <img
                                            src="./images/discount.png"
                                            className="coupon-icon"
                                            alt=""
                                        />
                                        <strong className="frgrfg5559">MMTSECURER</strong>
                                    </div>
                                    <span className="discount">₹ 229 off</span>
                                </div>
                                <p className="desc mb-0">
                                    Get an instant discount of ₹229 on your flight booking
                                    <br />
                                    and Trip Secure combo
                                </p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* all coupon modal end */}
        </div>
    )
}