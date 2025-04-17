import { Card, Button } from "react-bootstrap";
import { CardTabMovie } from "../../Cards/Card";
import "../EventPage/event.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { EventInf } from "./EventInf";

export const Event = () => {
  const [eventList, setEventList] = useState([]);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/event");
        setEventList(response.data);
      } catch (error) {
        console.error("Lỗi tải event", error);
      }
    };
    fetchEvents();
  }, []);

  const fetchEventDetail = async (eventId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/event/${eventId}`
      );
      setSelectedEventDetail(response.data);
    } catch (error) {
      console.error("Lỗi tải chi tiết event", error);
      setSelectedEventDetail(null);
    }
  };

  const handleViewDetail = (eventId) => {
    fetchEventDetail(eventId);
  };

  const handleBackToList = () => {
    setSelectedEventDetail(null); // Quay lại danh sách sự kiện
  };

  return (
    <div className="event_container">
      <div className="event_content">
        <div className="card_event">
          <div className="title_event">
            <h2>
              {selectedEventDetail ? (
                <Button variant="outline-info" onClick={handleBackToList}>
                  Quay lại danh sách
                </Button>
              ) : (
                "Ưu đãi"
              )}
            </h2>
          </div>
          <div
            className={`card_content ${
              selectedEventDetail ? "detail-view" : ""
            }`}
          >
            {selectedEventDetail ? (
              <EventInf event={selectedEventDetail} />
            ) : (
              eventList.length > 0 &&
              eventList.map((event) => (
                <Card
                  style={{ width: "18rem", cursor: "pointer" }}
                  key={event.eventId}
                  onClick={() => handleViewDetail(event.eventId)}
                >
                  <Card.Img variant="top" src={event.imageEvent} />
                  <Card.Body>
                    <Card.Title>{event.titleEvent}</Card.Title>
                    <Button variant="outline-info">Xem chi tiết</Button>
                  </Card.Body>
                </Card>
              ))
            )}
            {!selectedEventDetail && eventList.length === 0 && (
              <p>Không có sự kiện nào cả</p>
            )}
          </div>
        </div>
        <div className="card_movie">
          <CardTabMovie />
        </div>
      </div>
    </div>
  );
};
