import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import http from "../../http";
import Loader from "../../component/Loader/Loader";

import "./HotelDetails.css";



export const HotelDetails = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [hotelDetails, setHotelDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const [expandedRooms, setExpandedRooms] = useState({});
  const [activeTab, setActiveTab] = useState("rooms");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const checkin = searchParams.get("checkin");
        const checkout = searchParams.get("checkout");
        const rooms = searchParams.get("rooms");
        const adults = searchParams.get("adults");
        const children = searchParams.get("children");

        const response = await http.get(
          `/get-hotel-code-details/${slug}?checkin=${checkin}&checkout=${checkout}&rooms=${rooms}&adults=${adults}&children=${children}`
        );

        setHotelDetails(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [slug, searchParams]);

  const sectionsToRemove = [
    "Accommodations:",
    "Amenities:",
    "Dining Options:",
    "Nearby Location & Transportation:",
    "Nearby Attractions:",
    "Wellness And Activities:",
    "Policies & Check-In Instructions:",
  ];

  let cleanDescription = hotelDetails?.description || "";

  sectionsToRemove.forEach((section) => {
    cleanDescription = cleanDescription.replace(
      new RegExp(
        `<p><strong>${section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/strong>.*?(?=<p><strong>|$)`,
        "is"
      ),
      ""
    );
  });

  const getFacilityImage = (facility = "") => {
    const name = facility.toLowerCase();

    if (name.includes("wifi"))
      return "https://img.icons8.com/fluency/48/wifi.png";

    if (name.includes("pool"))
      return "https://img.icons8.com/fluency/48/swimming-pool.png";

    if (name.includes("spa"))
      return "https://img.icons8.com/fluency/48/spa-flower.png";

    if (
      name.includes("fitness") ||
      name.includes("gym") ||
      name.includes("health club")
    )
      return "https://img.icons8.com/fluency/48/dumbbell.png";

    if (name.includes("beach"))
      return "https://img.icons8.com/fluency/48/beach.png";

    if (name.includes("tennis"))
      return "https://cdn-icons-png.flaticon.com/512/857/857455.png";

    if (name.includes("parking"))
      return "https://img.icons8.com/fluency/48/parking.png";

    if (name.includes("breakfast") || name.includes("restaurant"))
      return "https://img.icons8.com/fluency/48/restaurant.png";

    if (name.includes("bar"))
      return "https://img.icons8.com/fluency/48/cocktail.png";

    if (name.includes("conference") || name.includes("meeting"))
      return "https://img.icons8.com/fluency/48/conference-call.png";

    if (name.includes("laundry"))
      return "https://img.icons8.com/fluency/48/washing-machine.png";

    if (name.includes("children") || name.includes("playground"))
      return "https://img.icons8.com/fluency/48/playground.png";

    if (name.includes("snorkeling"))
      return "https://img.icons8.com/fluency/48/snorkel.png";

    if (name.includes("volleyball"))
      return "https://img.icons8.com/fluency/48/volleyball-player.png";

    if (name.includes("library") || name.includes("books"))
      return "https://img.icons8.com/fluency/48/books.png";

    if (name.includes("atm"))
      return "https://img.icons8.com/fluency/48/atm.png";

    if (name.includes("concierge"))
      return "https://img.icons8.com/fluency/48/concierge.png";

    if (name.includes("garden"))
      return "https://img.icons8.com/fluency/48/garden.png";

    if (name.includes("library"))
      return "https://img.icons8.com/fluency/48/books.png";

    if (name.includes("steam"))
      return "https://img.icons8.com/fluency/48/steam-room.png";

    if (name.includes("sauna"))
      return "https://img.icons8.com/fluency/48/sauna.png";

    if (name.includes("luggage"))
      return "https://img.icons8.com/fluency/48/luggage.png";

    if (
      name.includes("hair salon") ||
      name.includes("salon") ||
      name.includes("hairdresser") ||
      name.includes("barber")
    ) {
      return "https://cdn-icons-png.flaticon.com/512/3050/3050525.png";
    }
    if (
      name.includes("scuba") || name.includes("Scuba diving") || 
      name.includes("diving")
    ) {
      return "https://img.icons8.com/fluency/48/scuba-diving.png";
    }

    if (name.includes("coffee") || name.includes("tea")) {
      return "https://cdn-icons-png.flaticon.com/512/924/924514.png";
    }
    if (name.includes("television") || name.includes("tv"))
      return "https://cdn-icons-png.flaticon.com/512/2503/2503508.png";

    return "https://img.icons8.com/fluency/48/services.png";
  };
  
  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="sdfsdf655">
        <div className="container">
          <div className="asfdgsqwe">
            <ul className="ps-0 d-flex align-items-center gap-3">
                <li className="active">Hotels</li>

                <li><i className="bi bi-arrow-right"></i></li>

                <li>{hotelDetails?.hotel_name}</li>
            </ul>
        </div>
        
          <div className="sgbdrsfweqeqe">
            <div className="row">
              <div className="col-lg-9">
                <div className="sdfsdfsdf78 hotel-detls-wrppr">
                  <div className="hotel-card">
                    <div className="sdbhjsdfds d-flex justify-content-between mb-4">
                      <div className="duiewnjdmsdx">
                        <h4 className="fw-bold mb-2">
                          {hotelDetails?.hotel_name}
                        </h4>

                        <h6 className="jkvnxlkjvkxccv mb-2"><i className="fa-solid me-1 fa-location-dot"></i> 46,1St Main Road, Gokula 1St Stage Mathikere, Yeswanthpur, Bengaluru, Karnataka 560054</h6>
                        
                        <div className="sbfsdvfsf d-flex align-items-center">
                          <div className="vfddf me-1">
                            {[...Array(5)].map((_, index) => (
                              <i
                                key={index}
                                className={`fa-star ${
                                  index < Number(hotelDetails?.hotel_rating || 0)
                                    ? "fa-solid"
                                    : "fa-regular"
                                }`}
                              ></i>
                            ))}
                          </div>

                          <div className="xfhgxdvxcv">
                            <p className="mb-0 py-1 px-2">Hotel</p>
                          </div>
                        </div>
                      </div>

                      <div className="bcbsdbszsd d-flex gap-2">                        
                        <div className="sdhgxifoijjd text-end">
                          <h6 className="mb-0">Excellent <span className="small text-muted">(412 Ratings)</span></h6>
                        
                          <Link to="/" className="review-link">
                            <b>All Reviews</b>
                          </Link>
                        </div>

                        <span className="rating-box mb-0">4.3</span>
                      </div>
                    </div>
                  
                    <div className="fbhjsfsdf88">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="bhjddsfs">
                            <img src={hotelDetails?.image} alt="" />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="dfsdf542">
                            {hotelDetails?.hotel_images?.slice(0, 2).map((hotelImage, index, arr) => (
                              <div className="hgcghghvfhg" key={index}>
                                <img
                                  src={hotelImage.image_url}
                                  alt=""                                  
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="dsvbjhdvsdc mt-4">
                      <h5 className="mb-2">About Property</h5>
                      
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cleanDescription,
                        }}
                      />
                    </div>
                  </div>
                    
                  <div className="duijewkijuler-tabs p-0">
                    <ul className="mkooijokerr bg-white nav nav-tabs px-2 mb-0 sticky-top mb-3">
                      <li className="nav-item" role="presentation">
                        <a href="#rooms" onClick={() => setActiveTab("rooms")}>
                          <button
                            className={`nav-link ${activeTab === "rooms" ? "active" : ""}`}
                            type="button"
                          >
                            <img src="./images/prop1 (1).png" alt="" /> Rooms
                          </button>
                        </a>
                      </li>

                      <li className="nav-item" role="presentation">
                        <a href="#amenities" onClick={() => setActiveTab("amenities")}>
                          <button
                            className={`nav-link ${activeTab === "amenities" ? "active" : ""}`}
                            type="button"
                          >
                            <img src="./images/prop1 (2).png" alt="" /> Amenities
                          </button>
                        </a>
                      </li>

                      <li className="nav-item" role="presentation">
                        <a href="#bp" onClick={() => setActiveTab("bp")}>
                          <button
                            className={`nav-link ${activeTab === "bp" ? "active" : ""}`}
                            type="button"
                          >
                            <img src="./images/prop1 (2).png" alt="" /> Booking Policy
                          </button>
                        </a>
                      </li>

                      <li className="nav-item" role="presentation">
                        <a href="#gr" onClick={() => setActiveTab("gr")}>
                          <button
                            className={`nav-link ${activeTab === "gr" ? "active" : ""}`}
                            type="button"
                          >
                            <img src="./images/prop1 (2).png" alt="" /> Guest Rating
                          </button>
                        </a>
                      </li>
                    </ul>

                    <div className="czxvbbcsdfdcfc-tab-content">
                      <div
                        className="jkcnjsdnmdf"
                        id="rooms"
                      >
                        <div className="hotel-card">
                          <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi in ex molestiae commodi vero quaerat ullam porro. Quo, ratione deserunt.</p>
                        </div>
                      </div>
                      
                      <div
                        className="jcknnsdndsff"
                        id="amenities"
                      >
                        <div className="hotel-card">
                          <div className="diuejfmjsdf">
                            <h2 className="amenities-title">Amenities</h2>

                            <div className="amenities-list d-flex align-items-center flex-wrap gap-4">
                              {hotelDetails?.hotel_facilities
                                ?.slice(0, showAllFacilities ? hotelDetails.hotel_facilities.length : 4)
                                .map((hotelFacility, index) => (
                                  <div className="amenity-item" key={index}>
                                    <img
                                      src={getFacilityImage(hotelFacility.facility)}
                                      alt={hotelFacility.facility}
                                      width="32"
                                      height="32"
                                    />
                                    <span>{hotelFacility.facility}</span>
                                  </div>
                                ))}
                              {/* <div className="amenity-item">
                                <img src="./images/swimming-pool.png" alt=""/>
                                <span>Swimming Pool</span>
                              </div>

                              <div className="amenity-item">
                                <img src="./images/wifi.png" alt=""/>
                                <span>Free Wifi</span>
                              </div>

                              <div className="amenity-item">
                                <img src="./images/power.png" alt=""/>
                                <span>Power Back up</span>
                              </div>

                              <div className="amenity-item">
                                <img src="./images/ac.png" alt=""/>
                                <span>Air Conditioning</span>
                              </div> */}

                              {hotelDetails?.hotel_facilities?.length > 4 && (
                                <button
                                  className="view-all-btn"
                                  onClick={() => setShowAllFacilities(!showAllFacilities)}
                                >
                                  {showAllFacilities ? "Show Less" : "View All"}
                                </button>
                              )}
                            </div>
                          </div>  
                        </div>                        
                      </div>

                      <div
                        className="xcvbnyuhdusjdd"
                        id="bp"
                      >
                        <div className="hotel-card">
                          <p className="mb-0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi in ex molestiae commodi vero quaerat ullam porro. Quo, ratione deserunt.</p>
                        </div>                        
                      </div>

                      <div
                        className="jnduiejjrr"
                        id="gr"
                      >
                        <div className="hotel-card">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor et nostrum quas alias odio fugiat saepe ab dolore laborum inventore molestias debitis architecto dolorum quibusdam assumenda recusandae, deleniti a, sed soluta animi atque exercitationem vitae maxime. Pariatur error neque iste, optio natus, quasi, nobis praesentium nam repudiandae maiores numquam et laudantium quidem tenetur eligendi veritatis distinctio corrupti blanditiis impedit. Assumenda architecto molestias quos nulla, culpa consequatur necessitatibus eius reprehenderit optio? Deleniti nulla id nihil itaque iste eum quaerat at dolor?
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>                
              </div>

              <div className="col-lg-3">
                <div className="vfvfdvfd55">
                  <div className="sidebar-card mb-3">
                    <h6 className="room-title">Bed in 8 Bed Mixed Dormitory</h6>

                    <div className="small text-muted">Fits 1 Adult</div>
                    <div className="small text-muted mb-2">Non-Refundable</div>

                    <div className="small text-muted">Per Night</div>

                    <div className="price">
                      ₹ 419 <span>Fits 1 Adult</span>
                    </div>

                    <button className="book-btn">Book This Now</button>

                    <div className="d-flex justify-content-between mt-2 align-items-center">
                      <small className="text-muted">Non-Refundable</small>
                      <button className="view-btn">View All (8)</button>
                    </div>
                  </div>

                  <div className="sidebar-card">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                        className="map-icon" alt=""
                      />
                      <div className="ms-2">
                        <strong>Apporo</strong>
                        <br />
                        <span className="small text-muted">
                          3.7 km drive to Anjuna Beach
                        </span>
                      </div>
                    </div>

                    <div className="map-img">
                      <iframe
                        src="https://www.google.com/maps?q=Anjuna+Beach&output=embed"
                        allowfullscreen=""
                        loading="lazy"
                        title="map"
                      ></iframe>
                    </div>

                    <div className="deal-box mt-2">
                      <div className="deal-badge">5 Minutes Deal</div>
                      <p className="small mt-2 mb-0">
                        Congrats! You are getting a discount of ₹218 as a Last
                        Minute Deal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dbvhjdxcxbvdxsvsdfs">
        <div className="container">
          <div className="vdsjhbdsfsd">
            <div className="gfetyy89">
              <div className="sdhdss8899">
                {hotelDetails?.hotel_rooms?.map((hotelRoom, index) => {
                  const amenities = hotelRoom.RoomDescription
                    ?.replace(/&/g, "")
                    .split(",")
                    .flatMap(item =>
                      item.split(/\s-\s/).map(part =>
                        part
                          .trim()
                          .replace(/^(and|a|an)\s+/i, "")
                      )
                    )
                    .filter(item => item.length > 0);
                    const isExpanded = expandedRooms[index] || false;
                    return(
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="fgfdfgd78">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="dshfdsfs58788">
                                <div className="fbvhjd">
                                  <img
                                    src={hotelRoom.imageURL ? JSON.parse(hotelRoom.imageURL)?.[0] : ""}
                                    alt="Hotel Room"
                                  />

                                  <div className="wishlist-icon">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                      alt="heart"
                                    />
                                  </div>
                                </div>
                                <div className="bhjvgasds54">
                                  <div className="sdbhjdsd">
                                    <h4>
                                      {hotelRoom.RoomName}
                                    </h4>
                                  </div>
                                  <div className="room-features">
                                    <div className="feature-row">
                                      <img
                                        src="/images/iconstw (1).png"
                                        alt="Square footage"
                                      />
                                      <span>{hotelRoom.RoomSize}</span>
                                    </div>
{/* 
                                    <div className="feature-row">
                                      <img
                                        src="./images/iconstw (2).png"
                                        alt="View type"
                                      />
                                      <span>Courtyard View</span>
                                    </div>

                                    <div className="feature-row">
                                      <img
                                        src="./images/iconstw (3).png"
                                        alt="Beds"
                                      />
                                      <span>2 Single Bed(s)</span>
                                    </div>

                                    <div className="feature-row">
                                      <img
                                        src="images/iconstw (4).png"
                                        alt="Bathroom"
                                      />
                                      <span>1 Bathroom</span>
                                    </div> */}

                                    <div className="feature-row highlight">
                                      <img
                                        src="/images/electric.png"
                                        alt="Modern facilities"
                                      />
                                      <span>
                                        Well appointed room with modern facilities
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="amenities_wrap_box">
                                  <ul className="amenities_list">
                                      {(isExpanded ? amenities : amenities.slice(0, 6)).map((item, i) => (
                                        <li key={i}>{item}</li>
                                      ))}
                                  </ul>

                                  {amenities.length > 6 && (
                                    <button
                                      className="amenities_more_link"
                                      onClick={() =>
                                        setExpandedRooms(prev => ({
                                          ...prev,
                                          [index]: !prev[index]
                                        }))
                                      }
                                    >
                                      {isExpanded ? "Show Less" : "More Details"}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="fdgfdgdfg7885">
                                <div className="dsbhjsdsf">
                                  <h4>Room with Breakfast + Lunch/Dinner</h4>
                                </div>
                                <div className="dnhjd54564">
                                  <div className="room-features">
                                    <div className="feature-row">
                                      <img
                                        src="./images/iconstw (5).png"
                                        alt="Square footage"
                                      />
                                      <span>
                                        10% off on 1 session of 90 mins Spa  
                                      </span>
                                    </div>

                                    <div className="feature-row">
                                      <img
                                        src="./images/iconstw (6).png"
                                        alt="View type"
                                      />
                                      <span>
                                        15% off on Food & Beverage services  
                                      </span>
                                    </div>

                                    <div className="feature-row">
                                      <img
                                        src="./images/iconstw (7).png"
                                        alt="Beds"
                                      />
                                      <span>Breakfast included  </span>
                                    </div>

                                    <div className="feature-row">
                                      <img
                                        src="images/iconstw (8).png"
                                        alt="Bathroom"
                                      />
                                      <span>Lunch Or Dinner included  </span>
                                    </div>

                                    <div className="sdhbfdsfsfd">
                                      <h6>Experiences Included</h6>
                                      <p>
                                        Enjoy Happy Hours with 1+1 offer on
                                        Alcoholic Drinks, Soft Beverages
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="njhbfsf">
                          <div className="vbhsf">
                            <h4>Excellent</h4>
                            <p>4.5/5</p>
                          </div>
                          <div className="sdknhf55">
                            <p>(655 Rating)</p>
                          </div>
                          <div className="fdjvfd78">
                            <p>
                              From <span>₹3699 </span>
                            </p>
                          </div>
                          <div className="vdfv785">
                            <p>+ ₹ 3,543 taxes & fees per Night</p>
                          </div>
                          <div className="sbfsdvfsf">
                            <div className="vfddf">
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                              <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="fdfdf5">
                              <p>star</p>
                            </div>
                          </div>
                          <div className="sdbds86uu">
                            <button>Book Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="dbvhjdxcxbvdxsvsdfs">
        <div className="container">
          <div className="vdsjhbdsfsd">
            <div className="gfetyy89">
              <div className="sdhdss8899">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="fgfdfgd78">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="dshfdsfs58788">
                            <div className="fbvhjd">
                              <img src="./images/hotel1.png" alt="" />

                              <div className="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div className="bhjvgasds54">
                              <div className="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div className="feature-row highlight">
                                  <img
                                    src="./images/electric.png"
                                    alt="Modern facilities"
                                  />
                                  <span>
                                    Well appointed room with modern facilities
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="amenities_wrap_box">
                              <ul className="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" className="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹2399 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹2799 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dbvhjdxcxbvdxsvsdfs">
        <div className="container">
          <div className="vdsjhbdsfsd">
            <div className="gfetyy89">
              <div className="sdhdss8899">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="fgfdfgd78">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="dshfdsfs58788">
                            <div className="fbvhjd">
                              <img src="./images/hotel4.jpg" alt="" />

                              <div className="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div className="bhjvgasds54">
                              <div className="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div className="feature-row highlight">
                                  <img
                                    src="./images/electric.png"
                                    alt="Modern facilities"
                                  />
                                  <span>
                                    Well appointed room with modern facilities
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="amenities_wrap_box">
                              <ul className="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" className="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹3199 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹3399 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹4299 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dbvhjdxcxbvdxsvsdfs">
        <div className="container">
          <div className="vdsjhbdsfsd">
            <div className="gfetyy89">
              <div className="sdhdss8899">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="fgfdfgd78">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="dshfdsfs58788">
                            <div className="fbvhjd">
                              <img src="./images/hotel5 (2).png" alt="" />

                              <div className="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div className="bhjvgasds54">
                              <div className="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div className="feature-row highlight">
                                  <img
                                    src="./images/electric.png"
                                    alt="Modern facilities"
                                  />
                                  <span>
                                    Well appointed room with modern facilities
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="amenities_wrap_box">
                              <ul className="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" className="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹2799 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹4199 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹4399 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dbvhjdxcxbvdxsvsdfs">
        <div className="container">
          <div className="vdsjhbdsfsd">
            <div className="gfetyy89">
              <div className="sdhdss8899">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="fgfdfgd78">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="dshfdsfs58788">
                            <div className="fbvhjd">
                              <img src="./images/hotel5 (1).png" alt="" />

                              <div className="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div className="bhjvgasds54">
                              <div className="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div className="feature-row highlight">
                                  <img
                                    src="./images/electric.png"
                                    alt="Modern facilities"
                                  />
                                  <span>
                                    Well appointed room with modern facilities
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="amenities_wrap_box">
                              <ul className="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" className="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="fdgfdgdfg7885">
                            <div className="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div className="dnhjd54564">
                              <div className="room-features">
                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div className="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div className="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div className="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹2899 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹3799 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div className="njhbfsf">
                      <div className="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div className="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div className="fdjvfd78">
                        <p>
                          From <span>₹3599 </span>
                        </p>
                      </div>
                      <div className="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div className="sbfsdvfsf">
                        <div className="vfddf">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div className="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="sdjdhbchjdc">
        <section className="location-section mt-4">
          <div className="container">
            <div className="hvbjhs785">
              <div className="location-header mb-3">
                <h5 className="fw-bold">Location</h5>
                <p className="mb-1">
                  Address: 195/23-A/B, Candolim Main Road, Near Lawande Super
                  Market, Anna Waddo, Candolim, Saligao, North Goa, Goa
                </p>
                <p className="text-muted">9 minutes walk to Candolim Beach</p>
              </div>

              <div className="row">
                <div className="col-lg-3">
                  <div className="location-left">
                    <div className="mb-3 position-relative">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search in Goa"
                      />
                      <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    </div>

                    <div className="d-flex gap-3 mb-2 small fw-semibold">
                      <span className="active-tab">Key Landmarks</span>
                    </div>

                    <div className="landmark-list">
                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Candolim Beach</span>
                        </label>
                        <span className="distance walk">9 min walk →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Calangute Beach</span>
                        </label>
                        <span className="distance km">1.5 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Baga Beach</span>
                        </label>
                        <span className="distance km">4.3 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Aguada Fort</span>
                        </label>
                        <span className="distance km">6 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Anjuna Beach</span>
                        </label>
                        <span className="distance km">9.3 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Vagator Beach</span>
                        </label>
                        <span className="distance km">11.3 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Miramar Beach</span>
                        </label>
                        <span className="distance km">16.8 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Morjim Beach</span>
                        </label>
                        <span className="distance km">18.6 km →</span>
                      </div>

                      <div className="landmark-item d-flex justify-content-between align-items-center">
                        <label className="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Dona Paula Beach</span>
                        </label>
                        <span className="distance km">19.1 km →</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-9">
                  <div className="map-box">
                    <iframe
                      src="https://www.google.com/maps?q=Candolim,Goa&output=embed"
                      title="map"
                      width="100%"
                      height="450"
                      style={{ border: 0, borderRadius: "12px" }}
                      allowfullscreen=""
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="dhjdsds788">
        <section className="property-rules-section mt-4">
          <div className="container">
            <div className="rules-box p-4">
              <div className="mb-3">
                <h5 className="fw-bold">Property Rules</h5>
                <p className="mb-0">
                  <strong>Check-in:</strong> 2 PM &nbsp;&nbsp;
                  <strong>Check-out:</strong> 12 PM
                </p>
              </div>

              <hr />

              <div className="row mt-3">
                <div className="col-lg-6">
                  <div className="rules-tag mb-3">❤️ Couple/Bachelor Rules</div>

                  <div className="rules-highlight mb-3">
                    Unmarried couples allowed. Local ids are allowed
                  </div>

                  <ul className="rules-list">
                    <li>Primary Guest should be atleast 18 years of age.</li>
                    <li>
                      Groups with only male guests are allowed at the property
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6">
                  <ul className="rules-list">
                    <li>
                      Passport, Aadhaar and Driving License are accepted as ID
                      proof(s)
                    </li>
                    <li>Pets are not allowed</li>
                    <li>
                      Mandatory: This rate and cancellation policy is only
                      applicable for booking upto 7 rooms. Bookings with more
                      than 7 rooms are considered group bookings & the right to
                      admission is reserved by hotel.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                <button className="rule-btn">Must Read Rules</button>
                <button className="rule-btn">Guest Profile</button>
                <button className="rule-btn">Guest Profile (Hourly)</button>
                <a href="/" className="read-all">
                  Read All Property Rules
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="dbydfff854">
        <section className="guest-gallery-section mt-4">
          <div className="container">
            <div className="gallery-box p-3">
              <h5 className="fw-bold mb-3">Photos by Guests</h5>

              <div className="row g-3">
                <div className="col">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    className="gallery-img" alt=""
                  />
                </div>

                <div className="col">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                    className="gallery-img" alt=""
                  />
                </div>

                <div className="col">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                    className="gallery-img" alt=""
                  />
                </div>

                <div className="col">
                  <img
                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                    className="gallery-img" alt=""
                  />
                </div>

                <div className="col position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
                    className="gallery-img overlay-img" alt=""
                  />

                  <div className="overlay-text" onclick="openGallery()">
                    +1484 Guest Photos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="galleryModal" className="gallery-modal">
          <span className="close-btn" onclick="closeGallery()">
            &times;
          </span>

          <div className="modal-content-custom">
            <img id="modalImage" src="" alt=""/>
          </div>

          <div className="gallery-thumbs">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt=""
              onclick="changeImage(this)"
            />
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt=""
              onclick="changeImage(this)"
            />
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427" alt=""
              onclick="changeImage(this)"
            />
            <img 
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32" alt=""
              onclick="changeImage(this)"
            />
            <img
              src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461" alt=""
              onclick="changeImage(this)"
            />
          </div>
        </div>
      </div>

      <div className="hjdbjhfd885">
        <section className="review-section mt-4">
          <div className="container">
            <div className="review-box p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold">User Rating & Reviews</h5>
                <span className="verified">✔ Verified Reviews</span>
              </div>

              <div className="review-tabs mb-3">
                <span className="active">Everyone</span>
                <span>Group</span>
                <span>Couple</span>
                <span>Solo</span>
                <span>Business</span>
                <span>Family</span>
              </div>

              <div className="row">
                <div className="col-lg-4">
                  <div className="rating_sidebar_box">
                    <div className="rating_top">
                      <div className="rating_score">4.3</div>
                      <div>
                        <h4>Excellent</h4>
                        <p>2540 Ratings, 1352 Reviews</p>
                      </div>
                    </div>

                    <div className="rating_bar_wrap">
                      <div className="rating_row">
                        <span>Excellent</span>
                        <div className="bar">
                          <div style={{ width: "60%" }}></div>
                        </div>
                        <span>60%</span>
                      </div>

                      <div className="rating_row">
                        <span>Very Good</span>
                        <div className="bar">
                          <div style={{ width: "24%" }}></div>
                        </div>
                        <span>24%</span>
                      </div>

                      <div className="rating_row">
                        <span>Average</span>
                        <div className="bar">
                          <div style={{ width: "9%" }}></div>
                        </div>
                        <span>9%</span>
                      </div>

                      <div className="rating_row">
                        <span>Poor</span>
                        <div className="bar">
                          <div style={{ width: "4%" }}></div>
                        </div>
                        <span>4%</span>
                      </div>

                      <div className="rating_row">
                        <span>Bad</span>
                        <div className="bar">
                          <div style={{ width: "3%" }}></div>
                        </div>
                        <span>3%</span>
                      </div>
                    </div>

                    <hr />

                    <div className="last_ratings">
                      <h5>
                        Last 10 Customer Ratings <span>(Latest First)</span>
                      </h5>

                      <div className="rating_boxes">
                        <span>4</span>
                        <span>5</span>
                        <span>5</span>
                        <span>5</span>
                        <span>4</span>
                        <span>5</span>
                        <span>4</span>
                        <span>5</span>
                        <span>5</span>
                        <span>5</span>
                      </div>
                    </div>

                    <hr />

                    <div className="rating_categories">
                      <h5>Rating Categories</h5>

                      <div className="cat_row">
                        <span>Facilities</span>
                        <div className="cat_score">4.4</div>
                      </div>

                      <div className="cat_row">
                        <span>Food</span>
                        <div className="cat_score">4.2</div>
                      </div>

                      <div className="cat_row">
                        <span>Cleanliness</span>
                        <div className="cat_score">4.5</div>
                      </div>

                      <div className="cat_row">
                        <span>Value For Money</span>
                        <div className="cat_score">4.4</div>
                      </div>

                      <div className="cat_row">
                        <span>Child Friendliness</span>
                        <div className="cat_score">4.3</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">
                  <div className="review-summary-box">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt=""
                        width="18"
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">Review Summary</h6>
                        <small className="text-muted">Powered by Myra.AI</small>
                      </div>
                    </div>

                    <ul className="summary-list">
                      <li>Friendly and Helpful Staff</li>
                      <li>Clean and Spacious Rooms</li>
                      <li>Excellent Location Near Candolim Beach</li>
                      <li>Delicious and Diverse Breakfast Options</li>
                    </ul>

                    <a href="/" className="read-more">
                      Read more
                    </a>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                    <div>
                      <h6 className="mb-2 fw-bold">Filter By:</h6>

                      <div className="filter-chips">
                        <span className="chip active">All Reviews</span>
                        <span className="chip">Friendly staff</span>
                        <span className="chip">Staff Courtesy</span>
                        <span className="chip">Food</span>
                        <span className="chip">Delicious food</span>
                        <span className="chip">Good location</span>
                        <span className="chip">Comfortable stay</span>
                        <span className="chip">Room Cleanliness</span>
                        <span className="chip">Breakfast</span>
                        <span className="chip">Service Quality</span>
                        <span className="chip">Location</span>
                      </div>
                    </div>

                    <div className="sort-box">
                      <label className="fw-bold">Sort by:</label>
                      <select>
                        <option>Latest first</option>
                        <option>Oldest first</option>
                      </select>
                    </div>
                  </div>

                  <div className="review-card-new">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="rating-badge">5.0</span>
                      <h6 className="mb-0 fw-bold">Excellent Stay</h6>
                    </div>

                    <small className="text-muted">
                      Gowri K • Family With 1 Kid
                    </small>

                    <p className="review-text mt-2">
                      It’s very good hotel for family stay and beaches are in
                      walkable distance. We stayed 2nd time in this hotel and
                      it’s worthy
                    </p>

                    <p className="mb-1">
                      <strong>Travel Month:</strong> Mar 2026
                    </p>
                    <p>
                      <strong>Room:</strong> Luxe Twin Room
                    </p>

                    <div className="review-imgs">
                      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt=""/>
                      <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt=""/>
                      <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427" alt=""/>
                    </div>

                    <div className="helpful">Helpful 👍</div>
                  </div>

                  <div className="review_master_wrap">
                    <div className="review_single_box">
                      <div className="review_header">
                        <div className="rating-badge ">5.0</div>
                        <div className="review_title_wrap">
                          <h4>value for money!</h4>
                          <p>Manish G. • Couple</p>
                        </div>
                      </div>

                      <p className="review_desc">
                        I accidentally booked twin bedroom and Puja helped me to
                        change room. The hotel was clean and well taken care of!
                        It just needs change in breakfast. Same breakfast every
                        day doesn’t add to palate.
                      </p>

                      <p>
                        <strong>Travel Month:</strong> Mar 2026 (5-Night Stay)
                      </p>
                      <p>
                        <strong>Room:</strong> Luxe Twin Room-Tropical View
                      </p>

                      <div className="review_images">
                        <img src="https://picsum.photos/80?1" alt=""/>
                        <img src="https://picsum.photos/80?2" alt=""/>
                        <img src="https://picsum.photos/80?3" alt=""/>
                      </div>

                      <p className="helpful_btn">Helpful 👍</p>
                    </div>

                    <div className="review_single_box">
                      <div className="review_header">
                        <div className="rating-badge">5.0</div>
                        <div className="review_title_wrap">
                          <h4>Thanks really enjoy the stay</h4>
                          <p>Tanushree S. • Couple</p>
                        </div>
                      </div>

                      <p className="review_desc">
                        Suresh, Jocelyn, David and Chaitanya are really polite
                        and supportive. Thanks, I really enjoyed the stay. Thank
                        you for the wonderful stay.
                      </p>

                      <p>
                        <strong>Travel Month:</strong> Mar 2026
                      </p>
                      <p>
                        <strong>Room:</strong> Luxe Queen Room-Pool View
                      </p>

                      <div className="review_images">
                        <img src="https://picsum.photos/80?4" alt=""/>
                        <img src="https://picsum.photos/80?5" alt=""/>
                        <img src="https://picsum.photos/80?6" alt=""/>
                      </div>

                      <p className="helpful_btn">Helpful 👍</p>

                      <div className="hotel_reply_box">
                        <p className="reply_title">
                          Ginger Goa, Candolim{" "}
                          <span>
                            has replied on Tue Mar 24 09:46:09 IST 2026
                          </span>
                        </p>
                        <p>
                          Dear Guest, Thank you so much for your kind words! I’m
                          delighted to hear that you had a wonderful stay with
                          us. Suresh, Jocelyn, David, and Chaitanya will be
                          thrilled to know that their polite and supportive
                          service made your visit enjoyable.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
