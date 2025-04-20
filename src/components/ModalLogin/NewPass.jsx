import { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const NewPass = ({ show, onHide, onBack }) => {
  const [passwordNewVisible, setPasswordNewVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordNewVisibility = () => {
    setPasswordNewVisible(!passwordNewVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label>Vui lòng nhập mật khẩu mới</Form.Label>
                <Form.Control
                  type={passwordNewVisible ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới vào đây"
                />
              </Form.Group>
              <div className="eyes" onClick={togglePasswordNewVisibility}>
                {passwordNewVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Col>
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới vào đây"
                />
              </Form.Group>
              <div className="eyes" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onBack}>
            Quay lại
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
