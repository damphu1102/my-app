import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "../Modal/modal.scss";
import { useState } from "react";
import axios from "axios";

export const ModalMovie = ({ show, onHide }) => {
  const [newMovie, setNewMovie] = useState([
    {
      movieName: "",
      actor: "",
      description: "",
      director: "",
      duration: "",
      genre: "",
      image: "",
      language: "",
      rating: "",
      releaseDate: "",
      statusMovie: "",
      trailer: "",
      viewingAge: "",
    },
  ]);

  const submitForm = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/movie/create`,
        newMovie
      );
      if (response.status === 200) {
        setNewMovie({
          movieName: "",
          actor: "",
          description: "",
          director: "",
          duration: "",
          genre: "",
          image: "",
          language: "",
          rating: "",
          releaseDate: "",
          statusMovie: "",
          trailer: "",
          viewingAge: "",
        });
        onHide();
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  console.log(newMovie);

  return (
    <div>
      <Modal show={show} size="lg">
        <Modal.Header>
          <Modal.Title>Thêm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Tên phim */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                    <option value={newMovie.genre}>Drama</option>
                    <option value={newMovie.genre}>Thriller</option>
                    <option value={newMovie.genre}>Action</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                    <option value={newMovie.language}>Vietnamese</option>
                    <option value={newMovie.language}>English</option>
                    <option value={newMovie.language}>Chinese</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            {/* Hình ảnh và trailer */}
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Thời lượng</Form.Label>
                  <Form.Control
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Độ tuổi</Form.Label>
                  <Form.Control
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
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Đánh giá</Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    max={5}
                    onChange={(e) => {
                      setNewMovie({
                        ...newMovie,
                        rating: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              {/*  */}
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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
                    <option value={newMovie.statusMovie}>Public</option>
                    <option value={newMovie.statusMovie}>Private</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {/*  */}
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Ngày công chiếu</Form.Label>
                  <Form.Control
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Giới thiệu phim</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Vui lòng nhập giới thiệu"
                value={newMovie.description}
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
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={submitForm}>
            Save/Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
