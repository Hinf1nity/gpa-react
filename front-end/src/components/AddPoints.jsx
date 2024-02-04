import PropTypes from "prop-types";
import { useState } from "react";
import { getUser } from "../api/tasks.api";
import { Row, Col, Form, InputGroup, Nav, Alert } from "react-bootstrap";

export function AddPoints({ register }) {
  const [nombre_completo, setNombreCompleto] = useState("");
  const [activeTab, setActiveTab] = useState("#first");

  const handleInputChange = (carnet) => {
    console.log(carnet);
    getUser(carnet)
      .then((response) => {
        setNombreCompleto(
          response.data[0].nombre + " " + response.data[0].apellido
        );
        console.log(nombre_completo);
      })
      .catch((error) => {
        setNombreCompleto("");
        console.log(error);
      });
  };

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  return (
    <div>
      <br />
      <Nav variant="tabs" defaultActiveKey="#first" onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link href="#first">Subir archivo</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#second">Ingresar manualmente</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeTab === "#first" ? (
        <Row>
          <Col>
            <Form.Group controlId="Archivo" className="mb-3">
              <Form.Label>Ingrese un archivo excel:</Form.Label>
              <Form.Control
                size="lg"
                type="file"
                {...register("archivo", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>
      ) : (
        <div>
          <br />
          <Row>
            <Col md="2" />
            <Col>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="Carnet">Carnet:</InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-describedby="Carnet"
                  {...register("ci")}
                  onChange={(e) => {
                    if (
                      e.target.value.length > 6 &&
                      e.target.value.length < 9
                    ) {
                      handleInputChange(e.target.value);
                    } else {
                      setNombreCompleto("");
                    }
                  }}
                />
              </InputGroup>
            </Col>
            <Col md="2">
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="Puntos">Puntos:</InputGroup.Text>
                <Form.Control
                  type="number"
                  aria-describedby="Puntos"
                  {...register("puntos_est")}
                />
              </InputGroup>
            </Col>
            <Col md="2" />
          </Row>

          {nombre_completo ? (
            <Row>
              <Col md="2" />
              <Col md="6">
                <Alert variant="info">{nombre_completo}</Alert>
              </Col>
            </Row>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <br />
    </div>
  );
}

AddPoints.propTypes = {
  register: PropTypes.func.isRequired,
};
