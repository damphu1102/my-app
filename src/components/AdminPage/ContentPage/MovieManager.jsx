import { useEffect, useState } from "react";
import "../ContentPage/admincontent.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Pagination, Table } from "react-bootstrap";
import { ModalMovie } from "../Modal/ModalMovie";
import { CiSearch } from "react-icons/ci";

export const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const handleAddMovie = () => {
    setIsEditMode(false);
    setMovieToEdit(null);
    setShow(true);
  };

  const handleEditMovie = (movie) => {
    setIsEditMode(true);
    setMovieToEdit(movie);
    setShow(true);
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movie`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Hàm callback sau khi Save thành công
  const handleSubmitSuccess = () => {
    fetchMovies(); // Fetch lại danh sách phim
    setShow(false);
  };

  return (
    <div className="content_page">
      <div className="control">
        <Button variant="primary" onClick={handleAddMovie}>
          Tạo phim
        </Button>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Tên phim"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">
            <CiSearch style={{ fontSize: "1.2rem" }} />
          </Button>
        </Form>
      </div>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phim</th>
              <th>Năm phát hành</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          {movies.map((movie) => (
            <tbody key={movie.id} style={{ cursor: "pointer" }}>
              <tr onClick={() => handleEditMovie(movie)}>
                <td>{movie.id}</td>
                <td>{movie.movieName}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.genre}</td>
                <td>{movie.statusMovie}</td>
                <td>{movie.createAt}</td>
              </tr>
            </tbody>
          ))}
        </Table>
        <Pagination size="sm">1 2</Pagination>
      </div>

      <ModalMovie
        show={show}
        onHide={() => setShow(false)}
        isEditMode={isEditMode}
        movieToEdit={movieToEdit}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </div>
  );
};
