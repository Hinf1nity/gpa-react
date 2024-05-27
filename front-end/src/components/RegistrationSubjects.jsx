import PropTypes from "prop-types";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { getMaterias } from "../api/tasks.api";

export const RegistrationSubjects = ({ register, control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materia",
  });
  const [materias, setMaterias] = useState([]);
  const [minDate] = useState(() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() - 20);
    return minDate.toISOString().split("T")[0];
  });

  useEffect(() => {
    async function fetchMaterias() {
      try {
        const response = await getMaterias();
        setMaterias(response.data);
        // Agrega un campo por defecto solo si el array está vacío
        if (fields.length === 0) {
          append({ materia: "", fecha: "" });
        }
      } catch (error) {
        console.error("Error al obtener las materias", error);
      }
    }
    fetchMaterias();
  }, [append, fields.length]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th className="d-none d-md-table-cell">Materia</th>
            <th className="d-none d-md-table-cell">Fecha</th>
            <th className="d-table-cell d-md-none">Materia y Fecha</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>{index + 1}</td>
              <td className="d-none d-md-table-cell">
                <Form.Select
                  aria-label="Subjects select"
                  {...register(`materia.${index}.materia`, { required: true })}
                  onChange={(e) =>
                    setValue(`materia.${index}.materia`, e.target.value)
                  }
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((materia) =>
                    Array.from({ length: materia.paralelo }).map(
                      (_, paraleloIndex) => (
                        <option
                          value={`${materia.materia}-${paraleloIndex + 1}`}
                          key={`${materia.id}-${paraleloIndex}`}
                        >
                          {materia.materia} - Paralelo {paraleloIndex + 1}
                        </option>
                      )
                    )
                  )}
                </Form.Select>
              </td>
              <td className="d-none d-md-table-cell">
                <Form.Group controlId={`fecha[${index}]`}>
                  <Form.Control
                    type="date"
                    min={minDate}
                    {...register(`materia.${index}.fecha`, { required: true })}
                    onChange={(e) =>
                      setValue(`materia.${index}.fecha`, e.target.value)
                    }
                  />
                </Form.Group>
              </td>
              <td className="d-table-cell d-md-none">
                <Form.Select
                  aria-label="Subjects select"
                  {...register(`materia.${index}.materia`, { required: true })}
                  onChange={(e) =>
                    setValue(`materia.${index}.materia`, e.target.value)
                  }
                >
                  <option value="">Seleccione una materia</option>
                  {materias.map((materia) =>
                    Array.from({ length: materia.paralelo }).map(
                      (_, paraleloIndex) => (
                        <option
                          value={`${materia.materia}-${paraleloIndex + 1}`}
                          key={`${materia.id}-${paraleloIndex}`}
                        >
                          {materia.materia} - Paralelo {paraleloIndex + 1}
                        </option>
                      )
                    )
                  )}
                </Form.Select>
                <Form.Group controlId={`fecha[${index}]`}>
                  <Form.Control
                    type="date"
                    min={minDate}
                    {...register(`materia.${index}.fecha`, { required: true })}
                    onChange={(e) =>
                      setValue(`materia.${index}.fecha`, e.target.value)
                    }
                  />
                </Form.Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ButtonGroup className="justify-content-right">
        <Button
          variant="success"
          onClick={() => append({ materia: "", fecha: "" })}
        >
          +
        </Button>
        <Button
          variant="danger"
          onClick={() => (fields.length > 1 ? remove(fields.length - 1) : null)}
        >
          -
        </Button>
      </ButtonGroup>
    </div>
  );
};

RegistrationSubjects.propTypes = {
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
};
