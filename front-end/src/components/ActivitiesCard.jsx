import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

export const ActividadesTabla = ({ actividades }) => {
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
          {actividades.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.actividades}</td>
              <td>{actividad.fecha}</td>
              <td>{actividad.puntos_ac}</td>
              <td
                className={
                  actividad.estado !== "Finalizado"
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

ActividadesTabla.propTypes = {
  actividades: PropTypes.array.isRequired,
};
