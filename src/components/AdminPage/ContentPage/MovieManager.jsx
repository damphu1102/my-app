import { useEffect, useState } from "react";
import "../ContentPage/admincontent.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Table } from "react-bootstrap";

export const MovieManager = () => {
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
    <div className="content_page">
      <div className="control">
        <Button variant="primary">Tạo phim</Button>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Tên phim"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên phim</th>
              <th>Năm phát hành</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
            </tr>
          </thead>
          {movies.map((movie) => (
            <tbody key={movie.id}>
              <tr>
                <td>{movie.movieName}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.genre}</td>
                <td>Công khai</td>
                <td>{movie.createAt}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};
