import "./Login.css";

export const Login = ({ loginRegModal, setLoginRegModal }) => {
    return (
        <div>
            <div onClick={() => setLoginRegModal(false)} className={loginRegModal ? "reg-login-wrapper-backdrop position-fixed w-100 h-100 start-0 top-0 bottom-0 end-0" : "reg-login-wrapper-backdrop reg-login-wrapper-backdrop-hide position-fixed w-100 h-100 start-0 top-0 bottom-0 end-0"}></div>

            <div className={loginRegModal ? "reg-login-wrapper rounded-4 overflow-hidden" : "reg-login-wrapper reg-login-wrapper-hide rounded-4 overflow-hidden"}>
                <div className="row h-100 align-items-center">                    
                    <div className="col-lg-6 d-none d-lg-block text-white">
                        <div className="right-content">
                            <h1>
                                THE GOAL OF LIFE IS
                                <br /> LIVING IN AGREEMENT
                                <br /> WITH NATURE.
                            </h1>
                            <div className="dfnjhdf" />
                            <div className="social-icons mt-4">
                                <i className="fab fa-facebook-f" />
                                <i className="fab fa-instagram" />
                                <i className="fab fa-linkedin-in" />
                                <i className="fab fa-twitter" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="login-box">
                            <h4 className="mb-4 text-white text-center">Login to Your Account</h4>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label text-white">Email</label>
                                    <input type="email" className="form-control custom-input" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label text-white">Password</label>
                                    <input type="password" className="form-control custom-input" />
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label text-white">
                                        Remember me?
                                    </label>
                                </div>
                                <button className="btn login-btn w-100">LOGIN</button>
                                <div className="text-end mt-2">
                                    <a href="/" className="text-white small">
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}