import { useEffect, useState } from "react";
import { getLicenciasDocentes } from "../api/tasks.api";
import { HeaderPage } from "../components/HeaderPage";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  InputGroup,
} from "react-bootstrap";

export function DocentesPage() {
  const [licencias, setLicencias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLicencias, setFilteredLicencias] = useState(licencias);

  useEffect(() => {
    async function fetchLicencias() {
      try {
        const response = await getLicenciasDocentes();
        setLicencias(response.data);
        setFilteredLicencias(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLicencias();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    console.log(value);

    if (value === "") {
      console.log("entro");
      setFilteredLicencias(licencias);
    } else {
      const filtered = licencias
        .map((licencia) => ({
          ...licencia,
          materia: licencia.materia.filter((materia) =>
            materia.materia.toLowerCase().includes(value)
          ),
        }))
        .filter((licencia) => licencia.materia.length > 0);

      setFilteredLicencias(filtered);
    }
  };

  const groupByEstudiante = (licencias) => {
    return licencias.reduce((acc, licencia) => {
      if (!acc[licencia.estudiante]) {
        acc[licencia.estudiante] = [];
      }
      acc[licencia.estudiante].push(licencia);
      return acc;
    }, {});
  };

  const groupedLicencias = groupByEstudiante(filteredLicencias);

  return (
    <div>
      <HeaderPage
        header1="Consultas Licencias para Docentes"
        paragraph="Bienvenido al Panel de Consultas para Verificar las Licencias"
      />
      <Container>
        <h1>DocentesPage</h1>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Buscar materia..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </InputGroup>
            <Accordion>
              {Object.keys(groupedLicencias).map((estudiante, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>{estudiante}</Accordion.Header>
                  <Accordion.Body>
                    {groupedLicencias[estudiante].map(
                      (licencia, estudianteIndex) => (
                        <div key={licencia.id}>
                          {licencia.materia.map((materia, materiaIndex) => (
                            <Row key={materiaIndex}>
                              <Col>
                                <strong>Materia:</strong>{" "}
                                {materia.materia.split("-")[0]}
                                <br />
                                <strong>Paralelo:</strong>{" "}
                                {materia.materia.split("-")[1]}
                                <br />
                              </Col>
                              <Col>
                                <strong>Fecha del permiso:</strong>{" "}
                                {materia.fecha}
                                <br />
                                <strong>Fecha de la Solicitud:</strong>{" "}
                                {licencia.fechaSolicitud}
                              </Col>
                              {materiaIndex < licencia.materia.length - 1 && (
                                <hr />
                              )}
                            </Row>
                          ))}
                          {estudianteIndex <
                            groupedLicencias[estudiante].length - 1 && <hr />}
                        </div>
                      )
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
