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

export const CardButtonMovie = () => {
  return (
    <>
      <div className="button_data">
        <div className="coming">
          <Link to="#">PHIM SẮP CHIẾU</Link>
        </div>
        <div className="showing">
          <Link to="#">PHIM ĐANG CHIẾU</Link>
        </div>
        <div className="special">
          <Link to="#">SUẤT CHIẾU ĐẶC BIỆT</Link>
        </div>
      </div>
    </>
  );
};
