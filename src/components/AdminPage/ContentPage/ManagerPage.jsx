import { Button, Form, Table } from "react-bootstrap";
import "../ContentPage/userManager.scss";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";

export const ManagerPage = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị tìm kiếm

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/account", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        const nonUserAccounts = response.data.filter(
          (account) =>
            account.roleAccount !== "Admin" && account.roleAccount !== "User"
        );
        setUsers(nonUserAccounts);
      } catch (error) {
        console.error("Lỗi tải tải khoản", error);
      }
    };
    fetchManagers();
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page_manager">
      <div className="control_manager">
        <Button variant="primary" style={{ width: "50%" }}>
          Tạo mới
        </Button>
        <Form className="d-flex_admin">
          <CiSearch className="search-icon" />
          <Form.Control
            type="search"
            placeholder="Tìm theo tên phim"
            className="me-2"
            aria-label="Search"
            style={{ width: "50%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className="table_manager">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>STT</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Thành phố</th>
              <th>Quận</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          {filteredUsers.map((user, index) => (
            <tbody key={index && user.accountId} style={{ cursor: "pointer" }}>
              <tr>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.fullName}</td>
                <td>{user.emailAccount}</td>
                <td>{user.phoneNumber}</td>
                <td>{moment(user.dateBird).format("DD/MM/YYYY")}</td>
                <td>{user.roleGender}</td>
                <td>{user.city}</td>
                <td>{user.district}</td>
                <td>{user.address}</td>
                <td>{user.roleAccount}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};
