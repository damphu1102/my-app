import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useLocation } from "react-router-dom";

export const CardMovie = ({ movie }) => {
  const location = useLocation();

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
          <Link
            to={`/movieInf/${movie.id}`}
            active={location.pathname === "/movie"}
          >
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
