import { useLayoutEffect, useState } from "react";

import { ServiceCategories } from "../ServiceCategories/ServiceCategories";

import Logo from "../../assets/images/COlgfJcjQfjCUywmAAiIwIAxQnnk1YYYP4j3NGUu.png";

import "./Header.css";
import { Link } from "react-router-dom";




export const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);

    useLayoutEffect(() => {
        const handleScroll = () => {
            setHeaderSticky(window.scrollY > 56);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        //   <div>
        //     <nav className="navbar navbar-expand-lg custom-navbar">
        //         <div className="container">

        //             <a className="navbar-brand logo-text" href="/">
        //                 <img src={Logo} alt="Logo" className="site-logo" />
        //             </a>

        //             <button className="navbar-toggler custom-toggler" type="button">
        //                 <span></span>
        //                 <span></span>
        //                 <span></span>
        //             </button>

        //             <div className="custom-menu">

        //                 <ul className="navbar-nav mx-auto">
        //                     <li className="nav-item"><a className="nav-link" href="/">Home <i className="fa-solid fa-angle-down"></i></a></li>
        //                     <li className="nav-item"><a className="nav-link" href="/">Features <i className="fa-solid fa-angle-down"></i></a></li>
        //                     <li className="nav-item"><a className="nav-link" href="/">Pages <i className="fa-solid fa-angle-down"></i></a></li>
        //                     <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs <i className="fa-solid fa-angle-down"></i></Link></li>
        //                     <li className="nav-item"><Link to="/contact-us" className="nav-link">Contact</Link></li>
        //                 </ul>

        //             </div>
        //         </div>
        //     </nav>
        //   </div>

        <header className={headerSticky ? "bg-white w-100 header-sticky" : "bg-transparent w-100 position-relative"}>
            <div className="top-header py-2">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between">

                        {/* Left Logo */}
                        <div className="d-flex align-items-center">
                            <Link to="/">
                                <img
                                    src={Logo}
                                    alt="logo"
                                    style={{ height: "28px" }}
                                />
                            </Link>
                        </div>

                        {/* Middle Menu */}
                        <div className="sifjdnosjkjhjmre d-flex align-items-center header-menu">
                            {!headerSticky && (
                                <div className="asdoijodjokpkoie d-flex align-items-center gap-2">
                                    <span className="icon-circle">🏠</span>
                                    <div>
                                        <div className="fw-semibold dfgsfadeae small">List Your Property</div>
                                        <small className="text-white">Grow your business!</small>
                                    </div>
                                </div>
                            )}                            

                            {/* <div className="asdoijodjokpkoie d-flex align-items-center gap-2">
                                <img src="./images/sadserwq.png" width={55} alt="" />
                                <div>
                                    <div className="fw-semibold small">Introducing myBiz</div>
                                    <small className="text-white">Business Travel Solution</small>
                                </div>
                            </div> */}

                            {headerSticky && (
                                <ServiceCategories className={headerSticky ? "" : "d-none"} />
                            )}                                

                            <div className="asdoijodjokpkoie d-flex align-items-center gap-2">
                                <div className="diwejojiwerer rounded-circle position-relative">
                                    <img src="./images/heart.png" className="position-absolute top-50 start-50 translate-middle" width={18} alt="" />
                                </div>

                                <div>
                                    <div className="fw-semibold dfgsfadeae small">Wishlist</div>
                                    <small className="text-white">Save favourites</small>
                                </div>
                            </div>

                            {!headerSticky && (
                                <div className="asdoijodjokpkoie d-flex align-items-center gap-2">
                                    <div className="diwejojiwerer rounded-circle position-relative">
                                        <img src="./images/sdeqw.png" className="position-absolute top-50 start-50 translate-middle" width={15} alt="" />
                                    </div>

                                    <div>
                                        <div className="fw-semibold dfgsfadeae small">My Trips</div>
                                        <small className="text-white">Manage your bookings</small>
                                    </div>
                                </div>
                            )}                            

                            {/* Right Section */}
                            <div className="asdoijodjokpkoie d-flex align-items-center gap-2">
                                <button className="fsdgsadehtrfdewe btn btn-tour px-3">
                                    Login or Create Account <i class="bi ms-1 bi-chevron-down"></i>
                                </button>

                                <div className="sfsdghdcsdfrrerttr d-flex align-items-center gap-2 rounded-1 p-2">
                                    <img src="./images/india.png" width={22} alt="" /> <span>INR</span>

                                    <span>|</span>

                                    <span>English <i class="bi ms-1 bi-chevron-down"></i></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

