import { Button, Form, Modal } from "react-bootstrap";
import "./cinema.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const Cinema = ({ show, handleClose, handleNext }) => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");

  useEffect(() => {
    const fetchCinemas = async () => {
      if (selectedLocation) {
        try {
          const response = await axios.get(
            `http://localhost:8080/cinema/filter?locationEnum=${selectedLocation}`
          );
          setCinemas(response.data);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setCinemas([]); // Reset cinemas khi selectedLocation rỗng
      }
    };
    fetchCinemas();
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedCinemaId("");
  };

  const handleCinemaChange = (event) => {
    setSelectedCinemaId(event.target.value);
  };

  const handleNextClick = () => {
    if (selectedCinemaId) {
      handleNext();
    } else {
      alert("Vui lòng chọn rạp phim.");
    }
  };

  return (
    <div className="container_cinema">
      <Modal show={show} centered size="md">
        <Modal.Header>
          <Modal.Title>Vui lòng chọn rạp phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Location */}
          <Form.Select
            aria-label="Default select example"
            onChange={handleLocationChange}
            value={selectedLocation}
          >
            <option value="">--Chọn khu vực---</option>
            <option value="HaNoi">HaNoi</option>
            <option value="DaNang">DaNang </option>
            <option value="HoChiMinh">HoChiMinh</option>
          </Form.Select>
          {/* CinemaName */}
          {selectedLocation && cinemas.length > 0 && (
            <Form.Select
              aria-label="Cinema select"
              onChange={handleCinemaChange}
              value={selectedCinemaId}
            >
              <option value="">--Chọn rạp phim---</option>
              {cinemas.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.cinemaName}
                </option>
              ))}
            </Form.Select>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleNextClick}>
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
