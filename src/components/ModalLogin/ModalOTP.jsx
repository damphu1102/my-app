import { Button, Form, Modal } from "react-bootstrap";

export const ModalOTP = ({ show, onHide, onBack, onContinue }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Vui lòng nhập mã OTP</Form.Label>
              <Form.Control type="text" placeholder="Nhập OTP vào đây" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onBack}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={onContinue}>
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
