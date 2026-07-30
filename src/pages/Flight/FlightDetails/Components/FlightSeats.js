import { useState } from "react";
import "./FlightSeats.css";


const TOTAL_ROWS = 20;
const LEFT_COLS = ["A", "B", "C"];
const RIGHT_COLS = ["D", "E", "F"];

const EXIT_ROWS = [12, 13];
const PREFERRED_ROWS = [1, 2, 3];

const BOOKED = new Set([
    "2C",
    "2D",
    "3F",
    "4A",
    "5F",
    "6B",
    "6C",
    "7D",
    "8B",
    "9A",
    "9F",
    "10C",
    "11D",
    "13A",
    "14E",
    "15A",
    "16B",
    "16C",
    "17F",
    "18A",
    "19D",
    "19E",
    "20B",
    "20C",
]);



export const FlightSeats = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const seatClass = (rowNum, letter) => {
        const id = `${rowNum}${letter}`;

        if (BOOKED.has(id)) return "booked";
        if (EXIT_ROWS.includes(rowNum)) return "extra";
        if (PREFERRED_ROWS.includes(rowNum)) return "preferred";

        return "";
    };

    const toggleSeat = (id) => {
        if (BOOKED.has(id)) return;

        setSelectedSeats((prev) =>
            prev.includes(id)
                ? prev.filter((seat) => seat !== id)
                : [...prev, id]
        );
    };


    return (
        <div className="page-shell">
            {/* HEADER */}

            <div className="header-block">
                <div className="eyebrow">Seat Selection · Economy</div>

                <h1>Choose Your Seat</h1>

                <p>Boeing 737 · 6-abreast cabin</p>
            </div>

            {/* LEGEND */}

            <div className="legend">
                <div className="legend-item">
                    <span className="legend-swatch available"></span>
                    Available
                </div>

                <div className="legend-item">
                    <span className="legend-swatch selected"></span>
                    Selected
                </div>

                <div className="legend-item">
                    <span className="legend-swatch preferred"></span>
                    Preferred
                </div>

                <div className="legend-item">
                    <span className="legend-swatch extra"></span>
                    Extra Legroom
                </div>

                <div className="legend-item">
                    <span className="legend-swatch booked"></span>
                    Booked
                </div>
            </div>

            {/* AIRCRAFT */}

            <div className="aircraft-wrapper">
                {/* SVG PLACEHOLDER */}

                <div className="fuselage-bg">
                    {/* Paste converted SVG here */}
                </div>

                <div className="cabin-content">
                    <div className="cockpit-zone">
                        <div className="cockpit-label">Cockpit</div>

                        <div className="door-pill"></div>
                    </div>

                    <div className="cabin-divider">
                        <span className="line"></span>

                        <span className="tag">Front Galley</span>

                        <span className="line"></span>
                    </div>

                    {/* SEAT MAP */}

                    <div className="seat-map">
                        {Array.from({ length: TOTAL_ROWS }, (_, index) => {
                            const rowNum = index + 1;
                            const isExitRow = EXIT_ROWS.includes(rowNum);

                            return (
                                <div
                                    key={rowNum}
                                    className={`seat-row ${isExitRow ? "exit-row" : ""
                                        }`}
                                >
                                    <span className="exit-tag">
                                        {isExitRow ? "EXIT" : ""}
                                    </span>

                                    <div className="row-num">{rowNum}</div>

                                    {/* LEFT SIDE */}

                                    {LEFT_COLS.map((letter) => {
                                        const id = `${rowNum}${letter}`;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                disabled={BOOKED.has(id)}
                                                onClick={() => toggleSeat(id)}
                                                className={`seat ${seatClass(
                                                    rowNum,
                                                    letter
                                                )} ${selectedSeats.includes(id)
                                                        ? "selected"
                                                        : ""
                                                    }`}
                                            >
                                                <span>{letter}</span>
                                            </button>
                                        );
                                    })}

                                    <div className="aisle-gap"></div>

                                    {/* RIGHT SIDE */}

                                    {RIGHT_COLS.map((letter) => {
                                        const id = `${rowNum}${letter}`;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                disabled={BOOKED.has(id)}
                                                onClick={() => toggleSeat(id)}
                                                className={`seat ${seatClass(
                                                    rowNum,
                                                    letter
                                                )} ${selectedSeats.includes(id)
                                                        ? "selected"
                                                        : ""
                                                    }`}
                                            >
                                                <span>{letter}</span>
                                            </button>
                                        );
                                    })}

                                    <div className="row-num spacer">
                                        {rowNum}
                                    </div>

                                    <span className="exit-tag">
                                        {isExitRow ? "EXIT" : ""}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cabin-divider">
                        <span className="line"></span>

                        <span className="tag">
                            Rear Galley · Lavatory
                        </span>

                        <span className="line"></span>
                    </div>

                    <div className="tail-zone">
                        <div className="cockpit-label">Tail</div>
                    </div>
                </div>
            </div>

            {/* STATUS */}

            <div className="selection-status">
                {selectedSeats.length === 0 ? (
                    "No seat selected yet"
                ) : (
                    <>
                        <span className="count">
                            {selectedSeats.length}
                        </span>
                        {" seat"}
                        {selectedSeats.length > 1 ? "s" : ""}
                        {" selected · "}
                        {[...selectedSeats].sort().join(", ")}
                    </>
                )}
            </div>
        </div>
    )
}