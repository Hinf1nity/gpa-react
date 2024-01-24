import { useCookies } from "react-cookie";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import { postActivity } from "../api/tasks.api";
import { HeaderPage } from "../components/HeaderPage";
import toast from "react-hot-toast";
import {
  InputGroup,
  Button,
  Form,
  Container,
  Row,
  Col,
  Nav,
  Navbar,
} from "react-bootstrap";

export function GestionPage({ onLogout }) {
  const [, , removeCookie] = useCookies(["csrftoken"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const actividad = data.actividad;
      const puntos_gpa = data.puntos_gpa;
      console.log(actividad);
      console.log(puntos_gpa);
      await postActivity(data);
      toast.success("Actividad posteada");
      reset();
    } catch (error) {
      console.log("Error al postear la actividad");
      console.error(error.message);
    }
  };

  const handleLogoutClick = async () => {
    try {
      removeCookie("csrftoken");
      onLogout();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <HeaderPage
        header1="Gestión de Puntos GPA"
        paragraph="Bienvenido al Panel para la Gestión de Puntos GPA"
      />
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav onClick={handleLogoutClick}>Cerrar Sesión</Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Container>
          <h1>Bienvenido Ing. Fabio R. Diaz Palacios</h1>
          <h2>Asignar GPA</h2>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="Actividad">Actividad:</InputGroup.Text>
            <Form.Control
              type="text"
              aria-describedby="Actividad"
              {...register("actividad", { required: true })}
            />
          </InputGroup>
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="PuntosGpa">Puntos GPA:</InputGroup.Text>
            <Form.Control
              type="number"
              aria-describedby="PuntosGpa"
              {...register("puntos_gpa", { required: true })}
            />
          </InputGroup>
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
              />
              <Form.Check
                type="radio"
                label="Finalizada"
                name="estado"
                value="Finalizada"
                inline
                style={{ marginRight: "60px" }}
                {...register("estado")}
              />
              <Form.Check
                type="radio"
                label="Proximamente"
                name="estado"
                value="Proximamente"
                inline
                style={{ marginRight: "60px" }}
                {...register("estado")}
                defaultChecked
              />
            </Col>
          </Row>
          <Form.Group controlId="Archivo" className="mb-3">
            <Form.Label>Ingrese un archivo excel:</Form.Label>
            <Form.Control
              size="lg"
              type="file"
              {...register("archivo", { required: true })}
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" size="lg">
            Guardar
          </Button>
        </Container>
      </form>
    </div>
  );
}

GestionPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
