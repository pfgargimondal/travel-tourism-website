import "./Header.css";
import Logo from "../../assets/images/COlgfJcjQfjCUywmAAiIwIAxQnnk1YYYP4j3NGUu.png";
import { Link } from "react-router-dom";
export const Header = () => {

    return (
      <div>
         <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
        
                <a className="navbar-brand logo-text" href="/">
                    <img src={Logo} alt="Logo" className="site-logo" />
                </a>
        
                <button className="navbar-toggler custom-toggler" type="button">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
        
                <div className="custom-menu">
        
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item"><a className="nav-link" href="/">Home <i className="fa-solid fa-angle-down"></i></a></li>
                        <li className="nav-item"><a className="nav-link" href="/">Features <i className="fa-solid fa-angle-down"></i></a></li>
                        <li className="nav-item"><a className="nav-link" href="/">Pages <i className="fa-solid fa-angle-down"></i></a></li>
                        <li className="nav-item"><Link to="/blogs" className="nav-link">Blogs <i className="fa-solid fa-angle-down"></i></Link></li>
                        <li className="nav-item"><Link to="/contact-us" className="nav-link">Contact</Link></li>
                    </ul>
        
                </div>
            </div>
        </nav>
      </div>
    )
}

