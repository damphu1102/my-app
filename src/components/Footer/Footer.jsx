import "../Footer/footer.scss";

export const Footer = () => {
  return (
    <div className="container_footer">
      <div className="footer">
        <div className="left_link">
          <a href="">
            <img
              src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1740830902/HP-removebg-preview_birxc6.png"
              alt="Logo"
            />
          </a>
          <ul>
            <li>FAQ</li>
            <li>Giới thiệu</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách quyền riêng tư</li>
            <li>Yêu cầu riêng về tài khoản</li>
            <li>Hướng dẫn đặt vé online</li>
          </ul>
        </div>
        <div className="center_info">
          <h4>Hệ thống rạp</h4>
          <div className="list_movie">
            <ul>
              <p>Miền Bắc</p>
            </ul>
            <ul>
              <p>Miền Trung</p>
            </ul>
            <ul>
              <p>Miền Nam</p>
            </ul>
          </div>
        </div>
        <div className="center_social">
          <h4>Kết nối</h4>
          <ul>
            <li>FB</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>
        <div className="right_contact">
          <h4>Liên hệ</h4>
          <ul>
            <li>Công ty TNHH HP CINEMA</li>
            <li>Liên hệ hợp tác</li>
            <li>Hotline: 1900 9191</li>
            <li>Email: hpcinema@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
