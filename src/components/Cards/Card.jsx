import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const CardMovie = ({ movie }) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
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
          <Button variant="primary" className="button">
            Chi tiết phim
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
