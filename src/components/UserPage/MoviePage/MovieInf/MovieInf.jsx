import { Button, Form } from "react-bootstrap";
import "../MovieInf/movieinf.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const MovieInf = () => {
  const [movie, setMovie] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };
    fetchMovie();
    window.scrollTo(0, 0); // Cuộn về đầu trang khi thay đổi trang
  }, [id]);

  console.log(movie);

  return (
    <div className="container_movieInf">
      <div className="content_card">
        <div className="card_movie">
          <img src={movie.image} alt={movie.movieName} />
          <Button variant="outline-primary">Đặt vé</Button>
        </div>
        <div className="card_inf">
          <h2>{movie.movieName}</h2>
          <span>{movie.description}</span>
          <div className="inf">
            <h5>Đạo diễn: {movie.director}</h5>
            <h5>Diễn viên: {movie.actor}</h5>
            <h5>Thể loại: {movie.genre}</h5>
            <h5>Thời lượng: {movie.duration}</h5>
            <h5>Ngôn ngữ: {movie.language}</h5>
            <h5>Ngày khởi chiếu: {movie.releaseDate}</h5>
          </div>
        </div>
      </div>
      <div className="content_trailer">
        <h2>Trailer</h2>
        <iframe src={movie.trailer} title={movie.movieName}></iframe>
      </div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Gửi bình luận ở đây</Form.Label>
        <div className="input_control">
          <Form.Control as="textarea" rows={5} />
          <button className="send-button">Gửi</button>
        </div>
      </Form.Group>
    </div>
  );
};
