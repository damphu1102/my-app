import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ModalRegister = ({
  show,
  onHide,
  onBack,
  userName,
  fullName,
  emailAccount,
  phoneNumber,
  passWord,
  confirmPassword,
  termsAccepted,
  handleSubmit,
  setUserName,
  setFullName,
  setEmailAccount,
  setPhoneNumber,
  setPassWord,
  setConfirmPassword,
  setTermsAccepted,
  validated,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // State để theo dõi trạng thái hiển thị mật khẩu
  const phoneInputRef = useRef(null); // Tạo một ref cho input phone

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // Xử lý sự kiện sử dụng mũi tên của input number
  useEffect(() => {
    const inputElement = phoneInputRef.current; // Sao chép giá trị vào biến cục bộ

    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
    }
  };

  // Hàm xử lý submit form
  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // Ngăn reload trang
      handleSubmit(event); // Gọi hàm handleSubmit từ component cha
    }
  };

  return (
    <>
      <Modal show={show} centered onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title style={{ cursor: "default" }}>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="a1"
                defaultValue={userName}
                onChange={(e) => setUserName(e.target.value)}
                autocomplete="current-Username" // Thêm autocomplete
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyễn Văn A"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autocomplete="current-fullname" // Thêm autocomplete
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="abc@gmail.com"
                defaultValue={emailAccount}
                onChange={(e) => setEmailAccount(e.target.value)}
                autocomplete="current-email" // Thêm autocomplete
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="number"
                placeholder="090xxxxxxx"
                ref={phoneInputRef} // Gán ref cho input
                defaultValue={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                autocomplete="current-phone" // Thêm autocomplete
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Mật khẩu"
                defaultValue={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                autocomplete="current-password" // Thêm autocomplete
                required
              />
              <div className="eyes" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type={passwordVisible ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autocomplete="current-password" // Thêm autocomplete
                required
              />
              <div className="eyes" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEye /> : <FaEyeSlash />}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                type="checkbox"
                label="Đồng ý với điều khoản dịch vụ"
                defaultChecked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                feedback="không được bỏ trống"
                feedbackType="invalid"
              />
            </Form.Group>

            <div className="btn_login">
              <Button variant="primary" onClick={handleFormSubmit}>
                Đăng ký
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p style={{ cursor: "default" }}>
            Bạn đã có tài khoản đăng nhập?
            <span onClick={onBack} style={{ color: "blue", cursor: "pointer" }}>
              Đăng nhập
            </span>
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
};
