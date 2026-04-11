import { useEffect, useState } from "react";

import { Login } from "../../pages";

import { ServiceCategories } from "../ServiceCategories/ServiceCategories";

import Logo from "../../assets/images/COlgfJcjQfjCUywmAAiIwIAxQnnk1YYYP4j3NGUu.png";

import "./Header.css";



export const Header = () => {
    const [headerSticky, setHeaderSticky] = useState(false);
    const [loginRegModal, setLoginRegModal] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHeaderSticky(window.scrollY > 350);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div>
            <header className={headerSticky ? "bg-white w-100 header-sticky" : "bg-transparent w-100 position-relative"}>
                <div className="top-header py-2">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">

                            {/* Left Logo */}
                            <div className="d-flex align-items-center">
                                <img
                                    src={Logo}
                                    alt="logo"
                                    style={{ height: "28px" }}
                                />
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
                                
                                <div className="doijeoijwer d-none align-items-center">
                                    <ServiceCategories start={0} end={6} />

                                    <div className="diejijewmrijwereor position-relative">
                                        <div class="asddhedsfeedee flight-menu-item">
                                            <i class="bi bi-three-dots"></i>
                                            
                                            <span className="d-flex svdgddfseerhthty justify-content-center align-items-center">More <i class="bi ms-1 bi-chevron-down"></i></span>
                                        </div>

                                        <div className="hdr-sticky-drpdwn bg-white">
                                            <ServiceCategories start={6} />
                                        </div>
                                    </div>
                                </div>



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
                                    <button onClick={() => setLoginRegModal(prev => !prev)} className="fsdgsadehtrfdewe btn btn-tour px-3">
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

            <Login loginRegModal={loginRegModal} setLoginRegModal={setLoginRegModal} />
        </div>
    )
}

