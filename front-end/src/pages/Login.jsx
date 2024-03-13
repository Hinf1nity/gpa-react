// src/components/Login.js
import { handleLogin } from "../api/tasks.api.js";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { HeaderPage } from "../components/HeaderPage.jsx";
import { UseAuth } from "../context/UseAuth";
import toast from "react-hot-toast";
import {
  Card,
  InputGroup,
  Button,
  Form,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";

export const Login = () => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
    reset,
  } = useForm();

  const { login } = UseAuth();
  const [, setCookie] = useCookies(["csrftoken"]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const accessToken = await handleLogin(data.username, data.password);
      if (accessToken != null) {
        setCookie("csrftoken", accessToken, {
          path: "/cidimec/gpa-imt/",
          expires: new Date(Date.now() + 86400000),
          secure: true,
        });
        reset();
        login(); // Llama a la función de callback para indicar que el usuario ha iniciado sesión
        toast.success("Inicio de sesión exitoso");
      } else {
        toast.error("Usuario o contraseña incorrectos");
        console.log("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error.message);
    }
  });

  return (
    <div>
      <HeaderPage
        header1="Gestión de Puntos GPA"
        paragraph="Bienvenido al Panel para la Gestión de Puntos GPA"
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
        <Card className="py-4 align-items-center mt-3">
          <h1 className="text-center mb-4">Iniciar Sesión</h1>
          <form onSubmit={onSubmit}>
            <InputGroup className="mb-3" size="lg">
              <InputGroup.Text id="Usuario">Usuario:</InputGroup.Text>
              <Form.Control
                type="text"
                aria-describedby="Usuario"
                {...register("username", { required: true })}
              />
            </InputGroup>
            <InputGroup className="mb-3" size="lg">
              <InputGroup.Text id="Contrasena">Contraseña:</InputGroup.Text>
              <Form.Control
                type="password"
                aria-describedby="Contrasena"
                {...register("password", { required: true })}
              />
            </InputGroup>
            <Button variant="primary" size="lg" type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};
