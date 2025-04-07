import { Dropdown } from "react-bootstrap";
import "../Header/header.scss";
import { FaUser } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="container_header">
      <div className="content_admin">
        <div></div>
        <div className="login_admin">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">Admin</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#">Trang cá nhân</Dropdown.Item>
              <Dropdown.Item href="#">Cài đặt</Dropdown.Item>
              <Dropdown.Item>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <FaUser />
        </div>
      </div>
    </div>
  );
};
