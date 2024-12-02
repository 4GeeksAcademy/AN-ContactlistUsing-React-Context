import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { ContactCard } from "../component/contactcard";
import { Navbar } from "../component/navbar";
import Swal from "sweetalert2";

export const Home = () => {

  const { store, actions } = useContext(Context);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    actions.getAllContacts();
  }, []);

  // Función para manejar el evento de eliminar todos los contactos
  const handleDeleteAllContacts = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará todos los contactos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar todos',
    }).then((result)=>{
      if(result.isConfirmed){
        setIsDeleting(true);

        setTimeout(()=>{
         actions.deleteAllContacts();
         setIsDeleting(false);
         setDeleted(true); 
        }, 2000);
      }
    })
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
              transition: 'all 0.3s ease', // Transición suave
            }}
            disabled={isDeleting || store.contacts.length === 0 } // Desabilitaremos en caso que no haya contactos
          >
            {isDeleting?(
              <span>Borrando...</span>
            ) : deleted ? (
              <span>No hay contactos</span>
            ) : (
              <span>{store.contacts.length === 0 ? 'No hay contactos que eliminar' : 'Eliminar todos los contactos'}</span>
            )}
          </button>
        </div>
        
        <div>
          {store.contacts && store.contacts.length > 0 ? ( 
            store.contacts.map((contact) => {
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
          })
        ) : (
          <p className="text-center mt-4">No hay contactos disponibles.</p>
        )}
        </div>
      </div>
    </div>
  );
};
