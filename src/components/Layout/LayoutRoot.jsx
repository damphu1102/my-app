import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { Toast } from "../UserPage/ToastPage";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const LayoutRoot = () => {
  const [searchParams] = useSearchParams();
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const amount = searchParams.get("amount");
    const appid = searchParams.get("appid");
    const appTransId = searchParams.get("apptransid");
    const bankcode = searchParams.get("bankcode");
    const status = searchParams.get("status");
    const checksum = searchParams.get("checksum");
    const discountamount = searchParams.get("discountamount");
    const pmcid = searchParams.get("pmcid");

    if (appTransId) {
      // Xây dựng URL gọi API thông báo với các tham số
      const callBackUrl = new URL(
        "http://localhost:8080/api/zalopay/callback" // Thay đổi endpoint nếu cần
      );
      callBackUrl.searchParams.append("amount", amount);
      callBackUrl.searchParams.append("appid", appid);
      callBackUrl.searchParams.append("apptransid", appTransId);
      callBackUrl.searchParams.append("bankcode", bankcode);
      callBackUrl.searchParams.append("status", status);
      callBackUrl.searchParams.append("checksum", checksum);
      callBackUrl.searchParams.append("discountamount", discountamount);
      callBackUrl.searchParams.append("pmcid", pmcid);

      // Gọi API thông báo bằng GET
      const sendNotificationCallback = async () => {
        try {
          const response = await axios.get(callBackUrl.toString());
          const return_code = response.data.return_code;
          if (return_code === 1) {
            setToastMessage({
              message: "Giao dịch thành công!",
            });
          } else {
            setToastMessage({
              message: "Giao dịch thất bại!",
            });
          }
        } catch (error) {
          console.error("Lỗi khi gửi thông báo:", error);
        }
      };

      sendNotificationCallback();
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
      {toastMessage && <Toast message={toastMessage?.message} />}
      <SpeedInsights />
    </>
  );
};
