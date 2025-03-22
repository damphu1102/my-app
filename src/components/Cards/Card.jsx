import axios from "axios";
import { useEffect, useState } from "react";
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
          <Link to={`/movieInf/${movie.movie_id}`}>
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
            <Link to={`/movieInf/${movie.movie_id}`}>
              <div key={movie.movie_id} className="data">
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
  return (
    <>
      <Modal show={show} centered size="md" onHide={handleCloseAndReset}>
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
                    <option key={cinema.cinema_id} value={cinema.cinemaName}>
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
                <Form.Control type="date" onChange={handleDateChange} />
              </Form.Group>
              <Form.Label>Chọn giờ chiếu:</Form.Label>
              <div
                className="button_date"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 0.5fr)",
                  placeItems: "center",
                }}
              >
                {showTimes.length > 0 ? (
                  showTimes.map((showTime) => (
                    <div
                      key={showTime.showtime_id}
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
                            activeTime === showTime.time ? "black" : "black", // Thêm inline style
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
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {modalContent === "cinema" ? (
            <>
              <Button variant="secondary" onClick={handleCloseAndReset}>
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
