import { Outlet } from "react-router-dom";
import { Header } from "../AdminPage/Header/Header";
import { Dashboard } from "./Dashboard/Dashboard";

export const HomeAdmin = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Dashboard />
    </>
  );
};
