import { Link } from "react-router-dom";
import { ServiceCategories } from "../../component/ServiceCategories/ServiceCategories";
import "./HotelFilter.css";
export const HotelFilter = () => {
  return (
    <div>
      <div className="bannerhotel" style={{ background: "url('/images/hotelbanner.png')"}}></div>

      <div className="jfdbvjfbv788">
        <section className="menu-section">
          <div className="container my-5">
            <ServiceCategories />

            <div className="flight-main-card">
              <div className="d-flex align-items-center gap-3 mb-3">
                <label>
                  <input type="radio" checked /> Upto 4 Rooms
                </label>
                <label>
                  <input type="radio" /> Group Deals{" "}
                  <span className="badge bg-danger">new</span>
                </label>
              </div>

              <div className="row align-items-center g-4">
                <div className="col-md-3">
                  <label>City, Property Name Or Location</label>
                  <input
                    type="text"
                    className="form-control hotel-input"
                    placeholder="Enter City (e.g Goa)"
                  />
                </div>

                <div className="col-md-2">
                  <label>Check-In</label>
                  <input
                    type="date"
                    id="checkin"
                    className="form-control hotel-input big-date"
                  />
                </div>

                <div className="col-md-2">
                  <label>Check-Out</label>
                  <input
                    type="date"
                    id="checkout"
                    className="form-control hotel-input big-date"
                  />
                </div>

                <div className="col-md-3">
                  <label>Rooms & Guests</label>
                  <select className="form-control hotel-input">
                    <option>1 Room 2 Adults</option>
                    <option>1 Room 1 Adult</option>
                    <option>2 Rooms 4 Adults</option>
                  </select>
                </div>

                <div className="col-md-2">
                  <label>Price Per Night</label>
                  <select className="form-control hotel-input">
                    <option>₹0 - ₹2500</option>
                    <option>₹2500 - ₹5000</option>
                    <option>₹5000+</option>
                  </select>
                </div>
              </div>

              {/* <!-- BUTTON -->
              <!--<div className="text-center mt-4">-->
              <!--  <button className="search-btn">SEARCH</button>-->
              <!--</div>--> */}
            </div>
          </div>
        </section>
        <div className="ghaadasd">
          <div className="text-center mt-4 ">
            <button className="flight-search-btn">SEARCH</button>
          </div>
        </div>
      </div>

      <div className="mainsection">
        <div className="container">
          <div className="dfdfgfg">
            <div className="row">
              <div className="col-lg-3">
                <button className="mobile-filter-btn" onclick="openFilter()">
                  <i className="fa-solid fa-sliders"></i> Filters
                </button>
                <div className="sdbfhsd55">
                  <div className="filter-box">
                    <div className="filter-header">
                      <h5>Filters</h5>
                      <span className="reset-btn">Reset</span>
                    </div>

                    <div className="filter-search">
                      <input type="text" placeholder="Search by Hotel Names" />
                    </div>

                    <div className="filter-section suggested-section">
                      <h6>Suggested For You</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Last Minute Deals
                        </label>
                        <span className="item-count">(217)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />5
                          Star
                        </label>
                        <span className="item-count">(217)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />4
                          Star
                        </label>
                        <span className="item-count">(397)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Breakfast Included
                        </label>
                        <span className="item-count">(1190)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />3
                          Star
                        </label>
                        <span className="item-count">(781)</span>
                      </div>
                    </div>

                    <div className="filter-section">
                      <h6>Price Per Night</h6>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹999 - ₹1999
                        </label>
                        <span className="item-count">(218)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹1100 - ₹1999
                        </label>
                        <span className="item-count">(342)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹1500 - ₹2999
                        </label>
                        <span className="item-count">(187)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹2000 - ₹2999
                        </label>
                        <span className="item-count">(264)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹2000 - ₹3500
                        </label>
                        <span className="item-count">(95)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          ₹3999 - ₹5999
                        </label>
                        <span className="item-count">(72)</span>
                      </div>

                      <div className="price-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          10000+
                        </label>
                        <span className="item-count">(21)</span>
                      </div>
                    </div>

                    <div className="budget-filter">
                      <label className="budget-label">Your Budget</label>

                      <div className="budget-row d-flex align-items-center gap-2">
                        <input
                          type="number"
                          className="budget-input"
                          placeholder="Min"
                        />
                        <span className="budget-sep">to</span>
                        <input
                          type="number"
                          className="budget-input"
                          placeholder="Max"
                        />

                        <button className="budget-btn">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/117/117472.png"
                            alt="Go"
                            className="arrow-img"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="filter-section suggested-section">
                      <h6>Star Category</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />3
                          Star
                        </label>
                        <span className="item-count">(781)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />4
                          Star
                        </label>
                        <span className="item-count">(397)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />5
                          Star
                        </label>
                        <span className="item-count">(217)</span>
                      </div>
                    </div>

                    <div className="filter-section suggested-section">
                      <h6>Property Type</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Apartment
                        </label>
                        <span className="item-count">(781)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Villa
                        </label>
                        <span className="item-count">(397)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Hotel
                        </label>
                        <span className="item-count">(217)</span>
                      </div>
                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Resort
                        </label>
                        <span className="item-count">(125)</span>
                      </div>
                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Homestay
                        </label>
                        <span className="item-count">(75)</span>
                      </div>
                    </div>

                    <div className="filter-section suggested-section">
                      <h6>Top locations</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          North Goa
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          South Goa
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Baga Beach
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Panjim
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Calangute Beach
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Candolim Beach
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Vagator
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Anjuna Beach
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Palolem Beach
                        </label>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Candolim
                        </label>
                      </div>
                    </div>

                    <div className="filter-section suggested-section">
                      <h6>Guests Love</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Wi‑Fi
                        </label>
                        <span className="item-count">(322)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Spa
                        </label>
                        <span className="item-count">(6)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Swimming Pool
                        </label>
                        <span className="item-count">(272)</span>
                      </div>

                      <div className="mt-1">
                        <Link to={'/'} className="show-more-link">
                          Show 13 more
                        </Link>
                      </div>
                    </div>

                    <div className="filter-section suggested-section mt-4">
                      <h6>Booking Preference</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Entire Villas & Apartments
                        </label>
                        <span className="item-count">(207)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Caretaker
                        </label>
                        <span className="item-count">(22)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Instant Book
                        </label>
                        <span className="item-count">(742)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Homestays
                        </label>
                        <span className="item-count">(829)</span>
                      </div>
                    </div>

                    <div className="filter-section suggested-section mt-4">
                      <h6>House Rules</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Self Check-In Available
                        </label>
                        <span className="item-count">(152)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Smoking Allowed
                        </label>
                        <span className="item-count">(529)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          All Male Groups Allowed
                        </label>
                        <span className="item-count">(326)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Unmarried Couples Allowed
                        </label>
                        <span className="item-count">(657)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Alcohol Allowed
                        </label>
                        <span className="item-count">(353)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Pets Allowed
                        </label>
                        <span className="item-count">(117)</span>
                      </div>
                    </div>

                    <div className="filter-section suggested-section mt-4">
                      <h6>Deals & Offers</h6>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Travel ka Muhurat Sale
                        </label>
                        <span className="item-count">(152)</span>
                      </div>

                      <div className="suggested-item">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          Lightning Drops
                        </label>
                        <span className="item-count">(529)</span>
                      </div>
                    </div>

                    <div className="sdnfhsdfsd">
                      <button>Back to Top</button>
                    </div>
                  </div>
                </div>
                <div className="filter-overlay" onclick="closeFilter()"></div>
              </div>
              <div className="col-lg-9">
                <div className="sebfghsfsdf">
                  <div className="gfetyy89">
                    <div className="sdhdss8899">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="fgfdfgd78">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="fbvhjd">
                                  <img src="./images/hotel3.png" alt="" />

                                  <div className="wishlist-icon">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                      alt="heart"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="dsbhjsdsf">
                                  <h4>
                                    Fairfield by Marriott Mumbai Andheri West
                                  </h4>
                                  <h6>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    Bandra west , Mumbai
                                  </h6>
                                  <p>
                                    Breakfast buffet features good variety,
                                    restaurant offers quality food, bakery and
                                    cafe includes a 24-hour coffee shop
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="njhbfsf">
                            <div className="vbhsf">
                              <h4>Excellent </h4>
                              <p>4.5/5</p>
                            </div>
                            <div className="sdknhf55">
                              <p>(655 Ratings)</p>
                            </div>
                            <div className="fdjvfd78">
                              <p>
                                From <span>₹2299 </span>
                              </p>
                            </div>
                            <div className="vdfv785">
                              <p>+ ₹ 3,543 taxes & fees per night</p>
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
                            <div className="sdbds86">
                              <button>View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hddssd78">
                        <h6>Long Stay Benefits</h6>
                        <p>
                          20% off on session of Spa 20% off on Food & Beverage
                          services 20% Off on Laundry service for upto 2
                          clothing item(s)
                        </p>
                      </div>
                    </div>
                    <div className="tfty885r">
                      <h6>SBI Debit Card Offer - Get INR 5000 Off!</h6>
                    </div>
                  </div>

                  <div className="gfetyy89">
                    <div className="sdhdss8899">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="fgfdfgd78">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="fbvhjd">
                                  <img src="./images/hotel1.png" alt="" />

                                  <div className="wishlist-icon">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                      alt="heart"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="dsbhjsdsf">
                                  <h4>
                                    Fairfield by Marriott Mumbai Andheri West
                                  </h4>
                                  <h6>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    Bandra west ,Mumbai
                                  </h6>
                                  <p>
                                    Breakfast buffet features good variety,
                                    restaurant offers quality food, bakery and
                                    cafe includes a 24-hour coffee shop
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="njhbfsf">
                            <div className="vbhsf">
                              <h4>Excellent </h4>
                              <p>4.5/5</p>
                            </div>
                            <div className="sdknhf55">
                              <p>(655 Rating)</p>
                            </div>
                            <div className="fdjvfd78">
                              <p>
                                From <span>₹2299 </span>
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
                            <div className="sdbds86">
                              <button>View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="hddssd78">
                        <h6>Long Stay Benefits</h6>
                        <p>
                          20% off on session of Spa 20% off on Food & Beverage
                          services 20% Off on Laundry service for upto 2
                          clothing item(s)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="gfetyy89">
                    <div className="sdhdss8899">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="fgfdfgd78">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="fbvhjd">
                                  <img src="./images/hotel4.jpg" alt="" />

                                  <div className="wishlist-icon">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                      alt="heart"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="dsbhjsdsf">
                                  <h4>
                                    Fairfield by Marriott Mumbai Andheri West
                                  </h4>
                                  <h6>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    Bandra west ,Mumbai
                                  </h6>
                                  <p>
                                    Breakfast buffet features good variety,
                                    restaurant offers quality food, bakery and
                                    cafe includes a 24-hour coffee shop
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          <div className="njhbfsf">
                            <div className="vbhsf">
                              <h4>Excellent </h4>
                              <p>4.5/5</p>
                            </div>
                            <div className="sdknhf55">
                              <p>(655 Rating)</p>
                            </div>
                            <div className="fdjvfd78">
                              <p>
                                From <span>₹2299 </span>
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
                            <div className="sdbds86">
                              <button>View Details</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="gfetyy89">
                    <div className="sdhdss8899">
                      <div className="row">
                        <div className="col-lg-9">
                          <div className="fgfdfgd78">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="fbvhjd">
                                  <img src="./images/hotel2.png" alt="" />

                                  <div className="wishlist-icon">
                                    <img
                                      src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                                      alt="heart"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="dsbhjsdsf">
                                  <h4>
                                    Fairfield by Marriott Mumbai Andheri West
                                  </h4>
                                  <h6>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    Bandra west ,Mumbai
                                  </h6>
                                  <p>
                                    Breakfast buffet features good variety,
                                    restaurant offers quality food, bakery and
                                    cafe includes a 24-hour coffee shop
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3">
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
                                From <span>₹2299 </span>
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
                            <div className="sdbds86">
                              <button>View Details</button>
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
        </div>
      </div>
    </div>
  );
};
