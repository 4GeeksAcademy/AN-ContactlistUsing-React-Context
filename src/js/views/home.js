import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { ContactCard } from "../component/contactcard";
import { Navbar } from "../component/navbar";

export const Home = () => {

  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllContacts();
  }, []);

  // Función para manejar el evento de eliminar todos los contactos
  const handleDeleteAllContacts = () => {
    if (window.confirm("Are you sure you want to delete all contacts?")) {
      actions.deleteAllContacts(); // Llamamos la acción para eliminar todos los contactos
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-5 px-5">
        <div className="d-flex justify-content-between align-items-center mt-5">
          <div className="text-center">
            <h1 className="grey-qo-regular">Contact List</h1>
          </div>
          {/* Botón para eliminar todos los contactos */}
          <button
            className="btn btn-danger"
            onClick={handleDeleteAllContacts}
            style={{
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Delete All Contacts
          </button>
        </div>
        <div>
          {store.contacts && store.contacts.map((contact) => {
            return (
              <ContactCard
                name={contact.name}
                key={contact.id}
                id={contact.id}
                address={contact.address}
                phone={contact.phone}
                email={contact.email}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
