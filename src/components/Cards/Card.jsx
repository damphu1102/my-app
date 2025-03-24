import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const CardMovie = ({ movie }) => {
  return (
    <>
      <Card style={{ width: "20rem" }}>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", textAlign: "center" }}>
            {movie.movieName}
          </Card.Title>
          <Card.Text>
            <p>Đạo viên: {movie.director}</p>
            <p>Thể loại: {movie.genre}</p>
            <p>Thời lượng: {movie.duration} phút</p>
          </Card.Text>
          <Link to={`/movieInf/${movie.movieId}`}>
            <Button variant="primary" className="button">
              Chi tiết phim
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};

export const CardButtonMovie = ({ onFilter }) => {
  const [activeButton, setActiveButton] = useState("showingNow");
  const handleClick = (status) => {
    setActiveButton(status);
    onFilter(status);
  };
  return (
    <>
      <div className="button_data">
        <Button
          className={`coming ${activeButton === "comingSoon" ? "active" : ""}`}
          onClick={() => handleClick("comingSoon")}
        >
          PHIM SẮP CHIẾU
        </Button>

        <Button
          className={`showing ${activeButton === "showingNow" ? "active" : ""}`}
          onClick={() => handleClick("showingNow")}
        >
          PHIM ĐANG CHIẾU
        </Button>

        <Button
          className={`special ${
            activeButton === "specialScreening" ? "active" : ""
          }`}
          onClick={() => handleClick("specialScreening")}
        >
          SUẤT CHIẾU ĐẶC BIỆT
        </Button>
      </div>
    </>
  );
};

export const CardTabMovie = () => {
  const [movies, setMovies] = useState([]);
  const [filterStatus, setFilterStatus] = useState("showingNow"); // Trạng thái mặc định

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `http://localhost:8080/movie/filter?statusMovie=${filterStatus}`;
        const response = await axios.get(url);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [filterStatus]);

  const handleClick = (status) => {
    setFilterStatus(status);
  };

  return (
    <>
      <div className=" tab_btn">
        <Button
          onClick={() => handleClick("comingSoon")}
          className={`coming ${filterStatus === "comingSoon" ? "active" : ""}`}
        >
          PHIM SẮP CHIẾU
        </Button>

        <Button
          onClick={() => handleClick("showingNow")}
          className={`showing ${filterStatus === "showingNow" ? "active" : ""}`}
        >
          PHIM ĐANG CHIẾU
        </Button>
      </div>
      <div className="tab_list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link to={`/movieInf/${movie.movieId}`}>
              <div key={movie.movieId} className="data">
                <img src={movie.image} alt={movie.movieName} />
                <div className="list_data">
                  <h5>{movie.movieName}</h5>
                  <p>{movie.genre}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Không có phim yêu cầu</p>
        )}
      </div>
    </>
  );
};

export const CardModalShowTime = ({
  show,
  cinemas,
  modalTitle,
  modalContent,
  handleLocationChange,
  handleCinemaChange,
  handleCloseAndReset,
  handleNextClick,
  selectedLocation,
  handleBackClick,
  selectedCinema,
  showTimes,
  activeTime,
  handleDateChange,
  handleTimeClick,
  handleNextSeatPage,
}) => {
  const [dates, setDates] = useState([]); // Thêm state dates
  const [selectedDate, setSelectedDate] = useState(""); // Thêm state selectedDate
  const handleDateSelect = useCallback(
    (e) => {
      // Sử dụng useCallback
      setSelectedDate(e.target.value);
      handleDateChange(e);
    },
    [handleDateChange]
  ); // Thêm handleDateChange vào dependencies

  useEffect(() => {
    // Lấy danh sách ngày duy nhất từ showTimes
    if (showTimes && showTimes.length > 0) {
      const uniqueDates = Array.from(
        new Set(showTimes.map((showTime) => showTime.date))
      );
      setDates(uniqueDates);
    } else {
      setDates([]);
    }
  }, [showTimes]);

  // Sửa đổi hàm handleCloseAndReset
  const handleCloseAndResetWithDateReset = () => {
    setSelectedDate(""); // Reset selectedDate về ""
    handleCloseAndReset(); // Gọi handleCloseAndReset từ props
  };

  return (
    <>
      <Modal
        show={show}
        centered
        size="md"
        onHide={handleCloseAndResetWithDateReset}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "cinema" ? (
            <>
              {/* Location */}
              <Form.Select
                aria-label="Default select example"
                onChange={handleLocationChange}
                value={selectedLocation}
              >
                <option value="">--Chọn khu vực---</option>
                <option value="HaNoi">HaNoi</option>
                <option value="DaNang">DaNang</option>
                <option value="HoChiMinh">HoChiMinh</option>
              </Form.Select>
              {/* CinemaName */}
              {selectedLocation && cinemas.length > 0 && (
                <Form.Select
                  aria-label="Cinema select"
                  onChange={handleCinemaChange}
                  value={selectedCinema}
                >
                  <option value="">--Chọn rạp phim---</option>
                  {cinemas.map((cinema) => (
                    <option key={cinema.cinemaId} value={cinema.cinemaName}>
                      {cinema.cinemaName}
                    </option>
                  ))}
                </Form.Select>
              )}
            </>
          ) : (
            <div className="container_showtime">
              <Form.Group className="mb-3">
                <Form.Label>Chọn ngày:</Form.Label>
                <Form.Select onChange={handleDateSelect} value={selectedDate}>
                  <option value="">--Chọn ngày---</option>
                  {dates.map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Label>Chọn giờ chiếu:</Form.Label>

              {selectedDate !== "" ? (
                <>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      placeItems: "center",
                    }}
                  >
                    {showTimes.length > 0 ? (
                      showTimes.map((showTime) => (
                        <div
                          key={showTime.showtimeId}
                          className="list_button"
                          style={{ padding: "10px 0px" }}
                        >
                          <Button
                            onClick={() => handleTimeClick(showTime.time)} // Thêm onClick handler
                            style={{
                              backgroundColor:
                                activeTime === showTime.time
                                  ? "lightblue"
                                  : "white", // Thêm inline style
                              color:
                                activeTime === showTime.time
                                  ? "black"
                                  : "black", // Thêm inline style
                            }}
                          >
                            {showTime.time}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p>Không có giờ chiếu nào vào ngày này.</p> // Hiển thị thông báo nếu không có showtimes
                    )}
                  </div>
                </>
              ) : (
                <p>Chưa có giờ tương ứng</p>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {modalContent === "cinema" ? (
            <>
              <Button
                variant="secondary"
                onClick={handleCloseAndResetWithDateReset}
              >
                Close
              </Button>
              <Button variant="success" onClick={handleNextClick}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={handleBackClick}>
                Back
              </Button>

              <Button variant="success" onClick={handleNextSeatPage}>
                Next
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
