import { Button, Form } from "react-bootstrap";
import "../MovieInf/movieinf.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardTabMovie } from "../../../Cards/Card";
import { Cinema } from "../../CinemaModal/Cinema";

export const MovieInf = () => {
  const [movie, setMovie] = useState("");
  const { movie_id } = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const url = `http://localhost:8080/movie/${movie_id}`;
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [movie_id]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="container_movieInf">
      <div className="content_card">
        <div className="card_movie">
          <img src={movie.image} alt={movie.movieName} />
          <Button variant="outline-primary" onClick={handleShow}>
            Đặt vé
          </Button>
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

      <div className="content_card1">
        <div className="content_trailer">
          <iframe src={movie.trailer} title={movie.movieName}></iframe>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Gửi bình luận ở đây</Form.Label>
            <div className="input_control">
              <Form.Control as="textarea" rows={4} />
              <button className="send-button">Gửi</button>
            </div>
          </Form.Group>
        </div>

        <div className="tab_movie">
          <CardTabMovie />
        </div>
      </div>
      <Cinema
        show={show}
        key={movie_id}
        handleClose={handleClose}
        movie={movie}
      />
    </div>
  );
};
