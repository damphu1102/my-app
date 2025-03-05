import "../Banner/banner.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

export const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const reponse = await axios.get(`http://localhost:8080/banner`);
        setBanners(reponse.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  console.log(banners);

  return (
    <>
      <Carousel data-bs-theme="dark" className="movie">
        {banners.length > 0 ? (
          banners.map((banner) => (
            <Carousel.Item key={banner.id}>
              <img
                className="d-block w-100"
                src={banner.imageURL}
                alt={`Banner ${banner.id}`}
                style={{
                  borderRadius: "10px", // Bo góc
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Đổ bóng
                  border: "2px solid #ccc",
                }} // Viền}}
              />
            </Carousel.Item>
          ))
        ) : (
          <p>Không có dữ liệu Carousel</p>
        )}
      </Carousel>
    </>
  );
};
