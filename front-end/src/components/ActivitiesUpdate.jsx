import PropTypes from "prop-types";
import { AddPoints } from "./AddPoints";
import { Button, Form, Row, Col } from "react-bootstrap";

export function ActivitiesUpdate({
  registerUpdate,
  controlUpdate,
  handleShowInputUpdate,
  showInputUpdate,
  actividades,
}) {
  return (
    <div>
      <Form.Select
        aria-label="Default select example mb-3"
        size="lg"
        {...registerUpdate("actividad")}
      >
        <option>Seleccione una actividad</option>
        {actividades.map((actividad) => (
          <option key={actividad.id} value={actividad.actividades}>
            {actividad.actividades} - {actividad.estado} - Puntos GPA de la
            actividad: {actividad.puntos_ac}
          </option>
        ))}
      </Form.Select>
      <Row className="justify-content-center">
        <Col md="2"></Col>
        <Col md="4">
          <h5 className="d-inline mr-4">Estado de la actividad:</h5>
        </Col>
        <Col>
          <Form.Check
            type="radio"
            label="Finalizada"
            name="estado"
            value="Finalizada"
            inline
            style={{ marginRight: "60px" }}
            {...registerUpdate("estado")}
            onChange={(e) => handleShowInputUpdate(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Proximamente"
            name="estado"
            value="Proximamente"
            inline
            defaultChecked
            style={{ marginRight: "60px" }}
            {...registerUpdate("estado")}
            onChange={(e) => handleShowInputUpdate(e.target.value)}
          />
        </Col>
      </Row>
      {showInputUpdate ? (
        <AddPoints register={registerUpdate} control={controlUpdate} />
      ) : (
        <div></div>
      )}
      <Button variant="primary" type="submit" size="lg">
        Guardar
      </Button>
    </div>
  );
}

ActivitiesUpdate.propTypes = {
  registerUpdate: PropTypes.func.isRequired,
  controlUpdate: PropTypes.object.isRequired,
  handleShowInputUpdate: PropTypes.func.isRequired,
  showInputUpdate: PropTypes.bool.isRequired,
  actividades: PropTypes.array.isRequired,
};
