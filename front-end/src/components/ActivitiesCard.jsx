import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

export const ActivitiesCard = ({ actividades }) => {
  // Sort the activities based on their dates
  const sortedActividades = actividades.sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <div className="py-4 mt-3">
      <h2>Actividades para Obtener Puntos GPA</h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">Actividad</th>
              <th className="d-none d-md-table-cell">Fecha de la Actividad</th>
              <th className="d-none d-md-table-cell">Puntos</th>
              <th className="d-none d-md-table-cell">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedActividades.map((actividad, index) => (
              <tr key={index}>
                <td className="d-none d-md-table-cell">
                  {actividad.actividades}
                </td>
                <td className="d-none d-md-table-cell">{actividad.fecha}</td>
                <td className="d-none d-md-table-cell">
                  {actividad.puntos_ac}
                </td>
                <td
                  className={`${
                    actividad.estado !== "Finalizada"
                      ? "text-success"
                      : "text-danger"
                  } d-none d-md-table-cell`}
                >
                  {actividad.estado}
                </td>
                <td className="d-table-cell d-md-none">
                  <strong>Actividad:</strong> {actividad.actividades}
                  <br />
                  <strong>Fecha:</strong> {actividad.fecha}
                  <br />
                  <strong>Puntos:</strong> {actividad.puntos_ac}
                  <br />
                  <strong>Estado:</strong>{" "}
                  <span
                    className={
                      actividad.estado !== "Finalizada"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {actividad.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

ActivitiesCard.propTypes = {
  actividades: PropTypes.array.isRequired,
};
