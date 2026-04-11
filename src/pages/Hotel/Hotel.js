import { useEffect, useMemo, useState } from "react";
import { ServiceCategories } from "../../component/ServiceCategories/ServiceCategories";
import http from "../../http";
import "./Hotel.css";
import Loader from "../../component/Loader/Loader";
import { Link } from "react-router-dom";
import { Faq } from "../../component/Faq/Faq";
export const Hotel = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  // eslint-disable-next-line
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [contentimageUrl, setcontentimageUrl] = useState("");
  const [pageContent, setPageContent] = useState([]);
  const [hotelLogo, setHotelLogo] = useState([]);
  const [logoUrl, setLogoUrl] = useState([]);

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


  useEffect(() => {
    const fetchHotelData = async () => {
      setLoading(true);

      try {
        const response = await http.get("/get-hotel-details");

        if (response.data.success) {
          setcontentimageUrl(response.data.data.page_contentimage_url);
          setPageContent(response.data.data.page_content);
          setHotelLogo(response.data.data.hotel_logo);
          setLogoUrl(response.data.data.contentLogo_url);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching hotel content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  return (
    <div>
       {loading && <Loader />}
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
            <h2>{pageContent?.title_one}</h2>

            <div class="desc"
              dangerouslySetInnerHTML={{
                __html:
                  pageContent?.description_one &&
                  pageContent?.description_one,
              }}
            />

            <div class="logo-grid">
              {hotelLogo?.map((item) => (
                  <Link to={item?.image_link}>
                    <div class="logo-box">
                      <img alt="" src={`${logoUrl}/${item?.image}`} />
                    </div>
                  </Link>
              ))}
              
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
                  {pageContent?.title_two}
                </h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      pageContent?.description_two &&
                      pageContent?.description_two,
                  }}
                />

                <button class="read-btn">Read More</button>
              </div>

              <div class="deal-image">
                <img
                  src={`${contentimageUrl}/${pageContent?.image}`}
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

              <Faq />

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
