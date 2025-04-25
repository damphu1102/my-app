import { Form, Table } from "react-bootstrap";
import "../ContentPage/transtion.scss";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

export const TranstionManager = () => {
  const [transtion, setTranstion] = useState([]);
  const [userNames, setUserNames] = useState({}); // State để lưu trữ userName theo accountId
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const token = adminData.token;
  const [searchTerm, setSearchTerm] = useState(""); // State cho giá trị tìm kiếm

  useEffect(() => {
    const fetchTrastion = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/zalopay/getAllTranstion",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
        setTranstion(response.data);
        response.data.forEach((trans) => {
          fetchUserName(trans.accountId);
        });
      } catch (error) {
        console.error("Lỗi tải dữ liệu", error);
      }
    };

    const fetchUserName = async (accountId) => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/account/${accountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Cập nhật state userNames với userName tương ứng với accountId
        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [accountId]: userResponse.data.userName, // Giả sử API trả về trường userName
        }));
      } catch (error) {
        console.error(
          `Lỗi tải dữ liệu người dùng cho accountId ${accountId}`,
          error
        );
        // Xử lý lỗi nếu không tìm thấy người dùng hoặc có lỗi khác
        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [accountId]: "N/A", // Hoặc một giá trị mặc định khác
        }));
      }
    };

    fetchTrastion();
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTranstion = transtion.filter((trans) =>
    trans.appTransId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page_trans">
      <div className="control_trans">
        <Form className="d-flex_admin">
          <CiSearch className="search-icon" />
          <Form.Control
            type="search"
            placeholder="Tìm theo mã giao dịch"
            className="me-2"
            aria-label="Search"
            style={{ width: "50%" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form>
      </div>
      <div className="table_trans">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã giao dịch</th>
              <th>Số tiền</th>
              <th>Username</th>
              <th>Ngày tạo</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          {filteredTranstion.map((transtion, index) => (
            <tbody key={index} style={{ cursor: "pointer" }}>
              <tr>
                <td>{index + 1}</td>
                <td>{transtion.appTransId}</td>
                <td>
                  {transtion.amount.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td>{userNames[transtion.accountId]}</td>
                <td>{transtion.timestamp}</td>
                <td>{transtion.message}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  );
};
