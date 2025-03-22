import { Link } from "react-router-dom";
import { CardButtonMovie, CardMovie } from "../../Cards/Card";
import "../ContentPage/content.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const ContentPage = () => {
  const [movies, setMovies] = useState([]);
  const [filterStatus, setFilterStatus] = useState("showingNow"); // Trạng thái mặc định

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `http://localhost:8080/movie`;
        if (filterStatus) {
          url += `/filter?statusMovie=${filterStatus}`;
        }
        const response = await axios.get(url);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
    window.scrollTo(0, 0); // Cuộn về đầu trang khi thay đổi trang
  }, [filterStatus]);

  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="container_movie_home">
      <div className="button_data">
        <CardButtonMovie onFilter={handleFilter} />
      </div>
      <div className="link_movie">
        <Link to="/movie">
          <button className="btn_view_movie">Xem thêm</button>
        </Link>
      </div>
      <div className="movie">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <CardMovie key={movie.movie_id} movie={movie} />
          ))
        ) : (
          <p>Không có phim yêu cầu</p>
        )}
      </div>
    </div>
  );
};
