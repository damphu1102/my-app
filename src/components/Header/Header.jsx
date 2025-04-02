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
  const [validated, setValidated] = useState(false); // Thêm state validated

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedLoggedInUserName = localStorage.getItem("loggedInUserName");

    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      setLoggedInUserName(storedLoggedInUserName || "");
    }
  }, []);

  const handleCloseLogin = () => {
    setShowLogin(false);
    setLogin({ userName: "", passWord: "" });
    setValidated(false);
  };
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => {
    handleCloseLogin();
    setShowRegister(true);
  };

  const handleCloseRegister = () => {
    setShowRegister(false);
    setValidated(false);
  };
  const handleBackLogin = () => {
    handleCloseRegister();
    handleShowLogin();
    setValidated(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        login
      );
      if (response.data !== null) {
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
        setValidated(false); // Reset validated
        // Đóng modal đăng nhập
        handleCloseLogin();
        setToastMessage({ message: "Đăng nhập thành công." });
      } else {
        console.log("Username, Password không đúng");
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error("Login failed:", error);
      // Hiển thị thông báo lỗi cho người dùng
    }
  };

  const checkLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/account/authenticate",
        login
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    if (login.userName === "" || login.passWord === "") {
      setValidated(true); // Đặt validated thành true nếu form không hợp lệ
    } else {
      const result = await checkLogin();
      console.log(result);

      if (result === true) {
        handleLogin(); // Gọi handleLogin nếu checkLogin trả về true
      } else {
        setToastMessage({ message: "User hoặc Password sai." });
        return;
      }
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
        validated={validated}
        handleSubmit={handleSubmit}
      />
      <Register
        show={showRegister}
        onHide={handleCloseRegister}
        onBack={handleBackLogin}
        validated={validated}
        setValidated={setValidated}
      />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
    </div>
  );
};
