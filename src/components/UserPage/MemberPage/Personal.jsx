import { Button, Col, Form, Row } from "react-bootstrap";
import "../MemberPage/personal.scss";

export const Personal = () => {
  return (
    <div className="personal_container">
      <h4>Thông tin tài khoản</h4>
      <div className="inf_acc">
        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Họ Tên</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên đạo diện"
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên diễn viên"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên đạo diện"
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên diễn viên"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Giới tính</Form.Label>
              <Form.Select aria-label="Floating label select example">
                <option>---</option>
                <option>Nam</option>
                <option>Nu</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {/*  */}
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicReleaseDate">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-2">
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicDirector">
              <Form.Label>Tỉnh/ Thành phố</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên đạo diện"
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group className="mb-3" controlId="formBasicActor">
              <Form.Label>Quận/ Huyện</Form.Label>
              <Form.Control
                type="input"
                placeholder="Vui lòng nhập tên diễn viên"
              />
            </Form.Group>
          </Col>
        </Row>

        <Col md>
          <Form.Group className="mb-4" controlId="formBasicActor">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="input"
              placeholder="Vui lòng nhập tên diễn viên"
            />
          </Form.Group>
        </Col>
      </div>
      <div className="change_pass">
        <p>Đổi mật khẩu</p>
      </div>
      <div className="btn_update">
        <Button variant="primary">Cập nhật</Button>
      </div>
    </div>
  );
};
