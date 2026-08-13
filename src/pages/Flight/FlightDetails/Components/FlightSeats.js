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



export const FlightSeats = (seatMap) => {
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
            {/* STATUS */}

            <div className="selection-status">
                {selectedSeats.length === 0 ? (
                    "No seat selected yet"
                ) : (
                    <>
                        <span className="d-inline-block">
                            <span className="count">
                                {selectedSeats.length}
                            </span>
                            {" seat"}
                            {selectedSeats.length > 1 ? "s" : ""}
                            {" selected - "}
                        </span>
                        <p className="xfbdfshbdbb mb-0">{[...selectedSeats].sort().join(", ")}</p>
                    </>
                )}
            </div>

            {/* AIRCRAFT */}

            <div className="aircraft-wrapper">
                {/* SVG PLACEHOLDER */}

                <svg
                    className="fuselage-bg"
                    viewBox="-150 0 700 1620"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="fuselageGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stopColor="#e9edf1" />
                            <stop offset="0.5" stopColor="#f8fafc" />
                            <stop offset="1" stopColor="#e2e6eb" />
                        </linearGradient>

                        <linearGradient id="wingGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#e3e7eb" />
                            <stop offset="1" stopColor="#ccd2d8" />
                        </linearGradient>
                    </defs>

                    {/* Left Wing */}
                    <polygon
                        points="30,870 -110,970 -80,1110 30,1060"
                        fill="url(#wingGrad)"
                        stroke="#c3cad1"
                        strokeWidth="2.5"
                    />

                    {/* Right Wing */}
                    <polygon
                        points="370,870 510,970 480,1110 370,1060"
                        fill="url(#wingGrad)"
                        stroke="#c3cad1"
                        strokeWidth="2.5"
                    />

                    {/* Left Engine */}
                    <rect
                        x="-58"
                        y="970"
                        width="34"
                        height="86"
                        rx="14"
                        fill="#d9dee2"
                        stroke="#c3cad1"
                        strokeWidth="2"
                    />

                    {/* Right Engine */}
                    <rect
                        x="424"
                        y="970"
                        width="34"
                        height="86"
                        rx="14"
                        fill="#d9dee2"
                        stroke="#c3cad1"
                        strokeWidth="2"
                    />

                    {/* Tail Stabilizers */}
                    <polygon
                        points="60,1430 -30,1500 10,1540 90,1470"
                        fill="url(#wingGrad)"
                        stroke="#c3cad1"
                        strokeWidth="2"
                    />

                    <polygon
                        points="340,1430 430,1500 390,1540 310,1470"
                        fill="url(#wingGrad)"
                        stroke="#c3cad1"
                        strokeWidth="2"
                    />

                    {/* Vertical Tail */}
                    <path
                        d="M200,1420 C 210,1460 235,1500 260,1560 L 200,1600 L 150,1560 C 170,1500 190,1460 200,1420 Z"
                        fill="url(#fuselageGrad)"
                        stroke="#c3cad1"
                        strokeWidth="2.5"
                    />

                    {/* Fuselage */}
                    <path
                        d="
                        M200,0
                        C300,0 372,58 372,142
                        L372,1290
                        C372,1385 342,1440 292,1470
                        Q200,1500 108,1470
                        C58,1440 28,1385 28,1290
                        L28,142
                        C28,58 100,0 200,0
                        Z
                        "
                        fill="url(#fuselageGrad)"
                        stroke="#c3cad1"
                        strokeWidth="3"
                    />

                    {/* Cockpit */}
                    <path
                        d="M160,46 Q200,20 240,46"
                        fill="none"
                        stroke="#c3cad1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />

                    <path
                        d="M172,62 Q200,42 228,62"
                        fill="none"
                        stroke="#c3cad1"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>

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
        </div>
    )
}