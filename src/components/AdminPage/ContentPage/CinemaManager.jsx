import { Button, Form, Table } from "react-bootstrap";
import "../ContentPage/cinemaManager.scss";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ModalCinema } from "../Modal/ModalCinema";

export const CinemaManager = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [cinemas, setCinemas] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [cinenaToEdit, setCinemaToEdit] = useState(null);

  const handleAddShow = () => {
    setCinemaToEdit(null);
    setIsEditMode(false);
    setShow(true);
  };

  const handleEditShow = (cinema) => {
    setCinemaToEdit(cinema);
    setIsEditMode(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const fetchCinemas = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchCinemas();
  }, [fetchCinemas]);

  return (
    <div className="page_cinema">
      <div className="control_cinema">
        <Button
          variant="primary"
          style={{ width: "50%" }}
          onClick={handleAddShow}
        >
          Tạo mới
        </Button>
        <Form className="d-flex_admin">
          <CiSearch className="search-icon" />
          <Form.Control
            type="search"
            placeholder="Tìm theo tên rạp"
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
              <tr onClick={() => handleEditShow(cinema)}>
                <td>{index + 1}</td>
                <td>{cinema.cinemaName}</td>
                <td>{cinema.locationEnum}</td>
                <td
                  style={{
                    color:
                      cinema.statusActivate === "Hoạt động" ? "green" : "red",
                  }}
                >
                  {cinema.statusActivate}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <ModalCinema
        show={show}
        onHide={handleClose}
        isEditMode={isEditMode}
        cinenaToEdit={cinenaToEdit}
        fetchCinemas={fetchCinemas}
      />
    </div>
  );
};
