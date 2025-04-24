import "../Footer/footer.scss";
import { Image } from "react-bootstrap";

export const Footer = () => {
  return (
    <div className="container_footer">
      <div className="footer">
        <div className="left_link">
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
          <div className="img">
            <Image
              src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20x='0px'%20y='0px'%20width='100'%20height='100'%20viewBox='0%200%2048%2048'%3e%3clinearGradient%20id='Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1'%20x1='9.993'%20x2='40.615'%20y1='9.993'%20y2='40.615'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%232aa4f4'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%23007ad9'%3e%3c/stop%3e%3c/linearGradient%3e%3cpath%20fill='url(%23Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)'%20d='M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z'%3e%3c/path%3e%3cpath%20fill='%23fff'%20d='M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46%20c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452%20C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z'%3e%3c/path%3e%3c/svg%3e"
              roundedCircle
              height={70}
              width={70}
            />
            <Image
              src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1745495946/t%E1%BA%A3i_xu%E1%BB%91ng_j8bhrq.jpg"
              roundedCircle
              height={70}
              width={70}
            />
            <Image
              src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1745495946/t%E1%BA%A3i_xu%E1%BB%91ng_vq9lg9.png"
              roundedCircle
              height={70}
              width={70}
            />
          </div>
        </div>
        <div className="right_contact">
          <h4>Liên hệ</h4>
          <ul>
            <li>Công ty TNHH HP CINEMA</li>
            <li>Liên hệ hợp tác</li>
            <li>Hotline: 1900 9191</li>
            <li>Email: hpcinemacontact@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
