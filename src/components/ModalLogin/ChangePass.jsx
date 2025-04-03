import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../ModalLogin/changepass.scss";

export const ChangePass = ({ show, onHide }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const [passwordNewVisible, setPasswordNewVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const userDataString = localStorage.getItem("userData"); // Lấy chuỗi JSON userData từ localStorage
  const userData = JSON.parse(userDataString); // Phân tích chuỗi JSON thành đối tượng JavaScript
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  const accountId = userData.accountId;
  const [validated, setValidated] = useState(false); // Thêm state validated

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const togglePasswordNewVisibility = () => {
    setPasswordNewVisible(!passwordNewVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChangePassword = async () => {
    setValidated(true);

    if (validated && confirmNewPassword === newPassword) {
      try {
        const response = await axios.put(
          `http://localhost:8080/account/updatePassword`,
          {
            accountId: accountId,
            newPassWord: newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gửi token trong header
            },
          }
        );

        if (response.status === 200) {
          alert("Cập nhật mật khẩu thành công.");
          onHide(); // Đóng modal sau khi thành công
        } else {
          alert("Cập nhật mật khẩu thất bại.");
        }
      } catch (error) {
        alert("Đã xảy ra lỗi khi cập nhật mật khẩu.");
        console.error("Lỗi cập nhật mật khẩu:", error);
      }
    }
  };

  // Reset validated khi modal đóng
  useEffect(() => {
    if (!show) {
      setValidated(false);
      setNewPassword("");
      setConfirmNewPassword("");
    }
  }, [show]);

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                autocomplete="current-password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
            <div className="eyes" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </Col>

          <Col md>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type={passwordNewVisible ? "text" : "password"}
                placeholder="Mật khẩu mới"
                autocomplete="current-password" // Thêm autocomplete
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                isInvalid={
                  validated &&
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    newPassword
                  )
                }
              />
              <Form.Control.Feedback type="invalid">
                Ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="eyes" onClick={togglePasswordNewVisibility}>
              {passwordNewVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </Col>

          <Col md>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác nhận mật khẩu mới</Form.Label>
              <Form.Control
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Xác nhận mật khẩu mới"
                autocomplete="current-password" // Thêm autocomplete
                required
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                isInvalid={validated && confirmNewPassword !== newPassword}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu không khớp
              </Form.Control.Feedback>
            </Form.Group>
            <div className="eyes" onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </div>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangePassword}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
