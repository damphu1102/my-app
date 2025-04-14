import { useLocation, useNavigate } from "react-router-dom";
import "../SeatPage/seat.scss";
import { Button } from "react-bootstrap";
import { ImgSeat } from "./ImgSeat";
import { useEffect, useState } from "react";
import axios from "axios";
import { Timeout } from "../Timeout/Timeout";
import "react-toastify/dist/ReactToastify.css"; // Nhập CSS
import { Toast } from "../ToastPage";
import { ToastContainer } from "react-toastify";
import moment from "moment/moment";

export const Seat = () => {
  const location = useLocation();
  const data = location.state;
  const [rowSeat, setRowSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Sử dụng useState để lưu danh sách ghế đã chọn
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [remainingTime, setRemainingTime] = useState(600); // 10 phút
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const resetAndFetchSeats = async () => {
      try {
        const resetResponse = await axios.post(
          "http://localhost:8080/seat/reset-all",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Reset seat statuses:", resetResponse.data);
        // Sau khi reset thành công, fetch lại danh sách ghế
        await fetchRowSeat();
      } catch (resetError) {
        console.error("Error resetting seat statuses:", resetError);
        // Xử lý lỗi nếu reset không thành công, có thể vẫn fetch ghế để hiển thị trạng thái hiện tại
        await fetchRowSeat();
      }
    };

    const fetchRowSeat = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/seat`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const seatsWithImg = response.data.map((seat) => ({
          ...seat,
          img:
            seat.seatStatus === "selected"
              ? seat.imgSelected
              : seat.seatStatus === "success"
              ? seat.imgSuccess
              : seat.imgUnselected,
          seatStatus: seat.seatStatus || "un_selected",
        }));
        setRowSeat(seatsWithImg);
      } catch (fetchError) {
        console.error("Error fetching row seat:", fetchError);
      }
    };

    resetAndFetchSeats();
  }, [token]);

  // Lấy danh sách các hàng ghế duy nhất
  const uniqueRows = [...new Set(rowSeat.map((seat) => seat.seatRow))];

  const updateSeatStatus = async (seat_id, newStatus) => {
    try {
      axios.put(
        `http://localhost:8080/seat/${seat_id}/${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
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
      seatId: seat.seat_id,
    }));
    const totalPriceSeat = selectedSeats.reduce(
      (total, seat) => total + seat.seatPrice,
      0
    );
    return { selectedSeatsInfo, totalPriceSeat };
  };

  const handleNextButtonClick = () => {
    if (selectedSeats.length === 0) {
      setToastMessage({
        message: "Vui lòng chọn ghế trước khi tiếp tục.",
        type: "warn",
      });
      setTimeout(() => {
        setToastMessage(null); // Reset toastMessage sau khi hiển thị
      }, 1000);
      return;
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
    setToastMessage({
      message: "Hết thời gian đặt vé.",
      type: "warn",
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
                    onClick={() => {
                      // Chỉ cho phép click nếu trạng thái ghế không phải là 'success'
                      if (seat.seatStatus !== "success") {
                        handleSeatClick(seat);
                      }
                    }}
                    style={{
                      cursor:
                        seat.seatStatus === "success" ? "default" : "pointer",
                    }}
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
          <p>Ngày chiếu: {moment(data.date).format("DD/MM/YYYY")}</p>
          <p>
            Giờ chiếu: {moment(data.activeTime, "HH:mm:ss").format("HH:mm")}
          </p>
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
        {toastMessage && <Toast message={toastMessage.message} />}
      </div>
    </div>
  );
};
