import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

export const CardDash = () => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Quản lý doanh thu</Accordion.Header>
          <Accordion.Body>
            <Link to="dashboard_manager">Doanh thu</Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Quản lý phim</Accordion.Header>
          <Accordion.Body>
            <Link to="movie_manager">Danh sách phim</Link>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Quản lý rạp phim</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Quản lý lịch chiếu</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Quản lý suất chiếu</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Quản lý đơn hàng</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>Quản lý giá vé</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>Quản lý khuyến mại</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>Quản lý bài viết</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion.Header>Quản lý user</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="11">
          <Accordion.Header>Quản lý dịch vụ</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
