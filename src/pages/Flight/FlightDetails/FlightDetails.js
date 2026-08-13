import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./FlightDetails.css";
import http from "../../../http";
import Loader from "../../../component/Loader/Loader";
import { FlightSeats } from "./Components/FlightSeats";
import { AdultFields } from "./Components/AdultFields";
import { ChildFields } from "./Components/ChildFields";
import { InfantsFields } from "./Components/InfantsFields";
import { Meal } from "./Components/Meal";

export const FlightDetails = () => {
  const [loading, setLoading] = useState(false);
  const [imprtntInfoModal, setImprtntInfoModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [allCouponModal, setAllCouponModal] = useState(false);
  const [flightRePrice, setflightRePrice] = useState(null);
  const [ssrData, setSsrData] = useState(null);
  // eslint-disable-next-line
  // const [selectedBaggage, setSelectedBaggage] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const [selectedSSR, setSelectedSSR] = useState({});
  // eslint-disable-next-line
  const [selectedMeal, setSelectedMeal] = useState(null);
  // eslint-disable-next-line
  const [selectedSeat, setSelectedSeat] = useState(null);
  // eslint-disable-next-line
  const { flightId } = useParams();
  const location = useLocation();

  const storedData = sessionStorage.getItem(
    `flightDetails_${flightId}`
  );

  const state = location.state || (
    storedData ? JSON.parse(storedData) : null
  );

  const search_key = state?.search_key;
  const flight = state?.flight;
  const fareId = state?.fareId;

  const adults = state?.adults;
  const children = state?.children;
  const infants = state?.infants;

  const adultCount = adults || 1;
  const childCount = children || 0;
  const infantCount = infants || 0;


  const [fareRuleModal, setFareRuleModal] = useState(false);
  const [activeTab, setActiveTab] = useState("cancel");

  const [addBaggageModal, setAddBaggageModal] = useState(false);
  const [countryCode, setCountryCode] = useState([]);

  const [showGST, setShowGST] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [companyName, setcompanyName] = useState("");

  const [showCabinBaggage, setShowCabinBaggage] = useState(false);
  const [showCheckinBaggage, setShowCheckinBaggage] = useState(false);

  const [seatMap, setSeatMap] = useState([]);
  const [showSeatMealSection, setShowSeatMealSection] = useState(false);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        setLoading(true);

        const response = await http.get("/fetch-countries-code");

        setCountryCode(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryCode();
  }, []);


  useEffect(() => {
    // console.log("useEffect triggered", {
    //   fareId,
    //   search_key,
    //   flightKey: flight?.Flight_Key,
    // });

    const fetchFlightDetails = async () => {
      // console.log("fetchFlightDetails called");

      try {
        setLoading(true);

        const [repriceRes, ssrRes] = await Promise.all([
          http.post("/flight-reprice-details", {
            fare_id: fareId,
            search_key,
            Flight_Key: flight.Flight_Key,
          }),
          http.post("/flight-get-ssr", {
            search_key,
            Flight_Key: flight.Flight_Key,
          }),
        ]);

        // console.log(repriceRes.data);
        // console.log(ssrRes.data);

        setflightRePrice(repriceRes.data.rePriceDetails);
        setSsrData(ssrRes.data.ssrDetails.SSRFlightDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (fareId && search_key && flight?.Flight_Key) {
      fetchFlightDetails();
    } else {
      console.log("Missing values");
    }
  }, [fareId, search_key, flight?.Flight_Key]);

  const parseDate = (dateStr) => {
    if (!dateStr) return null;

    const [datePart, timePart] = dateStr.split(" ");
    const [month, day, year] = datePart.split("/");

    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  useEffect(() => {
    const html = document.querySelector("html");

    imprtntInfoModal
      ? html.classList.add("overflow-hidden")
      : html.classList.remove("overflow-hidden");

    return () => {
      html.classList.remove("overflow-hidden");
    };
  }, [imprtntInfoModal]);
  // eslint-disable-next-line
  const handleImprtntInfoModalToggle = () => {
    setImprtntInfoModal((prev) => !prev);
  };

  const handleSelectedModal = (value) => {
    setSelectedCoupon((prev) => (prev === value ? null : value));
  };

  useEffect(() => {
    const html = document.querySelector("html");

    allCouponModal
      ? html.classList.add("overflow-hidden")
      : html.classList.remove("overflow-hidden");

    return () => {
      html.classList.remove("overflow-hidden");
    };
  }, [allCouponModal]);

  const handleAllModalToggle = () => {
    setAllCouponModal((prev) => !prev);
  };

  const repriceFlight = flightRePrice?.AirRepriceResponses?.[0]?.Flight;

  const fare = repriceFlight?.Fares?.[0];

  const allfareDetails = fare?.FareDetails || [];

  const fareDetail = fare?.FareDetails?.[0];

  const segment = repriceFlight?.Segments?.[0];
  // const cancellationCharges = fareDetail?.CancellationCharges || [];

  const paxRules = flightRePrice?.AirRepriceResponses?.[0]?.Required_PAX_Details || [];

  const cancellationCharges = (() => {
  const grouped = {};

  allfareDetails.forEach((passenger) => {
    const passengerFare = Number(passenger.Total_Amount || 0);

    (passenger.CancellationCharges || []).forEach((charge) => {
      const key = [
        charge.DurationFrom,
        charge.DurationTo,
        charge.DurationTypeFrom,
        charge.DurationTypeTo,
      ].join("-");

      if (!grouped[key]) {
        grouped[key] = {
          ...charge,
          totalValue: 0,
        };
      }

      let penalty = 0;

      if (charge.ValueType === 1) {
        // Percentage based cancellation charge
        penalty =
          (passengerFare * Number(charge.Value || 0)) / 100;
      } else {
        // Fixed amount
        penalty = Number(charge.Value || 0);
      }

      grouped[key].totalValue += penalty;
    });
  });

  return Object.values(grouped);
})();

// eslint-disable-next-line
  const formatTotalPenalty = (item) => {
    return `₹${Number(item.totalValue || 0).toLocaleString("en-IN")}`;
  };

  const adultRule = paxRules.find(
    x => Number(x?.Pax_type) === 0
  );

  const childRule = paxRules.find(
    x => Number(x?.Pax_type) === 1
  );

  const infantRule = paxRules.find(
    x => Number(x?.Pax_type) === 2
  );

  const emptyPassenger = {
    // Basic details
    title: "Mr",
    firstName: "",
    lastName: "",
    gender: "",

    // Contact
    countryCode: "+91",
    mobile: "",
    email: "",

    // Date / age
    dob: "",
    age: "",

    // Nationality
    nationality: "",

    // Passport
    passportNumber: "",
    passportCountry: "",
    passportExpiry: "",

    // PAN
    panCardNo: "",

    // ID proof
    idProofNumber: "",

    // Student
    studentId: "",

    // Defence
    defenceServiceId: "",
    defenceIssueDate: "",
    defenceExpiryDate: "",

    // SSR
    mandatorySSR: "",

    // Frequent flyer
    airline: "",
    ffNumber: "",
    showFF: false,
  };

  const [adultForms, setAdultForms] = useState([]);
  const [childForms, setChildForms] = useState([]);
  const [infantForms, setInfantForms] = useState([]);

  const handleAddAdult = () => {
    if (adultForms.length >= adultCount) {
      return;
    }

    setAdultForms(prev => [
      ...prev,
      {
        ...emptyPassenger,
      },
    ]);
  };

  const handleRemoveAdult = (index) => {
    setAdultForms(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleAdultChange = (index, field, value) => {
    setAdultForms(prev =>
      prev.map((passenger, i) =>
        i === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger
      )
    );
  };

  const handleAddChild = () => {
    if (childForms.length >= childCount) {
      return;
    }

    setChildForms(prev => [
      ...prev,
      {
        ...emptyPassenger,
      },
    ]);
  };

  const handleRemoveChild = (index) => {
    setChildForms(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleChildChange = (index, field, value) => {
    setChildForms(prev =>
      prev.map((passenger, i) =>
        i === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger
      )
    );
  };

  const handleAddInfant = () => {
    if (infantForms.length >= infantCount) {
      return;
    }

    setInfantForms(prev => [
      ...prev,
      {
        ...emptyPassenger,
      },
    ]);
  };

  const handleRemoveInfant = (index) => {
    setInfantForms(prev =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleInfantChange = (index, field, value) => {
    setInfantForms(prev =>
      prev.map((passenger, i) =>
        i === index
          ? {
              ...passenger,
              [field]: value,
            }
          : passenger
      )
    );
  };

  const toggleFF = (type, index) => {
    if (type === "adult") {
        const data = [...adultForms];
        data[index].showFF = !data[index].showFF;
        setAdultForms(data);
    }
    if (type === "child") {
        const data = [...childForms];
        data[index].showFF = !data[index].showFF;
        setChildForms(data);
    }
    if (type === "infant") {
        const data = [...infantForms];
        data[index].showFF = !data[index].showFF;
        setInfantForms(data);
    }
  };

  const [saveBilling, setSaveBilling] = useState(false);

  const handlePassengerDetails = async () => {
    if (!saveBilling) {
      return;
    }

    setLoading(true);
    try {
      const passengerDetails = {
        adults: adultForms,
        children: childForms,
        infants: infantForms,
        gst: {
          enabled: showGST,
          gstNumber: showGST ? gstNumber : "",
          companyName: showGST ? companyName : "",
        },
      };
      const requestData = {
        adults: adultForms,
        children: childForms,
        infants: infantForms,
        gst_number: showGST ? gstNumber : "",
        company_name: showGST ? companyName : "",
        flight_key: repriceFlight?.Flight_Key || "",
        search_key: search_key || "",
      };

      const response = await http.post(
        "/get-seatMap-details",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data.data;

      setSeatMap(responseData.AirSeatMaps);

      if (
        response.status >= 200 &&
        response.status < 300
      ) {
         setShowSeatMealSection(true);
        localStorage.setItem(
          "savedPassengerDetails",
          JSON.stringify(passengerDetails)
        );
      }

    } catch (error) {
      console.error(
        "Passenger API error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const travelDate = repriceFlight?.TravelDate
    ? new Date(repriceFlight.TravelDate)
    : null;

  const formattedDate =
    travelDate?.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }) || "";

  const segments = repriceFlight?.Segments || [];

  const formatPenalty = (item) => {

      if (item.ValueType === 1) {
          return `${item.Value}%`;
      }

      return `₹ ${Number(item.Value).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) =>
      date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
      });

  const formatTime = (date) =>
      date.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
      });

  const getBoundaryDate = (item) => {

      const [datePart, timePart] = segment.Departure_DateTime.split(" ");

      const [month, day, year] = datePart.split("/");

      const departure = new Date(`${year}-${month}-${day}T${timePart}`);

      const d = new Date(departure);

      if (item.DurationTypeTo === 0) {
          d.setHours(d.getHours() - item.DurationTo);
      } else {
          d.setDate(d.getDate() - item.DurationTo);
      }

      return d;
  };

  //   const firstSegment = segments[0];
  //   const lastSegment = segments[segments.length - 1];

  const stops = Math.max(0, segments.length - 1);
  const departureDate = parseDate(segment?.Departure_DateTime);
  const arrivalDate = parseDate(segment?.Arrival_DateTime);
  const totalMinutes = Math.floor((arrivalDate - departureDate) / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const totalDuration = `${hours}h ${minutes}m`;

  const excludedTypes = ["SEAT", "COMPLIMENTORY_MEALS", "MEALS"];

  const baggageList =
    ssrData?.[0]?.SSRDetails?.filter(
      (item) => !excludedTypes.includes(item.SSR_TypeName),
    ) || [];

  const handleSelectSSR = (item) => {
    setSelectedSSR((prev) => ({
      ...prev,
      [item.SSR_TypeName]: item,
    }));
  };

  const handleRemoveSSR = (type) => {
    setSelectedSSR((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const adultFare = allfareDetails.find(
    (item) => item.PAX_Type === 0
  );

  const childFare = allfareDetails.find(
    (item) => item.PAX_Type === 1
  );

  const infantFare = allfareDetails.find(
    (item) => item.PAX_Type === 2
  );

  // Base fare
  const baseFare = allfareDetails.reduce(
    (total, item) => total + Number(item.Basic_Amount || 0),
    0
  );

  // Taxes
  const taxesAndSurcharges = allfareDetails.reduce(
    (total, item) => total + Number(item.AirportTax_Amount || 0),
    0
  );

  // Total
  const totalAmount = allfareDetails.reduce(
    (total, item) => total + Number(item.Total_Amount || 0),
    0
  );

  console.log(seatMap, 'seatMap');


  if (loading) return <Loader />;

  return (
    <div className="sdfsdf655 flight-details-wrapper">
      <div className="container">
        <div className="asfdgsqwe">
          <ul className="ps-0 d-flex align-items-center gap-3">
            <li className="active">Flights</li>

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
                    <div className="flight-header mb-3">
                      <div className="ciuajmcokzxc d-flex gap-2 align-items-center">
                        <img
                          src={`https://images.kiwi.com/airlines/64/${segment?.Airline_Code}.png`}
                          className="airline-logo m-0"
                          alt=""
                          onError={(e) => {
                            e.target.src = "./images/indigo.png";
                          }}
                        />

                        <div>
                          <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
                            {segment?.Origin_City.replace(/\s*\(.*?\)/g, "")}

                            <img
                              src="/images/planesmallicon.png"
                              width={25}
                              alt=""
                            />

                            {segment?.Destination_City.replace(
                              /\s*\(.*?\)/g,
                              "",
                            )}
                          </h5>

                          <p className="mb-0">
                            <span>{formattedDate} ·</span>

                            <span>
                              <span
                                style={{ color: "var(--blue-primary-color)" }}
                              >
                                {" "}
                                {stops === 0
                                  ? "Non Stop"
                                  : `${stops} Stop`}{" "}
                                ·{" "}
                              </span>
                              {totalDuration}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="diwehidmsad d-flex flex-column text-end gap-1">
                        {fareDetail?.CancellationCharges?.length > 0 && (
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-lightning-charge-fill"></i>{" "}
                            Cancellation Charges Apply
                          </span>
                        )}

                        <button
                          type="button"
                          className="btn btn-link p-0"
                          onClick={() => setFareRuleModal(true)}
                        >
                          View Fare Rules{" "}
                          <i className="fa-solid ms-1 fa-angle-right"></i>
                        </button>
                      </div>
                    </div>

                    {/* AIRLINE */}
                    <div className="flight-segments">
                      {segments?.map((segment, index) => {
                        const departure = new Date(
                          parseDate(segment.Departure_DateTime),
                        );
                        const arrival = new Date(
                          parseDate(segment.Arrival_DateTime),
                        );

                        const departureTime = departure.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        const arrivalTime = arrival.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        const totalMinutes = Math.floor(
                          (arrival - departure) / (1000 * 60),
                        );

                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;

                        const totalDuration = `${hours}h ${minutes}m`;

                        return (
                          <div key={index}>
                            <div className="flight-card mb-3 py-3 px-2">
                              <div className="icsnduhh row">
                                <div className="col-1">
                                  <div className="gfjh55 text-start">
                                    <span>
                                      <img
                                        src={`https://images.kiwi.com/airlines/64/${segment.Airline_Code}.png`}
                                        width={45}
                                        alt=""
                                        className="mb-2"
                                      />

                                      <h6 className="mb-0">
                                        {segment.Airline_Name}
                                      </h6>

                                      <small
                                        style={{
                                          color:
                                            "var(--light-highlighted-text-color)",
                                        }}
                                      >
                                        {segment.Airline_Code}{" "}
                                        {segment.Flight_Number}
                                      </small>
                                    </span>
                                  </div>
                                </div>

                                <div className="col-11">
                                  <div className="time-wrapper d-flex justify-content-between gap-4 px-4">
                                    <div className="pt-1">
                                      <h5 className="mb-1">{departureTime}</h5>

                                      <span className="udnehnewr">
                                        <p className="fw-semibold mb-0 d-flex flex-column gap-1">
                                          <span>{segment.Origin_City}</span>
                                        </p>

                                        <small
                                          style={{
                                            fontWeight: 500,
                                            color:
                                              "var(--light-highlighted-text-color)",
                                          }}
                                        >
                                          Terminal{" "}
                                          {segment.Origin_Terminal || "-"}
                                        </small>
                                      </span>
                                    </div>

                                    <div className="duration-wrapper flex-fill text-center">
                                      <small className="dyusbnbsdhfc ufsidnfijsdfsdf">
                                        <i className="bi bi-clock"></i>{" "}
                                        {totalDuration}
                                      </small>

                                      <div className="dinsjihfnsidhfsdf d-flex align-items-center justify-content-center position-relative my-3">
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

                                      <small className="dyusbnbsdhfc px-3 stop-info">
                                        {segment.Aircraft_Type}
                                      </small>
                                    </div>

                                    <div className="text-end pt-1">
                                      <h5 className="mb-1">{arrivalTime}</h5>

                                      <span className="udnehnewr">
                                        <p className="fw-semibold mb-0 d-flex flex-column gap-1">
                                          <span>
                                            {segment.Destination_City}
                                          </span>
                                        </p>

                                        <small
                                          style={{
                                            fontWeight: 500,
                                            color:
                                              "var(--light-highlighted-text-color)",
                                          }}
                                        >
                                          Terminal{" "}
                                          {segment.Destination_Terminal || "-"}
                                        </small>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Layover */}

                            {index < segments.length - 1 &&
                              (() => {
                                const currentArrival = new Date(
                                  parseDate(segment.Arrival_DateTime),
                                );

                                const nextDeparture = new Date(
                                  parseDate(
                                    segments[index + 1].Departure_DateTime,
                                  ),
                                );

                                const diff =
                                  (nextDeparture - currentArrival) / 1000 / 60;

                                const hrs = Math.floor(diff / 60);

                                const mins = diff % 60;

                                return (
                                  <div className="layover-box mb-3">
                                    Change of plane at
                                    <strong> {segment.Destination_City}</strong>
                                    <br />
                                    Layover :
                                    <strong>
                                      {" "}
                                      {hrs}h {mins}m
                                    </strong>
                                  </div>
                                );
                              })()}
                          </div>
                        );
                      })}
                    </div>
                    {/* NOTICE */}

                      {/* ==============================
                          BAGGAGE SUMMARY
                      ================================ */}

                      <div
                        className="baggage-summary px-3 py-2"
                        style={{
                          background: "#f5f5f5",
                          borderBottom: "1px solid #ddd",
                          position: "relative",
                        }}
                      >
                        <div className="d-flex align-items-center gap-4 flex-wrap">

                          {/* ================= CABIN BAGGAGE ================= */}

                          <div
                            className="d-flex align-items-center position-relative"
                            style={{ cursor: "pointer" }}
                          >
                            <span className="me-2" style={{ fontSize: "18px" }}>
                              🧳
                            </span>

                            <span>
                              <strong>Cabin Baggage:</strong>{" "}
                              {adultFare?.Free_Baggage?.Hand_Baggage || "7 Kgs"}{" "}
                              / Adult
                            </span>

                            <i
                              className="fa-regular fa-circle-question ms-1 text-primary"
                              onClick={() =>
                                setShowCabinBaggage((prev) => !prev)
                              }
                            ></i>


                            {/* CABIN BAGGAGE POPUP */}

                            {showCabinBaggage && (
                              <div
                                className="baggage-info-popup"
                                style={{
                                  position: "absolute",
                                  top: "32px",
                                  left: "0",
                                  width: "260px",
                                  background: "#fff",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                                  zIndex: 9999,
                                }}
                              >

                                <div
                                  className="px-3 py-3"
                                  style={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    borderBottom: "1px solid #ddd",
                                  }}
                                >
                                  Cabin Baggage
                                </div>


                                {/* Adult */}

                                <div
                                  className="px-3 py-3 d-flex justify-content-between"
                                  style={{
                                    borderBottom: "1px solid #ddd",
                                  }}
                                >
                                  <strong>Adult</strong>

                                  <span>
                                    {adultFare?.Free_Baggage?.Hand_Baggage
                                      ? ` ${adultFare.Free_Baggage.Hand_Baggage} (1 piece only)`
                                      : "0 Kg"}{" "}
                                    / Adult
                                  </span>
                                </div>


                                {/* Child */}

                                {childFare && (
                                  <div
                                    className="px-3 py-3 d-flex justify-content-between"
                                    style={{
                                      borderBottom: "1px solid #ddd",
                                    }}
                                  >
                                    <strong>Child</strong>

                                    <span>
                                       {childFare?.Free_Baggage?.Hand_Baggage
                                          ? ` ${childFare.Free_Baggage.Hand_Baggage} (1 piece only)`
                                          : "0 Kg"}{" "}
                                        / Child
                                    </span>
                                  </div>
                                )}


                                {/* Infant */}

                                {infantFare && (
                                  <div
                                    className="px-3 py-3 d-flex justify-content-between"
                                  >
                                    <strong>Infant </strong>

                                    <span>
                                      {infantFare?.Free_Baggage?.Hand_Baggage
                                          ? ` ${infantFare.Free_Baggage.Hand_Baggage} (1 piece only)`
                                          : "0 Kg"}{" "}
                                        / Infant
                                    </span>
                                  </div>
                                )}

                              </div>
                            )}

                          </div>


                          {/* ================= CHECK-IN BAGGAGE ================= */}

                          <div
                            className="d-flex align-items-center position-relative"
                            style={{ cursor: "pointer" }}
                          >

                            <span className="me-2" style={{ fontSize: "18px" }}>
                              🧳
                            </span>

                            <span>
                              <strong>Check-In Baggage:</strong>{" "}
                              {adultFare?.Free_Baggage?.Check_In_Baggage
                                ? ` ${adultFare.Free_Baggage.Check_In_Baggage}`
                                : "0 Kg"}{" "}
                              / Adult
                            </span>

                            <i
                              className="fa-regular fa-circle-question ms-1 text-primary"
                              onClick={() =>
                                setShowCheckinBaggage((prev) => !prev)
                              }
                            ></i>


                            {/* CHECK-IN BAGGAGE POPUP */}

                            {showCheckinBaggage && (
                              <div
                                className="baggage-info-popup"
                                style={{
                                  position: "absolute",
                                  top: "32px",
                                  left: "0",
                                  width: "280px",
                                  background: "#fff",
                                  border: "1px solid #ddd",
                                  borderRadius: "4px",
                                  boxShadow: "0 3px 10px rgba(0,0,0,0.18)",
                                  zIndex: 9999,
                                }}
                              >

                                <div
                                  className="px-3 py-3"
                                  style={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    borderBottom: "1px solid #ddd",
                                  }}
                                >
                                  Check-In Baggage
                                </div>


                                {/* Adult */}

                                <div
                                  className="px-3 py-3 d-flex justify-content-between"
                                  style={{
                                    borderBottom: "1px solid #ddd",
                                  }}
                                >
                                  <strong>Adult</strong>

                                  <span>
                                    {adultFare?.Free_Baggage?.Check_In_Baggage
                                      ? ` ${adultFare.Free_Baggage.Check_In_Baggage} (1 piece only)`
                                      : "0 Kg"}{" "}
                                    / Adult
                                  </span>
                                </div>


                                {/* Child */}

                                {childFare && (
                                  <div
                                    className="px-3 py-3 d-flex justify-content-between"
                                    style={{
                                      borderBottom: "1px solid #ddd",
                                    }}
                                  >
                                    <strong>Child</strong>

                                    <span>
                                      {childFare?.Free_Baggage?.Check_In_Baggage
                                          ? ` ${childFare.Free_Baggage.Check_In_Baggage} (1 piece only)`
                                          : "0 Kg"}{" "}
                                        / Child
                                    </span>
                                  </div>
                                )}


                                {/* Infant */}

                                {infantFare && (
                                  <div
                                    className="px-3 py-3 d-flex justify-content-between"
                                  >
                                    <strong>Infant</strong>

                                    <span>
                                      {infantFare?.Free_Baggage?.Check_In_Baggage
                                          ? ` ${infantFare.Free_Baggage.Check_In_Baggage} (1 piece only)`
                                          : "0 Kg"}{" "}
                                        / Infant
                                    </span>
                                  </div>
                                )}

                              </div>
                            )}

                          </div>

                        </div>
                      </div> 


                    {baggageList.length > 0 ? (
                      <div className="notice p-3">
                        <div className="jianjdlkmjosdjif d-flex gap-3 align-items-center">
                          <span className="rounded-pill text-center">
                            <i className="bi bi-backpack3-fill"></i>
                          </span>

                          <span>
                            <b>Got excess baggage?</b> <br /> Don't stress, buy
                            extra check-in baggage allowance
                          </span>
                        </div>

                        <button
                          className="add-baggage-flight btn-tour px-3"
                          onClick={() => setAddBaggageModal((prev) => !prev)}
                        >
                          ADD BAGGAGE{" "}
                          <i className="fa-solid ms-1 fa-angle-right"></i>
                        </button>
                      </div>
                    ) : (
                      <div className="notice p-3">
                        <div className="jianjdlkmjosdjif d-flex gap-3 align-items-center">
                          <span className="rounded-pill text-center">
                            <i className="bi bi-backpack3-fill"></i>
                          </span>

                          <span>
                            Sorry, extra check-in baggage allowance details are
                            currently not available from the airline for{" "}
                            {repriceFlight?.Origin} -{" "}
                            {repriceFlight?.Destination}.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* POLICY */}
                    <div className="policy-box">

                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <strong>Cancellation & Date Change Policy</strong>

                            <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => setFareRuleModal(true)}
                            >
                                View Policy
                            </button>
                        </div>

                        <div className="mb-3 fw-semibold">
                            {flight?.Origin}-{flight?.Destination}
                        </div>

                        {/* Penalty */}

                        <div className="timeline penalty-row">

                            <div className="timeline-item first"></div>
                            {cancellationCharges.map((item, index) => (
                                <div className="timeline-item" key={index} style={{textAlign: "left"}}>
                                    <strong>{formatPenalty(item)}</strong>
                                </div>
                            ))}
                        </div>

                        {/* Progress */}

                        <div className="progress-wrapper">

                            <div className="progress-line"></div>

                            {cancellationCharges.map((_, index) => (
                                <div className="dot" key={index}></div>
                            ))}

                        </div>

                        {/* Dates */}

                        <div className="timeline mt-2">

                            <div className="timeline-item first">
                                <strong>Now</strong>
                            </div>

                            {cancellationCharges.map((item, index) => {

                                const dt = getBoundaryDate(item);

                                return (
                                    <div className="timeline-item" key={index}>

                                        <strong>{formatDate(dt)}</strong>

                                        <br />

                                        <small>{formatTime(dt)}</small>

                                    </div>
                                );

                            })}

                        </div>
                    </div>
                  </div>
                </div>

                {/* Free Date Change Section */}
                <div className="sdbfsdhfsd">
                  <div className="dsbfsd">
                    <h6 className="mb-3">
                      <b>Unsure of your travel plans?</b> Get full flexibility
                      with our special add-ons
                    </h6>
                  </div>

                  <div className="dfbsdfgsdf">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="fgsdfsdf align-items-center mb-2">
                          <div className="dfsdf">
                            <h6 className="mb-0">Free Date Change</h6>
                          </div>

                          <div className="fsdf rounded-pill px-2 py-1">
                            Free Date Change Included
                          </div>
                        </div>

                        <div className="dfsdfsdf">
                          <p className="mb-0">
                            <span className="fsdfdsf">
                              Great! Save up to ₹ 3349{" "}
                            </span>{" "}
                            on date change charges up to 3 hours before
                            departure. You just pay the fare difference!{" "}
                            <span
                              style={{ color: "var(--blue-primary-color)" }}
                            >
                              View T&C
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-2">
                        <div className="fsdfsdfsd fghdzgsd text-center">
                          <img src="/images/hfggdf.png" alt="" />

                          <div className="dfgbdfgdf">
                            <h4 className="mb-0">₹ 391</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="fgdfgdfg">
                  <div className="sdfgsdf">
                    <h5 className="mb-3">
                      <span className="me-3 text-center">
                        <i class="fa-solid fa-info"></i>
                      </span>
                      Important Information
                    </h5>
                  </div>

                  <div className="bdfsdf855e">
                    {[1, 2, 3].map((_, idx) => (
                      <div className="dfgf555 p-3" key={idx}>
                        <div className="d-flex gap-4">
                          <div className="sdfsdf text-center rounded-circle">
                            <i className="bi bi-suitcase"></i>
                          </div>

                          <div className="dfxgbdczdcd position-relative px-3">
                            <h6 className="mb-2">
                              Check travel guidelines and baggage information
                              below:
                            </h6>
                            <p className="mb-0">
                              Carry no more than 1 check-in baggage and 1 hand
                              baggage per passenger. If violated, airline may
                              levy extra charges.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trip Secure */}
                <div className="fgdfg584d">
                  <div className="trip-card">
                    {/* Header */}
                    <div className="dgdfgdfgdf">
                      <div className="dfsdfds555f mb-3">
                        <span className="d-block position-relative me-3">
                          <i className="fa-solid position-absolute top-50 start-50 translate-middle fa-shield-halved"></i>
                        </span>

                        <div className="doijhsdksdf">
                          <h5 className="mb-1">Trip Secure</h5>

                          {/* Price */}
                          <div className="isfjsofoksdf">
                            <span className="price">₹ 299</span>{" "}
                            <span className="small-text">
                              / Traveller (18% GST included)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="dfgbdfhgdfg">
                        <img src="/images/asdc.png" alt="" />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="sdnhfsdsdfsdf">
                      <div className="row">
                        <div className="col-lg-10">
                          <div className="dfgd5465">
                            <div className="row">
                              <div className="col-lg-4">
                                <label
                                  htmlFor="247s"
                                  className="dfsdf5855 position-relative text-center p-3 mb-0"
                                >
                                  <span className="idneisdf stop-info d-block position-absolute">
                                    Most Popular
                                  </span>

                                  <input
                                    id="247s"
                                    className="d-none position-absolute"
                                    type="checkbox"
                                  />

                                  <h6 className="mb-0">
                                    <span>24x7</span> Support
                                  </h6>

                                  <div className="ssd8984e p-2">
                                    <img src="/images/24-hours.png" alt="" />
                                  </div>

                                  <p className="mb-0">
                                    Delayed/lost baggage Assistance
                                  </p>
                                </label>
                              </div>

                              <div className="col-lg-4">
                                <label
                                  htmlFor="flt1"
                                  className="dfsdf5855 text-center p-3 mb-0"
                                >
                                  <input
                                    id="flt1"
                                    className="d-none position-absolute"
                                    type="checkbox"
                                  />

                                  <h6 className="mb-0">
                                    Flat <span> ₹ 50,000</span>
                                  </h6>

                                  <div className="ssd8984e p-2">
                                    <img src="/images/worker.png" alt="" />
                                  </div>

                                  <p className="mb-0">
                                    Delayed/lost baggage Assistance
                                  </p>
                                </label>
                              </div>

                              <div className="col-lg-4">
                                <label
                                  htmlFor="flt2"
                                  className="dfsdf5855 text-center p-3 mb-0"
                                >
                                  <input
                                    id="flt2"
                                    className="d-none position-absolute"
                                    type="checkbox"
                                  />

                                  <h6 className="mb-0">
                                    Flat <span> ₹ 2,000</span>
                                  </h6>

                                  <div className="ssd8984e p-2">
                                    <img src="/images/luggage.png" alt="" />
                                  </div>

                                  <p className="mb-0">
                                    Delayed/lost baggage Assistance
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div className="sdnsdjsd h-100 text-center">
                            <span className="kfjsoijfosd position-relative d-block text-center mb-3">
                              <i className="bi position-absolute top-50 start-50 translate-middle bi-gift"></i>
                            </span>

                            <p className="mb-0">
                              View All Benefits{" "}
                              <i className="fa-solid fa-right-long"></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="recommend d-flex align-items-center justify-content-between mt-3 p-0">
                      <div className="duiewhruiwerwer d-flex align-items-center gap-3 p-3">
                        <span className="d-inline-block position-relative">
                          <i className="bi position-absolute top-50 start-50 translate-middle bi-shield-check"></i>
                        </span>

                        <div className="dikwenfiswf">
                          <h6 className="mb-1">
                            Recommended for your travel within India
                          </h6>

                          <p className="mb-0">
                            Travel worthy-free with Trip Secure.
                          </p>
                        </div>
                      </div>

                      <img src="/images/dasa.png" className="h-100" alt="" />
                    </div>

                    {/* Radio Buttons */}
                    <div className="uidnweuyd mt-4 mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="trip"
                          id="yes"
                        />
                        <label className="form-check-label" htmlFor="yes">
                          Yes, Secure my trip.
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="trip"
                          id="no"
                        />
                        <label className="form-check-label" htmlFor="no">
                          No, I will book without trip secure.
                        </label>
                      </div>
                    </div>

                    {/* Reviews */}
                    {/* <div className="duicssd mt-4">
                      <p className="mb-0">
                        <i className="fa-solid me-1 fa-heart"></i> Preferred by millions of travellers
                      </p>

                      <div className="row mt-3 g-3">
                        <div className="col-md-6 mt-0">
                          <div className="review-box">
                            "Your willingness to go above and beyond made a big
                            difference."
                            <br />
                            <small>- Amit Paul</small>
                          </div>
                        </div>

                        <div className="col-md-6 mt-0">
                          <div className="review-box">
                            "Claim settlement was incredibly fast. Smooth
                            experience."
                            <br />
                            <small>- Prateek Keshari</small>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Footer */}
                    <p className="mb-0 small-text d-flex align-items-center">
                      <i className="bi me-2 bi-shield-exclamation"></i> Trip
                      Secure is non-refundable. By selecting it, you confirm all
                      travelers are Indian nationals.
                    </p>
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
                        <div className="fw-bold" style={{ fontSize: "18px" }}>
                          Akasa Priority @ Just ₹ 875
                        </div>

                        {/* Subtitle */}
                        <div className="text-muted small mb-2">
                          Skip queues, get your bags first, and board early with
                          Akasa Priority.
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
                    <button className="btn btn-outline-primary rounded-pill px-4">
                      +ADD
                    </button>
                  </div>
                </div>

                {/* Traveller Details */}
                <div className="huikgh56">
                  <div className="card-box">
                    <h5 className="mb-3">Traveller Details</h5>

                    {/* Login Box */}
                    <div className="login-box mb-3">
                      <span>
                        🔒 Log in to view your saved traveller list, unlock
                        amazing deals & much more!
                      </span>
                      <a href="/">LOGIN NOW</a>
                    </div>

                    

                    {/* Adult Section */}
                    {/* <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="section-title">👤 ADULT (12 yrs+)</div>
                      <small>0/1 added</small>
                    </div> */}

                    {/* Important */}
                    {/* <div className="important-box mb-3">
                      <strong>Important:</strong> Enter name as mentioned on
                      your passport or Government approved IDs.
                    </div> */}

                    {/* Add Adult */}
                    {/* <div className="add-box mb-4">
                      <p className="mb-2">
                        You have not added any adults to the list
                      </p>
                      <a
                        href="/"
                        className="add-link"
                        onClick={() => alert("Add adult functionality")}
                      >
                        + ADD NEW ADULT
                      </a>
                    </div> */}

                    {/* =========================
                          ADULT SECTION
                    ========================= */}

                    <div className="card-box">

                      <div className="d-flex justify-content-between align-items-center mb-2">

                        <div className="section-title">
                          👤 ADULT (12 yrs+)
                        </div>

                        <small>
                          {adultForms.length}/{adultCount} added
                        </small>

                      </div>

                      <div className="important-box mb-3">

                        <strong>Important:</strong>

                        Enter name as mentioned on your passport or Government approved IDs.

                        <br />

                        Please ensure that the Frequent Flyer No entered here is against the
                        same passenger name otherwise the points will not be updated by the
                        airline.

                      </div>

                      {/* Adult Forms */}

                      {adultForms.map((adult, index) => (

                        <div className="border rounded mb-3" key={index}>

                          <div className="d-flex justify-content-between align-items-center p-3 bg-light">

                            <div>

                              <input
                                type="checkbox"
                                checked
                                readOnly
                                className="form-check-input me-2"
                              />

                              <strong>
                                ADULT {index + 1}
                              </strong>

                            </div>

                            <button
                              className="btn btn-sm btn-link text-danger text-decoration-none"
                              onClick={() => handleRemoveAdult(index)}
                            >
                              ×
                            </button>

                          </div>

                          <div className="p-3">

                            {/* <div className="row g-3"> */}
                                <AdultFields
                                  adult={adult}
                                  index={index}
                                  countryCode={countryCode}
                                  adultRule={adultRule}
                                  handleAdultChange={handleAdultChange}
                                />
                            {/* </div> */}

                            {/* Frequent Flyer */}

                            <div className="mt-3">

                              <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => toggleFF("adult", index)}
                              >
                                <strong>
                                  Frequent Flyer Number
                                </strong>

                                <small className="ms-1">
                                  (Avail extra benefits & earn points)
                                </small>
                              </button>

                            </div>

                            {adult.showFF && (

                              <div className="row mt-2">

                                <div className="col-md-4">

                                  <label>Frequent Flyer Airline</label>

                                  <select
                                    className="form-select"
                                    value={adult.airline}
                                    onChange={(e) =>
                                      handleAdultChange(index, "airline", e.target.value)
                                    }
                                  >

                                    <option value="">
                                      Select Airline
                                    </option>

                                    <option value="AI">
                                      Air India
                                    </option>

                                    <option value="6E">
                                      IndiGo
                                    </option>

                                    <option value="UK">
                                      Vistara
                                    </option>

                                  </select>

                                </div>

                                <div className="col-md-4">

                                  <label>Frequent Flyer No</label>

                                  <input
                                    className="form-control"
                                    value={adult.ffNumber}
                                    onChange={(e) =>
                                      handleAdultChange(index, "ffNumber", e.target.value)
                                    }
                                  />

                                </div>

                              </div>

                            )}

                          </div>

                        </div>

                      ))}

                      {/* Empty Message */}

                      {adultForms.length === 0 && (

                        <div className="add-box mb-3">

                          <p>
                            You have not added any adults to the list
                          </p>

                        </div>

                      )}

                      {/* Add Adult */}

                      {adultForms.length < adultCount ? (

                        <button
                          className="btn btn-link p-0"
                          onClick={handleAddAdult}
                        >
                          + ADD NEW ADULT
                        </button>

                      ) : (

                        <div className="alert alert-warning mt-3 mb-0">

                          You have already selected <strong>{adultCount}</strong> ADULT(s).

                          Remove one before adding a new one.

                        </div>

                      )}

                    </div>

                    {/* =========================
                            CHILD SECTION
                      ========================= */}

                      {childCount > 0 && (
                        <div className="card-box mt-4">

                          <div className="d-flex justify-content-between align-items-center mb-2">

                            <div className="section-title">
                              👦 CHILD (2 - 12 yrs)
                            </div>

                            <small>
                              {childForms.length}/{childCount} added
                            </small>

                          </div>

                          <div className="important-box mb-3">
                            <strong>Important:</strong> Enter name exactly as per Government ID /
                            Passport.
                          </div>

                          {childForms.map((child, index) => (

                            <div className="border rounded mb-3" key={index}>

                              <div className="d-flex justify-content-between align-items-center p-3 bg-light">

                                <strong>
                                  CHILD {index + 1}
                                </strong>

                                <button
                                  type="button"
                                  className="btn btn-link text-danger text-decoration-none"
                                  onClick={() => handleRemoveChild(index)}
                                >
                                  ×
                                </button>

                              </div>

                              <div className="p-3">
                                <ChildFields
                                  child={child}
                                  index={index}
                                  childRule={childRule}
                                  handleChildChange={handleChildChange}
                                />
                              </div>

                            </div>

                          ))}

                          {childForms.length === 0 && (
                            <div className="add-box mb-3">
                              <p>You have not added any child to the list</p>
                            </div>
                          )}

                          {childForms.length < childCount ? (

                            <button
                              className="btn btn-link p-0"
                              onClick={handleAddChild}
                            >
                              + ADD NEW CHILD
                            </button>

                          ) : (

                            <div className="alert alert-warning mt-3 mb-0">
                              You have already selected <strong>{childCount}</strong> CHILD.
                              Remove one before adding a new one.
                            </div>

                          )}

                        </div>
                      )}

                      {/* =========================
                            INFANT SECTION
                      ========================= */}

                      {infantCount > 0 && (
                        <div className="card-box mt-4">

                          <div className="d-flex justify-content-between align-items-center mb-2">

                            <div className="section-title">
                              👶 INFANT (0 - 2 yrs)
                            </div>

                            <small>
                              {infantForms.length}/{infantCount} added
                            </small>

                          </div>

                          <div className="important-box mb-3">
                            Infant Date of Birth is mandatory.
                          </div>

                          {infantForms.map((infant, index) => (

                            <div className="border rounded mb-3" key={index}>

                              <div className="d-flex justify-content-between align-items-center p-3 bg-light">

                                <strong>
                                  INFANT {index + 1}
                                </strong>

                                <button
                                  type="button"
                                  className="btn btn-link text-danger text-decoration-none"
                                  onClick={() => handleRemoveInfant(index)}
                                >
                                  ×
                                </button>

                              </div>

                              <div className="p-3">

                                 <InfantsFields
                                  infant={infant}
                                  index={index}
                                  infantRule={infantRule}
                                  handleInfantChange={handleInfantChange}
                                />

                              </div>

                            </div>

                          ))}

                          {infantForms.length === 0 && (
                            <div className="add-box mb-3">
                              <p>You have not added any infant to the list</p>
                            </div>
                          )}

                          {infantForms.length < infantCount ? (

                            <button
                              className="btn btn-link p-0"
                              onClick={handleAddInfant}
                            >
                              + ADD NEW INFANT
                            </button>

                          ) : (

                            <div className="alert alert-warning mt-3 mb-0">
                              You have already selected <strong>{infantCount}</strong> INFANT.
                              Remove one before adding a new one.
                            </div>

                          )}

                        </div>
                      )}



                    {/* Contact Form */}
                    <p className="mb-2 mt-2 fw-semibold">
                      Booking details will be sent to
                    </p>

                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Country Code</label>
                          <select className="form-select">
                            <option value="">Select Country Code</option>

                            {countryCode.map((country) => (
                                <option
                                key={country.id}
                                value={country.phone_code}
                                >
                                {country.name} ({country.phone_code})
                                </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Mobile No</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile No"
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    {/* GST */}
                    <div className="form-check mt-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gstCheckbox"
                        checked={showGST}
                        onChange={(e) => setShowGST(e.target.checked)}
                      />
                      <label
                        className="form-check-label checkbox-label"
                        htmlFor="gstCheck"
                      >
                        I have a GST number{" "}
                        <span className="text-muted">(Optional)</span>
                      </label>
                    </div>

                    {/* GST Field */}
                    {/* <div id="gstField" className="mt-3 d-none">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter GST Number"
                      />
                    </div> */}
                    {showGST && (
                      <div className="row">
                        <div id="companyname" className="mt-3 col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company Name"
                            value={companyName}
                            onChange={(e) => setcompanyName(e.target.value)}
                          />
                        </div>
                        <div id="gstField" className="mt-3 col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter GST Number"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* State Section */}
                <div className="dhdsfsd788">
                  <div className="state-box mt-4">
                    <h6 className="fw-semibold">
                      Your State{" "}
                      <small className="text-muted fw-normal">
                        (Required for GST purpose on your tax invoice. You can
                        edit this anytime later in your profile section.)
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
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveBilling"
                        checked={saveBilling}
                        onChange={(e) => setSaveBilling(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="saveBilling">
                        Confirm and save billing details to your profile
                      </label>
                    </div>
                  </div>
                </div>


                <div className="sdejvfhsikdjl mt-3">
                  <button type="button" className="btn btn-outline-primary rounded-pill px-4"
                    onClick={handlePassengerDetails}>Continue</button>
                </div>

                {showSeatMealSection && (
                  <div className="ucbhsduodkf mt-4">
                    <div className="header-block">
                      <ul className="nav nav-tabs mb-0 ps-0" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="seats-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#seats"
                            type="button"
                            role="tab"
                            aria-controls="seats"
                            aria-selected="true"
                          >
                            <img src="/images/seatda.png" className="me-1" alt="" /> Seats
                          </button>
                        </li>

                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="meals-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#meals"
                            type="button"
                            role="tab"
                            aria-controls="meals"
                            aria-selected="false"
                          >
                            <img src="/images/fast-food.png" className="me-1" alt="" /> Meals
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="seats"
                        role="tabpanel"
                        aria-labelledby="seats-tab"
                      >
                        <div className="duisanfjsdfsf position-relative">
                          <FlightSeats seatMap={seatMap}/>
                        </div>
                      </div>

                      <div
                        className="tab-pane fade"
                        id="meals"
                        role="tabpanel"
                        aria-labelledby="meals-tab"
                      >
                        <div className="doismkfjhisd py-3">
                          <div className="duisnuiherer border-bottom pb-3 mb-3">
                            <div className="oidiewrwer d-flex justify-content-between mb-3">
                              <div className="diewirhwerwer">
                                <h5 className="mb-2">
                                  <b>Delhi</b> - <b>Mumbai</b>
                                </h5>

                                <h6 className="mb-0"><span>0</span> of 1 selected</h6>
                              </div>

                              <p className="mb-0">Select your meal</p>
                            </div>

                            <div className="dioewiuhrew d-flex gap-2">
                              <label htmlFor="veg" className="d-inline-flex align-items-center gap-2 px-3 border rounded-pill mb-0">
                                <input type="checkbox" id="veg" className="d-none position-absolute" />

                                <img src="/images/veg.png" alt="" /> <b>Veg</b>
                              </label>

                              <label htmlFor="nonveg" className="d-inline-flex align-items-center gap-2 px-3 border rounded-pill mb-0">
                                <input type="checkbox" id="nonveg" className="d-none position-absolute" />

                                <img src="/images/nonveg.png" alt="" /> <b>Non Veg</b>
                              </label>
                            </div>
                          </div>

                          <div className="dmiwejrwer row">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <div className="col-lg-6 mb-4">
                                <Meal />
                              </div>
                            ))}
                          </div>

                          <div className="idcnuihiwer p-3 rounded-2 d-flex align-items-center gap-2 border mt-2">
                            <div className="uidnwehruiewr position-relative rounded-circle">
                              <i className="bi position-absolute top-50 start-50 translate-middle bi-gift"></i>
                            </div>

                            <div className="duihsnerew">
                              <h5 className="mb-1">All meals are freshly prepared and hygienically packed.</h5>

                              <p className="mb-0">Availability may vary based on flight duration.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="col-lg-3">
              <div className="sticky-top">
                {/* SUMMARY */}
                <div className="fgdfgdf mb-3">
                  <div className="summary overflow-hidden">
                    <h6 className="mb-0 px-3 py-2">
                      <i className="bi me-1 bi-wallet"></i> Fare Summary
                    </h6>

                    <div className="diewnjrjwer">
                      <table className="table mb-0">
                        {/* Base Fare */}
                        <tr>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <i className="fa-solid fa-circle-minus"></i>
                              <span>Base Fare</span>
                            </div>
                          </td>

                          <td>
                            ₹ {baseFare.toLocaleString("en-IN")}
                          </td>
                        </tr>


                        {/* Adult */}
                        {adultFare && (
                          <tr>
                            <td className="ps-4">
                              Adult(s) (1 X ₹{" "}
                              {Number(adultFare.Basic_Amount).toLocaleString("en-IN")})
                            </td>

                            <td>
                              ₹ {Number(adultFare.Basic_Amount).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        )}


                        {/* Child */}
                        {childFare && (
                          <tr>
                            <td className="ps-4">
                              Children (1 X ₹{" "}
                              {Number(childFare.Basic_Amount).toLocaleString("en-IN")})
                            </td>

                            <td>
                              ₹ {Number(childFare.Basic_Amount).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        )}


                        {/* Infant */}
                        {infantFare && (
                          <tr>
                            <td className="ps-4">
                              Infant (1 X ₹{" "}
                              {Number(infantFare.Basic_Amount).toLocaleString("en-IN")})
                            </td>

                            <td>
                              ₹ {Number(infantFare.Basic_Amount).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        )}

                        {/* Divider */}
                        <tr>
                          <td colSpan="2">
                            <hr className="my-2" />
                          </td>
                        </tr>

                        {/* Airport Taxes */}
                        <tr>
                          <td className="ps-4">
                            Airline Taxes and Surcharges
                          </td>
                          <td>
                            ₹ {taxesAndSurcharges.toLocaleString("en-IN")}
                          </td>
                        </tr>


                        {/* Total */}
                        <tr className="ojdeopekwrer">
                          <td>
                            <strong>Total Amount</strong>
                          </td>

                          <td>
                            <strong>
                              ₹ {totalAmount.toLocaleString("en-IN")}
                            </strong>
                          </td>
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
                      <h6 className="mb-0 px-3 py-2">
                        <i className="bi me-1 bi-tags"></i>Coupon Codes
                      </h6>

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

                            <button
                              onClick={() => setSelectedCoupon(null)}
                              className={
                                selectedCoupon
                                  ? "btn remove-coupon-btn position-absolute"
                                  : "btn position-absolute"
                              }
                            >
                              {selectedCoupon ? "Remove" : "Apply"}
                            </button>
                          </div>

                          {selectedCoupon && (
                            <p className="copn-msge my-2">
                              Congratulations! Instant Discount of Rs. ₹229 has
                              been applied successfully.
                            </p>
                          )}
                        </div>

                        <div className="deiwhrwerwer">
                          <label htmlFor="c1" className="coupon-card">
                            <input
                              type="radio"
                              checked={selectedCoupon === "MMTTRAVEL"}
                              onChange={() => handleSelectedModal("MMTTRAVEL")}
                              name="ucfewfrew"
                              id="c1"
                              className="d-none position-absolute"
                            />

                            <div className="coupon-top d-flex align-items-center justify-content-between mb-1">
                              <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                <img
                                  src="./images/discount.png"
                                  className="coupon-icon"
                                  alt=""
                                />
                                <strong className="frgrfg5559">
                                  MMTTRAVEL
                                </strong>
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
                            <input
                              type="radio"
                              checked={selectedCoupon === "MMTSECUREV"}
                              onChange={() => handleSelectedModal("MMTSECUREV")}
                              name="ucfewfrew"
                              id="c2"
                              className="d-none position-absolute"
                            />

                            <div className="coupon-top d-flex align-items-center justify-content-between">
                              <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                <img
                                  src="./images/discount.png"
                                  className="coupon-icon"
                                  alt=""
                                />
                                <strong className="frgrfg5559">
                                  MMTSECUREV
                                </strong>
                              </div>
                              <span className="discount">₹229 off</span>
                            </div>
                            <p className="desc mb-0">
                              Get an instant discount of ₹229 on your flight
                              booking
                              <br />
                              and Trip Secure combo
                            </p>
                          </label>

                          <label htmlFor="c3" className="coupon-card">
                            <input
                              type="radio"
                              checked={selectedCoupon === "MMTSECUREL"}
                              onChange={() => handleSelectedModal("MMTSECUREL")}
                              name="ucfewfrew"
                              id="c3"
                              className="d-none position-absolute"
                            />

                            <div className="coupon-top d-flex align-items-center justify-content-between">
                              <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                <img
                                  src="./images/discount.png"
                                  className="coupon-icon"
                                  alt=""
                                />
                                <strong className="frgrfg5559">
                                  MMTSECUREL
                                </strong>
                              </div>
                              <span className="discount">₹229 off</span>
                            </div>
                            <p className="desc mb-0">
                              Get an instant discount of ₹229 on your flight
                              booking
                              <br />
                              and Trip Secure combo
                            </p>
                          </label>

                          <label htmlFor="c4" className="coupon-card">
                            <input
                              type="radio"
                              checked={selectedCoupon === "MMTSECUREJ"}
                              onChange={() => handleSelectedModal("MMTSECUREJ")}
                              name="ucfewfrew"
                              id="c4"
                              className="d-none position-absolute"
                            />

                            <div className="coupon-top d-flex align-items-center justify-content-between">
                              <div className="dagsjrsfwertt d-flex align-items-center gap-2 px-2 py-1">
                                <img
                                  src="./images/discount.png"
                                  className="coupon-icon"
                                  alt=""
                                />
                                <strong className="frgrfg5559">
                                  MMTSECUREJ
                                </strong>
                              </div>
                              <span className="discount">₹ 229 off</span>
                            </div>
                            <p className="desc mb-0">
                              Get an instant discount of ₹229 on your flight
                              booking
                              <br />
                              and Trip Secure combo
                            </p>
                          </label>
                        </div>

                        <div className="fgderhsraerr text-center">
                          <button
                            onClick={handleAllModalToggle}
                            className="btn sgsfeqaedqrrr pb-2"
                          >
                            View All Coupons
                          </button>
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

      {fareRuleModal && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(0,0,0,.6)",
            zIndex: 99999,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h5 className="modal-title">Fare Rules</h5>

                <button
                  className="btn-close"
                  onClick={() => setFareRuleModal(false)}
                />
              </div>

              <div className="modal-body">
                {/* Tabs */}

                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "cancel" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("cancel")}
                    >
                      Cancellation Charges
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "reschedule" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("reschedule")}
                    >
                      Date Change Charges
                    </button>
                  </li>
                </ul>

                {/* Cancellation */}

                {activeTab === "cancel" && (
                  <table className="table table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th width="50%">
                          Applicable Time<br/>
                          (From Scheduled Flight departure)
                        </th>
                        <th width="50%">
                          Charges<br/>
                          (Per passenger)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {(() => {
                        // Collect all cancellation charges from Adult/Child/Infant
                        const allCharges = allfareDetails.flatMap((fareDetail) =>
                          (fareDetail?.CancellationCharges || []).map((charge) => ({
                            ...charge,
                            paxType: fareDetail.PAX_Type,
                          }))
                        );

                        // Group charges by duration
                        const groupedCharges = allCharges.reduce((groups, charge) => {
                          const key = `${charge.DurationFrom}-${charge.DurationTo}-${charge.DurationTypeFrom}-${charge.DurationTypeTo}`;

                          if (!groups[key]) {
                            groups[key] = [];
                          }

                          groups[key].push(charge);

                          return groups;
                        }, {});

                        return Object.values(groupedCharges).map((charges, index) => {
                          const firstCharge = charges[0];

                          const getPassengerName = (paxType) => {
                            if (paxType === 0) return "ADULT";
                            if (paxType === 1) return "CHILD";
                            if (paxType === 2) return "INFANT";

                            return "PASSENGER";
                          };

                          const formatCharge = (charge) => {
                            if (!charge) return "₹0";

                            if (
                              charge.Value === undefined ||
                              charge.Value === null ||
                              charge.Value === ""
                            ) {
                              return "₹0";
                            }

                            if (charge.ValueType === 1) {
                              return `${charge.Value}% of Fare`;
                            }

                            if (isNaN(Number(charge.Value))) {
                              return charge.Value;
                            }

                            return `₹${Number(charge.Value).toLocaleString("en-IN")}`;
                          };

                          return (
                            <tr key={index}>
                              {/* Applicable Time */}
                              <td>
                                If cancelled between{" "}
                                <strong>{firstCharge.DurationFrom}{" "}</strong>
                                {firstCharge.DurationTypeFrom === 0
                                  ? "hours"
                                  : "days"}{" "}
                                to{" "}
                                <strong>{firstCharge.DurationTo}{" "}</strong>
                                {firstCharge.DurationTypeTo === 0
                                  ? "hours"
                                  : "days"}{" "}
                                before departure
                              </td>

                              {/* Charge */}
                              <td style={{ fontWeight: 500 }}>
                                {charges.map((charge) => (
                                  <div key={charge.paxType} className="mb-1">
                                    <strong>
                                      {getPassengerName(charge.paxType)}:
                                    </strong>{" "}
                                    {formatCharge(charge)}
                                  </div>
                                ))}
                              </td>

                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                )}

                {/* Reschedule */}

                {activeTab === "reschedule" && (
                  <table className="table table-bordered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th width="50%">
                          Applicable Time<br/>
                          (From Scheduled Flight departure)
                        </th>
                        <th width="50%">
                          Charges<br/>
                          (Per passenger)
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {(() => {
                        const allCharges = allfareDetails.flatMap((fareDetail) =>
                          (fareDetail?.RescheduleCharges || []).map((charge) => ({
                            ...charge,
                            paxType: fareDetail.PAX_Type,
                          }))
                        );

                        const groupedCharges = allCharges.reduce((groups, charge) => {
                          const key = `${charge.DurationFrom}-${charge.DurationTo}-${charge.DurationTypeFrom}-${charge.DurationTypeTo}`;

                          if (!groups[key]) {
                            groups[key] = [];
                          }

                          groups[key].push(charge);

                          return groups;
                        }, {});

                        const getPassengerName = (paxType) => {
                          if (paxType === 0) return "ADULT";
                          if (paxType === 1) return "CHILD";
                          if (paxType === 2) return "INFANT";

                          return "PASSENGER";
                        };

                        const formatCharge = (charge) => {
                          if (!charge) return "₹0";

                          if (
                            charge.Value === undefined ||
                            charge.Value === null ||
                            charge.Value === ""
                          ) {
                            return "₹0";
                          }

                          if (charge.ValueType === 1) {
                            return `${charge.Value}% of Fare`;
                          }

                          if (isNaN(Number(charge.Value))) {
                            return charge.Value;
                          }

                          return `₹${Number(charge.Value).toLocaleString("en-IN")}`;
                        };

                        return Object.values(groupedCharges).map(
                          (charges, index) => {
                            const firstCharge = charges[0];

                            return (
                              <tr key={index}>
                                <td>
                                  If rescheduled between <strong>{firstCharge.DurationFrom}{" "}</strong>
                                  {firstCharge.DurationTypeFrom === 0
                                    ? "hours"
                                    : "days"}{" "}
                                  to{" "}
                                  <strong>{firstCharge.DurationTo}{" "}</strong>
                                  {firstCharge.DurationTypeTo === 0
                                    ? "hours"
                                    : "days"}{" "}
                                  before departure
                                </td>

                                <td>
                                  {charges.map((charge) => (
                                    <div
                                      key={charge.paxType}
                                      className="mb-1"
                                    >
                                      <strong>
                                        {getPassengerName(charge.paxType)}:
                                      </strong>{" "}
                                      {formatCharge(charge)}
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            );
                          }
                        );
                      })()}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* add baggage modal start */}

      {addBaggageModal && (
        <div
          className="modal fade show d-block"
          style={{
            background: "rgba(0,0,0,.6)",
            zIndex: 99999,
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h5 className="modal-title">Add Extra Baggage</h5>

                <button
                  className="btn-close"
                  onClick={() => setAddBaggageModal(false)}
                />
              </div>

              <div className="modal-body">
                {baggageList.length > 0 ? (
                  <div className="list-group">
                    {baggageList.map((bag, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center border rounded p-3 mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <i
                            className="fa fa-suitcase me-3"
                            style={{ fontSize: "28px", color: "#666" }}
                          ></i>

                          <div>
                            <h6 className="mb-1">
                              {bag.SSR_TypeDesc?.replace(
                                "Prepaid Excess Baggage",
                                "Additional Baggage",
                              ).replace(/(\d+)\s*kg/i, "$1 KG")}
                            </h6>

                            <small className="text-muted">
                              {bag.Currency_Code}
                            </small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center">
                          <h5 className="me-3 mb-0">
                            ₹{Number(bag.Total_Amount).toLocaleString()}
                          </h5>
                          {selectedSSR[bag.SSR_TypeName]?.SSR_Key ===
                          bag.SSR_Key ? (
                            <div
                              className="d-flex align-items-center border rounded"
                              style={{ width: "130px", height: "40px" }}
                            >
                              <button
                                className="btn btn-sm flex-fill"
                                onClick={() =>
                                  handleRemoveSSR(bag.SSR_TypeName)
                                }
                              >
                                -
                              </button>
                              <span className="flex-fill text-center">1</span>
                              <button className="btn btn-sm flex-fill" disabled>
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-outline-secondary"
                              style={{ minWidth: "130px" }}
                              onClick={() => handleSelectSSR(bag)}
                            >
                              Add +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">No baggage available.</div>
                )}
              </div>

              {Object.keys(selectedSSR).length > 0 && (
                <div className="border-top bg-light p-3 d-flex justify-content-between align-items-center">
                  <div>{Object.keys(selectedSSR).length} SSR(s) Selected</div>

                  <div className="text-end">
                    <small className="text-muted">Added to fare</small>

                    <h3 className="mb-0">
                      ₹
                      {Object.values(selectedSSR)
                        .reduce(
                          (sum, item) => sum + Number(item.Total_Amount),
                          0,
                        )
                        .toLocaleString()}
                    </h3>
                  </div>

                  <button
                    className="btn btn-primary px-4"
                    onClick={() => {
                      console.log(selectedSSR);
                    }}
                  >
                    DONE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* add baggage modal end */}

      {/* all coupon modal start */}

      <div
        className={`${allCouponModal ? "all-coupon-modal-backdrop" : "all-coupon-modal-backdrop all-coupon-modal-backdrop-hide"} position-fixed w-100 h-100 top-0 start-0 bottom-0 end-0`}
      ></div>

      <div
        className={`${allCouponModal ? "all-coupon-modal" : "all-coupon-modal all-coupon-modal-hide"} d-flex flex-column bg-white top-0 bottom-0 px-4 py-3 position-fixed`}
      >
        <div className="all-coupon-modal-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">
            <b>All Coupons</b>
          </h5>

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

                <button
                  onClick={() => setSelectedCoupon(null)}
                  className={
                    selectedCoupon
                      ? "btn remove-coupon-btn position-absolute"
                      : "btn position-absolute"
                  }
                >
                  {selectedCoupon ? "Remove" : "Apply"}
                </button>
              </div>

              {selectedCoupon && (
                <p className="copn-msge my-2">
                  Congratulations! Instant Discount of Rs. ₹229 has been applied
                  successfully.
                </p>
              )}
            </div>

            <div className="deiwhrwerwer hjiejfriwejrwer pe-2">
              <label htmlFor="c1" className="coupon-card">
                <input
                  type="radio"
                  checked={selectedCoupon === "MMTTRAVEL"}
                  onChange={() => handleSelectedModal("MMTTRAVEL")}
                  name="ucfewfrew"
                  id="c1"
                  className="d-none position-absolute"
                />

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
                <input
                  type="radio"
                  checked={selectedCoupon === "MMTSECUREV"}
                  onChange={() => handleSelectedModal("MMTSECUREV")}
                  name="ucfewfrew"
                  id="c2"
                  className="d-none position-absolute"
                />

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
                <input
                  type="radio"
                  checked={selectedCoupon === "MMTSECUREL"}
                  onChange={() => handleSelectedModal("MMTSECUREL")}
                  name="ucfewfrew"
                  id="c3"
                  className="d-none position-absolute"
                />

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
                <input
                  type="radio"
                  checked={selectedCoupon === "MMTSECUREJ"}
                  onChange={() => handleSelectedModal("MMTSECUREJ")}
                  name="ucfewfrew"
                  id="c4"
                  className="d-none position-absolute"
                />

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
                <input
                  type="radio"
                  checked={selectedCoupon === "MMTSECURER"}
                  onChange={() => handleSelectedModal("MMTSECURER")}
                  name="ucfewfrew"
                  id="c5"
                  className="d-none position-absolute"
                />

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
  );
};
