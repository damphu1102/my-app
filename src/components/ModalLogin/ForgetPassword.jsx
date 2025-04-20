import { Button, Form, Modal } from "react-bootstrap";

export const ForgetPassword = ({ show, onHide, onBack, onContinue }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quên mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Vui lòng nhập email xác thực</Form.Label>
              <Form.Control type="email" placeholder="Nhập email vào đây" />
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
