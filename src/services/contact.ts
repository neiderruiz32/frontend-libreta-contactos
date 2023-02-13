import clienteAxios from "../config/axios";

export const loadContacts = async () => {
  return await clienteAxios
    .get("/contacts")
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const loadContact = async (id: number) => {
  return await clienteAxios
    .get(`/contacts/${id}`)

    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const createContact = async (datos: Object) => {
  return await clienteAxios
    .post("/contacts", datos)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const editContact = async (id: number, datos: Object) => {
  return await clienteAxios
    .put(`/contacts/${id}`, datos)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};

export const deleteContact = async (id: number) => {
  return await clienteAxios
    .delete(`/contacts/${id}`)
    .then((respuesta) => respuesta)
    .catch((error) => console.log(error));
};
