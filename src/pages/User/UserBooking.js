import { UserSideNavbar } from "./Component/UserSideNavbar/UserSideNavbar";

import "./Css/UserBooking.css";



export const UserBooking = () => {
  return (
    <div className="container">
      <div className="dejnwirwer d-flex">
        <UserSideNavbar />

        {/* ══════════ MAIN ══════════ */}
        <div className="main-wrap">
          {/* ── STAT CARDS ── */}
          <div className="stat-cards">
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon blue">
                  <i className="bi bi-bag-check-fill" />
                </div>
                <div>
                  <div className="stat-label">Total Bookings</div>
                  <div className="stat-value">7</div>
                </div>
              </div>
              <a href="/user-booking" className="stat-link blue">
                View all bookings <i className="bi bi-arrow-right" />
              </a>
            </div>
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon green">
                  <i className="bi bi-calendar3-fill" />
                </div>
                <div>
                  <div className="stat-label">Upcoming Trips</div>
                  <div className="stat-value">3</div>
                </div>
              </div>
              <a href="/" className="stat-link green">
                View upcoming <i className="bi bi-arrow-right" />
              </a>
            </div>
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon purple">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <div>
                  <div className="stat-label">Completed Trips</div>
                  <div className="stat-value">3</div>
                </div>
              </div>
              <a href="/" className="stat-link purple">
                View completed <i className="bi bi-arrow-right" />
              </a>
            </div>
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon orange">
                  <i className="bi bi-x-circle-fill" />
                </div>
                <div>
                  <div className="stat-label">Cancelled Trips</div>
                  <div className="stat-value">1</div>
                </div>
              </div>
              <a href="/" className="stat-link orange">
                View cancelled <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
          {/* ── BOOKINGS CARD ── */}
          <div className="bookings-card">
            {/* Filter Bar */}
            <div className="filter-bar">
              <div className="deuiwrjowerwer">
                <div className="filter-tabs">
                  <button className="filter-tab active" onclick="setTab(this)">
                    All Bookings
                  </button>
                  <button className="filter-tab" onclick="setTab(this)">
                    Upcoming
                  </button>
                  <button className="filter-tab" onclick="setTab(this)">
                    Completed
                  </button>
                  <button className="filter-tab" onclick="setTab(this)">
                    Cancelled
                  </button>
                  <button className="filter-tab" onclick="setTab(this)">
                    Pending Payment
                  </button>
                </div>
              </div>

              <div className="filter-right">
                <div className="search-wrap">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by package or booking ID..."
                  />
                </div>
                <button className="filter-btn">
                  <i className="bi bi-sliders2" /> Filter
                </button>
              </div>
            </div>
            {/* Table */}
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Package</th>
                  <th>
                    Travel Date{" "}
                    <i className="bi bi-chevron-down" style={{ fontSize: 11 }} />
                  </th>
                  <th>Travelers</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td>
                    <div className="booking-id">BK00123</div>
                    <div className="booking-date">12 May 2024</div>
                  </td>
                  <td>
                    <div className="pkg-cell">
                      <img
                        className="pkg-img"
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
                        alt="Switzerland"
                      />
                      <div>
                        <div className="pkg-name">Switzerland Explorer</div>
                        <div className="pkg-location">Zurich, Interlaken, Lucerne</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="travel-date">
                      <i className="bi bi-calendar-event" /> 20 May – 28 May, 2024
                    </div>
                    <div className="travel-nights">8 Days / 7 Nights</div>
                  </td>
                  <td>
                    <div className="travelers-cell">
                      <i className="bi bi-people" /> 2 Travelers
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">₹ 85,500</div>
                  </td>
                  <td>
                    <span className="badge-status badge-upcoming">Upcoming</span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-view">View Details</button>
                      <button className="dots-btn">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td>
                    <div className="booking-id">BK00122</div>
                    <div className="booking-date">28 Mar 2024</div>
                  </td>
                  <td>
                    <div className="pkg-cell">
                      <img
                        className="pkg-img"
                        src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=200&q=80"
                        alt="Bali"
                      />
                      <div>
                        <div className="pkg-name">Bali Paradise Tour</div>
                        <div className="pkg-location">Bali, Indonesia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="travel-date">
                      <i className="bi bi-calendar-event" /> 10 Apr – 17 Apr, 2024
                    </div>
                    <div className="travel-nights">7 Days / 6 Nights</div>
                  </td>
                  <td>
                    <div className="travelers-cell">
                      <i className="bi bi-people" /> 2 Travelers
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">₹ 45,000</div>
                  </td>
                  <td>
                    <span className="badge-status badge-completed">Completed</span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-view">View Details</button>
                      <button className="dots-btn">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td>
                    <div className="booking-id">BK00121</div>
                    <div className="booking-date">15 Feb 2024</div>
                  </td>
                  <td>
                    <div className="pkg-cell">
                      <img
                        className="pkg-img"
                        src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=80"
                        alt="Maldives"
                      />
                      <div>
                        <div className="pkg-name">Maldives Getaway</div>
                        <div className="pkg-location">Maldives</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="travel-date">
                      <i className="bi bi-calendar-event" /> 15 Jun – 20 Jun, 2024
                    </div>
                    <div className="travel-nights">5 Days / 4 Nights</div>
                  </td>
                  <td>
                    <div className="travelers-cell">
                      <i className="bi bi-people" /> 2 Travelers
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">₹ 80,500</div>
                  </td>
                  <td>
                    <span className="badge-status badge-upcoming">Upcoming</span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-view">View Details</button>
                      <button className="dots-btn">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr>
                  <td>
                    <div className="booking-id">BK00120</div>
                    <div className="booking-date">10 Jan 2024</div>
                  </td>
                  <td>
                    <div className="pkg-cell">
                      <img
                        className="pkg-img"
                        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&q=80"
                        alt="Paris"
                      />
                      <div>
                        <div className="pkg-name">Paris Romantic Tour</div>
                        <div className="pkg-location">Paris, France</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="travel-date">
                      <i className="bi bi-calendar-event" /> 05 Jul – 10 Jul, 2024
                    </div>
                    <div className="travel-nights">6 Days / 5 Nights</div>
                  </td>
                  <td>
                    <div className="travelers-cell">
                      <i className="bi bi-people" /> 2 Travelers
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">₹ 70,000</div>
                  </td>
                  <td>
                    <span className="badge-status badge-pending-payment">
                      Pending Payment
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-pay">Pay Now</button>
                      <button className="dots-btn">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr>
                  <td>
                    <div className="booking-id">BK00119</div>
                    <div className="booking-date">05 Dec 2023</div>
                  </td>
                  <td>
                    <div className="pkg-cell">
                      <img
                        className="pkg-img"
                        src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=200&q=80"
                        alt="Turkey"
                      />
                      <div>
                        <div className="pkg-name">Turkey Highlights</div>
                        <div className="pkg-location">Istanbul, Cappadocia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="travel-date">
                      <i className="bi bi-calendar-event" /> 15 Feb – 22 Feb, 2024
                    </div>
                    <div className="travel-nights">7 Days / 6 Nights</div>
                  </td>
                  <td>
                    <div className="travelers-cell">
                      <i className="bi bi-people" /> 2 Travelers
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">₹ 65,000</div>
                  </td>
                  <td>
                    <span className="badge-status badge-cancelled">Cancelled</span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <button className="btn-view">View Details</button>
                      <button className="dots-btn">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Table Footer */}
            <div className="table-footer">
              <div className="table-count">Showing 1 to 5 of 7 bookings</div>
              <div className="pagination-btns">
                <button className="pg-btn">
                  <i className="bi bi-chevron-left" />
                </button>
                <button className="pg-btn active" onclick="setPg(this)">
                  1
                </button>
                <button className="pg-btn" onclick="setPg(this)">
                  2
                </button>
                <button className="pg-btn">
                  <i className="bi bi-chevron-right" />
                </button>
              </div>
            </div>
          </div>
          {/* ── HELP BAR ── */}
          <div className="help-bar">
            <div className="help-left">
              <div className="help-avatar">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Support Agent"
                />
              </div>
              <div>
                <div className="help-title">Need Help?</div>
                <div className="help-sub">
                  Our support team is here to help you 24/7
                </div>
              </div>
            </div>
            <button className="btn btn-tour">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  )
}