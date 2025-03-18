import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Header/navbar.scss";
import { useLocation } from "react-router-dom";

export const Menu = () => {
  const location = useLocation();
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
            <Nav.Link href="/about" active={location.pathname === "/about"}>
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
