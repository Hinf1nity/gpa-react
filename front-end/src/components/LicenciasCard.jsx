import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Table, Button, Form, ButtonGroup } from "react-bootstrap";
import { updateLicencia } from "../api/tasks.api";

export function LicenciasCard({ licencias }) {
  const [additionalData] = useState({
    estado: "",
    observacion: "",
  });
  const [licenciaId, setLicenciaId] = useState(0);

  const { handleSubmit, reset } = useForm();

  const changeEstado = (e, identificador) => {
    additionalData.estado = e.target.value;
    setLicenciaId(identificador);
  };

  const changeObservacion = (e) => {
    additionalData.observacion = e.target.value;
  };

  const onSubmit = async (data) => {
    try {
      const formData = { ...data, ...additionalData };
      await updateLicencia(licenciaId, formData);
      toast.success("Licencia actualizada con éxito");
      localStorage.setItem("currentTab", "licencias");
      window.location.reload();
      reset();
    } catch (error) {
      console.log("Error al actualizar la licencia");
      console.error(error.message);
    }
  };

  return (
    <Table borderless responsive>
      <thead>
        <tr>
          <th className="d-none d-md-table-cell">Fecha solicitud</th>
          <th className="d-none d-md-table-cell">Estudiante</th>
          <th className="d-none d-md-table-cell">Justificación</th>
          <th className="d-none d-md-table-cell">Motivo</th>
          <th className="d-none d-md-table-cell">Descripción</th>
        </tr>
        <tr>
          <td colSpan={5}>
            <hr style={{ borderTop: "5px solid #000" }} />
          </td>
        </tr>
      </thead>
      <tbody>
        {licencias.map((licencia) => (
          <React.Fragment key={licencia.id}>
            <tr>
              <td className="d-none d-md-table-cell">
                {licencia.fechaSolicitud}
              </td>
              <td className="d-none d-md-table-cell">{licencia.estudiante}</td>
              <td className="d-none d-md-table-cell">
                <a
                  href={licencia.justificacion}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver PDF
                </a>
                {licencia.justificacion2 ? (
                  <a
                    href={licencia.justificacion2}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <br />
                    Ver PDF apelación
                  </a>
                ) : null}
              </td>
              <td className="d-none d-md-table-cell">{licencia.motivo}</td>
              <td
                className="d-none d-md-table-cell"
                style={{
                  maxWidth: "300px",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {licencia.descripcion}
                {licencia.comentario ? (
                  <div>
                    <strong>Comentario:</strong> {licencia.comentario}
                  </div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="d-none d-md-table-cell">Materia</th>
                      <th className="d-none d-md-table-cell">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licencia.materia.map((materia, index) => (
                      <tr key={index}>
                        <td className="d-none d-md-table-cell">
                          {materia.materia.split("-")[0]} - Paralelo{" "}
                          {materia.materia.split("-")[1]}
                        </td>
                        <td className="d-none d-md-table-cell">
                          {materia.fecha}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
              <td colSpan={2}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Label>
                    <strong>Observación:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={2}
                    onChange={changeObservacion}
                  />
                  <ButtonGroup>
                    <Button
                      type="submit"
                      variant="success"
                      value={"Aceptado"}
                      onClick={(e) => changeEstado(e, licencia.id)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      type="submit"
                      variant="danger"
                      value={"Rechazado"}
                      onClick={(e) => changeEstado(e, licencia.id)}
                    >
                      Rechazar
                    </Button>
                  </ButtonGroup>
                </form>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <hr style={{ borderTop: "5px solid #000" }} />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}

LicenciasCard.propTypes = {
  licencias: PropTypes.array.isRequired,
};
