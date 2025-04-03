import { Button, Col, Form, Row } from "react-bootstrap";
import "../MemberPage/personal.scss";
import { useState } from "react";
import axios from "axios";
import { Toast } from "../ToastPage";
import { ToastContainer } from "react-toastify";
import { ChangePass } from "../../ModalLogin/ChangePass";

export const Personal = () => {
  const userDataString = localStorage.getItem("userData"); // Lấy chuỗi JSON userData từ localStorage
  const userData = JSON.parse(userDataString); // Phân tích chuỗi JSON thành đối tượng JavaScript
  const userName = localStorage.getItem("loggedInUserName");
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const accountId = userData.accountId;
  const [toastMessage, setToastMessage] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({ ...userData }); // State để lưu trữ dữ liệu đã cập nhật

  const [showPass, setShowPass] = useState(false);

  const handleClose = () => setShowPass(false);
  const handleShow = () => setShowPass(true);

  const handleChange = (e, field) => {
    setUpdatedUserData({ ...updatedUserData, [field]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/account/${accountId}`,
        {
          emailAccount: updatedUserData.emailAccount,
          phoneNumber: updatedUserData.phoneNumber,
          roleGender: updatedUserData.roleGender,
          dateBird: updatedUserData.dateBird,
          city: updatedUserData.city,
          district: updatedUserData.district,
          address: updatedUserData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("userData", JSON.stringify(updatedUserData)); // Cập nhật userData trong localStorage
        setToastMessage({
          message: "Cập nhật thành công.",
        });
        setTimeout(() => {
          setToastMessage(null); // Reset toastMessage sau khi hiển thị
        }, 1000);

        return;
      } else {
        setToastMessage({
          message: "Cập nhật thất bại.",
        });
        setTimeout(() => {
          setToastMessage(null); // Reset toastMessage sau khi hiển thị
        }, 1000);
        return;
      }
    } catch (error) {
      setToastMessage({
        message: "Cập nhật bị lỗi.",
      });
      setTimeout(() => {
        setToastMessage(null); // Reset toastMessage sau khi hiển thị
      }, 1000);
      return;
    }
  };

  return (
    <div className="personal_container">
      <h4>Thông tin tài khoản</h4>
      <div className="inf_acc">
        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control
                type="input"
                value={userData.fullName}
                disabled
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" disabled value={userName} readOnly />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="input"
                value={updatedUserData.emailAccount}
                onChange={(e) => handleChange(e, "emailAccount")}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="input"
                value={updatedUserData.phoneNumber}
                onChange={(e) => handleChange(e, "phoneNumber")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Giới tính</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                value={updatedUserData.roleGender}
                onChange={(e) => handleChange(e, "roleGender")}
              >
                <option value={userData.roleGender.Nam}>Nam</option>
                <option value={userData.roleGender.Nu}>Nu</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {/*  */}
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicReleaseDate">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                value={updatedUserData.dateBird}
                onChange={(e) => handleChange(e, "dateBird")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Tỉnh/ Thành phố</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tỉnh/thành phố"
                value={updatedUserData.city}
                onChange={(e) => handleChange(e, "city")}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Quận/ Huyện</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập quận/huyện"
                value={updatedUserData.district}
                onChange={(e) => handleChange(e, "district")}
              />
            </Form.Group>
          </Col>
        </Row>

        <Col md>
          <Form.Group className="mb-4" controlId="formBasicActor">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="input"
              placeholder="Vui lòng nhập địa chỉ"
              value={updatedUserData.address}
              onChange={(e) => handleChange(e, "address")}
            />
          </Form.Group>
        </Col>
      </div>
      <div className="change_pass" onClick={handleShow}>
        <p>Đổi mật khẩu</p>
      </div>
      <div className="btn_update">
        <Button variant="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </div>
      <ChangePass show={showPass} onHide={handleClose} />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
    </div>
  );
};
