import { UserOutlined } from "@ant-design/icons";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="nav-heading-container">
        <h1>Trực Sao Đỏ</h1>
        <UserOutlined
          style={{ fontSize: "30px", color: "white", marginLeft: "5px" }}
        />
      </div>
      <div className="nav-menu-container">
        <div className="nav-link-container active">
          <a>Tra Cứu Sổ</a>
        </div>
        <div className="nav-link-container">
          <a>Nhập Sổ</a>
        </div>
        <div className="nav-link-container">
          <a>Xem thống Kê</a>
        </div>
        <div className="nav-link-container">
          <a>Cập Nhật Danh Mục</a>
        </div>
      </div>
    </div>
  );
}
