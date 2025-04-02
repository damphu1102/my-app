import { Button, Col, Form, Row } from "react-bootstrap";
import "../MemberPage/personal.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "../ToastPage";
import { ToastContainer } from "react-toastify";

export const Personal = () => {
  const userName = localStorage.getItem("loggedInUserName");
  const fullName = localStorage.getItem("fullName");
  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    setEmail(localStorage.getItem("emailAccount") || "");
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
  }, []);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/account/${accountId}`,
        {
          emailAccount: email,
          phoneNumber: phoneNumber,
          roleGender: gender,
          dateBird: birthDate,
          city: city,
          district: district,
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );

      if (response.status === 200) {
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
              <Form.Control type="input" value={fullName} disabled />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Username</Form.Label>
              <Form.Control type="input" disabled value={userName} />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="input"
                value={email}
                onChange={(e) => handleChange(e, setEmail)}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="input"
                value={phoneNumber}
                onChange={(e) => handleChange(e, setPhoneNumber)}
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
                onChange={(e) => handleChange(e, setGender)}
                value={gender}
              >
                <option value="">---</option>
                <option value="Nam">Nam</option>
                <option value="Nu">Nu</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {/*  */}
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicReleaseDate">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => handleChange(e, setBirthDate)}
                value={birthDate}
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
                onChange={(e) => handleChange(e, setCity)}
                value={city}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Quận/ Huyện</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập quận/huyện"
                onChange={(e) => handleChange(e, setDistrict)}
                value={district}
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
              onChange={(e) => handleChange(e, setAddress)}
              value={address}
            />
          </Form.Group>
        </Col>
      </div>
      <div className="change_pass">
        <p>Đổi mật khẩu</p>
      </div>
      <div className="btn_update">
        <Button variant="primary" onClick={handleUpdate}>
          Cập nhật
        </Button>
      </div>
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
    </div>
  );
};
