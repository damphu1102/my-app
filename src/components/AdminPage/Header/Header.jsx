import { Dropdown } from "react-bootstrap";
import "../Header/header.scss";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/admin");
  };

  return (
    <div className="container_header">
      <div className="content_admin">
        <div></div>
        <div className="login_admin">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">{username}</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FaUser />
        </div>
      </div>
    </div>
  );
};
