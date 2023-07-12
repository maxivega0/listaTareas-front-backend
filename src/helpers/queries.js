const URL_tareas = import.meta.env.VITE_API_TAREA

export const crearTarea = async (tarea) => {
    try {
      // Una peticion post necesita un 2do argumento, sera el metodo que elegí
      const respuesta = await fetch(URL_tareas, {
        method: "POST",
        headers: {
          // Lineas en formato JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarea),
      });
      return respuesta; // el status de la respuesta es 201
    } catch (error) {
      console.log(error);
    }
  };

  export const obtenerListaTareas = async () => {
    try {
      // Cuando vea que en una peticion fetch hay un solo argumento, es xq es una peticion GET
      const respuesta = await fetch(URL_tareas);
      // console.log(respuesta);
      const listaTareas = await respuesta.json();
      return listaTareas;
    }catch (error) {
      console.log(error)
    }
  }

  export const eliminarTarea = async (id) => {
    try {
      // Una peticion post necesita un 2do argumento, sera el metodo que elegí
      const respuesta = await fetch(URL_tareas + "/" + id, {
        method: "DELETE",
      });
      return respuesta; // el status de la respuesta es 200
    } catch (error) {
      console.log(error);
    }
  };
  