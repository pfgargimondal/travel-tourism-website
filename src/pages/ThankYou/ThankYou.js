import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";


import Loader from "../../component/Loader/Loader";


import "./ThankYou.css";



export const ThankYou = () => {
    const [loading, setLoading] = useState(false);

    const pathName = useLocation().pathname;


    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [pathName]);



    return (
        <>
            {loading && <Loader/>}
        
            <section className="thank-you-page">
                <div className="thank-you-card">
                    <div className="success-animation">
                        <div className="circle">
                            <svg
                                viewBox="0 0 52 52"
                                className="checkmark"
                            >
                                <circle
                                    className="checkmark-circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />
                                <path
                                    className="checkmark-check"
                                    fill="none"
                                    d="M14 27l7 7 17-17"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1>Thank You!</h1>

                    <p>
                        Your submission has been received successfully. Our team will get
                        back to you shortly.
                    </p>

                    <div className="thank-you-buttons d-flex align-items-center">
                        <Link to="/">
                            <button className="btn btn-tour">Back To Home</button>
                        </Link>

                        <Link to="/contact-us" className="contact-btn">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
