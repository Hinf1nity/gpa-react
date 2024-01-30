import { Table } from "react-bootstrap";
import PropTypes from "prop-types";

export function GpaCard({ puntos }) {
  const totalPoints = puntos.reduce(
    (total, punto) => total + punto.puntos_gpa,
    0
  );
  return (
    <Table>
      <thead>
        <tr>
          <th>Actividad</th>
          <th>Fecha de la Actividad</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {puntos.map((punto, index) => (
          <tr key={index}>
            <td>{punto.actividad}</td>
            <td>{punto.fecha}</td>
            <td>{punto.puntos_gpa}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="2">Total de puntos</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </Table>
  );
}

GpaCard.propTypes = {
  puntos: PropTypes.array.isRequired,
};
