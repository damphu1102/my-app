export const ImgSeat = () => {
  return (
    <>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809663/seat-unselect-normal_hygw6w.png"
          alt="un_selected"
        />
        <p>Chưa chọn</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-process-normal_lzfigz.png"
          alt="current_selected"
        />
        <p>Đang giữ</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-select-normal_nfev6o.png"
          alt="selected"
        />
        <p>Đang chọn</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809663/seat-set-normal_mmdu0h.png"
          alt="is_locked"
        />
        <p>Đã đặt trước</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-buy-normal_ryk3xl.png"
          alt="success"
        />
        <p>Đã thanh toán</p>
      </div>
    </>
  );
};
