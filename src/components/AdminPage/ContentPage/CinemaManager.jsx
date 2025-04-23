import { Button, Form, Table } from "react-bootstrap";
import "../ContentPage/cinemaManager.scss";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

export const CinemaManager = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = axios.get("http://localhost:8080/cinema", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setCinemas((await response).data);
      } catch (error) {
        console.error("Lỗi tải cinemas", error);
      }
    };
    fetchCinemas();
  }, [token]);

  return (
    <div className="page_cinema">
      <div className="control_cinema">
        <Button variant="primary" style={{ width: "50%" }}>
          Tạo mới
        </Button>
        <Form className="d-flex_admin">
          <CiSearch className="search-icon" />
          <Form.Control
            type="search"
            placeholder="Tìm theo tên phim"
            className="me-2"
            aria-label="Search"
            style={{ width: "50%" }}
          />
        </Form>
      </div>
      <div className="table_cinema">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên rạp</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          {cinemas.map((cinema, index) => (
            <tbody key={index && cinema.cinemaId} style={{ cursor: "pointer" }}>
              <tr>
                <td>{index + 1}</td>
                <td>{cinema.cinemaName}</td>
                <td>{cinema.locationEnum}</td>
                <td>{cinema.statusActivate}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};
