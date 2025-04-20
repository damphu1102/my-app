import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const NewPass = ({
  show,
  onHide,
  onBack,
  email,
  setEmail,
  setOtp,
  setToastMessage,
}) => {
  const [passwordNewVisible, setPasswordNewVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordNew, setPasswordNew] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [updatePasswordError, setUpdatePasswordError] = useState("");
  const togglePasswordNewVisibility = () => {
    setPasswordNewVisible(!passwordNewVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const restData = () => {
    onHide();
    setPasswordNew("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setUpdatePasswordError("");
    setEmail("");
    setOtp("");
  };

  const handleSavePassword = async () => {
    if (!passwordNew) {
      setPasswordError("Vui lòng nhập mật khẩu mới.");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu mới.");
      return;
    }

    if (passwordNew !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/account/updatePasswordEmail",
        {
          emailAccount: email,
          newPassWord: passwordNew,
        }
      );
      if (response.status === 200) {
        setToastMessage(null);
        setTimeout(() => {
          setToastMessage({ message: "Đổi mật khẩu thành công!" });
        }, 200);
        restData();
      } else {
        setUpdatePasswordError(
          `Lỗi: ${response.data || "Không thể đổi mật khẩu. Vui lòng thử lại."}`
        );
      }
    } catch (error) {
      setUpdatePasswordError(
        "Không thể kết nối đến máy chủ. Vui lòng thử lại sau."
      );
      console.error("Lỗi gọi API:", error);
    }
  };
  return (
    <>
      <Modal show={show} onHide={restData} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label>Vui lòng nhập mật khẩu mới</Form.Label>
                <Form.Control
                  type={passwordNewVisible ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới vào đây"
                  value={passwordNew}
                  onChange={(e) => setPasswordNew(e.target.value)}
                />
                {passwordError && (
                  <Form.Text className="text-danger">{passwordError}</Form.Text>
                )}
              </Form.Group>
              <div className="eyes" onClick={togglePasswordNewVisibility}>
                {passwordNewVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Col>
            <Col md>
              <Form.Group className="mb-3">
                <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu mới vào đây"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                  <Form.Text className="text-danger">
                    {confirmPasswordError}
                  </Form.Text>
                )}
              </Form.Group>
              <div className="eyes" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Col>
            {updatePasswordError && (
              <Form.Text className="text-danger">
                {updatePasswordError}
              </Form.Text>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onBack}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={handleSavePassword}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
