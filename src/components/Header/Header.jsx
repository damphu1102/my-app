import { Link, useNavigate } from "react-router-dom";
import "../Header/header.scss";
import { Menu } from "./Navbar";
import { Login } from "../ModalLogin/Login";
import { useEffect, useState } from "react";
import { Register } from "../ModalLogin/Register";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { Toast } from "../UserPage/ToastPage";
import { ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { ForgetPassword } from "../ModalLogin/ForgetPassword";
import { ModalOTP } from "../ModalLogin/ModalOTP";
import { NewPass } from "../ModalLogin/NewPass";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForget, setShowForget] = useState(false);
  const [showModalOTP, setShowModalOTP] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [login, setLogin] = useState({
    userName: "",
    passWord: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [validated, setValidated] = useState(false); // Thêm state validated
  const navigate = useNavigate();
  const [loginError, setLogindError] = useState("");

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
    setLogindError("");
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
    handleCloseForget();
    setValidated(false);
  };

  const handleShowForget = () => {
    handleCloseLogin();
    setShowForget(true);
  };

  const handleCloseForget = () => {
    setShowForget(false);
  };

  const handleShowModalOTP = () => {
    setShowModalOTP(true);
    handleCloseForget();
  };

  const handleCloseModalOTP = () => {
    setShowModalOTP(false);
  };

  const handleBackForget = () => {
    handleCloseModalOTP();
    handleShowForget();
  };

  const handleShowChangePass = () => {
    setShowChangePass(true);
    handleCloseModalOTP();
  };

  const handleCloseChangePass = () => {
    setShowChangePass(false);
  };

  const handleBackModalOTP = () => {
    handleCloseChangePass();
    handleShowModalOTP();
  };

  const handleLogin = async () => {
    setToastMessage(null);

    try {
      const checkLogin = await axios.post(
        "http://localhost:8080/account/authenticateUser",
        login
      );
      if (checkLogin.data === false) {
        setValidated(true);
        setLogindError("User hoặc Password sai");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8080/auth/login",
            login
          );
          if (response.data !== null) {
            const {
              fullName,
              emailAccount,
              phoneNumber,
              token,
              accountId,
              city,
              district,
              address,
              dateBird,
              roleGender,
            } = response.data;
            const userData = {
              accountId,
              fullName,
              emailAccount,
              phoneNumber,
              city,
              district,
              address,
              dateBird,
              roleGender,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            localStorage.setItem("token", token);
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
      }
    } catch (error) {
      console.error("Lỗi", error);
      setValidated(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn"); // Xóa trạng thái đăng nhập
    localStorage.removeItem("loggedInUserName"); // Xóa userName
    setLoggedInUserName("");
    setIsLoggedIn(false);
    setToastMessage(null);
    setTimeout(() => {
      setToastMessage({ message: "Đăng xuất thành công." });
    }, 200);
    setLogindError("");
    navigate("/");
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
          <Menu setToastMessage={setToastMessage} />
        </div>
        <div className="login">
          {isLoggedIn ? (
            <div className="drop_down">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {loggedInUserName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to="/about"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {" "}
                      Trang cá nhân
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Cài đặt</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <FaUser />
            </div>
          ) : (
            <div className="btn_login">
              <button onClick={handleShowLogin}>Login</button>
            </div>
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
        loginError={loginError}
        setLogindError={setLogindError}
        onForget={handleShowForget}
      />
      <Register
        show={showRegister}
        onHide={handleCloseRegister}
        onBack={handleBackLogin}
        validated={validated}
        setValidated={setValidated}
      />
      <ForgetPassword
        show={showForget}
        onHide={handleCloseForget}
        onBack={handleBackLogin}
        onContinue={handleShowModalOTP}
      />
      <ModalOTP
        show={showModalOTP}
        onHide={handleCloseModalOTP}
        onBack={handleBackForget}
        onContinue={handleShowChangePass}
      />
      <NewPass
        show={showChangePass}
        onHide={handleCloseChangePass}
        onBack={handleBackModalOTP}
      />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage?.message} />}
    </div>
  );
};
