import axios from "axios";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

export const CardDash = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  const role = adminData.role;
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [bodyClicked, setBodyClicked] = useState({});

  const handleAccordionToggle = (eventKey) => {
    setActiveAccordionKey(eventKey === activeAccordionKey ? null : eventKey);
    setBodyClicked({});
  };

  const handleBodyClick = (eventKey) => {
    // Nếu body này chưa được click (hoặc không có body nào đang được click), thì set trạng thái click của nó là true
    if (!bodyClicked[eventKey]) {
      setBodyClicked({ [eventKey]: true });
    }
    // Nếu body này đã được click, thì không làm gì cả (màu nền giữ nguyên)
  };

  return (
    <>
      <Accordion
        activeKey={activeAccordionKey}
        onSelect={handleAccordionToggle}
      >
        {/* <Accordion.Item eventKey="1">
          <Accordion.Header>Quản lý doanh thu</Accordion.Header>
          <Accordion.Body>
            <Link to="dashboard_manager">Doanh thu</Link>
          </Accordion.Body>
        </Accordion.Item> */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Quản lý phim</Accordion.Header>
          <Link
            to="movie_manager"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Accordion.Body
              onClick={() => handleBodyClick("2")}
              style={bodyClicked["2"] ? { backgroundColor: "#f5f5dc" } : {}}
            >
              Danh sách phim
            </Accordion.Body>
          </Link>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Quản lý rạp phim</Accordion.Header>
          <Link
            to="cinema_manager"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Accordion.Body
              onClick={() => handleBodyClick("3")}
              style={bodyClicked["3"] ? { backgroundColor: "#f5f5dc" } : {}}
            >
              Danh sách phim
            </Accordion.Body>
          </Link>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="4">
          <Accordion.Header>Quản lý lịch chiếu</Accordion.Header>
          <Accordion.Body>Danh sách lịch chiếu</Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="5">
          <Accordion.Header>Quản lý suất chiếu</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item> */}

        {/* <Accordion.Item eventKey="7">
          <Accordion.Header>Quản lý giá vé</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="8">
          <Accordion.Header>Quản lý khuyến mại</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item> */}
        {/* <Accordion.Item eventKey="9">
          <Accordion.Header>Quản lý bài viết</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item> */}
        {role === "Admin" && (
          <>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Quản lý đơn hàng</Accordion.Header>
              <Link
                to="list_transtion"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body
                  onClick={() => handleBodyClick("6")}
                  style={bodyClicked["6"] ? { backgroundColor: "#f5f5dc" } : {}}
                >
                  Danh sách đơn hàng
                </Accordion.Body>
              </Link>
            </Accordion.Item>
            <Accordion.Item eventKey="10">
              <Accordion.Header>Quản lý tài khoản</Accordion.Header>
              <Link
                to="list_user"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body
                  onClick={() => handleBodyClick("10-1")}
                  style={
                    bodyClicked["10-1"] ? { backgroundColor: "#f5f5dc" } : {}
                  }
                >
                  Danh sách user
                </Accordion.Body>
              </Link>

              <Link
                to="list_manager"
                style={{ color: "black", textDecoration: "none" }}
              >
                <Accordion.Body
                  onClick={() => handleBodyClick("10-2")}
                  style={
                    bodyClicked["10-2"] ? { backgroundColor: "#f5f5dc" } : {}
                  }
                >
                  Danh sách manager
                </Accordion.Body>
              </Link>
            </Accordion.Item>
          </>
        )}

        {/* <Accordion.Item eventKey="11">
          <Accordion.Header>Quản lý dịch vụ</Accordion.Header>
          <Accordion.Body>Nội dung 2</Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </>
  );
};

export const CardGeneralInf = ({ token, transtion }) => {
  const [numberCinema, setNumberCinema] = useState([]);
  const [numberAccount, setNumberAccount] = useState([]);
  useEffect(() => {
    const fetchNumberCinema = async () => {
      try {
        const response = await axios.get("http://localhost:8080/cinema", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        setNumberCinema(response.data);
      } catch (error) {
        console.error("Lỗi tải cinema", error);
      }
    };
    const fetNumberAccount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/account", {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        });
        const nonAdminAccounts = response.data.filter(
          (account) =>
            account.roleAccount !== "Admin" && account.roleAccount !== "Manager"
        );
        setNumberAccount(nonAdminAccounts);
      } catch (error) {
        console.error("Lỗi tải account", error);
      }
    };

    fetchNumberCinema();
    fetNumberAccount();
  }, [token]);

  const totalAmount = transtion.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  // Tính tổng số lượng ghế
  const totalSeats = transtion.reduce(
    (count, transaction) => count + transaction.seatNumberList.length,
    0
  );

  return (
    <>
      <div className="number_data">
        <h5>Tổng số lượng rạp</h5>
        <p>{numberCinema.length}</p>
      </div>
      <div className="number_data">
        <h5>Tổng số tài khoản đã đăng ký</h5>
        <p>{numberAccount.length}</p>
      </div>
      <div className="number_data">
        <h5>Tổng số vé đã bán</h5>
        <p>{totalSeats}</p>
      </div>
      <div className="number_data">
        <h5>Tổng doanh thu</h5>
        <p>
          {totalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
    </>
  );
};
