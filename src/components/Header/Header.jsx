import { Link } from "react-router-dom";
import "../Header/header.scss";
import { Menu } from "./Navbar";
import { Login } from "../ModalLogin/Login";
import { useState } from "react";
import { Register } from "../ModalLogin/Register";

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
          <button onClick={handleShowLogin}>Login</button>
        </div>
      </div>
      <Login
        show={showLogin}
        onHide={handleCloseLogin}
        onRegister={handleShowRegister}
      />
      <Register
        show={showRegister}
        onHide={handleCloseRegister}
        onBack={handleBackLogin}
      />
    </div>
  );
};
