import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getUser, getActivities } from "../api/tasks.api";
import { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";
import { ActivitiesCard } from "../components/ActivitiesCard";
import {
  Card,
  InputGroup,
  Button,
  Alert,
  Form,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";

export function EstudiantesPage() {
  const [nombre_completo, setNombreCompleto] = useState("");
  const [actividades, setActividades] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toNavigate = useNavigate();

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await getActivities();
        setActividades(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error al obtener las actividades");
      }
    }
    fetchActivities();
  }, []);

  const onSubmit = handleSubmit((data) => {
    try {
      if (nombre_completo.length == 0) {
        toast.error("Estudiante no encontrado");
        return;
      } else {
        const carnet = data.carnet;
        console.log(carnet);
        toNavigate(`/${carnet}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  });

  const handleInputChange = (carnet) => {
    console.log(carnet);
    getUser(carnet)
      .then((response) => {
        setNombreCompleto(
          response.data[0].nombre + " " + response.data[0].apellido
        );
        console.log(nombre_completo);
      })
      .catch((error) => {
        setNombreCompleto("");
        console.log(error);
      });
  };

  return (
    <div>
      <HeaderPage
        header1="Consultas Puntos GPA"
        paragraph="Bienvenido al Panel de Consultas para Verificar tus Puntos GPA"
      />
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Container>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Card className="py-4 align-items-center mt-3">
          <form onSubmit={onSubmit}>
            <h1 className="text-center mb-4">Ingrese su Carnet de Identidad</h1>
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                type="number"
                placeholder="Número de Carnet de Identidad"
                aria-label="Número de Carnet"
                {...register("carnet", { required: true })}
                onChange={(e) => {
                  if (e.target.value.length > 6 && e.target.value.length < 9) {
                    handleInputChange(e.target.value);
                  } else {
                    setNombreCompleto("");
                  }
                }}
              />
            </InputGroup>
            {errors.carnet && nombre_completo.length == 0 ? (
              <Alert variant="danger">This field is required</Alert>
            ) : (
              <div></div>
            )}
            {nombre_completo ? (
              <Alert variant="info">{nombre_completo}</Alert>
            ) : (
              <div></div>
            )}
            <Button type="submit" variant="btn btn-success" size="lg">
              Buscar
            </Button>
          </form>
        </Card>
        <ActivitiesCard actividades={actividades} />
      </Container>
    </div>
  );
}
