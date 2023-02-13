import clienteAxios from "../config/axios";

export const cargarContactos = async () => {
  return await clienteAxios
    .get("/contact-book")
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const cargarContacto = async (id: number) => {
  return await clienteAxios
    .get(`/contact-book/${id}`)

    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const crearContacto = async (datos: Object) => {
  return await clienteAxios
    .post("/contact-book", datos)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const editarContacto = async (id: number, datos: Object) => {
  return await clienteAxios
    .put(`/contact-book/${id}`, datos)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const deleteContact = async (id: number) => {
  return await clienteAxios
    .delete(`/contact-book/${id}`)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};
