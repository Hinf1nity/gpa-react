import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getUser } from "../api/tasks.api";
import {
  Row,
  Col,
  Form,
  InputGroup,
  Nav,
  Alert,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { useFieldArray } from "react-hook-form";

export function AddPoints({ register, control }) {
  const [nombre_completo, setNombreCompleto] = useState("");
  const [activeTab, setActiveTab] = useState("#first");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carnets",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [append, fields]);

  const handleInputChange = (carnet) => {
    getUser(carnet)
      .then((response) => {
        setNombreCompleto(response.data[0].nombre);
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
          {fields.map((field, index) => (
            <Row key={field.id}>
              <Col md="2" />
              <Col>
                <InputGroup className="mb-3" size="lg">
                  <InputGroup.Text id="Carnet">Carnet:</InputGroup.Text>
                  <Form.Control
                    type="number"
                    aria-describedby="Carnet"
                    {...register(`carnets.${index}.ci`)}
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
                    {...register(`carnets.${index}.puntos_est`)}
                  />
                </InputGroup>
              </Col>
              <Col md="2" />
            </Row>
          ))}

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
          <Row>
            <Col md="2" />
            <Col>
              <ButtonGroup aria-label="Carnet inputs" size="lg">
                <Button
                  variant="success"
                  type="button"
                  onClick={() => append({})}
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => remove(fields.length - 1)}
                >
                  -
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
      )}
      <br />
    </div>
  );
}

AddPoints.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
};
