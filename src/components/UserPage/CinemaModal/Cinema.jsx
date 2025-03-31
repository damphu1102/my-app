import "./cinema.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardModalShowTime } from "../../Cards/Card";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Nhập CSS
import { Toast } from "../ToastPage";

export const Cinema = ({ show, handleClose, movie }) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [modalTitle, setModalTitle] = useState("Vui lòng chọn rạp phim");
  const [modalContent, setModalContent] = useState("cinema");
  const [showTimes, setShowTimes] = useState([]);
  const [date, setDate] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [toastMessage, setToastMessage] = useState(null);
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Lọc roomShow dựa trên date và activeTime
  const filteredRoomShows = showTimes
    .filter((showtime) => showtime.time === activeTime)
    .map((showtime) => showtime.roomShow);

  useEffect(() => {
    const fetchCinemas = async () => {
      if (selectedLocation) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cinema/filter?locationEnum=${selectedLocation}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
              },
            }
          );
          setCinemas(response.data);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setCinemas([]); // Reset cinemas khi selectedLocation rỗng
      }
    };
    fetchCinemas();
  }, [selectedLocation]);

  useEffect(() => {
    const fetchShowTime = async () => {
      try {
        let url = `http://localhost:8080/showtime`; // URL mặc định để lấy tất cả showtimes

        if (date) {
          // Nếu date có giá trị, thêm tham số truy vấn để lọc theo ngày
          url = `http://localhost:8080/showtime/filter?date=${date}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setShowTimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        setShowTimes([]); // Reset showTimes nếu có lỗi
      }
    };

    fetchShowTime();
  }, [date]);

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    }
  }, [toastMessage]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setActiveTime("");
  };

  const handleTimeClick = (time) => {
    setActiveTime(time);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedCinema("");
  };

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const handleCloseAndReset = () => {
    setSelectedLocation("");
    setSelectedCinema("");
    setCinemas([]);
    handleClose();
  };

  const handleNextClick = () => {
    if (selectedCinema) {
      setModalTitle("Chọn suất chiếu");
      setModalContent("showtime");
    } else {
      setToastMessage({
        message: "Vui lòng chọn rạp để tiếp tục.",
      });
    }
  };

  const handleNextSeatPage = () => {
    if (date && activeTime) {
      const dataShowTime = {
        movie: movie,
        selectedCinema: selectedCinema,
        date: date,
        activeTime: activeTime,
        room: filteredRoomShows,
      };
      navigate("/seat", { state: dataShowTime }); // Truyền dataShowTime vào state
      window.scrollTo(0, 0);
    } else {
      setToastMessage({
        message: "Vui lòng chọn giờ chiếu để tiếp tục.",
      });
    }
  };

  const handleBackClick = () => {
    setModalTitle("Vui lòng chọn rạp phim");
    setModalContent("cinema");
  };

  return (
    <div className="container_cinema">
      <CardModalShowTime
        show={show}
        cinemas={cinemas}
        modalTitle={modalTitle}
        modalContent={modalContent}
        handleLocationChange={handleLocationChange}
        handleCinemaChange={handleCinemaChange}
        handleCloseAndReset={handleCloseAndReset}
        handleNextClick={handleNextClick}
        selectedLocation={selectedLocation}
        handleBackClick={handleBackClick}
        selectedCinema={selectedCinema}
        showTimes={showTimes}
        activeTime={activeTime}
        handleDateChange={handleDateChange}
        handleTimeClick={handleTimeClick}
        handleNextSeatPage={handleNextSeatPage}
      />
      {toastMessage && (
        <Toast message={toastMessage.message} type={toastMessage.type} />
      )}
    </div>
  );
};
