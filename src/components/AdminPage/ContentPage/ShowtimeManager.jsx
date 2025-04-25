import { Button, Form, Table } from "react-bootstrap";
import "../ContentPage/showtimeManager.scss";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import { ModalShowtime } from "../Modal/ModalShowtime";

export const ShowTimeManager = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [showTimes, setShowTimes] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showtimeToEdit, setShowtimeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị tìm kiếm

  const handleAddShow = () => {
    setShowtimeToEdit(null);
    setIsEditMode(false);
    setShow(true);
  };

  const handleEditShow = (showtime) => {
    setShowtimeToEdit(showtime);
    setIsEditMode(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const fetchShowTimes = useCallback(async () => {
    try {
      const response = axios.get("http://localhost:8080/showtime", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setShowTimes((await response).data);
    } catch (error) {
      console.error("Lỗi tải showtimes", error);
    }
  }, [token]);
  useEffect(() => {
    fetchShowTimes();
  }, [fetchShowTimes]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredShowTimes = showTimes.filter((showTime) =>
    showTime.roomShow.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="page_showtime">
      <div className="control_showtime">
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
            placeholder="Tìm theo số phòng"
            className="me-2"
            aria-label="Search"
            style={{ width: "50%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className="table_showtime">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Phòng</th>
            </tr>
          </thead>
          {filteredShowTimes.map((showtime, index) => (
            <tbody
              key={index && showtime.showtimeId}
              style={{ cursor: "pointer" }}
            >
              <tr onClick={() => handleEditShow(showtime)}>
                <td>{index + 1}</td>
                <td>{moment(showtime.date).format("DD/MM/YYYY")}</td>
                <td>
                  {moment(showtime.time, ["HH:mm:ss", "HH:mm"]).format("HH:mm")}
                </td>
                <td>{showtime.roomShow}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <ModalShowtime
        show={show}
        onHide={handleClose}
        isEditMode={isEditMode}
        showtimeToEdit={showtimeToEdit}
        fetchShowTimes={fetchShowTimes}
      />
    </div>
  );
};
