import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
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
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const phoneInputRef = useRef(null); // Tạo một ref cho input phone
  const [userNameExists, setUserNameExists] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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

  const checkUserNameExists = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/account/check_username?username=${username}`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi", error);
    }
  };

  // Hàm xử lý submit form
  const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // Ngăn reload trang
      const isUserNameExists = await checkUserNameExists(userName);
      if (isUserNameExists) {
        setUserNameExists(true);
      } else {
        setUserNameExists(false);
        handleSubmit(event); // Gọi hàm handleSubmit từ component cha
      }
    }
  };

  const OnHileDate = () => {
    setUserName("");
    setFullName("");
    setEmailAccount("");
    setPhoneNumber("");
    setPassWord("");
    setConfirmPassword("");
    setTermsAccepted("");
    onHide();
  };

  return (
    <>
      <Modal show={show} centered onHide={OnHileDate} size="lg">
        <Modal.Header closeButton>
          <Modal.Title style={{ cursor: "default" }}>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ví dụ (a1)"
                    Value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autocomplete="current-Username" // Thêm autocomplete
                    required
                    pattern="^[a-zA-Z0-9_]{2,20}$" // Regex: 2-20 ký tự chữ, số, gạch dưới
                    isInvalid={
                      (validated && !/^[a-zA-Z0-9_]{2,20}$/.test(userName)) ||
                      userNameExists
                    }
                    title=""
                  />
                  <Form.Control.Feedback type="invalid">
                    {userNameExists
                      ? "Username đã tồn tại"
                      : "Username phải từ 2-20 ký tự và không chứa khoảng trắng."}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nguyễn Văn A"
                    Value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autocomplete="current-fullname" // Thêm autocomplete
                    required
                    pattern="^[a-zA-Z]+( [a-zA-Z]+)*$" // Regex mới
                    isInvalid={
                      validated && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(fullName)
                    } // Regex mới
                    title=""
                  />
                  <Form.Control.Feedback type="invalid">
                    Họ và tên phải từ 2-20 ký tự
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="abc@gmail.com"
                    Value={emailAccount}
                    onChange={(e) => setEmailAccount(e.target.value)}
                    autocomplete="current-email" // Thêm autocomplete
                    required
                    isInvalid={
                      validated &&
                      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        emailAccount
                      )
                    }
                    title=""
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập email hợp lệ.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="text" // Thay đổi thành type="text"
                    placeholder="090xxxxxxx"
                    ref={phoneInputRef} // Gán ref cho input
                    Value={phoneNumber}
                    onChange={(e) => {
                      const cleanedValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      setPhoneNumber(cleanedValue);
                    }}
                    autocomplete="current-phone" // Thêm autocomplete
                    required
                    pattern="^0[0-9]{9}$" // Regex: 10 chữ số, bắt đầu bằng 0
                    isInvalid={validated && !/^0[0-9]{9}$/.test(phoneNumber)}
                    title=""
                  />
                  <Form.Control.Feedback type="invalid">
                    Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Mật khẩu"
                    Value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    autocomplete="current-password" // Thêm autocomplete
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    isInvalid={
                      validated &&
                      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                        passWord
                      )
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Ít nhất 8 ký tự, chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="eyes" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </div>
              </Col>

              <Col md>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu"
                    Value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autocomplete="current-password" // Thêm autocomplete
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    isInvalid={validated && confirmPassword !== passWord}
                  />
                  <Form.Control.Feedback type="invalid">
                    Mật khẩu không khớp.
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="eyes" onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </div>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                type="checkbox"
                label="Đồng ý với điều khoản dịch vụ"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                isInvalid={!termsAccepted} // Thêm isInvalid prop để hiển thị lỗi
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
