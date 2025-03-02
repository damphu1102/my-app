import { AiOutlineMenu } from "react-icons/ai";
import "../Header/header.scss";
import { useState } from "react";

export const Header = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleIconClick = () => {
    setShowDashboard(!showDashboard);
  };
  console.log(showDashboard);

  return (
    <div className="container_header">
      <div className="content">
        <div className="dashboard">
          <button onClick={handleIconClick}>
            <AiOutlineMenu />
          </button>
        </div>
        <div className="login">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
