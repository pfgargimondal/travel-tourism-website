import React from "react";
import { useLocation } from "react-router-dom";
import "./FlightPayment.css";

export const FlightPayment = () => {
  const location = useLocation();

  const {
     // eslint-disable-next-line
    search_key,
     // eslint-disable-next-line
    flight,
    segment,
    repriceFlight,
    bookingPassengers = [],
     // eslint-disable-next-line
    selectedSeatList = [],
     // eslint-disable-next-line
    selectedMealList = [],
    selectedSSR = {},
    baseFare = 0,
    taxAmount = 0,
    seatCharges = 0,
    mealCharges = 0,
    extraBaggageCharges = 0,
    otherCharges = 0,
    totallAmountt = 0,
    cabinClassName = "",
     // eslint-disable-next-line
    adultFare = "",
  } = location.state || {};

  console.log(segment, 'segment');
  console.log(repriceFlight, 'repriceFlight');

  const formatAmount = (amount) => {
    return `₹ ${Number(amount || 0).toLocaleString("en-IN")}`;
  };

   // eslint-disable-next-line
  const baggageList = Object.values(selectedSSR || {})
    .flatMap((passengerSSR) => Object.values(passengerSSR || {}))
    .filter((ssr) => ssr?.SSR_TypeName === "BAGGAGE");

  const formatTime = (dateTime) => {
    if (!dateTime) return "";

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatFlightDate = (dateTime) => {
    if (!dateTime) return "";

    const date = new Date(dateTime);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="sdfsdf655 flight-details-wrapper">
      <div className="flight-payment-page">
        {/* ================= HEADER ================= */}
        <div className="payment-page-header">
          <div>
            <h4 className="mb-1 fw-bold">Review & Payment</h4>

            <small>Complete your booking securely</small>
          </div>

          <div className="booking-step">
            <span className="active">1</span>
            <span>Review</span>

            <div className="step-line"></div>

            <span>2</span>
            <span>Payment</span>

            <div className="step-line"></div>

            <span>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="container-fluid px-3 px-md-4">
          <div className="row g-4">
            {/* ================= LEFT ================= */}
            <div className="col-lg-8">
              <div className="flight-detail-card">
                {/* Top section */}
                <div className="flight-detail-top">
                  <div className="d-flex align-items-center gap-2">
                    <div className="flight-icon">
                      <i className="fa-solid fa-plane"></i>
                    </div>

                    <span className="departure-badge">DEPARTURE</span>

                    <h5 className="mb-0 fw-bold">
                      {segment?.Origin_City} → {segment?.Destination_City}
                    </h5>
                  </div>

                  <button type="button" className="hide-details-btn">
                    Hide details
                    <i className="fa-solid fa-chevron-up ms-2"></i>
                  </button>
                </div>

                {/* Flight summary */}
                <div className="flight-summary">
                  <span>{formatFlightDate(segment?.Departure_DateTime)}</span>

                  <span>•</span>

                  <span>{segment?.Airline_Name}</span>

                  <span>•</span>

                  <span>
                    {formatTime(segment?.Departure_DateTime)}
                    {" - "}
                    {formatTime(segment?.Arrival_DateTime)}
                  </span>

                  <span>•</span>

                  <span>{cabinClassName}</span>

                  <span>•</span>

                  <span>Non-stop</span>

                  <span>•</span>

                  <strong>{segment?.Duration || "02h 45m"}</strong>
                </div>

                {/* Sector */}
                <div className="sector-section">
                  <div className="sector-title">SECTOR 1 OF 1</div>

                  <div className="sector-route">
                    {segment?.Origin_City} ({segment?.Origin_Code}){" → "}
                    {segment?.Destination_City} ({segment?.Destination_Code})
                  </div>

                  <div className="flight-number">
                    <i className="fa-solid fa-plane"></i>
                    {segment?.Airline_Code} - {segment?.Flight_Number}
                  </div>

                  <span className="saver-badge">Saver</span>
                </div>

                {/* Bottom flight information */}
                <div className="flight-route-details">
                  {/* Departure */}
                  <div className="airport-detail">
                    <strong className="time">
                      {formatTime(segment?.Departure_DateTime)}
                    </strong>

                    <div>
                      {segment?.Origin_City} <span>{segment?.Origin_Code}</span>
                    </div>

                    <small>
                      {formatFlightDate(segment?.Departure_DateTime)}
                    </small>
                  </div>

                  {/* Duration */}
                  <div className="duration-detail">
                    <span>{segment?.Duration || "02h 45m"}</span>

                    <div className="duration-line"></div>

                    <small>• Economy</small>
                  </div>

                  {/* Arrival */}
                  <div className="airport-detail arrival">
                    <strong className="time">
                      {formatTime(segment?.Arrival_DateTime)}
                    </strong>

                    <div>
                      {segment?.Destination_City}{" "}
                      <span>{segment?.Destination_Code}</span>
                    </div>

                    <small>{formatFlightDate(segment?.Arrival_DateTime)}</small>

                    <small>
                      Terminal - {segment?.Destination_Terminal || "2"}
                    </small>
                  </div>

                  {/* Baggage */}
                  <div className="aircraft-info">
                    <div className="aircraft-title">ON THIS AIRCRAFT</div>

                    <div className="baggage-row">
                      <span>Cabin baggage</span>
                      <strong>7 Kgs</strong>
                    </div>

                    <div className="baggage-row">
                      <span>Check-in baggage</span>
                      <strong>15 Kgs</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT ================= */}
            <div className="col-lg-4">
              <div className="price-summary-card">
                <div className="price-summary-header">
                  <h5>Price Summary</h5>

                  <div>
                    <i className="fa-solid fa-person"></i>{" "}
                    {bookingPassengers.length}
                  </div>
                </div>

                <div className="price-row">
                  <span>Base Price</span>

                  <strong>{formatAmount(baseFare)}</strong>
                </div>

                <div className="price-row">
                  <span>Taxes & Services Fees</span>

                  <strong>{formatAmount(taxAmount)}</strong>
                </div>

                {seatCharges > 0 && (
                  <div className="price-row">
                    <span>Seat Charges</span>

                    <strong>{formatAmount(seatCharges)}</strong>
                  </div>
                )}

                {mealCharges > 0 && (
                  <div className="price-row">
                    <span>Meal Charges</span>

                    <strong>{formatAmount(mealCharges)}</strong>
                  </div>
                )}

                {extraBaggageCharges > 0 && (
                  <div className="price-row">
                    <span>Extra Baggage</span>

                    <strong>{formatAmount(extraBaggageCharges)}</strong>
                  </div>
                )}

                {otherCharges > 0 && (
                  <div className="price-row">
                    <span>Others</span>

                    <strong>{formatAmount(otherCharges)}</strong>
                  </div>
                )}

                <div className="grand-total">
                  <span>Grand Total</span>

                  <strong>{formatAmount(totallAmountt)}</strong>
                </div>

                <button
                  type="button"
                  className="btn btn-tour w-100 mt-3"
                  onClick={() => {
                    // payment gateway call
                  }}
                >
                  Proceed to Pay
                  <i className="fa-solid fa-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
