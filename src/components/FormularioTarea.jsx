import { Form, Button } from "react-bootstrap";
import ListaTareas from "./ListaTareas";
// import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { crearTarea,  } from "../helpers/queries";
import Swal from "sweetalert2";


// Use effect ciclo de vida componentes

const FormularioTarea = () => {
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
      } else {
        Swal.fire(
          "Ocurrio un error!",
          `El producto ${nuevaTarea.tarea} no pudo ser creado`,
          "error"
        );
      }
    });
    // then implica lo siguiente: yo ejecutare una funcion, una vez que se ejecute iniciar sesion, espera que se ejecute y entonces, realiza lo siguiente
    // respuesta es una variable inventada que va a contener el return de "inciarSesion"

    reset();
  };

  //* Zona de variables
  // Creacion de la variable localStorage, que contiene nuestro array de lstaTareas
  // const tareasDelLocalStorage = JSON.parse(localStorage.getItem("listaTareas")) || [];
  // const [tarea, setTarea] = useState("");
  // // Array de tareas
  // const [tareas, setTareas] = useState(tareasDelLocalStorage);


  //*Zona ciclo de vida
  // El primer parametro es una funcion anonima
  // El nombrar "useEffect" hace que se ejecute en montaje/actualizacion
  // useEffect(()=>{
  //   // Cuando el comopoennte se ha montado, actualiza el local storage
  //   localStorage.setItem("listaTareas", JSON.stringify(tareas))
  //   console.log("Aqui deberia guardar en local storage");

  // },[tareas])
  // Al poner al final ",[tareas]" ignora la actualizacion del input, solo se fija en la actualizacion del array


  //* Zona de Funciones

  // const borrarTarea = (nombreTarea) => {
  //   // Filter es un metodo inmutable que modifica una copia del array
  //   // Filter lleva una funcion
  //   let copiaListaTareas = tareas.filter(
  //     (itemTarea) => itemTarea !== nombreTarea
  //   );
  //   // Ahora debo actualizar el state
  //   setTareas(copiaListaTareas);
  // };

  //* Zona componentes
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Form.Text className="text-danger">
            {errors.tarea?.message}
          </Form.Text>
        </Form.Group>
          <Button variant="primary" type="submit">
            Agregar
          </Button>
      </Form>
      {/* Usamos el mismo nombre del prop con el objeto a enviar */}
      {/* Lo de la izquierda es el prop, y lo de la derecha es el state */}
      <ListaTareas></ListaTareas>
      {/* Envio el prop de fucion */}
    </>
  );
};

export default FormularioTarea;
