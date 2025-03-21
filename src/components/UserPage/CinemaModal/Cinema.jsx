import "./cinema.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardModalShowTime } from "../../Cards/Card";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const fetchCinemas = async () => {
      if (selectedLocation) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cinema/filter?locationEnum=${selectedLocation}`
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
      if (date) {
        // Kiểm tra nếu date có giá trị
        try {
          const url = `http://localhost:8080/showtime/filter?date=${date}`;
          const response = await axios.get(url);
          setShowTimes(response.data);
        } catch (error) {
          console.error("Error fetching movie:", error);
        }
      } else {
        setShowTimes([]); // Reset showTimes nếu date rỗng
      }
    };

    fetchShowTime();
  }, [date]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
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
      alert("Vui lòng chọn rạp phim.");
    }
  };

  const handleNextSeatPage = () => {
    if (date && activeTime) {
      const dataShowTime = {
        movie: movie,
        selectedCinema: selectedCinema,
        date: date,
        activeTime: activeTime,
      };
      navigate("/seat", { state: dataShowTime }); // Truyền dataShowTime vào state
      console.log("trang tiếp theo", selectedCinema);
    } else {
      alert("Vui lòng chọn đủ ngày giờ");
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
        movie={movie}
        date={date}
      />
    </div>
  );
};
