import { useState } from "react";
import { useForm } from "react-hook-form";
import { HeaderPage } from "../components/HeaderPage";
import { RegistrationSubjects } from "../components/RegistrationSubjects";
import toast from "react-hot-toast";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { postLicencia } from "../api/tasks.api";

export function RegistrarLicencia() {
  const { carnet } = useParams();
  const [additionalData] = useState({
    ci: carnet,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    //formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.justificacion[0].type !== "application/pdf") {
        toast.error("El archivo debe ser en formato PDF");
        return;
      }
      const formData = { ...data, ...additionalData };
      console.log(formData);
      await postLicencia(formData);
      toast.success("Licencia registrada con éxito");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la licencia");
    }
  });

  return (
    <div>
      <HeaderPage
        header1="Sistema de Registro de Licencias"
        paragraph="Bienvenido a el Sistema de Registro de Licencias"
      />
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/cidimec/gpa-imt/">Inicio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <h2>Descripción:</h2>
          <Row>
            <Col md="1"></Col>
            <Col>
              <Form.Check
                type="radio"
                label="Salud"
                name="motivo"
                value="Salud"
                inline
                style={{ marginRight: "60px" }}
                {...register("motivo")}
              />
              <Form.Check
                type="radio"
                label="Actividad académica"
                name="motivo"
                value="Actividad académica"
                inline
                style={{ marginRight: "60px" }}
                {...register("motivo")}
              />
              <Form.Check
                type="radio"
                label="Actividad deportiva/cultural"
                name="motivo"
                value="Actividad deportiva/cultural"
                inline
                style={{ marginRight: "60px" }}
                {...register("motivo")}
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Asunto familiar"
                name="motivo"
                value="Asunto familiar"
                inline
                style={{ marginRight: "60px" }}
                {...register("motivo")}
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="Otro"
                name="motivo"
                value="Otro"
                inline
                style={{ marginRight: "60px" }}
                {...register("motivo")}
                defaultChecked
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <InputGroup className="form-group">
              <InputGroup.Text id="descripcion">Descripcion</InputGroup.Text>
              <Form.Control
                type="text"
                as="textarea"
                required
                {...register("descripcion", { required: true })}
              />
            </InputGroup>
          </Row>
          <Row className="mt-3">
            <Col md="6">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Ingrese justificante en formato PDF:</Form.Label>
                <Form.Control
                  type="file"
                  accept="application/pdf"
                  {...register("justificacion", { required: true })}
                />
              </Form.Group>
            </Col>
          </Row>
          <h2>Registro de materias:</h2>
          <RegistrationSubjects
            register={register}
            control={control}
            setValue={setValue}
          />
          <button type="submit" className="btn btn-primary mt-3">
            Registrar
          </button>
        </form>
      </Container>
    </div>
  );
}
