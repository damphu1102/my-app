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
  handleLogin,
  loginError,
  setLogindError,
  onForget,
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
    setLogindError("");
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
                isInvalid={(validated && !login.userName) || loginError}
              />

              <Form.Control.Feedback type="invalid">
                {validated && !login.userName
                  ? "Vui lòng nhập tên đăng nhập"
                  : loginError}
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
                isInvalid={(validated && !login.passWord) || loginError}
              />
              <Form.Control.Feedback type="invalid">
                {validated && !login.passWord
                  ? "Vui lòng nhập mật khẩu"
                  : loginError}
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
              <Button variant="primary" onClick={handleLogin}>
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
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20x='0px'%20y='0px'%20width='100'%20height='100'%20viewBox='0%200%2048%2048'%3e%3clinearGradient%20id='Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1'%20x1='9.993'%20x2='40.615'%20y1='9.993'%20y2='40.615'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%232aa4f4'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%23007ad9'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath%20fill='url(%23Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)'%20d='M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46%20c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452%20C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z'%3e%3c/path%3e%3c/svg%3e"
            alt="Facebook"
          />
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20x='0px'%20y='0px'%20width='100'%20height='100'%20viewBox='0%200%2048%2048'%3e%3cpath%20fill='%23FFC107'%20d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'%3e%3c/path%3e%3cpath%20fill='%23FF3D00'%20d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'%3e%3c/path%3e%3cpath%20fill='%234CAF50'%20d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'%3e%3c/path%3e%3cpath%20fill='%231976D2'%20d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'%3e%3c/path%3e%3c/svg%3e"
            alt="Google"
          />
        </div>
        <div className="forget_pass" onClick={onForget}>
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
