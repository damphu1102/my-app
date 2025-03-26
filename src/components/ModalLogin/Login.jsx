import { Button, Form, Modal } from "react-bootstrap";
import "../ModalLogin/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const Login = ({ show, onHide, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
    // Gọi API đăng nhập hoặc xử lý dữ liệu đăng nhập
  };
  return (
    <div className="login_container">
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email hoặc số điện thoại</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email hoặc số điện thoại"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="eyes" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Nhớ mật khẩu"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </Form.Group>
            <div className="btn_login">
              <Button variant="primary" onClick={handleLogin}>
                Đăng nhập
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>Hoặc đăng nhập bằng</p>
        </Modal.Footer>
        <div className="login_link">
          <img
            src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1742991801/iconFB_bslo0f.png"
            alt="Facebook"
          />
          <img
            src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1742991800/icon_GG_pyo1yg.png"
            alt="Google"
          />
        </div>
        <div className="forget_pass">
          <p>Quên mật khẩu?</p>
        </div>
        <div className="register">
          <p>
            Bạn chưa có tài khoản? <span onClick={onRegister}>Đăng ký</span>
          </p>
        </div>
      </Modal>
    </div>
  );
};
