import { Button, Form, Modal } from "react-bootstrap";
import "../ModalLogin/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const Login = ({
  show,
  onHide,
  onRegister,
  setLogin,
  login,
  validated,
  handleSubmit,
}) => {
  // const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  // const handleRememberMeChange = (e) => {
  //   setRememberMe(e.target.checked);
  // };

  return (
    <div className="login_container">
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ cursor: "default" }}>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username"
                name="userName" // Đảm bảo trùng khớp với tên trong state
                value={login?.userName || ""}
                onChange={handleChange}
                required
                autocomplete="current-Username" // Thêm autocomplete
                isInvalid={validated && !login.userName}
              />

              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên đăng nhập
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                name="passWord"
                value={login?.passWord || ""}
                onChange={handleChange}
                required
                autocomplete="current-password" // Thêm autocomplete
                isInvalid={validated && !login.passWord}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu
              </Form.Control.Feedback>

              <div className="eyes_login" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Nhớ mật khẩu"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
            </Form.Group> */}
            <div className="btn_login">
              <Button variant="primary" onClick={handleSubmit}>
                Đăng nhập
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ cursor: "default" }}>Hoặc đăng nhập bằng</p>
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
          <p style={{ cursor: "default" }}>
            Bạn chưa có tài khoản? <span onClick={onRegister}>Đăng ký</span>
          </p>
        </div>
      </Modal>
    </div>
  );
};
