import { useEffect, useState } from "react";
import http from "../../http";
import "./ServiceCategories.css";
import Loader from "../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";

export const ServiceCategories = () => {
  const [serviceimageUrl, setserviceImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);

      try {
        const response = await http.get("/get-service-category");

        if (response.data.success) {
          setserviceImageUrl(response.data.data.service_image_url);
          setCategories(response.data.data.categories);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flight-menu-wrapper gjhkdfgdf">
      <div className="flight-menu-bar">
        {categories.map((item, index) => (
          <div
            key={index}
            className={`flight-menu-item ${
              location.pathname === "/"
                ? item.slug === "flights"
                  ? "active"
                  : ""
                : location.pathname.startsWith(`/${item.slug}`)
                ? "active"
                : ""
            }`}
            onClick={() => navigate(`/${item.slug}`)}
          >
            <img
              src={`${serviceimageUrl}/${item.category_image}`}
              alt={item.category}
            />
            <span>{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};