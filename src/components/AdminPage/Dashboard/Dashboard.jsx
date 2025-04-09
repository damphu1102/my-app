import { Link } from "react-router-dom";
import { CardDash } from "../Cards/Card";
import "../Dashboard/dashboard.scss";

export const Dashboard = ({ role }) => {
  return (
    <aside className="dashboard">
      <div className="header_dash">
        <Link
          to="/home_admin"
          style={{ textDecoration: "none", color: "black" }}
        >
          <h4>{role}</h4>
        </Link>
      </div>
      <div className="content_dash">
        <CardDash />
      </div>
    </aside>
  );
};
