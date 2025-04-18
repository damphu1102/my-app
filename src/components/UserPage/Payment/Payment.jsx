import axios from "axios";
import moment from "moment/moment";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

export const Payment = ({ show, onHide, data, TotalPrice }) => {
  const seatIds = data.selectedSeatsInfo.map((seatInfo) => seatInfo.seatId);
  const userDataString = localStorage.getItem("userData"); // Lấy chuỗi JSON userData từ localStorage
  const userData = JSON.parse(userDataString);
  const accountId = userData.accountId;
  const movieName = data.movie.movieName;
  const seatNumber = data.selectedSeatsInfo.map(
    (seatInfo) => seatInfo.seatNumber
  );
  const cinema = data.selectedCinema;
  const rooms = data.selectedSeatsInfo.map(() => data.room[0]);
  const time = data.activeTime;
  const date = data.date;

  const handlePayment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/zalopay`, {
        amount: TotalPrice,
        selectedSeats: seatIds,
        accountId: accountId,
        movieName: movieName,
        seatNumber: seatNumber,
        cinema: cinema,
        room: rooms,
        time: time,
        date: date,
      });
      const url = response.data;
      window.location.href = url.order_url;
    } catch (error) {
      console.error("Lỗi thanh toán:", {
        message: error.message,
        response: error.response?.data,
      });
      alert(`Lỗi thanh toán: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    console.log(data);
    console.log(rooms);
  }, [data]); // Log lại nếu `data` thay đổi (tùy chọn)

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thông tin vé</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "1.2rem" }}>
          <p>Tên phim: {data.movie.movieName}</p>
          <p>Rạp chiếu: {data.selectedCinema}</p>
          <p>Phòng chiếu: {data.room} </p>
          <p>Ngày chiếu: {moment(data.date).format("DD/MM/YYYY")}</p>
          <p>
            Giờ chiếu: {moment(data.activeTime, "HH:mm:ss").format("HH:mm")}
          </p>
          <p>
            Ghế:{" "}
            {data.selectedSeatsInfo.map((seat, index) => (
              <span key={index}>
                {seat.seatNumber}
                {index < data.selectedSeatsInfo.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p>
            Tổng thanh toán:{" "}
            <span style={{ color: "red" }}>
              {TotalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
