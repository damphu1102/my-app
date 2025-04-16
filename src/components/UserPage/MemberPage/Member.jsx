import { Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../MemberPage/member.scss";
import { Personal } from "./Personal";
import { History } from "./History";
import { Voucher } from "./Voucher";

export const Member = () => {
  const [activeTab, setActiveTab] = useState("personal"); // Mặc định là trang cá nhân

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Cập nhật URL khi tab thay đổi (nếu cần)
    window.history.pushState({}, "", `/about?tab=${tab}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <Personal />;
      case "history":
        return <History />;
      case "voucher":
        return <Voucher />;
      default:
        return <Personal />;
    }
  };

  return (
    <div className="member_container">
      <div className="navbar">
        <Nav fill variant="tabs" activeKey={activeTab}>
          <Nav.Item>
            <Nav.Link
              eventKey="personal"
              onClick={() => handleTabChange("personal")}
            >
              Trang cá nhân
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="history"
              onClick={() => handleTabChange("history")}
            >
              Lịch sử đặt vé
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="voucher"
              onClick={() => handleTabChange("voucher")}
            >
              Voucher
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};
