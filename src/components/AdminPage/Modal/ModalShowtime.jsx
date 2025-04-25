import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const initialShowtimetate = {
  time: "",
  date: "",
  roomShow: "",
};

export const ModalShowtime = ({ show, onHide, isEditMode, showtimeToEdit }) => {
  const [newShowtime, setNewShowtime] = useState(initialShowtimetate);

  useEffect(() => {
    if (isEditMode && showtimeToEdit) {
      setNewShowtime(showtimeToEdit);
    } else {
      setNewShowtime(initialShowtimetate);
    }
  }, [isEditMode, showtimeToEdit]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Chỉnh sửa" : "Thêm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ngày chiếu</Form.Label>
              <Form.Control
                type="date"
                placeholder="Vui lòng chọn ngày"
                value={newShowtime.date}
                onChange={(e) => {
                  setNewShowtime({
                    ...newShowtime,
                    date: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giờ chiếu</Form.Label>
              <Form.Control
                type="time"
                placeholder="Vui lòng chọn ngày"
                value={newShowtime.time}
                onChange={(e) => {
                  setNewShowtime({
                    ...newShowtime,
                    time: e.target.value,
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phòng chiếu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập số phòng"
                value={newShowtime.roomShow}
                onChange={(e) => {
                  setNewShowtime({
                    ...newShowtime,
                    roomShow: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEditMode && <Button variant="danger">Xóa</Button>}
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
