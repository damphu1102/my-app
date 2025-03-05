import { CardDash } from "../Cards/Card";
import "../Dashboard/dashboard.scss";

export const Dashboard = () => {
  return (
    <aside className="dashboard">
      <div className="header_dash">
        <h4>ADMIN</h4>
      </div>
      <div className="content_dash">
        <CardDash />
      </div>
    </aside>
  );
};
