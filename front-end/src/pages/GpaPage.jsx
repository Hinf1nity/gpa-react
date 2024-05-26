import { useParams } from "react-router-dom";
import { getUserGpa, getUser, updateUserMail } from "../api/tasks.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GpaCard } from "../components/GpaCard";
import { LicenciaEstudianteCard } from "../components/LicenciaEstudianteCard";
import { HeaderPage } from "../components/HeaderPage";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Tab,
  Tabs,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useForm } from "react-hook-form";

export function GpaPage() {
  const { carnet } = useParams();
  const [puntos, setPuntos] = useState([]);
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const [mailEstudiante, setMailEstudiante] = useState("");
  const [showModal, setShowModal] = useState(false);
  const toNavigate = useNavigate();

  const { register: registerMail, handleSubmit: handleSubmitMail } = useForm();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await getUserGpa(carnet);
        setPuntos(response.data);
        const res = await getUser(carnet);
        setNombreEstudiante(res.data[0].nombre);
        setMailEstudiante(res.data[0].email);
      } catch (error) {
        toast.error("Estudiante no encontrado");
        toNavigate("/cidimec/gpa-imt/");
      }
    }
    fetchStudent();
  }, [carnet, toNavigate]);

  const checkMail = () => {
    if (mailEstudiante === "") {
      setShowModal(true);
    } else {
      toNavigate(`/cidimec/gpa-imt/registrar_licencia/${carnet}`);
    }
  };

  const onSubmitMail = async (data) => {
    try {
      await updateUserMail(carnet, data);
      setShowModal(false);
      toNavigate(`/cidimec/gpa-imt/registrar_licencia/${carnet}`);
    } catch (error) {
      console.log("Error al actualizar el correo");
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <HeaderPage
        header1="Consultas Puntos GPA"
        paragraph="Bienvenido al Panel de Consultas para Verificar tus Puntos GPA"
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
        <Row className="justify-content-center">
          <h1 className="ml-4">{nombreEstudiante}</h1>
          <Tabs defaultActiveKey="puntos" id="uncontrolled-tab-example">
            <Tab eventKey="puntos" title="Puntos GPA">
              <br />
              <h2 className="ml-4">Consulta de puntos GPA</h2>
              <GpaCard puntos={puntos} />
            </Tab>
            <Tab eventKey="licencias" title="Licencias">
              <br />
              <Row>
                <Col>
                  <h2 className="ml-4">Consulta de licencias</h2>
                </Col>
                <Col md={{ span: 2, offset: 2 }}>
                  <Button
                    variant="primary"
                    className="justify-content-end"
                    onClick={checkMail}
                  >
                    Registrar nueva licencia
                  </Button>
                </Col>
              </Row>
              <br className="d-md-none" />
              <LicenciaEstudianteCard carnet={carnet} />
            </Tab>
          </Tabs>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir estudiantes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitMail(onSubmitMail)}>
            <Form.Group controlId="mail" className="mb-3">
              <Form.Label>Ingrese su correo institucional:</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="example@ucb.edu.bo"
                {...registerMail("mail", { required: true })}
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
