import { Button, Form } from "react-bootstrap";
import "../Login/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="login_container">
      <div className="content">
        <div className="label_login">
          <h3>WELCOME TO ADMIN PAGE</h3>
        </div>
        <div className="form_login">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nhập username</Form.Label>
              <Form.Control type="text" placeholder="Vui lòng nhập username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nhập mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
              />
              <div className="eyes_login" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
            </Form.Group>
            <Button variant="primary">Đăng nhập</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
