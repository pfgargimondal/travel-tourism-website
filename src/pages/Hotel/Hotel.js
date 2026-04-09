import { useEffect, useMemo, useState } from "react";
import { ServiceCategories } from "../../component/ServiceCategories/ServiceCategories";
import http from "../../http";
import "./Hotel.css";
export const Hotel = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  // eslint-disable-next-line
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const stateImages = {
    goa: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    kerala: "https://images.unsplash.com/photo-1576485375217-d6a95e34d043",
    rajasthan: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    maharashtra: "https://images.unsplash.com/photo-1595658658481-d53d3f999875",
    gujarat: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    tamilnadu: "https://images.unsplash.com/photo-1558431382-27e303142255",
    punjab: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    tripura: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    lakshadweep: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    uttarpradesh: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    mizoram: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  };

  const fetchCities = async () => {
    try {
      const response = await http.post("city-list", {
        CountryCode: "IN",
      });

    setCities(response?.data?.data?.CityList || []);
    } catch (error) {
      console.error("City API Error:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);


  const uniqueCities = useMemo(() => {
    return [
      ...new Map(
        cities.map((city) => {
          const stateName =
            city.Name.split(",")[1]?.trim() || city.Name;

          return [stateName.toLowerCase(), city];
        })
      ).values(),
    ];
  }, [cities]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter((city) =>
      city.Name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCities(filtered.slice(0, 10));
  }, [search, cities]);

  const formatStateName = (name) => {
    if (!name) return "";

    const state = name.split(",")[1]?.trim() || name;

    return state
      .replace(/^north\s+/i, "")
      .replace(/^south\s+/i, "")
      .replace(/^east\s+/i, "")
      .replace(/^west\s+/i, "")
      .trim();
    };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSearch(city.Name);
    setShowDropdown(false);
  };

  return (
    <div>
      <div class="bannerhotel" style={{ background: "url('/images/hotelbanner.png')"}}></div>

      <div class="jfdbvjfbv788">
        <section class="menu-section">
          <div class="container my-5">
            <ServiceCategories />

            <div class="flight-main-card">
              <div class="d-flex align-items-center gap-3 mb-3">
                <label>
                  <input type="radio" checked /> Upto 4 Rooms
                </label>
                <label>
                  <input type="radio" /> Group Deals{" "}
                  <span class="badge bg-danger">new</span>
                </label>
              </div>

              <div class="row align-items-center g-4">
                <div class="col-md-3 position-relative">
                  <label>City, Property Name Or Location</label>
                  <input
                      type="text"
                      className="form-control hotel-input"
                      placeholder="Enter City (e.g Goa)"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true);
                      }}
                    />

                    {showDropdown && filteredCities.length > 0 && (
                      <div className="city-dropdown">
                        {filteredCities.map((city) => (
                          <div
                            key={city.Code}
                            className="city-item"
                            onClick={() => handleSelectCity(city)}
                          >
                            {city.Name}
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <div class="col-md-2">
                  <label>Check-In</label>
                  <input
                    type="date"
                    id="checkin"
                    class="form-control hotel-input big-date"
                  />
                </div>

                <div class="col-md-2">
                  <label>Check-Out</label>
                  <input
                    type="date"
                    id="checkout"
                    class="form-control hotel-input big-date"
                  />
                </div>

                <div class="col-md-3">
                  <label>Rooms & Guests</label>
                  <select class="form-control hotel-input">
                    <option>1 Room 2 Adults</option>
                    <option>1 Room 1 Adult</option>
                    <option>2 Rooms 4 Adults</option>
                  </select>
                </div>

                <div class="col-md-2">
                  <label>Price Per Night</label>
                  <select class="form-control hotel-input">
                    <option>₹0 - ₹2500</option>
                    <option>₹2500 - ₹5000</option>
                    <option>₹5000+</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="ghaadasd">
          <div class="text-center mt-4 ">
            <button class="flight-search-btn">SEARCH</button>
          </div>
        </div>
      </div>

      <div class="hhsdfh58558">
        <section class="hotel-section">
          <div class="container">
            <div class="section-header">
              <div>
                <h2>For your stay in Mumbai</h2>
                <p>Wed, 08 Apr 26 - Thu, 09 Apr 26</p>
              </div>

              <div class="controls">
                <button id="prevBtn">
                  <i class="fa-solid fa-angle-left"></i>
                </button>
                <button id="nextBtn">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div class="slider-wrapper">
              <div class="slider" id="slider">
                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1566073771259-6a8506099945" />
                    <span class="rating">3.9/5</span>
                  </div>
                  <div class="card-body">
                    <h4>The Orchid Hotel Mumbai</h4>
                    <p>Santa Cruz ⭐⭐⭐⭐⭐</p>
                    <div class="price">
                      ₹10,980 <span>per night</span>
                    </div>
                  </div>
                </div>

                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" />
                    <span class="rating">4.4/5</span>
                  </div>
                  <div class="card-body">
                    <h4>JW Marriott Mumbai Sahar</h4>
                    <p>Vile Parle ⭐⭐⭐⭐⭐</p>
                    <div class="price">₹25,000</div>
                  </div>
                </div>

                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa" />
                    <span class="rating">4.7/5</span>
                  </div>
                  <div class="card-body">
                    <h4>Trident Bandra Kurla</h4>
                    <p>Bandra ⭐⭐⭐⭐⭐</p>
                    <div class="price">₹22,050</div>
                  </div>
                </div>

                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" />
                    <span class="rating">4/5</span>
                  </div>
                  <div class="card-body">
                    <h4>The Lalit Mumbai</h4>
                    <p>Navpada ⭐⭐⭐⭐⭐</p>
                    <div class="price">₹14,850</div>
                  </div>
                </div>

                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1590490360182-c33d57733427" />
                    <span class="rating">4.2/5</span>
                  </div>
                  <div class="card-body">
                    <h4>Lemon Tree Premier</h4>
                    <p>Airport ⭐⭐⭐⭐⭐</p>
                    <div class="price">₹12,000</div>
                  </div>
                </div>

                <div class="hotel-card">
                  <div class="img-box">
                    <img alt="" src="https://images.unsplash.com/photo-1590490360182-c33d57733427" />
                    <span class="rating">4.2/5</span>
                  </div>
                  <div class="card-body">
                    <h4>Lemon Tree Premier</h4>
                    <p>Airport ⭐⭐⭐⭐⭐</p>
                    <div class="price">₹12,000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="xfyhgfd52">
        <section class="destination-section">
          <div class="container">
            <h2 class="title">Book Hotels At Popular Destinations</h2>

            <div class="row g-4">
              {uniqueCities.slice(0, 12).map((city) => {
                const stateName = formatStateName(city.Name);

                const imageUrl =
                  stateImages[
                    stateName.toLowerCase().replace(/\s+/g, "")
                  ] ||
                  "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

                return (
                  <div className="col-lg-4 col-md-6" key={city.Code}>
                    <div className="destination-card-hotel">
                      <img
                        alt={stateName}
                        src={imageUrl}
                        className="img-fluid"
                      />

                      <div className="contentdrgfg">
                        <h5>{stateName}</h5>
                        <p>
                          Hotels, Budget Hotels, 3 Star Hotels,
                          <br />
                          4 Star Hotels, 5 Star Hotels
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div class="text-center mt-4">
              <button class="view-btn">View More</button>
            </div>
          </div>
        </section>
      </div>

      <div class="njhfbsdf75">
        <section class="hotel-chain-section">
          <div class="container">
            <h2>Our Top Hotel Chains</h2>

            <p class="desc">
              EaseMyTrip has a wide range of luxury and budget-friendly hotel
              chain properties. We have picked the finest hotels in India with
              world-class amenities. We bring you not only a stay option, but an
              experience in your budget to enjoy the luxury. We make sure that
              all the hotels are safe, hygienic, comfortable, and easily
              approachable when it comes to location. Book your hotel with
              EaseMyTrip and don’t forget to grab an amazing hotel deal to save
              huge on your stay.
            </p>

            <div class="logo-grid">
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/amritara-hotel-hp.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/the-byke-hotels-hp-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/tree-house-group-hp-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/treat-hotel-logo-25-c.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/sterling-hotels-17june24-hp-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/spree-hotels-hp.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/Justa-Hotel-logo.webp" />
              </div>

              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/7-Apple-Group-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/sumi-hotel-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/sinclairs-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/mount-hotels-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/zone-the-park-04-04-25-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/Hotel-Sonar-Bangla-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://logo.clearbit.com/clarkshotels.com" />
              </div>

              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/voyage-hotels-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/dls-hotels-logo.webp" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://www.easemytrip.com/images/emt-sale/lords-hotels.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/elivaas-hotel-logo.png" />
              </div>
              <div class="logo-box">
                <img alt="" src="https://images.emtcontent.com/hotel-img/C-H-R-logo-b.png" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="dghfdvs55">
        <section class="deal-section">
          <div class="container">
            <div class="deal-box">
              <div class="deal-content">
                <h2>
                  Cheapest Deals on Budget & Luxury Hotels are Available at
                  EaseMyTrip
                </h2>

                <p>
                  Due to the huge influx of tourists in India, EaseMyTrip offers
                  a wide range of luxury, deluxe and budget hotels to them.
                  Choose to stay in luxury and comfort with the greatest
                  discounts available on hotel bookings. We list the classiest
                  budget hotels on our site along with some of the prominent
                  international hotel chains of India including Oberoi Group,
                  ITC Group, Taj Group, Le Meridian Group and many others.
                  Ranging from class hotels to luxury beach resorts, each hotel
                  on our site gives you a memorable staying experience. Along
                  with deluxe, budget and luxury hotels, EaseMyTrip also
                  displays a number of heritage hotels that offer you a royal
                  stay. Enjoy cheap hotel deals for any destination with great
                  savings.
                </p>

                <button class="read-btn">Read More</button>
              </div>

              <div class="deal-image">
                <img
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60"
                  alt="hotel"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="section-wrapper">
        <div class="container">
          <div class="row align-items-start">
            <div class="col-lg-5">
              <div class="left-heading mb-4">
                <h5>
                  Trusted Solution Of Your <br />
                  <span>Tourism Services</span>
                </h5>
              </div>

              <div class="feature-card vip">
                <div class="icon-box">
                  <i class="bi bi-bag-check"></i>
                </div>
                <div>
                  <h6>VIP Packages</h6>
                  <p>
                    Include premium seating, meet-and-greet experiences,
                    backstage tours.
                  </p>
                </div>
              </div>

              <div class="feature-card travel">
                <div class="icon-box">
                  <i class="bi bi-airplane"></i>
                </div>
                <div>
                  <h6>Travel Packages</h6>
                  <p>Bundles that include concert tickets, accommodations.</p>
                </div>
              </div>

              <div class="feature-card price1">
                <div class="icon-box">
                  <i class="bi bi-geo-alt"></i>
                </div>
                <div>
                  <h6>Best Price Guarantee</h6>
                  <p>Such as private rehearsals, soundcheck access.</p>
                </div>
              </div>
            </div>

            <div class="col-lg-7">
              <span class="badge-custom">Most Popular Providers</span>
              <h3 class="right-title">Try Relaxing Accomodations.</h3>

              <div class="faq-accordion">
                <div class="faq-item active">
                  <div class="faq-question">
                    What types of tours do you offer?
                    <span class="faq-icon">+</span>
                  </div>
                  <div class="faq-answer">
                    We offer a wide range of tours, including cultural,
                    adventure, luxury, and customized itineraries. Popular
                    destinations include Europe, Africa (e.g., Morocco).
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    Are the tours customizable?
                    <span class="faq-icon">+</span>
                  </div>
                  <div class="faq-answer">
                    Yes, we customize tours according to your preferences,
                    travel dates, and budget.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    What safety measures do you follow?
                    <span class="faq-icon">+</span>
                  </div>
                  <div class="faq-answer">
                    We follow international safety standards, certified guides,
                    and secure transport services.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    How far in advance should I book?
                    <span class="faq-icon">+</span>
                  </div>
                  <div class="faq-answer">
                    We recommend booking at least 2–4 weeks in advance for
                    better availability.
                  </div>
                </div>

                <div class="faq-item">
                  <div class="faq-question">
                    What is your cancellation policy?
                    <span class="faq-icon">+</span>
                  </div>
                  <div class="faq-answer">
                    Free cancellation up to 48 hours before departure for most
                    packages.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
