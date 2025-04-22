import { useEffect, useState } from "react";
import { CardGeneralInf } from "../Cards/Card";
import { Chart } from "../Cards/Chart";
import "../ContentPage/contentHome.scss";
import axios from "axios";

export const ContentHome = () => {
  const [transtion, setTranstion] = useState([]);
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;

  useEffect(() => {
    const fetchTrastion = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/zalopay/getAllTranstion",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
        setTranstion(response.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu", error);
      }
    };
    fetchTrastion();
  }, [token]);

  return (
    <div className="container_home">
      <div className="content_home">
        <div className="general_inf">
          <CardGeneralInf token={token} transtion={transtion} />
        </div>
        <div className="chart">
          <h4>Thống kê doanh thu theo từng tháng</h4>
          <Chart transtion={transtion} />
        </div>
      </div>
    </div>
  );
};
