import moment from "moment/moment";
import { Card } from "react-bootstrap";

export const EventInf = ({ event }) => {
  const descriptionParagraphs = event.descriptionEvent
    ? event.descriptionEvent.split(".")
    : [];

  return (
    <div className="detail-view">
      <Card>
        <h4>{event.titleEvent}</h4>
        <p>
          Ngày đăng: <span> {moment(event.createAT).format("DD/MM/YYYY")}</span>
        </p>
        <Card.Img variant="top" src={event.imageDetail} />
        <Card.Body>
          {descriptionParagraphs.map((paragraph, index) => (
            <Card.Text key={index}>{paragraph.trim()} </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
};
