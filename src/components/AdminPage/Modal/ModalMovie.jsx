import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../Modal/modal.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const ModalMovie = ({
  show,
  onHide,
  movieToEdit,
  isEditMode,
  onSubmitSuccess,
}) => {
  const initialMovieState = {
    movieName: "",
    actor: "",
    description: "",
    director: "",
    duration: "",
    genre: "",
    image: "",
    language: "",
    releaseDate: "",
    statusMovie: "",
    trailer: "",
    viewingAge: "",
  };

  const [newMovie, setNewMovie] = useState(initialMovieState);
  const [createAt, setCreateAt] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Thêm state createAt
  const [updateAt, setUpdateAt] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Thêm state updateAt

  useEffect(() => {
    if (isEditMode && movieToEdit) {
      setNewMovie(movieToEdit);
      setCreateAt(movieToEdit.createAt); // Giữ nguyên ngày tạo khi chỉnh sửa
      setUpdateAt(new Date().toISOString().slice(0, 10)); // Cập nhật ngày cập nhật khi chỉnh sửa
    } else {
      setNewMovie(initialMovieState);
      setCreateAt(new Date().toISOString().slice(0, 10)); // Đặt ngày tạo là ngày hiện tại khi thêm mới
    }
  }, [isEditMode, movieToEdit]);

  // API Xóa
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/movie/delete/${movieToEdit.movieId}`
      );
      if (response.status === 200) {
        alert("Xóa phim thành công!");
        onSubmitSuccess(); // Fetch lại danh sách phim sau khi xóa
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Xóa phim thất bại!");
    }
  };

  // API Thêm mới/Chỉnh sửa
  const submitForm = async () => {
    try {
      let response;
      if (isEditMode && movieToEdit) {
        response = await axios.put(
          `http://localhost:8080/movie/update/${movieToEdit.movieId}`,
          {
            ...newMovie,
            updateDate: updateAt,
          }
        );
      } else {
        response = await axios.post(`http://localhost:8080/movie/create`, {
          ...newMovie,
          createAt: createAt, // Gửi ngày tạo khi thêm mới
        });
      }

      if (response.status === 200) {
        setNewMovie(initialMovieState);
        onHide();
        onSubmitSuccess();
        alert(isEditMode ? "Cập nhật thành công!" : "Thêm mới thành công!");
      }
    } catch (error) {
      alert(isEditMode ? "Cập nhật thất bại!" : "Thêm mới thất bại!");
    }
  };
  return (
    <div>
      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>{isEditMode ? "Sửa phim" : "Thêm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Tên phim */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Tên phim</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên phim"
                value={newMovie.movieName}
                onChange={(e) => {
                  setNewMovie({
                    ...newMovie,
                    movieName: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Row className="g-2">
              <Col md>
                {/* Đạo diễn */}
                <Form.Group className="mb-3" controlId="formBasicDirector">
                  <Form.Label>Đạo diễn</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Vui lòng nhập tên đạo diện"
                    value={newMovie.director}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        director: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md>
                {/* Diễn viên */}
                <Form.Group className="mb-3" controlId="formBasicActor">
                  <Form.Label>Diễn viên</Form.Label>
                  <Form.Control
                    type="input"
                    placeholder="Vui lòng nhập tên diễn viên"
                    value={newMovie.actor}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        actor: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Thể loại và Ngôn ngữ */}
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicGenre">
                  <Form.Label>Thể loại</Form.Label>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={newMovie.genre}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        genre: e.target.value,
                      });
                    }}
                  >
                    <option>---</option>
                    <option value={newMovie.genre.Drama}>Drama</option>
                    <option value={newMovie.genre.Thriller}>Thriller</option>
                    <option value={newMovie.genre.Action}>Action</option>
                    <option value={newMovie.genre.Historical}>
                      Historical
                    </option>
                    <option value={newMovie.genre.Comedy}>Comedy</option>
                    <option value={newMovie.genre.Romantic}>Romantic</option>
                    <option value={newMovie.genre.Animation}>Animation</option>
                    <option value={newMovie.genre.Psychology}>
                      Psychology
                    </option>
                    <option value={newMovie.genre.Horror}>Horror</option>
                    <option value={newMovie.genre.Mystery}>Mystery</option>
                    <option value={newMovie.genre.Adventure}>Adventure</option>
                    <option value={newMovie.genre.Adventure}>Horrified</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLanguage">
                  <Form.Label>Ngôn ngữ</Form.Label>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={newMovie.language}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        language: e.target.value,
                      });
                    }}
                  >
                    <option>---</option>
                    <option value={newMovie.language.vietnamese}>
                      Vietnamese
                    </option>
                    <option value={newMovie.language.english}>English</option>
                    <option value={newMovie.language.chinese}>Chinese</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {/* Hình ảnh và trailer */}
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicImage">
                  <Form.Label>Link hình ảnh</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Vui lòng điền link vào đây"
                    value={newMovie.image}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        image: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicTrailer">
                  <Form.Label>Link trailer</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Vui lòng điền link vào đây"
                    value={newMovie.trailer}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        trailer: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Thời lượng, độ tuổi, đánh giá, ngày công chiếu, trạng thái */}
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicDuration">
                  <Form.Label>Thời lượng</Form.Label>
                  <Form.Control
                    value={newMovie.duration}
                    type="number"
                    min={0}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        duration: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              {/*  */}
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Độ tuổi</Form.Label>
                  <Form.Control
                    value={newMovie.viewingAge}
                    type="number"
                    min={0}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        viewingAge: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              {/*  */}
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicStatus">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
                    aria-label="Floating label select example"
                    value={newMovie.statusMovie}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        statusMovie: e.target.value,
                      });
                    }}
                  >
                    <option>---</option>
                    <option value={newMovie.statusMovie.showingNow}>
                      showingNow
                    </option>
                    <option value={newMovie.statusMovie.comingSoon}>
                      comingSoon
                    </option>
                    <option value={newMovie.statusMovie.specialScreening}>
                      specialScreening
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {/*  */}
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicReleaseDate">
                  <Form.Label>Ngày công chiếu</Form.Label>
                  <Form.Control
                    value={newMovie.releaseDate}
                    type="date"
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        releaseDate: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* giới thiệu phim */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Giới thiệu</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Vui lòng nhập giới thiệu"
                value={newMovie.description || ""}
                onChange={(e) => {
                  setNewMovie({
                    ...newMovie,
                    description: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="admin_modal">
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          {isEditMode && (
            <Button variant="danger" onClick={handleDelete}>
              Xóa
            </Button>
          )}
          <Button variant="primary" onClick={submitForm}>
            Save/Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
