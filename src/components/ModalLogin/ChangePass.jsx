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
  const [oldPasswordError, setOldPasswordError] = useState("");

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

    try {
      const checkPassResponse = await axios.post(
        `http://localhost:8080/account/check_pass`,
        {
          accountId: accountId,
          passWord: oldPassword,
        }
      );

      if (checkPassResponse.data === true) {
        // Old password is valid, proceed with new password update
        if (confirmNewPassword === newPassword && newPassword) {
          try {
            const updatePasswordResponse = await axios.put(
              `http://localhost:8080/account/updatePassword`,
              {
                accountId: accountId,
                newPassWord: newPassword,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (updatePasswordResponse.status === 200) {
              alert("Cập nhật mật khẩu thành công.");
              onHide();
            } else {
              alert("Cập nhật mật khẩu thất bại.");
            }
          } catch (updateError) {
            alert("Đã xảy ra lỗi khi cập nhật mật khẩu.");
            console.error("Lỗi cập nhật mật khẩu:", updateError);
          }
        } else {
          // New passwords do not match
          setValidated(true); // Keep validated true to show new password mismatch error
        }
      } else {
        // Old password is invalid
        setOldPasswordError("Mật khẩu cũ không đúng.");
        setValidated(true); // Set validated to true to show old password error
      }
    } catch (checkPassError) {
      alert("Lỗi xác thực mật khẩu cũ.");
      console.error("Lỗi xác thực mật khẩu cũ:", checkPassError);
      setValidated(false); // Set validated to false in case of error
    }
  };

  // Reset validated khi modal đóng
  useEffect(() => {
    if (!show) {
      setValidated(false);
      setNewPassword("");
      setConfirmNewPassword("");
      setOldPassword("");
      setOldPasswordError("");
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
                autocomplete="current-oldpassword"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {oldPasswordError && (
                <Form.Text className="text-danger">
                  {oldPasswordError}
                </Form.Text>
              )}
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
                autocomplete="current-newpassword" // Thêm autocomplete
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
                autocomplete="current-confrimpassword" // Thêm autocomplete
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
