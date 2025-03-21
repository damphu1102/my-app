import { useLocation } from "react-router-dom";
import "../SeatPage/seat.scss";
import { Button } from "react-bootstrap";

export const Seat = () => {
  const location = useLocation();
  const data = location.state;

  console.log(location);

  return (
    <div className="seat_container">
      <div className="seat_left"></div>
      <div className="seat_right">
        <div className="inf_showtime">
          <h3>Thông tin vé</h3>
          <img src={data.movie.image} alt={data.movie.movieName} />
          <p>Tên phim: {data.movie.movieName}</p>
          <p>Rạp chiếu: {data.selectedCinema}</p>
          <p>Phòng chiếu: </p>
          <p>Ngày chiếu: {data.date}</p>
          <p>Giờ chiếu: {data.activeTime}</p>
          <p>Ghế: </p>
          <p>Giá vé: </p>
        </div>
        <Button
          variant="success"
          style={{ width: "50%", marginLeft: "25%", marginBottom: "10px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
