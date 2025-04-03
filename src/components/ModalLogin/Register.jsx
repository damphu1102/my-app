import { useState } from "react";
import "../ModalLogin/register.scss";
import { ModalRegister } from "./ModalRegister";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Toast } from "../UserPage/ToastPage";

export const Register = ({ show, onHide, onBack, validated, setValidated }) => {
  // State để lưu trữ giá trị các input
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAccount, setEmailAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra giá trị trống trước khi gọi API
    if (
      !userName ||
      !fullName ||
      !emailAccount ||
      !phoneNumber ||
      !passWord ||
      !confirmPassword
    ) {
      setValidated(true);
      return; // Trả về ngay lập tức nếu có trường trống
    }

    const accountData = {
      userName: userName,
      fullName: fullName,
      emailAccount: emailAccount,
      phoneNumber: phoneNumber,
      passWord: passWord,
    };

    // Kiểm tra form.checkValidity() trước khi call API
    axios
      .post("http://localhost:8080/account/create", accountData)
      .then((response) => {
        console.log("Account created:", response.data);
        // Xử lý phản hồi thành công (ví dụ: hiển thị thông báo)
        setToastMessage({
          message: "Đăng ký thành công",
        });
        onHide(); // Đóng modal sau khi đăng ký thành công
        // Reset form chỉ khi đăng ký thành công
        setUserName("");
        setFullName("");
        setEmailAccount("");
        setPhoneNumber("");
        setPassWord("");
        setConfirmPassword("");
        setTermsAccepted(false);
        setValidated(false); // Reset validated
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        setToastMessage({
          message: "Đăng ký thất bại",
        });
        setValidated(true); // Cập nhật validated để hiển thị lỗi nếu có lỗi
      });
  };

  return (
    <div className="register_container">
      <ModalRegister
        show={show}
        onHide={onHide}
        onBack={onBack}
        userName={userName}
        fullName={fullName}
        emailAccount={emailAccount}
        phoneNumber={phoneNumber}
        passWord={passWord}
        confirmPassword={confirmPassword}
        termsAccepted={termsAccepted}
        handleSubmit={handleSubmit}
        setUserName={setUserName}
        setFullName={setFullName}
        setEmailAccount={setEmailAccount}
        setPhoneNumber={setPhoneNumber}
        setPassWord={setPassWord}
        setConfirmPassword={setConfirmPassword}
        setTermsAccepted={setTermsAccepted}
        validated={validated}
      />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage.message} />}
    </div>
  );
};
