import { useForm } from "react-hook-form";
import {
  postActivity,
  getActivities,
  updateActivity,
  postStudents,
} from "../api/tasks.api";
import { HeaderPage } from "../components/HeaderPage";
import { AddPoints } from "../components/AddPoints";
import { UseAuth } from "../context/UseAuth";
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
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";

export function GestionPage() {
  const { logout } = UseAuth();
  const [actividades, setActividades] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showInputUpdate, setShowInputUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    control: controlUpdate,
    //formState: { errors },
    reset: resetUpdate,
  } = useForm();

  const {
    register: registerFile,
    handleSubmit: handleSubmitFile,
    //formState: { errors },
    reset: resetFile,
  } = useForm();

  const {
    register,
    handleSubmit,
    control,
    //formState: { errors: errorsPost },
    reset,
  } = useForm();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActividades(
        response.data.filter((actividad) => actividad.estado !== "Finalizada")
      );
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await postActivity(data);
      toast.success("Actividad posteada");
      fetchActivities();
      handleShowInput("Proximamente");
      reset();
    } catch (error) {
      console.log("Error al postear la actividad");
      console.error(error.message);
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      const actividad = data.id;
      console.log(actividad);
      await updateActivity(data.id, data);
      toast.success("Actividad actualizada");
      fetchActivities();
      handleShowInput("Proximamente");
      resetUpdate();
    } catch (error) {
      console.log("Error al actualizar la actividad");
      console.error(error.message);
    }
  };

  const onSubmitFile = async (data) => {
    try {
      await postStudents(data);
      toast.success("Estudiantes añadidos");
      resetFile();
    } catch (error) {
      console.log("Error al añadir estudiantes");
      console.error(error.message);
    }
  };

  const handleLogoutClick = async () => {
    try {
      logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleShowInput = (value) => {
    setShowInput(value === "Finalizada");
  };

  const handleShowInputUpdate = (value) => {
    setShowInputUpdate(value === "Finalizada");
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
            <Nav className="me-auto">
              <Nav onClick={handleShowModal}>Añadir estudiantes</Nav>
            </Nav>
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
        </Container>
      </form>
      {actividades.length > 0 ? (
        <div>
          <hr />
          <form
            onSubmit={handleSubmitUpdate(onSubmitUpdate)}
            encType="multipart/form-data"
          >
            <Container>
              <h2>Edicion de eventos</h2>
              <Form.Select
                aria-label="Default select example mb-3"
                size="lg"
                {...registerUpdate("actividad")}
              >
                <option>Seleccione una actividad</option>
                {actividades.map((actividad) => (
                  <option key={actividad.id} value={actividad.actividades}>
                    {actividad.actividades} - {actividad.estado}
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
            </Container>
          </form>
        </div>
      ) : (
        <div></div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir estudiantes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitFile(onSubmitFile)}>
            <Form.Group controlId="Archivo" className="mb-3">
              <Form.Label>Ingrese un archivo excel:</Form.Label>
              <Form.Control
                size="lg"
                type="file"
                {...registerFile("archivo", { required: true })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Añadir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
