import axios from "axios";
import { Button, Modal } from "react-bootstrap";

export const Payment = ({ show, onHide, data, TotalPrice }) => {
  const handlePayment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/vnpay`, {
        amount: TotalPrice,
      });
      window.location.href = response.data;
    } catch (error) {
      console.error("Lỗi giao dịch");
    }
  };
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
