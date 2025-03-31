import { Link } from "react-router-dom";
import "../Header/header.scss";
import { Menu } from "./Navbar";
import { Login } from "../ModalLogin/Login";
import { useEffect, useState } from "react";
import { Register } from "../ModalLogin/Register";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { Toast } from "../UserPage/ToastPage";
import { ToastContainer } from "react-toastify";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedLoggedInUserName = localStorage.getItem("loggedInUserName");

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setLoggedInUserName(storedLoggedInUserName || "");
    }
  }, []);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => {
    handleCloseLogin();
    setShowRegister(true);
  };

  const handleCloseRegister = () => setShowRegister(false);
  const handleBackLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        login
      );
      const { fullName, emailAccount, phoneNumber, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem("emailAccount", emailAccount);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
      localStorage.setItem("loggedInUserName", login.userName); // Lưu userName
      // Cập nhật trạng thái đăng nhập và userName
      setIsLoggedIn(true);
      setLoggedInUserName(login.userName); // Lưu userName
      // Đóng modal đăng nhập
      handleCloseLogin();
      setToastMessage({ message: "Đăng nhập thành công." });
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error("Login failed:", error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullName");
    localStorage.removeItem("emailAccount");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
    localStorage.removeItem("loggedInUserName"); // Xóa userName
    setIsLoggedIn(false);
    setLoggedInUserName("");
    setToastMessage({ message: "Đăng xuất thành công." });
  };

  return (
    <div className="container_header">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1740830902/HP-removebg-preview_birxc6.png"
              alt="Logo"
              width="120px"
            />
          </Link>
        </div>
        <div className="navbar">
          <Menu />
        </div>
        <div className="login">
          {isLoggedIn ? (
            <div className="drop_down">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {loggedInUserName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Trang cá nhân</Dropdown.Item>
                  <Dropdown.Item href="#">Cài đặt</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <button onClick={handleShowLogin}>Login</button>
          )}
        </div>
      </div>
      <Login
        show={showLogin}
        onHide={handleCloseLogin}
        onRegister={handleShowRegister}
        handleLogin={handleLogin}
        login={login}
        setLogin={setLogin}
      />
      <Register
        show={showRegister}
        onHide={handleCloseRegister}
        onBack={handleBackLogin}
      />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
    </div>
  );
};
