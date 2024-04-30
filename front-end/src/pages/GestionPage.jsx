import { useForm } from "react-hook-form";
import {
  postActivity,
  getActivities,
  updateActivity,
  postStudents,
} from "../api/tasks.api";
import { HeaderPage } from "../components/HeaderPage";
import { UseAuth } from "../context/UseAuth";
import { ActivitiesCreation } from "../components/ActivitiesCreation";
import { ActivitiesUpdate } from "../components/ActivitiesUpdate";
import toast from "react-hot-toast";
import { Button, Form, Container, Nav, Navbar, Modal } from "react-bootstrap";
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
      <Container>
        <h1>Bienvenido Ing. Fabio R. Diaz Palacios</h1>
        <h2>Asignar GPA</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ActivitiesCreation
            register={register}
            control={control}
            showInput={showInput}
            handleShowInput={handleShowInput}
          />
        </form>
      </Container>

      {actividades.length > 0 ? (
        <div>
          <hr />
          <form
            onSubmit={handleSubmitUpdate(onSubmitUpdate)}
            encType="multipart/form-data"
          >
            <Container>
              <h2>Edicion de eventos</h2>
              <ActivitiesUpdate
                registerUpdate={registerUpdate}
                controlUpdate={controlUpdate}
                handleShowInputUpdate={handleShowInputUpdate}
                showInputUpdate={showInputUpdate}
                actividades={actividades}
              />
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
