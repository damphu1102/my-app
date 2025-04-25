import { useEffect, useState } from "react";
import { Button, Form, FormText, Modal } from "react-bootstrap";
const initialServicestate = {
  nameService: "",
  priceService: "",
  descriptionService: "",
  imageService: "",
};
export const ModalService = ({ show, onHide, isEditMode, serviceToEdit }) => {
  const [newService, setNewService] = useState(initialServicestate);

  useEffect(() => {
    if (isEditMode && serviceToEdit) {
      setNewService(serviceToEdit);
    } else {
      setNewService(initialServicestate);
    }
  }, [isEditMode, serviceToEdit]);

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Chỉnh sửa" : "Thêm mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tên dịch vụ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập tên dịch vụ"
                value={newService.nameService}
                onChange={(e) => {
                  setNewService({
                    ...newService,
                    nameService: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Giá tiền</Form.Label>
              <Form.Control
                type="number"
                placeholder="Vui lòng nhập số tiền"
                value={newService.priceService}
                onChange={(e) => {
                  setNewService({
                    ...newService,
                    priceService: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập mô tả"
                value={newService.descriptionService}
                onChange={(e) => {
                  setNewService({
                    ...newService,
                    descriptionService: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" />
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
