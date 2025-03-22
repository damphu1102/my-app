import { Link } from "react-router-dom";
import "../Header/header.scss";
import { Menu } from "./Navbar";

export const Header = () => {
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
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
