import { Card, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={12}>
          <div className="bg-gradient-to-b from-xenon to-xenon/50 roundedfew pt-36 py-72">

          </div>
          <Card bg='dark' key='dark' text='light' border='success'>
            <Card.Body>
              <Card.Body>
                <Row>
                </Row>
              </Card.Body>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}