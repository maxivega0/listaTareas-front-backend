/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { obtenerListaTareas } from "../helpers/queries";
import ItemTarea from "./ItemTarea";

const ListaTareas = ({ cargar, setCargar }) => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    //consultar a la api y guardar la respuesta en el state
    obtenerListaTareas().then((respuesta) => {
      //todo: preguntar si la respuesta tiene
      if (respuesta) {
        setTareas(respuesta);
        setCargar(false);
      } else {
        Swal.fire(
          "Error",
          "Intente realizar esta operación en unos minutos",
          "error"
        );
      }
    });
  }, [cargar]);

  // Envio nuevamente el prop al siguiente hijo itemtarea
  return (
    <ListGroup>
      {
        // Usamos el "map" xq crea un metodo en el array que es inmutable, como el prop
        // tarea para indicar los elementos de nuestro array tareas
        tareas.map((tarea) => (
          <ItemTarea
            key={tarea._id}
            tarea={tarea}
            setTareas={setTareas}
          ></ItemTarea>
        ))
        // segundo argumento del map, es el indice del array
      }
    </ListGroup>
  );
};

export default ListaTareas;
