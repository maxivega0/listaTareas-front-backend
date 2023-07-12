/* eslint-disable react/prop-types */
import { Button, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { eliminarTarea, obtenerListaTareas } from "../helpers/queries";

const ItemTarea = ({ tarea, setTareas }) => {
  const handleEliminarTarea = () => {
    Swal.fire({
      title: "Esta seguro de borrar la siguiente tarea?",
      text: "El siguiente cambio no podra ser revertido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero borrar!",
      cancelButtonText: "Cancelar",
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        eliminarTarea(tarea._id).then((respuesta) => {
          if (respuesta.status === 200) {
            // eliminarProducto();
            //pedir la lista de productos a mi backend
            obtenerListaTareas().then((respuesta) => {
              if (respuesta) {
                setTareas(respuesta);
              } else {
                Swal.fire(
                  "Error",
                  "Intente realizar esta operacion en unos minutos",
                  "error"
                );
              }
            });
            Swal.fire("Borrado!", "El producto fue borrado.", "success");
          } else {
            Swal.fire({
              title: "Lo siento!",
              text: "El producto no pudo ser eliminado.",
              icon: "error",
              confirmButtonColor: "#fa8072",
            });
          }
        });
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {tarea.tarea}
      {/* Como "borrarTarea" lleva parametros, no puedo escribirla de manera "limpia" sin parametros, para que una funcion anonima lleve argumentos tengo que llamar otra funcion */}
      <Button variant="danger" onClick={() => handleEliminarTarea()}>
        Borrar
      </Button>
    </ListGroup.Item>
  );
};

export default ItemTarea;