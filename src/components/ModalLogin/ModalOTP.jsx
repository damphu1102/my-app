import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

export const ModalOTP = ({
  show,
  onHide,
  onBack,
  onContinue,
  email,
  otp,
  setOtp,
  otpError,
  setOtpError,
}) => {
  const handleContinue = async () => {
    if (!otp) {
      setOtpError("Vui lòng nhập mã OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/auth/verify-otp?email=${email}&otp=${otp}`
      );
      if (response.status === 200) {
        onContinue(); // Gọi hàm onContinue để chuyển sang bước tiếp theo
      } else {
        // Xử lý lỗi từ API (ví dụ: OTP không hợp lệ)
        setOtpError(
          `Lỗi: ${response.data || "Mã OTP không hợp lệ. Vui lòng thử lại."}`
        );
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc lỗi không xác định
      setOtpError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      console.error("Lỗi gọi API:", error); // Log lỗi để debug
    }
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Vui lòng nhập mã OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập OTP vào đây"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpError("");
                }}
              />
              {otpError && (
                <Form.Text className="text-danger">{otpError}</Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onBack}>
            Quay lại
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            Tiếp tục
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
