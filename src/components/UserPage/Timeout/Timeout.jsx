import { useEffect, useRef, useState } from "react";

export const Timeout = ({ initialTime, onTimeout, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // 10 phút = 600 giây
  const intervalIdRef = useRef(null); // Sử dụng useRef để lưu trữ interval ID

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalIdRef.current); // Clear interval khi component unmount
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalIdRef.current); // Clear interval khi hết thời gian
      onTimeout();
    }
    onTimeChange(timeLeft); // Gọi onTimeChange mỗi khi timeLeft thay đổi
  }, [timeLeft, onTimeout, onTimeChange]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <p style={{ fontStyle: "italic" }}>
        Thời gian đặt vé:{" "}
        <span style={{ color: "red" }}>{formatTime(timeLeft)}</span>
      </p>
    </>
  );
};
