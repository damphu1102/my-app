import { Button, Form, Table } from "react-bootstrap";
import "../ContentPage/serviceManager.scss";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ModalService } from "../Modal/ModalService";

export const ServiceManager = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = useCallback(async () => {
    try {
      const response = axios.get("http://localhost:8080/service", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setServices((await response).data);
    } catch (error) {
      console.error("Lỗi tải dịch vụ", error);
    }
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddShow = () => {
    setServiceToEdit(null);
    setIsEditMode(false);
    setShow(true);
  };

  const handleEditShow = (service) => {
    setServiceToEdit(service);
    setIsEditMode(true);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.nameService.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="page_service">
      <div className="control_service">
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
            placeholder="Tìm theo tên dịch vụ"
            className="me-2"
            aria-label="Search"
            style={{ width: "50%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className="table_service">
        <Table striped bordered hover variant="light">
          <thead>
            <tr style={{ textAlign: "center", verticalAlign: "middle" }}>
              <th>STT</th>
              <th>Tên dịch vụ</th>
              <th>Giá tiền</th>
              <th>Mô tả</th>
              <th>Hình ảnh</th>
            </tr>
          </thead>
          {filteredServices.map((service, index) => (
            <tbody
              key={index && service.serviceId}
              style={{
                cursor: "pointer",
              }}
            >
              <tr
                style={{ textAlign: "center", verticalAlign: "middle" }}
                onClick={() => handleEditShow(service)}
              >
                <td>{index + 1}</td>
                <td>{service.nameService}</td>
                <td
                  style={{
                    color: "green",
                  }}
                >
                  {service.priceService.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>{service.descriptionService}</td>
                <td>
                  <img src={service.imageService} alt={service.nameService} />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
      <ModalService
        show={show}
        onHide={handleClose}
        isEditMode={isEditMode}
        serviceToEdit={serviceToEdit}
      />
    </div>
  );
};
