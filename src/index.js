import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutRoot } from "./components/Layout/LayoutRoot";
import { Login } from "./components/AdminPage/Login/Login";
import { HomeAdmin } from "./components/AdminPage/HomeAdmin";
import { Home } from "./components/Home/Home";
import { MovieManager } from "./components/AdminPage/ContentPage/MovieManager";
import { DashboardManager } from "./components/AdminPage/ContentPage/DashboardManager";
import { MovieInf } from "./components/UserPage/MoviePage/MovieInf/MovieInf";
import { Movie } from "./components/UserPage/MoviePage/Movie";
import { Seat } from "./components/UserPage/SeatPage/Seat";
import { Service } from "./components/UserPage/ServicePage/Service";
import { Event } from "./components/UserPage/EventPage/Event";
import { Member } from "./components/UserPage/MemberPage/Member";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
        path: "/movieInf/:movieId",
        element: <MovieInf />,
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/seat",
        element: <Seat />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/event",
        element: <Event />,
      },
      {
        path: "/about",
        element: <Member />,
      },
    ],
  },
  {
    path: "/admin",
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
      <SpeedInsights />
    </React.StrictMode>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
