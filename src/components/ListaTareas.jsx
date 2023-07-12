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
  return (
    <ListGroup>
      {
        tareas.map((tarea) => (
          <ItemTarea
            key={tarea._id}
            tarea={tarea}
            setTareas={setTareas}
          ></ItemTarea>
        ))
      }
    </ListGroup>
  );
};

export default ListaTareas;
