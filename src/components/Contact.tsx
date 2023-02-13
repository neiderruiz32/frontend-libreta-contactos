import editSvg from "../assets/edit.svg";
import deleteSvg from "../assets/delete.svg";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { loadContacts, deleteContact } from "../services/contact";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  // Cargar todos los contactos
  const load = async () => {
    const contacts = await loadContacts();

    setContacts(contacts.data);
  };

  useEffect(() => {
    load();
  }, []);

  const navigate = useNavigate();

  // Eliminar un registro
  const deleteContactAlert = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Un contacto eliminada no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Alerta de eliminado
        Swal.fire("¡Eliminado!", "Tu registro ha sido eliminado.", "success");

        // Eliminado de la bd
        deleteContact(id);
        setContacts(contacts.filter((contact) => contact.id !== id));
      }
    });
  };

  return (
    <>
      <h1 className="my-5">Libreta de contactos</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/new"}
              className="btn btn-success text-uppercase py-2 px-5
                        font-weight-bold"
            >
              Crear contacto
            </Link>
          </div>
          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {contacts.map((contact) => (
                <div
                  className="d-flex w-100 justify-content-between p-5 list-group-item list-group-item-action 
                                flex-column align-items-start"
                  key={contact.id}
                >
                  <h3 className="mb-3">
                    Nombre: {contact.nombres} {contact.apellidos}
                  </h3>
                  <h3 className="mb-3">Correo: {contact.correo}</h3>
                  <h3 className="mb-3">Teléfono fijo: {contact.telefono}</h3>
                  <h3 className="mb-3">Celular: {contact.celular}</h3>
                  <h3 className="mb-3">Direccion: {contact.direccion}</h3>
                  <div style={{ width: "100%" }}>
                    <button
                      type="button"
                      style={{ display: "inline-block", margin: "5px" }}
                      className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger row"
                      onClick={() => deleteContactAlert(contact.id)}
                    >
                      <img src={deleteSvg} width={20} height={20} />
                    </button>
                    <button
                      type="button"
                      style={{ display: "inline-block", margin: "5px" }}
                      className="text-uppercase py-2 px-5 font-weight-bold btn btn-info row"
                      onClick={() => navigate(`/contact/${contact.id}/edit`)}
                    >
                      <img src={editSvg} width={20} height={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
