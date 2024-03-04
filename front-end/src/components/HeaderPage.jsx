import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

export function HeaderPage({ header1, paragraph }) {
  return (
    <header className="bg-dark text-white py-3">
      <Container fluid>
        <Row className="d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-center">
          <Col md={6} className="order-md-2 text-center text-md-left">
            <h1>{header1}</h1>
            <p>{paragraph}</p>
          </Col>
          <Col md={6} className="order-md-1 text-center mb-3 mb-md-0">
            <img
              src="https://i.imgur.com/z4gMSNl.png"
              alt="Logo"
              className="d-none d-md-block"
              style={{ maxWidth: "700px" }}
            />
            <img
              src="https://i.imgur.com/z4gMSNl.png"
              alt="Logo"
              className="img-fluid d-md-none"
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
}

HeaderPage.propTypes = {
  header1: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
};
