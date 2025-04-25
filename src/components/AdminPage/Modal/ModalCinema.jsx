import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const initialCinemaState = {
  cinemaName: "",
  locationEnum: "",
  statusActivate: "",
};

export const ModalCinema = ({
  show,
  onHide,
  isEditMode,
  cinenaToEdit,
  fetchCinemas,
}) => {
  const [newCinema, setNewCinema] = useState(initialCinemaState);
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  console.log(newCinema);

  useEffect(() => {
    if (isEditMode && cinenaToEdit) {
      setNewCinema(cinenaToEdit);
    } else {
      setNewCinema(initialCinemaState);
    }
  }, [isEditMode, cinenaToEdit]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/cinema/delete/${cinenaToEdit.cinemaId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      if (response.status === 200) {
        alert("Xóa cinema thành công!");
        onHide();
        fetchCinemas();
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Xóa cinema thất bại!");
    }
  };

  const submitForm = async () => {
    if (
      !newCinema.cinemaName.trim() ||
      !newCinema.locationEnum ||
      !newCinema.statusActivate
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return; // Ngăn không cho gọi API nếu có lỗi
    }
    try {
      let response;
      if (isEditMode && cinenaToEdit) {
        response = await axios.put(
          `http://localhost:8080/cinema/update/${cinenaToEdit.cinemaId}`,
          {
            ...newCinema,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/cinema/create`,
          {
            ...newCinema,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
      }
      if (response.status === 200) {
        setNewCinema(initialCinemaState);
        onHide();
        fetchCinemas();
        alert(isEditMode ? "Cập nhật thành công!" : "Thêm mới thành công!");
      }
    } catch (error) {
      alert(isEditMode ? "Cập nhật thất bại!" : "Thêm mới thất bại!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Chỉnh sửa" : "Thêm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên rạp</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập tên rạp"
                value={newCinema.cinemaName}
                onChange={(e) => {
                  setNewCinema({
                    ...newCinema,
                    cinemaName: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Vị trí</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={newCinema.locationEnum}
                onChange={(e) => {
                  setNewCinema({
                    ...newCinema,
                    locationEnum: e.target.value,
                  });
                }}
              >
                <option>---</option>
                <option value={newCinema.locationEnum.HaNoi}>Hà Nội</option>
                <option value={newCinema.locationEnum.DaNang}>Đà Nẵng</option>
                <option value={newCinema.locationEnum.HoChiMinh}>
                  Hồ Chí Minh
                </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={newCinema.statusActivate}
                onChange={(e) => {
                  setNewCinema({
                    ...newCinema,
                    statusActivate: e.target.value,
                  });
                }}
              >
                <option>---</option>
                <option value={newCinema.statusActivate.Activate}>
                  Hoạt động
                </option>
                <option value={newCinema.statusActivate.Unactivate}>
                  Không hoạt động
                </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEditMode && (
            <Button variant="danger" onClick={handleDelete}>
              Xóa
            </Button>
          )}
          <Button variant="primary" onClick={submitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
