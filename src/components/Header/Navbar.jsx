import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Header/navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const Menu = ({ setToastMessage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    if (!localStorage.getItem("token")) {
      setToastMessage(null);
      setTimeout(() => {
        setToastMessage({ message: "Vui lòng đăng nhập để tiếp tục." });
      }, 200);
    } else {
      navigate("/about"); // Chỉ chuyển trang nếu đã đăng nhập
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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};
