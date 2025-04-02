// ToastMessage.js
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = ({ message }) => {
  useEffect(() => {
    const showToast = () => {
      toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    showToast();
  }, [message]); // Không cần showToast trong dependency array

  return null;
};
