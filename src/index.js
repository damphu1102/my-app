import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutRoot } from "./components/Layout/LayoutRoot";
import { Login } from "./components/Login/Login";
import { HomeAdmin } from "./components/AdminPage/HomeAdmin";
import { Home } from "./components/Home/Home";
import { MovieManager } from "./components/AdminPage/ContentPage/MovieManager";
import { DashboardManager } from "./components/AdminPage/ContentPage/DashboardManager";
import { MovieInf } from "./components/UserPage/MoviePage/MovieInf/MovieInf";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/movieInf",
        element: <MovieInf />,
      },
    ],
  },
  {
    path: "admin",
    element: <Login />,
  },
  {
    path: "home_admin",
    element: <HomeAdmin />,
    children: [
      {
        index: true,
        path: "dashboard_manager",
        element: <DashboardManager />,
      },
      {
        path: "movie_manager",
        element: <MovieManager />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
