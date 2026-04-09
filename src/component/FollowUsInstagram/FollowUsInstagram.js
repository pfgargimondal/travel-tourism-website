import "./FollowUsInstagram.css";
export const FollowUsInstagram = () => {
    return (
      <div>
        <section className="insta-section text-center">
            <img src="./images/footertop.png" className="footer-wave" alt="" />

            <div className="container position-relative">
            <div className="row justify-content-center g-4">
                <div className="col-auto">
                <img alt="" src="images/insta1.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta2.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta3.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta4.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta5.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta6.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta7.png" className="insta-img" />
                </div>
                <div className="col-auto">
                <img alt="" src="images/insta8.png" className="insta-img" />
                </div>
            </div>

            <a href="/" className="follow-btn">
                <i className="bi bi-instagram"></i> Follow On Instagram
            </a>
            </div>
        </section>
      </div>
    )
}
