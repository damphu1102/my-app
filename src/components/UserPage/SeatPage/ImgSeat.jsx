export const ImgSeat = () => {
  return (
    <>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809663/seat-unselect-normal_hygw6w.png"
          alt="un_selected"
        />
        <p>Ghế chưa chọn</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-process-normal_lzfigz.png"
          alt="current_selected"
        />
        <p>Ghế đang giữ</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-select-normal_nfev6o.png"
          alt="selected"
        />
        <p>Ghế đang chọn</p>
      </div>
      <div className="status">
        <img
          src="https://res.cloudinary.com/dcoviwlpx/image/upload/v1731809662/seat-buy-normal_ryk3xl.png"
          alt="success"
        />
        <p>Ghế đã được đặt</p>
      </div>
    </>
  );
};
