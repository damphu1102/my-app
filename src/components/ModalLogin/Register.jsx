import { Button, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import "../ModalLogin/register.scss";

export const Register = ({ show, onHide, onBack }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const phoneInputRef = useRef(null); // Tạo một ref cho input phone

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Xử lý sự kiện sử dụng mũi tên của input number
  useEffect(() => {
    const inputElement = phoneInputRef.current; // Sao chép giá trị vào biến cục bộ

    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };
  return (
    <div className="register_container">
      <Modal show={show} centered onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ cursor: "default" }}>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" placeholder="Nguyễn Văn A" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="abc@gmail.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="number"
                placeholder="090xxxxxxx"
                ref={phoneInputRef} // Gán ref cho input
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
              />
              <div className="eyes" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
              />
              <div className="eyes" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Đồng ý với điều khoản dịch vụ"
              />
            </Form.Group>

            <div className="btn_login">
              <Button variant="primary">Đăng ký</Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ cursor: "default" }}>
            Bạn đã có tài khoản đăng nhập?
            <span onClick={onBack} style={{ color: "blue", cursor: "pointer" }}>
              Đăng nhập
            </span>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
