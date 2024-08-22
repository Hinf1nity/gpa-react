import { Row, InputGroup, Form, Col, Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateLicenciaEstudiante } from "../api/tasks.api";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export function ApelarCamp({ LicenciaId }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateLicenciaEstudiante(LicenciaId, data);
      console.log(data);
      if (response.status === 202) {
        toast.success("Apelación enviada con éxito");
        window.location.reload();
      } else {
        toast.error("Error al enviar la apelación");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <Row className="mt-3">
        <Col md="5">
          <Alert variant="warning" style={{ maxWidth: "500px" }}>
            Inserte un nuevo documento PDF y/o escriba una justificacón. Solo
            tiene una apelacion por licencia.
          </Alert>
        </Col>
        <Col md="3">
          <InputGroup className="form-group">
            <InputGroup.Text id="descripcion">Descripcion</InputGroup.Text>
            <Form.Control
              type="text"
              as="textarea"
              {...register("comentario")}
            />
          </InputGroup>
        </Col>
        <Col>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              type="file"
              accept="application/pdf"
              {...register("justificacion2")}
            />
          </Form.Group>
          <Button type="submit" variant="success">
            Mandar Apelación
          </Button>
        </Col>
      </Row>
    </form>
  );
}

ApelarCamp.propTypes = {
  LicenciaId: PropTypes.number.isRequired,
};
