import { Header } from "../AdminPage/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";
import { Outlet } from "react-router-dom";

export const HomeAdmin = () => {
  const adminDataString = localStorage.getItem("adminData"); // Lấy chuỗi JSON userData từ localStorage
  const adminData = JSON.parse(adminDataString);
  return (
    <>
      <Header username={adminData.username} />
      <Outlet />
      <Dashboard role={adminData.role} />
    </>
  );
};
