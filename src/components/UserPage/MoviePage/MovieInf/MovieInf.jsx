import { Button, Form } from "react-bootstrap";
import "../MovieInf/movieinf.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const MovieInf = () => {
  const [movie, setMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const { id } = useParams();
  const [filterStatus, setFilterStatus] = useState("showingNow"); // Trạng thái mặc định

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const url = `http://localhost:8080/movie/${id}`;
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

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

  console.log(filterStatus);

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
          <div className=" tab_btn">
            <Button
              onClick={() => handleClick("comingSoon")}
              className={`coming ${
                filterStatus === "comingSoon" ? "active" : ""
              }`}
            >
              PHIM SẮP CHIẾU
            </Button>

            <Button
              onClick={() => handleClick("showingNow")}
              className={`showing ${
                filterStatus === "showingNow" ? "active" : ""
              }`}
            >
              PHIM ĐANG CHIẾU
            </Button>
          </div>
          <div className="tab_list">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className="data">
                  <img src={movie.image} alt={movie.movieName} />
                  <div className="list_data">
                    <h5>{movie.movieName}</h5>
                    <p>{movie.genre}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có phim yêu cầu</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
