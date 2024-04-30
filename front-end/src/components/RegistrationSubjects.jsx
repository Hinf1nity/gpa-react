import PropTypes from "prop-types";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { getMaterias } from "../api/tasks.api";

export const RegistrationSubjects = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materia",
  });
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    async function fetchMaterias() {
      try {
        const response = await getMaterias();
        setMaterias(response.data);
        append({ materia: "", fecha: "" });
      } catch (error) {
        console.error("Error al obtener las materias");
      }
    }
    fetchMaterias();
  }, [append]);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Materia</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td>{index + 1}</td>
              <td>
                <Form.Select
                  aria-label="Subjects select"
                  {...register(`materia[${index}].materia`)}
                >
                  <option>Seleccione una materia</option>
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
              <td>
                <Form.Group controlId={`fecha[${index}]`}>
                  <Form.Control
                    type="date"
                    {...register(`materia[${index}].fecha`)}
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
};
