import { Link } from "react-router-dom";

import "./UserSideNavbar.css";



export const UserSideNavbar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="topbar pb-0">
                    <div className="topbar-left">
                        <h3 className="mb-0">Hi, Mr! 👋</h3>
                        <p>Ready for your next adventure?</p>
                    </div>
                </div>
            </div>
            <nav className="sidebar-nav">
                <ul className="list-unstyled">
                    <li className="nav-item">
                        <Link to="/user-profile" className="active">
                            <i className="bi bi-grid" /> Dashboard
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/account-information">
                            <i className="bi bi-person" /> Account Information
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/user-booking">
                            <i className="bi bi-journal-bookmark" /> My Bookings
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a href="/user-booking">
                            <i className="bi bi-map" /> My Trips
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="/user-booking">
                            <i className="bi bi-heart" /> Wishlist
                        </a>
                    </li>
                    {/* <li className="nav-item">
                                <a href="#">
                                    <i className="bi bi-credit-card" /> Payments
                                </a>
                            </li> */}
                    {/* <li className="nav-item">
                                <a href="#">
                                    <i className="bi bi-star" /> Reward Points
                                </a>
                            </li> */}

                    <li className="nav-item">
                        <a href="/user-booking">
                            <i className="bi bi-chat-square-text" /> Reviews
                        </a>
                    </li>

                    <li className="nav-item">
                        <Link to="/change-password">
                            <i class="bi bi-lock"></i> Change Password
                        </Link>
                    </li>

                    <li className="nav-item logout mt-2">
                        <a href="/user-booking">
                            <i className="bi bi-box-arrow-left" /> Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
