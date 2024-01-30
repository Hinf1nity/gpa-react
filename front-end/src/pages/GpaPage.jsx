import { useParams } from "react-router-dom";
import { getUserGpa, getUser } from "../api/tasks.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GpaCard } from "../components/GpaCard";
import { HeaderPage } from "../components/HeaderPage";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

export function GpaPage() {
  const { carnet } = useParams();
  const [puntos, setPuntos] = useState([]);
  const [nombreEstudiante, setNombreEstudiante] = useState("");
  const toNavigate = useNavigate();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await getUserGpa(carnet);
        setPuntos(response.data);
        const res = await getUser(carnet);
        setNombreEstudiante(res.data[0].nombre + " " + res.data[0].apellido);
      } catch (error) {
        toast.error("Estudiante no encontrado");
        toNavigate("/");
        console.log("Error al obtener el estudiante");
      }
    }
    fetchStudent();
  }, [carnet, toNavigate]);

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
              <Nav.Link href="/">Inicio</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1 className="ml-4">{nombreEstudiante}</h1>
            <h2 className="ml-4">Consulta de puntos GPA</h2>
            <GpaCard puntos={puntos} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
