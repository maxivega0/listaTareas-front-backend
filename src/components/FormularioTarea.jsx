import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { crearTarea } from "../helpers/queries";
import Swal from "sweetalert2";


const FormularioTarea = () => {
  const [cargar, setCargar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (nuevaTarea) => {
    console.log(nuevaTarea);
    crearTarea(nuevaTarea).then((respuesta) => {
      if (respuesta.status === 201) {
        Swal.fire(
          "Producto creado correctamente!",
          `El producto ${nuevaTarea.tarea} fue creado correctamente`,
          "success"
        );
        reset();
        setCargar(true);
      } else {
        Swal.fire(
          "Ocurrio un error!",
          `El producto ${nuevaTarea.tarea} no pudo ser creado`,
          "error"
        );
      }
    });
    reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="row">
        <Form.Group className="mb-3" controlId="formTarea">
          <Form.Label>Tarea*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: alguna descripcion"
            {...register("tarea", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 150,
                message: "La cantidad maxima de caracteres es de 150 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.tarea?.message}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className=" mb-4">
          Agregar
        </Button>
      </Form>
      <ListaTareas cargar={cargar} setCargar={setCargar}></ListaTareas>
    </>
  );
};

export default FormularioTarea;
