import { useCallback, useEffect, useState } from "react";
import "../ContentPage/admincontent.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Table } from "react-bootstrap";
import { ModalMovie } from "../Modal/ModalMovie";
import { CiSearch } from "react-icons/ci";
import { Pagination } from "../Pagination/Pagination";

export const MovieManager = () => {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(5); // Kích thước trang
  const [sortField, setSortField] = useState("movieId"); // Trường sắp xếp mặc định
  const [sortType, setSortType] = useState("DESC"); // Loại sắp xếp mặc định
  const [totalPages, setTotalPages] = useState(0); // Thêm state totalPages

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

  const fetchMovies = useCallback(async () => {
    try {
      let url = `http://localhost:8080/movie/search?page=${page}&pageSize=${pageSize}&sortField=${sortField}&sortType=${sortType}`;
      if (search) {
        url += `&movieName=${search}`;
      }
      const response = await axios.get(url);
      setMovies(response.data.content);
      setTotalPages(response.data.totalPages); // Cập nhật totalPages
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [search, page, pageSize, sortField, sortType]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Hàm callback sau khi Save thành công
  const handleSubmitSuccess = () => {
    fetchMovies(); // Fetch lại danh sách phim
    setShow(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1); // Reset page to 1 when changing page size
  };

  // const handleSortFieldChange = (newField) => {
  //   setSortField(newField);
  //   setPage(1); // Reset page to 1 when changing sort field
  // };

  // const handleSortTypeChange = (newType) => {
  //   setSortType(newType);
  //   setPage(1); // Reset page to 1 when changing sort type
  // };

  console.log(movies);

  return (
    <div className="content_page">
      <div className="control">
        <Button variant="primary" onClick={handleAddMovie}>
          Tạo phim
        </Button>
        <Form className="d-flex">
          <CiSearch className="search-icon" />
          <Form.Control
            type="search"
            placeholder="Tìm theo tên phim"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </Form>

        <div className="control_select">
          <span>Page Size</span>
          <Form.Select
            aria-label="Default select example"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}
            size="sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
      </div>

      <div className="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phim</th>
              <th>Thể loại</th>
              <th>Trạng thái</th>
              <th>Năm phát hành</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
            </tr>
          </thead>
          {movies.map((movie, index) => (
            <tbody key={index} style={{ cursor: "pointer" }}>
              <tr onClick={() => handleEditMovie(movie)}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{movie.movieName}</td>
                <td>{movie.genre}</td>
                <td>{movie.statusMovie}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.createAt}</td>
                <td>{movie.updateDate}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
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
