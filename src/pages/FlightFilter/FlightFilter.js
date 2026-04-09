import "./FlightFilter.css";
import { FollowUsInstagram } from "../../component/FollowUsInstagram/FollowUsInstagram";
export const FlightFilter = () => {

    return (
      <div>
            <section class="hero-section" style={{
                background: "url('./images/asd.png') center center / cover no-repeat"
            }}>

 
        <div class="container text-center hero-content">

            <h1 class="hero-title">Flight</h1>

            <p class="hero-description">
                Book flights, trains, and buses easily with our trusted ticket booking service. <br/> Fast, secure, and hassle-free travel planning starts here.
            </p>
        </div>
    </section>
    
    {/* <!-- ================= FLIGHT SEARCH SECTION ================= --> */}
    <section class=" py-5">
        <div class="container">
    
           <div class="fgdfgdfgd5">
            <div class="row g-3 align-items-end">
            
    
            <div class="col-lg-3 col-6">
            <label class="form-label">City From</label>
            <input type="text" class="form-control" placeholder="Kolkata" />
            </div>
            
  
            <div class="col-lg-3 col-6">
            <label class="form-label">City To</label>
            <input type="text" class="form-control" placeholder="Delhi" />
            </div>
            

            <div class="col-lg-3 col-6">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" value="2026-02-28" />
            </div>
            
            <div class="col-lg-3 col-6">
            <button class="searchbt">Search Flight</button>
            </div>
            
            </div>
            </div>
    
            <div class="airlines-row mt-5">
    
                <div class="airline-item">
                    <img src="./images/americaair.jpg" alt="" />
                    <div>
                        <h6>American Airline</h6>
                        <p>216 Flights</p>
                    </div>
                </div>
    
                <div class="airline-item">
                    <img src="./images/deltaair.png" alt="" />
                    <div>
                        <h6>Delta Airlines</h6>
                        <p>569 Flights</p>
                    </div>
                </div>
    
                <div class="airline-item">
                    <img src="./images/emiratesair.jpg" alt="" />
                    <div>
                        <h6>Emirates</h6>
                        <p>129 Flights</p>
                    </div>
                </div>
    
                <div class="airline-item">
                    <img src="./images/franceair.png" alt="" />
                    <div>
                        <h6>Air France</h6>
                        <p>600 Flights</p>
                    </div>
                </div>
    
                <div class="airline-item">
                    <img src="./images/quaterair.jpg" alt="" />
                    <div>
                        <h6>Qatar Airways</h6>
                        <p>200 Flights</p>
                    </div>
                </div>
    
            </div>
    
        </div>
    </section>
    <section class="flight-results-section py-5">
        <div class="container">
            <div class="row g-4">
    
                {/* <!-- ================= LEFT FILTER SIDEBAR ================= --> */}
                <div class="col-lg-3">
                    <div class="filter-card sticky-top">
    
                        <div class="filter-header d-flex justify-content-between align-items-center">
                            <h5 class="mb-0">Filters</h5>
                            <a href="/" class="reset-link">Reset</a>
                        </div>
    
                        <div class="filter-section">
                            <label class="filter-label">Search by Airline Names</label>
                            <input type="text" class="form-control" placeholder="Search by Airline Names" />
                        </div>
    
                    <div class="flight-filter-box">

                        <div class="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                            
                            <div class="flight-filter-left">
                                <img src="./images/upplane.png" class="flight-filter-img" alt="" />
                                <span class="flight-filter-title">Departure Times</span>
                            </div>
                    
                            <i class="fa-solid fa-caret-up flight-filter-icon"></i>
                    
                        </div>
                    
                        <div class="flight-filter-content">
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">American Airlines</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Delta Airlines</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Emirates</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Air France</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Japan Airlines</label>
                            </div>
                    
                        </div>
                    
                    </div>
                                        <div class="flight-filter-box">

                        <div class="flight-filter-header d-flex justify-content-between align-items-center flight-filter-toggle">
                            
                            <div class="flight-filter-left">
                                <img src="./images/upplane.png" class="flight-filter-img" alt="" />
                                <span class="flight-filter-title">Flights Times</span>
                            </div>
                    
                            <i class="fa-solid fa-caret-up flight-filter-icon"></i>
                    
                        </div>
                    
                        <div class="flight-filter-content">
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">6.00pm-12.00am</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">10.10pm-2.3apm</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">11.00pm-3.10am</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">1.20am-4.40am</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">5.30am-12.00pm</label>
                            </div>
                    
                        </div>
                    
                    </div>
                    
 
                        <div class="filter-section">
                            <div class="filter-title d-flex align-items-center">
                                <img src="./images/priceicon.png" alt="" />
                                <span>Fare Type</span>
                            </div>
    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Show Refundable Only</label>
                            </div>
    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">Show Non Refundable Only</label>
                            </div>
                        </div>
    
                       <div class="flight-time-filter-box">

                            <div class="flight-time-filter-header d-flex justify-content-between align-items-center flight-time-toggle">
                        
                                <div class="flight-time-left">
                                    <img src="./images/upplane.png" class="flight-time-img" alt="" />
                                    <span class="flight-time-title">Departure Times</span>
                                </div>
                        
                                <i class="fa-solid fa-caret-up flight-time-icon"></i>
                        
                            </div>
                        
                            <div class="flight-time-content">
                                <select class="flight-time-select form-select">
                                    <option>Anytime</option>
                                    <option>Morning</option>
                                    <option>Afternoon</option>
                                    <option>Evening</option>
                                    <option>Night</option>
                                </select>
                            </div>
                        
                        </div>
    
                       <div class="flight-arrival-filter-box">

                            <div class="flight-arrival-filter-header d-flex justify-content-between align-items-center flight-arrival-toggle">
                        
                                <div class="flight-arrival-left">
                                    <img src="./images/downplane.png" class="flight-arrival-img" alt="" />
                                    <span class="flight-arrival-title">Arrival Times</span>
                                </div>
                        
                                <i class="fa-solid fa-caret-up flight-arrival-icon"></i>
                        
                            </div>
                        
                            <div class="flight-arrival-content">
                                <select class="flight-arrival-select form-select">
                                    <option>Anytime</option>
                                    <option>Morning</option>
                                    <option>Afternoon</option>
                                    <option>Evening</option>
                                    <option>Night</option>
                                </select>
                            </div>
                        
                        </div>
    
                       <div class="flight-review-filter-box">

                        <div class="flight-review-filter-header d-flex justify-content-between align-items-center flight-review-toggle">
                    
                            <div class="flight-review-left">
                                <img src="./images/reviewicon.png" class="flight-review-img" alt="" />
                                <span class="flight-review-title">Reviews</span>
                            </div>
                    
                            <i class="fa-solid fa-caret-up flight-review-icon"></i>
                    
                        </div>
                    
                        <div class="flight-review-content">
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">⭐⭐⭐⭐⭐ 5 Star</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">⭐⭐⭐⭐ 4 Star</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">⭐⭐⭐ 3 Star</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">⭐⭐ 2 Star</label>
                            </div>
                    
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" />
                                <label class="form-check-label">⭐ 1 Star</label>
                            </div>
                    
                        </div>
                    
                    </div>
    
                    </div>
                </div>
                
                {/* <!-- ================= RIGHT SIDE GOES HERE ================= --> */}
                <div class="col-lg-9">
                
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-semibold mb-0">7 Flights Found on Your Search</h5>
                
                        <div class="sort-area">
                            <img src="./images/listicon.png" alt="" />
                            <span>Sort By :</span>
                            <select>
                                <option>Recommended</option>
                                <option>Lowest Price</option>
                                <option>Fastest</option>
                            </select>
                        </div>
                    </div>
                
                    <div class="save-banner mb-4">
                        <span>Save an average of 15% on thousands of flights when you're signed in</span>
                        <button class="sign-btn">Sign In</button>
                    </div>
                    
                    <div class="flight-card">
                    
                        <div class="flight-top d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <div class="heart"><img src="./images/likeicon.png" alt="" /></div>
                                <span class="cheapest">Cheapest</span>
                            </div>
                            <span class="rating">5.0</span>
                        </div>
                    
                        <div class="flight-body">
                    
                            <h5 class="mb-4 fw-semibold">Free Seat with VISA Signature*</h5>
                    
                            <div class="row align-items-center">
                    
                                <div class="col-lg-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="./images/indigo.png" class="airline-logo" alt="" />
                                        <div class="gfjh55">
                                            <div class="fw-semibold">Indigo</div>
                                            <small class="text-muted">SB1254</small>
                                        </div>
                                    </div>
                                    <a href="/" class="compare-link">Add to compare +</a>
                                </div>
                    
                                <div class="col-lg-5">
                                    <div class="time-wrapper">
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>New Delhi</small>
                                        </div>
                    
                                        <div class="duration-wrapper text-center">
                                            <small>02h 20m</small>
                                            <div class="duration-line"></div>
                                        </div>
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>Mumbai</small>
                                        </div>
                    
                                    </div>
                                </div>
                    
                                <div class="col-lg-2">
                                    <div class="price-section">
                                        <small>From</small>
                                        <h4><strong>₹ 8,900</strong></h4>
                                    </div>
                                </div>
                    
                                <div class="col-lg-3 text-end">
                                    <div class="row">
                                        
                                        <div class="ontime mb-2">
                                            <img src="./images/watch.png" alt="" /> 90% On Time
                                        </div>
                        
                                        <button class="btn btn-tour">Search Hotel</button>
                        
                                        <div class="stop-info mt-2">
                                            <img src="./images/stop.png" alt="" /> 1 Stop , Patna
                                        </div>
                                            
                                    </div>

                    
                                </div>
                    
                            </div>
                    
                        </div>

                        <div class="offer-strip">
                            Get ₹ 215 OFF using code MMTSUPER | FLAT 12% OFF on ICICI Bank Credit Cards using ICICIFEST
                        </div>

                    </div>

                    <div class="flight-card">
                    
                        <div class="flight-top d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <div class="heart"><img src="./images/likeicon.png" alt="" /></div>
                                <span class="cheapest">Cheapest</span>
                            </div>
                            <span class="rating">5.0</span>
                        </div>
                    
                        <div class="flight-body">
                    
                            <h5 class="mb-4 fw-semibold">Free Seat with VISA Signature*</h5>
                    
                            <div class="row align-items-center">
                    
                                <div class="col-lg-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="./images/indigo2.png" class="airline-logo" alt="" />
                                        <div class="gfjh55">
                                            <div class="fw-semibold">Indigo</div>
                                            <small class="text-muted">SB1254</small>
                                        </div>
                                    </div>
                                    <a href="/" class="compare-link">Add to compare +</a>
                                </div>
                                <div class="col-lg-5">
                                    <div class="time-wrapper">
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>New Delhi</small>
                                        </div>
                    
                                        <div class="duration-wrapper text-center">
                                            <small>02h 20m</small>
                                            <div class="duration-line"></div>
                                        </div>
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>Mumbai</small>
                                        </div>
                    
                                    </div>
                                </div>
                    
                                <div class="col-lg-2">
                                    <div class="price-section">
                                        <small>From</small>
                                        <h4><strong>₹ 7,900</strong></h4>
                                    </div>
                                </div>
                    
                                <div class="col-lg-3 text-end">
                    
                                    <div class="ontime mb-2">
                                        <img src="./images/watch.png" alt="" /> 90% On Time
                                    </div>
                    
                                    <button class="btn btn-tour">Search Hotel</button>
                    
                                    <div class="stop-info mt-2">
                                        <img src="./images/stop.png" alt="" /> 2 Stop , Patna & kolkata
                                    </div>
                    
                                </div>
                    
                            </div>
                    
                        </div>

                        <div class="offer-strip">
                            Get ₹ 215 OFF using code MMTSUPER | FLAT 12% OFF on ICICI Bank Credit Cards using ICICIFEST
                        </div>

                    </div>

                    <div class="flight-card">
                    
                        <div class="flight-top d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <div class="heart"><img src="./images/likeicon.png" alt="" /></div>
                                <span class="cheapest">Cheapest</span>
                            </div>
                            <span class="rating">5.0</span>
                        </div>
                    
                        <div class="flight-body">
                    
                            <h5 class="mb-4 fw-semibold">Free Seat with VISA Signature*</h5>
                    
                            <div class="row align-items-center">
                    
                                <div class="col-lg-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="./images/indigo3.png" class="airline-logo" alt="" />
                                        <div class="gfjh55">
                                            <div class="fw-semibold">Indigo</div>
                                            <small class="text-muted">SB1254</small>
                                        </div>
                                    </div>
                                    <a href="/" class="compare-link">Add to compare +</a>
                                </div>
                    
                                <div class="col-lg-5">
                                    <div class="time-wrapper">
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>New Delhi</small>
                                        </div>
                    
                                        <div class="duration-wrapper text-center">
                                            <small>02h 20m</small>
                                            <div class="duration-line"></div>
                                        </div>
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>Mumbai</small>
                                        </div>
                    
                                    </div>
                                </div>
                    
                                <div class="col-lg-2">
                                    <div class="price-section">
                                        <small>From</small>
                                        <h4><strong>₹ 8,100</strong></h4>
                                    </div>
                                </div>
                    
                                <div class="col-lg-3 text-end">
                    
                                    <div class="ontime mb-2">
                                        <img src="./images/watch.png" alt="" /> 90% On Time
                                    </div>
                    
                                    <button class="btn btn-tour">Search Hotel</button>
                    
                                    <div class="stop-info mt-2">
                                        <img src="./images/stop.png" alt="" /> No Stop 
                                    </div>
                    
                                </div>
                    
                            </div>
                    
                        </div>

                        <div class="offer-strip">
                            Get ₹ 215 OFF using code MMTSUPER | FLAT 12% OFF on ICICI Bank Credit Cards using ICICIFEST
                        </div>

                    </div>

                    <div class="flight-card">
                    
                        <div class="flight-top d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2">
                                <div class="heart"><img src="./images/likeicon.png" alt="" /></div>
                                <span class="cheapest">Cheapest</span>
                            </div>
                            <span class="rating">5.0</span>
                        </div>
                    
                        <div class="flight-body">
                    
                            <h5 class="mb-4 fw-semibold">Free Seat with VISA Signature*</h5>
                    
                            <div class="row align-items-center">
                    
                                <div class="col-lg-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="./images/indigo4.png" class="airline-logo" alt="" />
                                        <div class="gfjh55">
                                            <div class="fw-semibold">Indigo</div>
                                            <small class="text-muted">SB1254</small>
                                        </div>
                                    </div>
                                    <a href="/" class="compare-link">Add to compare +</a>
                                </div>
                    
                                <div class="col-lg-5">
                                    <div class="time-wrapper">
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>New Delhi</small>
                                        </div>
                    
                                        <div class="duration-wrapper text-center">
                                            <small>02h 20m</small>
                                            <div class="duration-line"></div>
                                        </div>
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>Mumbai</small>
                                        </div>
                    
                                    </div>
                                </div>
                    
                                <div class="col-lg-2">
                                    <div class="price-section">
                                        <small>From</small>
                                        <h4><strong>₹ 7,600</strong></h4>
                                    </div>
                                </div>
                    
                                <div class="col-lg-3 text-end">
                    
                                    <div class="ontime mb-2">
                                        <img src="./images/watch.png" alt="" /> 90% On Time
                                    </div>
                    
                                    <button class="btn btn-tour">Search Hotel</button>
                    
                                    <div class="stop-info mt-2">
                                        <img src="./images/stop.png" alt="" /> 1 Stop , Delhi
                                    </div>
                    
                                </div>
                    
                            </div>
                    
                        </div>

                        <div class="offer-strip">
                            Get ₹ 215 OFF using code MMTSUPER | FLAT 12% OFF on ICICI Bank Credit Cards using ICICIFEST
                        </div>

                    </div>

                    <div class="flight-card">
                    
                        <div class="flight-top d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-2 fdfddfd">
                                <div class="heart"><img src="./images/likeicon.png" alt="" /></div>
                                <span class="cheapest">Cheapest</span>
                            </div>
                            <span class="rating">5.0</span>
                        </div>
                    
                        <div class="flight-body">
                    
                            <h5 class="mb-4 fw-semibold">Free Seat with VISA Signature*</h5>
                    
                            <div class="row align-items-center">
                    
                                <div class="col-lg-2">
                                    <div class="d-flex align-items-center gap-2">
                                        <img src="./images/indigo1.png" class="airline-logo" alt="" />
                                        <div class="gfjh55" >
                                            <div class="fw-semibold">Indigo</div>
                                            <small class="text-muted">SB1254</small>
                                        </div>
                                    </div>
                                    <a href="/" class="compare-link">Add to compare +</a>
                                </div>
                    
                                <div class="col-lg-5 px-0">
                                    <div class="time-wrapper">
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>New Delhi</small>
                                        </div>
                    
                                        <div class="duration-wrapper text-center">
                                            <small>02h 20m</small>
                                            <div class="duration-line"></div>
                                        </div>
                    
                                        <div class="text-center">
                                            <h4 class="mb-0">22:30</h4>
                                            <small>Mumbai</small>
                                        </div>
                    
                                    </div>
                                </div>
                    
                                <div class="col-lg-2">
                                    <div class="price-section">
                                        <small>From</small>
                                        <h4><strong>₹ 8,800</strong></h4>
                                    </div>
                                </div>
                    
                                <div class="col-lg-3 text-end">
                    
                                    <div class="ontime mb-2">
                                        <img src="./images/watch.png" alt="" /> 90% On Time
                                    </div>
                    
                                    <button class="btn btn-tour">Search Hotel</button>
                    
                                    <div class="stop-info mt-2">
                                        <img src="./images/stop.png" alt="" /> 1 Stop , Ranchi
                                    </div>
                    
                                </div>
                    
                            </div>
                    
                        </div>

                        <div class="offer-strip">
                            Get ₹ 215 OFF using code MMTSUPER | FLAT 12% OFF on ICICI Bank Credit Cards using ICICIFEST
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>




    <FollowUsInstagram />
      </div>
    )
}
