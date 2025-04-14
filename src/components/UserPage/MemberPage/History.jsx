import { Modal, Table } from "react-bootstrap";
import "../MemberPage/history.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";

export const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const userDataString = localStorage.getItem("userData"); // Lấy chuỗi JSON userData từ localStorage
  const userData = JSON.parse(userDataString);
  const currentAccountId = userData.accountId; // Thay thế bằng accountId thực tế
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const [show, setShow] = useState(false);
  const [selectedAppTransId, setSelectedAppTransId] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleClose = () => {
    setShow(false);
    setTransactionDetails(null);
    setSelectedAppTransId(null); // Reset selectedAppTransId khi đóng modal
  };

  const handleShow = (appTransId) => {
    setSelectedAppTransId(appTransId);
    setShow(true);
  };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/zalopay/transactions/${currentAccountId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );
        if (Array.isArray(response.data)) {
          setTransactionHistory(response.data);
        } else {
          setTransactionHistory([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch sử giao dịch:", error);
      }
    };

    fetchTransactionHistory();
  }, [currentAccountId, token]);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (selectedAppTransId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/zalopay/fillter/${selectedAppTransId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTransactionDetails(response.data[0]);
        } catch (error) {
          console.error("Lỗi khi tải chi tiết giao dịch:", error);
          setTransactionDetails(null);
        }
      }
    };

    fetchTransactionDetails();
  }, [selectedAppTransId, token]);

  return (
    <div className="history_container">
      <div className="history_content">
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã giao dịch</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
              <th>Xem thêm</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={transaction.appTransId}>
                <td>{index + 1}</td>
                <td>{transaction.appTransId}</td>
                <td>{transaction.amount}</td>
                <td
                  style={{
                    color: transaction.status === 1 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.status === 1 ? "Thành công" : "Thất bại"}
                </td>
                <td>{transaction.timestamp}</td>
                <td
                  onClick={() => handleShow(transaction.appTransId)}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "blue")}
                  onMouseLeave={(e) => (e.target.style.color = "black")}
                >
                  Chi tiết
                </td>
              </tr>
            ))}
            {transactionHistory.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  Không có lịch sử giao dịch.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <DetailedInformation
        show={show}
        onHide={handleClose}
        transactionDetails={transactionDetails}
      />
    </div>
  );
};

export const DetailedInformation = ({ show, onHide, transactionDetails }) => {
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết vé đã mua</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {transactionDetails ? (
            <>
              <p>Tên phim: {transactionDetails.movieName}</p>
              <p>Rạp chiếu: {transactionDetails.cinema}</p>
              <p>Phòng chiếu: {transactionDetails.room}</p>
              <p>Ngày chiếu: {transactionDetails.date}</p>
              <p>
                Giờ chiếu:{" "}
                {moment(transactionDetails.time, "HH:mm:ss").format("HH:mm")}
              </p>
              <p>Ghế đã đặt: {transactionDetails.seatNumber}</p>
            </>
          ) : (
            <p>Đang tải thông tin chi tiết...</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
