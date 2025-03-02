import { Outlet } from "react-router-dom";
import { Header } from "../AdminPage/Header/Header";

export const HomeAdmin = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
