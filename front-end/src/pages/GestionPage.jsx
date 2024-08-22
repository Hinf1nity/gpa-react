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
import { LicenciasGestion } from "../components/LicenciasGestion";
import toast from "react-hot-toast";
import {
  Button,
  Form,
  Container,
  Nav,
  Navbar,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useEffect, useState } from "react";

export function GestionPage() {
  const { logout } = UseAuth();
  const [actividades, setActividades] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showInputUpdate, setShowInputUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tabKey, setTabKey] = useState("");

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
        //response.data.filter((actividad) => actividad.estado !== "Finalizada")
        response.data
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const currentTab = localStorage.getItem("currentTab");
    if (currentTab) {
      console.log("currentTab", currentTab);
      setTabKey(currentTab);
      console.log("tabKey", tabKey);
    } else {
      localStorage.setItem("currentTab", "gpa");
      setTabKey("gpa");
    }
    fetchActivities();
  }, [tabKey]);

  const onSubmit = async (data) => {
    try {
      await postActivity(data);
      toast.success("Actividad posteada");
      fetchActivities();
      handleShowInput("Proximamente");
      reset();
    } catch (error) {
      if (error.response.data.carnets) {
        toast.error(
          `Error al guardar puntos, carnet: ${error.response.data.carnets}`
        );
      } else {
        toast.error("Error al postear la actividad");
      }
      console.log("Error al postear la actividad");
    }
  };

  const onSubmitUpdate = async (data) => {
    try {
      await updateActivity(data.id, data);
      toast.success("Actividad actualizada");
      fetchActivities();
      handleShowInput("Proximamente");
      resetUpdate();
    } catch (error) {
      toast.error("Error al actualizar la actividad");
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
      toast.error("Error al añadir estudiantes");
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
              <Nav.Link href="/cidimec/gpa-imt/">Inicio</Nav.Link>
            </Nav>
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
        <Tabs
          activeKey={tabKey}
          id="uncontrolled-tab-example"
          onSelect={(k) => {
            localStorage.setItem("currentTab", k);
            setTabKey(k);
          }}
        >
          <Tab eventKey="gpa" title="Asignar GPA">
            <br />
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <ActivitiesCreation
                register={register}
                control={control}
                showInput={showInput}
                handleShowInput={handleShowInput}
              />
            </form>
            {actividades.length > 0 ? (
              <div>
                <hr />
                <form
                  onSubmit={handleSubmitUpdate(onSubmitUpdate)}
                  encType="multipart/form-data"
                >
                  <h2>Edicion de eventos</h2>
                  <ActivitiesUpdate
                    registerUpdate={registerUpdate}
                    controlUpdate={controlUpdate}
                    handleShowInputUpdate={handleShowInputUpdate}
                    showInputUpdate={showInputUpdate}
                    actividades={actividades}
                  />
                </form>
              </div>
            ) : (
              <div></div>
            )}
          </Tab>
          <Tab eventKey="licencias" title="Licencias">
            <LicenciasGestion />
          </Tab>
        </Tabs>
      </Container>

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
