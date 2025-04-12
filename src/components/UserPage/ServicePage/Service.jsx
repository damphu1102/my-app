import { useLocation, useNavigate } from "react-router-dom";
import "../ServicePage/service.scss";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CardInfAccount,
  CardInfService,
  CardInfVoucher,
} from "../../Cards/Card";
import { Timeout } from "../Timeout/Timeout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Nhập CSS
import { Toast } from "../ToastPage";
import { Payment } from "../Payment/Payment";

export const Service = () => {
  const location = useLocation();
  const data = location.state;
  const [services, setService] = useState([]);
  const [quantities, setQuantities] = useState({}); // Sử dụng object để lưu trữ số lượng cho từng dịch vụ
  const [totalServicePrice, setTotalServicePrice] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const [voucherPrices, setVoucherPrices] = useState({}); // Tạo state để lưu trữ giá dịch vụ
  const [selectedVoucherId, setSelectedVoucherId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(data.remainingTime); // Lấy thời gian từ data
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const userDataString = localStorage.getItem("userData"); // Lấy chuỗi JSON userData từ localStorage
  const userData = JSON.parse(userDataString); // Phân tích chuỗi JSON thành đối tượng JavaScript
  const fullName = userData.fullName;
  const emailAccount = userData.emailAccount;
  const phoneNumber = userData.phoneNumber;
  const [toastMessage, setToastMessage] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchService = async () => {
      let url = `http://localhost:8080/service`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setService(response.data);
        const initialQuantities = {};
        response.data.forEach((service) => {
          initialQuantities[service.serviceId] = 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching service", error);
      }
    };
    fetchService();
  }, [token]);

  useEffect(() => {
    const fetchVoucher = async () => {
      let url = `http://localhost:8080/voucher`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setVouchers(response.data);
        const prices = {}; // Tạo đối tượng để lưu trữ giá voucher
        response.data.forEach((voucher) => {
          prices[voucher.voucherId] = voucher.priceVoucher; // Lưu giá voucher vào đối tượng prices
        });
        setVoucherPrices(prices); // Cập nhật state voucherPrices
      } catch (error) {
        console.error("Error fetching service", error);
      }
    };
    fetchVoucher();
  }, [token]);

  useEffect(() => {
    // Tính toán totalServicePrice mỗi khi quantities thay đổi
    let newTotalServicePrice = 0;
    services.forEach((service) => {
      newTotalServicePrice +=
        service.priceService * (quantities[service.serviceId] || 0);
    });
    setTotalServicePrice(newTotalServicePrice);
  }, [quantities, services]);

  const handleIncrement = (serviceId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [serviceId]: (prevQuantities[serviceId] || 0) + 1,
    }));
  };

  const handleDecrement = (serviceId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [serviceId]: Math.max((prevQuantities[serviceId] || 0) - 1, 0),
    }));
  };

  const handleVoucherChange = (voucherId) => {
    setSelectedVoucherId(voucherId);
  };

  const discount = selectedVoucherId
    ? voucherPrices[selectedVoucherId] || 0
    : 0;

  const handleTimeout = () => {
    setToastMessage({
      message: "Hết thời gian đặt vé.",
      type: "warn",
    });
    // Xử lý khi hết thời gian, ví dụ: chuyển hướng về trang chủ
    navigate("/");
  };

  const handleTimeChange = (time) => {
    setRemainingTime(time);
  };

  const TotalPrice = data.totalPriceSeat + totalServicePrice - discount;

  return (
    <div className="service_container">
      <div className="service">
        <CardInfAccount
          fullName={fullName}
          emailAccount={emailAccount}
          phoneNumber={phoneNumber}
        />
        {/*  */}
        <CardInfService
          services={services}
          quantities={quantities}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
        {/*  */}
        <div className="inf_voucher">
          <CardInfVoucher
            vouchers={vouchers}
            onVoucherChange={handleVoucherChange}
          />
          {/*  */}
          <div className="price">
            <div className="label_price">
              <Form.Label>Số tiền được giảm giá</Form.Label>
              <Form.Label>Số tiền cần thanh toán</Form.Label>
            </div>
            <div className="show_price">
              <p style={{ color: "green" }}>
                {discount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p style={{ color: "red" }}>
                {TotalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="time_out">
          <Timeout
            initialTime={remainingTime}
            onTimeout={handleTimeout}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>
      <div className="inf">
        <div className="inf_showtime">
          <h3>Thông tin vé</h3>
          <img src={data.movie.image} alt={data.movie.movieName} />
          <p>Tên phim: {data.movie.movieName}</p>
          <p>Rạp chiếu: {data.selectedCinema}</p>
          <p>Phòng chiếu: {data.room} </p>
          <p>Ngày chiếu: {data.date}</p>
          <p>Giờ chiếu: {data.activeTime}</p>
          <p>
            Ghế:{" "}
            {data.selectedSeatsInfo.map((seat, index) => (
              <span key={index}>
                {seat.seatNumber}
                {index < data.selectedSeatsInfo.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
        <Button
          variant="success"
          style={{ width: "50%", marginLeft: "25%" }}
          onClick={handleShow}
        >
          Thanh toán
        </Button>
      </div>
      <div></div>
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
      <Payment
        show={show}
        onHide={handleClose}
        data={data}
        TotalPrice={TotalPrice}
      />
    </div>
  );
};
