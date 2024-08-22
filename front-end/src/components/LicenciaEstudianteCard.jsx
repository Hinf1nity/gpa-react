import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Collapse,
} from "react-bootstrap";
import { ApelarCamp } from "./ApelarCamp";
import { getLicenciasEstudiante } from "../api/tasks.api";

export function LicenciaEstudianteCard({ carnet }) {
  const [licencias, setLicencias] = useState([]);
  const [animationApelar, setAnimationApelar] = useState([]);
  const sortedLicencias = licencias.sort(
    (a, b) => a.id_solicitud - b.id_solicitud
  );
  const renderTooltip = (licencia) => (
    <Tooltip id="button-tooltip">
      {licencia.materia.map((materia, index) => (
        <p key={index}>
          {materia.materia}/{materia.fecha}
        </p>
      ))}
    </Tooltip>
  );
  useEffect(() => {
    const fetchLicencias = async () => {
      try {
        const response = await getLicenciasEstudiante(carnet);
        setLicencias(response.data);
        response.data.forEach((element) => {
          setAnimationApelar((prevState) => ({
            ...prevState,
            [element.id]: false,
          }));
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchLicencias();
  }, [carnet]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="d-none d-md-table-cell">Materia</th>
          <th className="d-none d-md-table-cell">Fecha de la Solicitud</th>
          <th className="d-none d-md-table-cell">Estado</th>
          <th className="d-none d-md-table-cell">Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedLicencias.map((licencia) => (
          <React.Fragment key={licencia.id}>
            <tr>
              <td>
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(licencia)}
                >
                  <Button variant="primary">Materias</Button>
                </OverlayTrigger>
              </td>
              <td className="d-none d-md-table-cell">
                {licencia.fechaSolicitud}
              </td>
              <td
                className={`${
                  licencia.estado !== "Aceptado"
                    ? "text-danger"
                    : "text-success"
                } d-none d-md-table-cell`}
              >
                {licencia.estado === "Rechazado" && licencia.apelacion === 0 ? (
                  <div>
                    <p>Rechazado</p>
                    <Button
                      onClick={() => {
                        setAnimationApelar((prevState) => ({
                          ...prevState,
                          [licencia.id]: !prevState[licencia.id],
                        }));
                      }}
                      aria-controls={`collapse-text-${licencia.id}`}
                      aria-expanded={animationApelar[licencia.id]}
                      variant="danger"
                    >
                      Apelar
                    </Button>
                  </div>
                ) : (
                  licencia.estado
                )}
              </td>
              <td className="d-none d-md-table-cell">
                {licencia.observaciones}
              </td>
              <td className="d-table-cell d-md-none">
                <strong>Fecha de la Solicitud:</strong>{" "}
                {licencia.fechaSolicitud}
                <br />
                <strong>Estado:</strong>{" "}
                <span
                  className={
                    licencia.estado !== "Aceptado"
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {licencia.estado}
                </span>
                <br />
                <strong>Observaciones:</strong> {licencia.observaciones}
              </td>
            </tr>
            {licencia.estado === "Rechazado" &&
              licencia.apelacion === 0 &&
              animationApelar[licencia.id] && (
                <tr>
                  <td colSpan="4">
                    <Collapse in={animationApelar[licencia.id]}>
                      <div id={`collapse-text-${licencia.id}`}>
                        <ApelarCamp LicenciaId={licencia.id} />
                      </div>
                    </Collapse>
                  </td>
                </tr>
              )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}

LicenciaEstudianteCard.propTypes = {
  carnet: PropTypes.string.isRequired,
};
