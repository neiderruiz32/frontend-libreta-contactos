import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import {
  createContact,
  editContact,
  loadContact as load,
} from "../services/contact";

const NewContact = () => {
  const params = useParams();
  const navigate = useNavigate();

  // State de contactos
  const [contact, saveContact] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    celular: "",
    direccion: "",
  });

  // State para edit
  const [edit, setEdit] = useState(false);

  // Lee los datos del form
  const updateState = (e: React.ChangeEvent<HTMLInputElement>): void => {
    saveContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  // Cargar el contact a editar
  const loadContact = async (id: number) => {
    const contact = await load(id);
    saveContact(contact.data);
    setEdit(true);
  };

  useEffect(() => {
    if (params.id) {
      loadContact(params.id);
    }
  }, [params.id]);

  // Enviar un contact a la API
  const createOrEditContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (edit) {
      await editContact(params.id, contact);

      // Redireccionar
      navigate("/");
    } else {
      await createContact(contact);

      // Redireccionar
      navigate("/");
    }
  };

  return (
    <>
      <h1 className="my-5">{edit ? "Editar contacto" : "Agregar contacto"}</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase py-2 px-5
                        font-weight-bold"
            >
              Volver
            </Link>
          </div>
          <div className="col-md-8 mx-auto">
            <form
              onSubmit={createOrEditContact}
              className="bg-white p-5 bordered"
            >
              <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombres"
                  name="nombres"
                  placeholder="Nombres"
                  value={contact.nombres}
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="apellidos"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={contact.apellidos}
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="correo">Correo</label>
                <input
                  type="tex"
                  className="form-control form-control-lg"
                  id="correo"
                  name="correo"
                  placeholder="Correo"
                  value={contact.correo}
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono fijo</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  value={contact.telefono}
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="celular">Celular</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="celular"
                  name="celular"
                  placeholder="Celular"
                  value={contact.celular}
                  onChange={updateState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="direccion">Dirección</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="direccion"
                  name="direccion"
                  placeholder="Dirección"
                  value={contact.direccion}
                  onChange={updateState}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
              >
                {edit ? "Editar" : "Agregar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewContact;
