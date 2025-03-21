import axios from "axios";
import { useEffect, useState } from "react";
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
          <Link to={`/movieInf/${movie.id}`}>
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
    window.scrollTo(0, 0);
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
            <Link to={`/movieInf/${movie.id}`}>
              <div key={movie.id} className="data">
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
