const URL_tareas = import.meta.env.VITE_API_TAREA
// direccion api: VITE_API_TAREA=http://localhost:4005/apitareas/tareas 

export const crearTarea = async (tarea) => {
    try {
      const respuesta = await fetch(URL_tareas, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarea),
      });
      return respuesta; 
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerListaTareas = async () => {
    try {
      const respuesta = await fetch(URL_tareas);
      const listaTareas = await respuesta.json();
      return listaTareas;
    }catch (error) {
      console.log(error)
    }
  }

  export const eliminarTarea = async (id) => {
    try {
      const respuesta = await fetch(URL_tareas + "/" + id, {
        method: "DELETE",
      });
      return respuesta;
    } catch (error) {
      console.log(error);
    }
  };
  