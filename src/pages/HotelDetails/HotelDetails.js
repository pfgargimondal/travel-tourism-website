import React, { useEffect, useState } from "react";
import "./HotelDetails.css";
import { useParams, useSearchParams } from "react-router-dom";
import http from "../../http";
import Loader from "../../component/Loader/Loader";

export const HotelDetails = () => {

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [hotelDetails, setHotelDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);


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
      <div class="bannerhotel" style={{ background: "url('/images/hotelbanner.png') center center/cover no-repeat"}}>
        <div class="container">
          <div class="sdghsd">
            <h2>Hotel Details</h2>
          </div>
        </div>
      </div>

      <div class="cndscds455">
        <div class="container">
          <div class="jhfbdsfdsf">
            <div class="row">
              <div class="col-lg-9">
                <div class="bhjdsfds">
                  <div class="sdbhjsdfds">
                    <h2>
                      {hotelDetails?.hotel_name}
                    </h2>
                    <div class="sbfsdvfsf">
                      <div class="vfddf">
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
                      <div class="fdfdf5">
                        <p>star</p>
                      </div>
                    </div>
                  </div>

                  <div class="fbhjsfsdf88">
                    <div class="row">
                      <div class="col-lg-8">
                        <div class="bhjddsfs">
                          <img src={hotelDetails?.image} alt="" />
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="dfsdf542">
                          {hotelDetails?.hotel_images?.slice(0, 2).map((hotelImage, index, arr) => (
                            <div className="hgcghghvfhg" key={index}>
                              <img
                                src={hotelImage.image_url}
                                alt=""
                                style={
                                  index === arr.length - 1
                                    ? {
                                        marginTop: "10px",
                                      }
                                    : {}
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="dsvbjhdvsdc">
                    <h5>About Property</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: cleanDescription,
                      }}
                    />
                  </div>

                  <div class="amenities-top d-flex gap-3 mb-3 mt-3">
                    <button class="amenity-btn">
                      <img src="./images/prop1 (1).png" alt=""/>
                      Property Highlights
                    </button>

                    <button class="amenity-btn">
                      <img src="./images/prop1 (2).png" alt=""/>
                      Activities & Nearby Attractions
                    </button>
                  </div>

                  <h2 class="amenities-title">Amenities</h2>

                  <div class="amenities-list d-flex align-items-center flex-wrap gap-4">
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
                    {/* <div class="amenity-item">
                      <img src="./images/swimming-pool.png" alt=""/>
                      <span>Swimming Pool</span>
                    </div>

                    <div class="amenity-item">
                      <img src="./images/wifi.png" alt=""/>
                      <span>Free Wifi</span>
                    </div>

                    <div class="amenity-item">
                      <img src="./images/power.png" alt=""/>
                      <span>Power Back up</span>
                    </div>

                    <div class="amenity-item">
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

                  <div class="hddssd78">
                    <h6>Long Stay Benefits</h6>
                    <p>
                      20% off on session of Spa 20% off on Food & Beverage
                      services 20% Off on Laundry service for upto 2 clothing
                      item(s)
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="vfvfdvfd55">
                  <div class="sidebar-card mb-3">
                    <h6 class="room-title">Bed in 8 Bed Mixed Dormitory</h6>

                    <div class="small text-muted">Fits 1 Adult</div>
                    <div class="small text-muted mb-2">Non-Refundable</div>

                    <div class="small text-muted">Per Night</div>

                    <div class="price">
                      ₹ 419 <span>Fits 1 Adult</span>
                    </div>

                    <button class="book-btn">Book This Now</button>

                    <div class="d-flex justify-content-between mt-2 align-items-center">
                      <small class="text-muted">Non-Refundable</small>
                      <button class="view-btn">View All (8)</button>
                    </div>
                  </div>

                  <div class="sidebar-card">
                    <div class="d-flex align-items-center mb-2">
                      <div class="rating-box">4.3</div>
                      <div class="ms-2">
                        <strong>Excellent</strong>
                        <span class="small text-muted">(412 Ratings)</span>
                        <br />
                        <a href="/" class="review-link">
                          All Reviews
                        </a>
                      </div>
                    </div>

                    <hr />

                    <div class="d-flex align-items-center mb-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                        class="map-icon" alt=""
                      />
                      <div class="ms-2">
                        <strong>Apporo</strong>
                        <br />
                        <span class="small text-muted">
                          3.7 km drive to Anjuna Beach
                        </span>
                      </div>
                    </div>

                    <div class="map-img">
                      <iframe
                        src="https://www.google.com/maps?q=Anjuna+Beach&output=embed"
                        allowfullscreen=""
                        loading="lazy"
                        title="map"
                      ></iframe>
                    </div>

                    <div class="deal-box mt-2">
                      <div class="deal-badge">5 Minutes Deal</div>
                      <p class="small mt-2 mb-0">
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

      <div class="dbvhjdxcxbvdxsvsdfs">
        <div class="container">
          <div class="vdsjhbdsfsd">
            <div class="gfetyy89">
              <div class="sdhdss8899">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="fgfdfgd78">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="dshfdsfs58788">
                            <div class="fbvhjd">
                              <img src="./images/hotel3.png" alt="" />

                              <div class="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div class="bhjvgasds54">
                              <div class="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div class="feature-row highlight">
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
                            <div class="amenities_wrap_box">
                              <ul class="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" class="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
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
                  <div class="col-lg-4">
                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹3699 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
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

      <div class="dbvhjdxcxbvdxsvsdfs">
        <div class="container">
          <div class="vdsjhbdsfsd">
            <div class="gfetyy89">
              <div class="sdhdss8899">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="fgfdfgd78">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="dshfdsfs58788">
                            <div class="fbvhjd">
                              <img src="./images/hotel1.png" alt="" />

                              <div class="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div class="bhjvgasds54">
                              <div class="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div class="feature-row highlight">
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
                            <div class="amenities_wrap_box">
                              <ul class="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" class="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
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
                  <div class="col-lg-4">
                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹2399 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹2799 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
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

      <div class="dbvhjdxcxbvdxsvsdfs">
        <div class="container">
          <div class="vdsjhbdsfsd">
            <div class="gfetyy89">
              <div class="sdhdss8899">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="fgfdfgd78">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="dshfdsfs58788">
                            <div class="fbvhjd">
                              <img src="./images/hotel4.jpg" alt="" />

                              <div class="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div class="bhjvgasds54">
                              <div class="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div class="feature-row highlight">
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
                            <div class="amenities_wrap_box">
                              <ul class="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" class="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
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
                  <div class="col-lg-4">
                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹3199 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹3399 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹4299 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
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
      <div class="dbvhjdxcxbvdxsvsdfs">
        <div class="container">
          <div class="vdsjhbdsfsd">
            <div class="gfetyy89">
              <div class="sdhdss8899">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="fgfdfgd78">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="dshfdsfs58788">
                            <div class="fbvhjd">
                              <img src="./images/hotel5 (2).png" alt="" />

                              <div class="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div class="bhjvgasds54">
                              <div class="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div class="feature-row highlight">
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
                            <div class="amenities_wrap_box">
                              <ul class="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" class="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
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
                  <div class="col-lg-4">
                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹2799 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹4199 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹4399 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
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

      <div class="dbvhjdxcxbvdxsvsdfs">
        <div class="container">
          <div class="vdsjhbdsfsd">
            <div class="gfetyy89">
              <div class="sdhdss8899">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="fgfdfgd78">
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="dshfdsfs58788">
                            <div class="fbvhjd">
                              <img src="./images/hotel5 (1).png" alt="" />

                              <div class="wishlist-icon">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                  alt="heart"
                                />
                              </div>
                            </div>
                            <div class="bhjvgasds54">
                              <div class="sdbhjdsd">
                                <h4>
                                  Fairfield by Marriott Mumbai Andheri West
                                </h4>
                              </div>
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (1).png"
                                    alt="Square footage"
                                  />
                                  <span>280 sq.ft (26 sq.mt)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (2).png"
                                    alt="View type"
                                  />
                                  <span>Courtyard View</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (3).png"
                                    alt="Beds"
                                  />
                                  <span>2 Single Bed(s)</span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (4).png"
                                    alt="Bathroom"
                                  />
                                  <span>1 Bathroom</span>
                                </div>

                                <div class="feature-row highlight">
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
                            <div class="amenities_wrap_box">
                              <ul class="amenities_list">
                                <li>Mineral Water</li>
                                <li>Air Conditioning</li>
                                <li>Housekeeping</li>
                                <li>In-room Dining</li>
                                <li>Iron/Ironing Board</li>
                                <li>Wi-Fi</li>
                              </ul>

                              <a href="/" class="amenities_more_link">
                                More Details
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room Only</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
                                  <h6>Experiences Included</h6>
                                  <p>
                                    Enjoy Happy Hours with 1+1 offer on
                                    Alcoholic Drinks, Soft Beverages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="fdgfdgdfg7885">
                            <div class="dsbhjsdsf">
                              <h4>Room with Breakfast + Lunch/Dinner</h4>
                            </div>
                            <div class="dnhjd54564">
                              <div class="room-features">
                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (5).png"
                                    alt="Square footage"
                                  />
                                  <span>
                                    10% off on 1 session of 90 mins Spa  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (6).png"
                                    alt="View type"
                                  />
                                  <span>
                                    15% off on Food & Beverage services  
                                  </span>
                                </div>

                                <div class="feature-row">
                                  <img
                                    src="./images/iconstw (7).png"
                                    alt="Beds"
                                  />
                                  <span>Breakfast included  </span>
                                </div>
                                <div class="feature-row">
                                  <img
                                    src="images/iconstw (8).png"
                                    alt="Bathroom"
                                  />
                                  <span>Lunch Or Dinner included  </span>
                                </div>

                                <div class="sdhbfdsfsfd">
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
                  <div class="col-lg-4">
                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹2899 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹3799 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
                        <button>Book Now</button>
                      </div>
                    </div>

                    <div class="njhbfsf">
                      <div class="vbhsf">
                        <h4>Excellent</h4>
                        <p>4.5/5</p>
                      </div>
                      <div class="sdknhf55">
                        <p>(655 Rating)</p>
                      </div>
                      <div class="fdjvfd78">
                        <p>
                          From <span>₹3599 </span>
                        </p>
                      </div>
                      <div class="vdfv785">
                        <p>+ ₹ 3,543 taxes & fees per Night</p>
                      </div>
                      <div class="sbfsdvfsf">
                        <div class="vfddf">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="fdfdf5">
                          <p>star</p>
                        </div>
                      </div>
                      <div class="sdbds86uu">
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

      <div class="sdjdhbchjdc">
        <section class="location-section mt-4">
          <div class="container">
            <div class="hvbjhs785">
              <div class="location-header mb-3">
                <h5 class="fw-bold">Location</h5>
                <p class="mb-1">
                  Address: 195/23-A/B, Candolim Main Road, Near Lawande Super
                  Market, Anna Waddo, Candolim, Saligao, North Goa, Goa
                </p>
                <p class="text-muted">9 minutes walk to Candolim Beach</p>
              </div>

              <div class="row">
                <div class="col-lg-3">
                  <div class="location-left">
                    <div class="mb-3 position-relative">
                      <input
                        type="text"
                        class="form-control search-input"
                        placeholder="Search in Goa"
                      />
                      <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    </div>

                    <div class="d-flex gap-3 mb-2 small fw-semibold">
                      <span class="active-tab">Key Landmarks</span>
                    </div>

                    <div class="landmark-list">
                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Candolim Beach</span>
                        </label>
                        <span class="distance walk">9 min walk →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Calangute Beach</span>
                        </label>
                        <span class="distance km">1.5 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Baga Beach</span>
                        </label>
                        <span class="distance km">4.3 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Aguada Fort</span>
                        </label>
                        <span class="distance km">6 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Anjuna Beach</span>
                        </label>
                        <span class="distance km">9.3 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Vagator Beach</span>
                        </label>
                        <span class="distance km">11.3 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Miramar Beach</span>
                        </label>
                        <span class="distance km">16.8 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Morjim Beach</span>
                        </label>
                        <span class="distance km">18.6 km →</span>
                      </div>

                      <div class="landmark-item d-flex justify-content-between align-items-center">
                        <label class="d-flex align-items-center gap-2">
                          <input type="checkbox" />
                          <span>Dona Paula Beach</span>
                        </label>
                        <span class="distance km">19.1 km →</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-9">
                  <div class="map-box">
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

      <div class="dhjdsds788">
        <section class="property-rules-section mt-4">
          <div class="container">
            <div class="rules-box p-4">
              <div class="mb-3">
                <h5 class="fw-bold">Property Rules</h5>
                <p class="mb-0">
                  <strong>Check-in:</strong> 2 PM &nbsp;&nbsp;
                  <strong>Check-out:</strong> 12 PM
                </p>
              </div>

              <hr />

              <div class="row mt-3">
                <div class="col-lg-6">
                  <div class="rules-tag mb-3">❤️ Couple/Bachelor Rules</div>

                  <div class="rules-highlight mb-3">
                    Unmarried couples allowed. Local ids are allowed
                  </div>

                  <ul class="rules-list">
                    <li>Primary Guest should be atleast 18 years of age.</li>
                    <li>
                      Groups with only male guests are allowed at the property
                    </li>
                  </ul>
                </div>

                <div class="col-lg-6">
                  <ul class="rules-list">
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

              <div class="mt-3 d-flex gap-2 flex-wrap">
                <button class="rule-btn">Must Read Rules</button>
                <button class="rule-btn">Guest Profile</button>
                <button class="rule-btn">Guest Profile (Hourly)</button>
                <a href="/" class="read-all">
                  Read All Property Rules
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="dbydfff854">
        <section class="guest-gallery-section mt-4">
          <div class="container">
            <div class="gallery-box p-3">
              <h5 class="fw-bold mb-3">Photos by Guests</h5>

              <div class="row g-3">
                <div class="col">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    class="gallery-img" alt=""
                  />
                </div>

                <div class="col">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
                    class="gallery-img" alt=""
                  />
                </div>

                <div class="col">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427"
                    class="gallery-img" alt=""
                  />
                </div>

                <div class="col">
                  <img
                    src="https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                    class="gallery-img" alt=""
                  />
                </div>

                <div class="col position-relative">
                  <img
                    src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
                    class="gallery-img overlay-img" alt=""
                  />

                  <div class="overlay-text" onclick="openGallery()">
                    +1484 Guest Photos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div id="galleryModal" class="gallery-modal">
          <span class="close-btn" onclick="closeGallery()">
            &times;
          </span>

          <div class="modal-content-custom">
            <img id="modalImage" src="" alt=""/>
          </div>

          <div class="gallery-thumbs">
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

      <div class="hjdbjhfd885">
        <section class="review-section mt-4">
          <div class="container">
            <div class="review-box p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold">User Rating & Reviews</h5>
                <span class="verified">✔ Verified Reviews</span>
              </div>

              <div class="review-tabs mb-3">
                <span class="active">Everyone</span>
                <span>Group</span>
                <span>Couple</span>
                <span>Solo</span>
                <span>Business</span>
                <span>Family</span>
              </div>

              <div class="row">
                <div class="col-lg-4">
                  <div class="rating_sidebar_box">
                    <div class="rating_top">
                      <div class="rating_score">4.3</div>
                      <div>
                        <h4>Excellent</h4>
                        <p>2540 Ratings, 1352 Reviews</p>
                      </div>
                    </div>

                    <div class="rating_bar_wrap">
                      <div class="rating_row">
                        <span>Excellent</span>
                        <div class="bar">
                          <div style={{ width: "60%" }}></div>
                        </div>
                        <span>60%</span>
                      </div>

                      <div class="rating_row">
                        <span>Very Good</span>
                        <div class="bar">
                          <div style={{ width: "24%" }}></div>
                        </div>
                        <span>24%</span>
                      </div>

                      <div class="rating_row">
                        <span>Average</span>
                        <div class="bar">
                          <div style={{ width: "9%" }}></div>
                        </div>
                        <span>9%</span>
                      </div>

                      <div class="rating_row">
                        <span>Poor</span>
                        <div class="bar">
                          <div style={{ width: "4%" }}></div>
                        </div>
                        <span>4%</span>
                      </div>

                      <div class="rating_row">
                        <span>Bad</span>
                        <div class="bar">
                          <div style={{ width: "3%" }}></div>
                        </div>
                        <span>3%</span>
                      </div>
                    </div>

                    <hr />

                    <div class="last_ratings">
                      <h5>
                        Last 10 Customer Ratings <span>(Latest First)</span>
                      </h5>

                      <div class="rating_boxes">
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

                    <div class="rating_categories">
                      <h5>Rating Categories</h5>

                      <div class="cat_row">
                        <span>Facilities</span>
                        <div class="cat_score">4.4</div>
                      </div>

                      <div class="cat_row">
                        <span>Food</span>
                        <div class="cat_score">4.2</div>
                      </div>

                      <div class="cat_row">
                        <span>Cleanliness</span>
                        <div class="cat_score">4.5</div>
                      </div>

                      <div class="cat_row">
                        <span>Value For Money</span>
                        <div class="cat_score">4.4</div>
                      </div>

                      <div class="cat_row">
                        <span>Child Friendliness</span>
                        <div class="cat_score">4.3</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-8">
                  <div class="review-summary-box">
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt=""
                        width="18"
                      />
                      <div>
                        <h6 class="mb-0 fw-bold">Review Summary</h6>
                        <small class="text-muted">Powered by Myra.AI</small>
                      </div>
                    </div>

                    <ul class="summary-list">
                      <li>Friendly and Helpful Staff</li>
                      <li>Clean and Spacious Rooms</li>
                      <li>Excellent Location Near Candolim Beach</li>
                      <li>Delicious and Diverse Breakfast Options</li>
                    </ul>

                    <a href="/" class="read-more">
                      Read more
                    </a>
                  </div>

                  <hr />

                  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                    <div>
                      <h6 class="mb-2 fw-bold">Filter By:</h6>

                      <div class="filter-chips">
                        <span class="chip active">All Reviews</span>
                        <span class="chip">Friendly staff</span>
                        <span class="chip">Staff Courtesy</span>
                        <span class="chip">Food</span>
                        <span class="chip">Delicious food</span>
                        <span class="chip">Good location</span>
                        <span class="chip">Comfortable stay</span>
                        <span class="chip">Room Cleanliness</span>
                        <span class="chip">Breakfast</span>
                        <span class="chip">Service Quality</span>
                        <span class="chip">Location</span>
                      </div>
                    </div>

                    <div class="sort-box">
                      <label class="fw-bold">Sort by:</label>
                      <select>
                        <option>Latest first</option>
                        <option>Oldest first</option>
                      </select>
                    </div>
                  </div>

                  <div class="review-card-new">
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="rating-badge">5.0</span>
                      <h6 class="mb-0 fw-bold">Excellent Stay</h6>
                    </div>

                    <small class="text-muted">
                      Gowri K • Family With 1 Kid
                    </small>

                    <p class="review-text mt-2">
                      It’s very good hotel for family stay and beaches are in
                      walkable distance. We stayed 2nd time in this hotel and
                      it’s worthy
                    </p>

                    <p class="mb-1">
                      <strong>Travel Month:</strong> Mar 2026
                    </p>
                    <p>
                      <strong>Room:</strong> Luxe Twin Room
                    </p>

                    <div class="review-imgs">
                      <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945" alt=""/>
                      <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" alt=""/>
                      <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427" alt=""/>
                    </div>

                    <div class="helpful">Helpful 👍</div>
                  </div>

                  <div class="review_master_wrap">
                    <div class="review_single_box">
                      <div class="review_header">
                        <div class="rating-badge ">5.0</div>
                        <div class="review_title_wrap">
                          <h4>value for money!</h4>
                          <p>Manish G. • Couple</p>
                        </div>
                      </div>

                      <p class="review_desc">
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

                      <div class="review_images">
                        <img src="https://picsum.photos/80?1" alt=""/>
                        <img src="https://picsum.photos/80?2" alt=""/>
                        <img src="https://picsum.photos/80?3" alt=""/>
                      </div>

                      <p class="helpful_btn">Helpful 👍</p>
                    </div>

                    <div class="review_single_box">
                      <div class="review_header">
                        <div class="rating-badge">5.0</div>
                        <div class="review_title_wrap">
                          <h4>Thanks really enjoy the stay</h4>
                          <p>Tanushree S. • Couple</p>
                        </div>
                      </div>

                      <p class="review_desc">
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

                      <div class="review_images">
                        <img src="https://picsum.photos/80?4" alt=""/>
                        <img src="https://picsum.photos/80?5" alt=""/>
                        <img src="https://picsum.photos/80?6" alt=""/>
                      </div>

                      <p class="helpful_btn">Helpful 👍</p>

                      <div class="hotel_reply_box">
                        <p class="reply_title">
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
