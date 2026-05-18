import { Routes, Route, useLocation } from "react-router-dom";
import { Home, ContactUs, AboutUs, Blog, BlogDetails, HotelFilter, HotelDetails, FlightFilter, PrivacyPolicy, TermsCondition, CustomerService, ReturnPolicy } from "../pages/index";
import ServiceFilterPage from "../component/ServiceCategories/ServiceFilterPage";

function Allroutes() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/hotel-filter" element={<HotelFilter />} />
      <Route path="/hotel-details/:id" element={<HotelDetails />} />
      <Route path="/flight-filter" element={<FlightFilter />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-&-conditions" element={<TermsCondition />} />
      <Route path="/customer-service" element={<CustomerService />} />
      <Route path="/return-policy" element={<ReturnPolicy />} />

      <Route path="/:slug" element={<ServiceFilterPage key={location.pathname}/>} />
    </Routes>
  );
}

export default Allroutes;