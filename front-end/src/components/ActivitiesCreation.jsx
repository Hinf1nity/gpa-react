import PropTypes from "prop-types";
import { AddPoints } from "./AddPoints";
import { InputGroup, Button, Form, Row, Col } from "react-bootstrap";

export function ActivitiesCreation({
  register,
  control,
  handleShowInput,
  showInput,
}) {
  return (
    <div>
      <Row>
        <Col md="7">
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="Actividad">Actividad:</InputGroup.Text>
            <Form.Control
              type="text"
              aria-describedby="Actividad"
              {...register("actividad", { required: true })}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="PuntosGpa">Puntos GPA:</InputGroup.Text>
            <Form.Control
              type="number"
              min="0"
              aria-describedby="PuntosGpa"
              {...register("puntos_gpa", { required: true })}
            />
          </InputGroup>
        </Col>
        <Col md="2"></Col>
      </Row>
      <InputGroup className="mb-3" size="lg">
        <InputGroup.Text id="Fecha">Fecha:</InputGroup.Text>
        <Form.Control
          type="date"
          aria-describedby="Fecha"
          {...register("fecha", { required: true })}
        />
      </InputGroup>
      <Row className="justify-content-center">
        <Col md="2"></Col>
        <Col md="4">
          <h5 className="d-inline mr-4">Estado de la actividad:</h5>
        </Col>
        <Col>
          <Form.Check
            type="radio"
            label="En proceso"
            name="estado"
            value="En proceso"
            inline
            style={{ marginRight: "60px" }}
            {...register("estado")}
            onChange={(e) => handleShowInput(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Finalizada"
            name="estado"
            value="Finalizada"
            inline
            style={{ marginRight: "60px" }}
            {...register("estado")}
            onChange={(e) => handleShowInput(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Proximamente"
            name="estado"
            value="Proximamente"
            inline
            style={{ marginRight: "60px" }}
            {...register("estado")}
            onChange={(e) => handleShowInput(e.target.value)}
            defaultChecked
          />
        </Col>
      </Row>
      {showInput && <AddPoints register={register} control={control} />}
      <Button variant="primary" type="submit" size="lg">
        Guardar
      </Button>
    </div>
  );
}

ActivitiesCreation.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  handleShowInput: PropTypes.func.isRequired,
  showInput: PropTypes.bool.isRequired,
};
