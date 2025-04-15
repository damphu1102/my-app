import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import "../Header/navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const Menu = ({ setToastMessage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allMovies, setAllMovies] = useState([]); // State mới để lưu trữ tất cả các phim
  const searchResultsRef = useRef(null); // Tạo một ref cho container kết quả tìm kiếm

  const fetchAllMovies = () => {
    setIsSearching(true);
    axios
      .get(`http://localhost:8080/movie`)
      .then((response) => {
        setAllMovies(response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách phim:", error);
        setAllMovies([]);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const handleChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm) {
      setIsSearching(true);
      axios
        .get(
          `http://localhost:8080/movie/searchList?movieName=${newSearchTerm}`
        )
        .then((response) => {
          setSearchResults(response.data);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm kiếm:", error);
          setSearchResults([]);
          setIsSearching(false);
        });
    } else {
      setSearchResults(allMovies);
    }
  };

  const handleSearchResultClick = (movieId) => {
    navigate(`/movieInf/${movieId}`);
    setSearchResults([]);
    setSearchTerm("");
  };

  const handleAboutClick = () => {
    if (!localStorage.getItem("token")) {
      setToastMessage(null);
      setTimeout(() => {
        setToastMessage({ message: "Vui lòng đăng nhập để tiếp tục." });
      }, 200);
    } else {
      navigate("/about");
    }
  };

  const handleSearchFocus = () => {
    setSearchResults(allMovies);
  };

  const handleSearchBlur = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.relatedTarget)
    ) {
      setTimeout(() => setSearchResults([]), 100);
    }
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/" active={location.pathname === "/"}>
              Trang chủ
            </Nav.Link>
            <Nav.Link
              href="/movie"
              active={location.pathname.startsWith("/movie")}
            >
              Phim
            </Nav.Link>
            <Nav.Link href="/event" active={location.pathname === "/event"}>
              Sự kiện
            </Nav.Link>
            <Nav.Link
              active={location.pathname === "/about"}
              onClick={handleAboutClick}
            >
              Thành viên
            </Nav.Link>
          </Nav>
          <Form className="d-flex_user">
            <CiSearch className="search-icon" />

            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            {!isSearching && searchResults.length > 0 && (
              <div className="search-results" ref={searchResultsRef}>
                {searchResults.map((result) => (
                  <div
                    key={result.movieId}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result.movieId)}
                    style={{ cursor: "pointer" }}
                  >
                    {result.image && (
                      <img
                        src={result.image}
                        alt={result.movieName}
                        className="result-image"
                      />
                    )}
                    <div className="inf_movie">
                      <p>{result.movieName}</p>
                      <span>Đạo diễn: {result.director}</span> <br />
                      <span>Thể loại: {result.genre}</span>
                      <br />
                      <span>Thời lượng: {result.duration} phút</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};
