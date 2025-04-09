import { Button, Form } from "react-bootstrap";
import "../Login/login.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const checkLogin = await axios.post(
        "http://localhost:8080/account/authenticateAdmin",
        login
      );
      if (checkLogin.data === false) {
        console.log("User hoặc Password sai");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/auth/login",
            login
          );
          const adminData = {
            username: login.userName,
            token: response.data.token,
            role: response.data.roleAccount,
          };
          if (response.data != null) {
            localStorage.setItem("adminData", JSON.stringify(adminData));
            navigate("/home_admin");
          } else {
            console.log("User hoặc mật khẩu sai");
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      }
    } catch (error) {
      console.error("Lỗi", error);
    }
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
              <Form.Control
                type="text"
                placeholder="Vui lòng nhập username"
                onChange={handleChange}
                name="userName" // Đảm bảo trùng khớp với tên trong state
                value={login?.userName || ""}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nhập mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Vui lòng nhập mật khẩu"
                onChange={handleChange}
                name="passWord"
                value={login?.passWord || ""}
              />
              <div className="eyes_login" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
