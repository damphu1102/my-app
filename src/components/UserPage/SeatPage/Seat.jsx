import { useLocation, useNavigate } from "react-router-dom";
import "../SeatPage/seat.scss";
import { Button } from "react-bootstrap";
import { ImgSeat } from "./ImgSeat";
import { useEffect, useState } from "react";
import axios from "axios";
import { Timeout } from "../Timeout/Timeout";
import "react-toastify/dist/ReactToastify.css"; // Nhập CSS
import { toast, ToastContainer } from "react-toastify";

export const Seat = () => {
  const location = useLocation();
  const data = location.state;
  const [rowSeat, setRowSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Sử dụng useState để lưu danh sách ghế đã chọn
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [remainingTime, setRemainingTime] = useState(600); // 10 phút

  useEffect(() => {
    const fetchRowSeat = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/seat`);
        // Cập nhật dữ liệu từ API để bao gồm thuộc tính 'img'
        const seatsWithImg = response.data.map((seat) => ({
          ...seat,
          img:
            seat.seatStatus === "selected"
              ? seat.imgSelected
              : seat.imgUnselected,
          seatStatus: seat.seatStatus || "un_selected", // Thêm seatStatus từ API
        }));
        setRowSeat(seatsWithImg);
      } catch (error) {
        console.error("Error fetching row seat:", error);
      }
    };
    fetchRowSeat();
  }, []);

  // Lấy danh sách các hàng ghế duy nhất
  const uniqueRows = [...new Set(rowSeat.map((seat) => seat.seatRow))];

  const updateSeatStatus = async (seat_id, newStatus) => {
    try {
      axios.put(`http://localhost:8080/seat/${seat_id}/${newStatus}`);
    } catch (error) {
      console.error("Error updating seat status:", error);
    }
  };

  // Hàm xử lý sự kiện click vào ghế
  const handleSeatClick = (clickedSeat) => {
    const isSelected = selectedSeats.some(
      (seat) => seat.seat_id === clickedSeat.seat_id
    );

    if (isSelected) {
      // Nếu ghế đã được chọn, loại bỏ nó khỏi danh sách đã chọn
      setSelectedSeats(
        selectedSeats.filter((seat) => seat.seat_id !== clickedSeat.seat_id)
      );
    } else {
      // Nếu ghế chưa được chọn, thêm nó vào danh sách đã chọn
      setSelectedSeats([...selectedSeats, clickedSeat]);
    }

    // Cập nhật trạng thái của ghế trong rowSeat
    setRowSeat((prevRowSeat) =>
      prevRowSeat.map((seat) => {
        if (seat.seat_id === clickedSeat.seat_id) {
          const newStatus =
            seat.seatStatus === "un_selected" ? "selected" : "un_selected";
          const newImg =
            newStatus === "selected" ? seat.imgSelected : seat.imgUnselected;
          updateSeatStatus(clickedSeat.seat_id, newStatus);

          return { ...seat, seatStatus: newStatus, img: newImg };
        }
        return seat;
      })
    );
  };

  const handleDataNext = () => {
    const selectedSeatsInfo = selectedSeats.map((seat) => ({
      seatNumber: seat.seatNumber,
    }));
    const totalPriceSeat = selectedSeats.reduce(
      (total, seat) => total + seat.seatPrice,
      0
    );
    return { selectedSeatsInfo, totalPriceSeat };
  };

  const handleNextButtonClick = () => {
    if (selectedSeats.length === 0) {
      toast.warn("Vui lòng chọn ghế trước khi tiếp tục.", {
        position: "top-right", // Vị trí của toast
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Ngăn chặn việc chuyển hướng nếu không có ghế nào được chọn
    }
    const { selectedSeatsInfo, totalPriceSeat } = handleDataNext();
    navigate("/service", {
      state: {
        ...data,
        selectedSeatsInfo,
        totalPriceSeat,
        remainingTime: remainingTime, // Truyền thời gian còn lại
      },
    });
    window.scrollTo(0, 0);
  };

  const handleTimeout = () => {
    // Xử lý khi hết thời gian, ví dụ: hiển thị thông báo, chuyển hướng, v.v.
    toast.warn("Hết thời gian đặt vé.", {
      position: "top-right", // Vị trí của toast
      autoClose: 3000, // Tự động đóng sau 3 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Ví dụ chuyển hướng về trang chủ
    navigate("/");
  };

  const handleTimeChange = (time) => {
    setRemainingTime(time);
  };

  return (
    <div className="seat_container">
      <div className="seat_left">
        <div className="status_seat">
          <ImgSeat />
        </div>
        <div className="screen">
          <img
            src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809663/ic-screen_qsvlrn.png"
            alt="màn chiếu"
          />
        </div>
        <div className="row_seat">
          {uniqueRows.map((row) => (
            <div
              key={row}
              className={`row${row}`}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              {rowSeat
                .filter((seat) => seat.seatRow === row)
                .map((seat) => (
                  <div
                    className="container_row"
                    onClick={() => handleSeatClick(seat)}
                  >
                    <img
                      key={seat.seat_id}
                      src={seat.img}
                      alt={`seat-${seat.seatNumber}`}
                    />
                    <p>{seat.seatNumber}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="time_out">
          <Timeout
            onTimeout={handleTimeout}
            initialTime={remainingTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>

      {/*  */}
      <div className="seat_right">
        <div className="inf_showtime">
          <h3>Thông tin vé</h3>
          <img src={data.movie.image} alt={data.movie.movieName} />
          <p>Tên phim: {data.movie.movieName}</p>
          <p>Rạp chiếu: {data.selectedCinema}</p>
          <p>Phòng chiếu: {data.room} </p>
          <p>Ngày chiếu: {data.date}</p>
          <p>Giờ chiếu: {data.activeTime}</p>
          <p>Ghế: {selectedSeats.map((seat) => seat.seatNumber).join(", ")}</p>
          <p>
            Giá vé:{" "}
            {selectedSeats
              .reduce((total, seat) => total + (seat.seatPrice || 0), 0)
              .toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
          </p>
        </div>
        <Button
          variant="success"
          style={{ width: "50%", marginLeft: "25%", marginBottom: "10px" }}
          onClick={handleNextButtonClick} // Thêm sự kiện onClick
        >
          Next
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
};
