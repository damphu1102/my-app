import { Link } from "react-router-dom";
import { CardMovie } from "../../Cards/Card";
import "../MoviePage/movie.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/movie`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container_movie">
      <div className="link_movie">
        <Link to="/movie">
          <button className="btn_view_movie">Xem thêm</button>
        </Link>
      </div>
      <div className="movie">
        {movies.length > 0 ? (
          movies.map((movie) => <CardMovie key={movie.id} movie={movie} />)
        ) : (
          <p>Không có phim yêu cầu</p>
        )}
      </div>
    </div>
  );
};
