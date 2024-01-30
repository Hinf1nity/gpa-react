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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Fecha de la Actividad</th>
            <th>Puntos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {sortedActividades.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.actividades}</td>
              <td>{actividad.fecha}</td>
              <td>{actividad.puntos_ac}</td>
              <td
                className={
                  actividad.estado !== "Finalizada"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {actividad.estado}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

ActivitiesCard.propTypes = {
  actividades: PropTypes.array.isRequired,
};
