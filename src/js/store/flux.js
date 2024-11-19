const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		contacts: []
	  },
	  actions: {
		// Obtener todos los contactos
		getAllContacts: () => {
		  fetch("https://playground.4geeks.com/contact/agendas/nico/contacts")
			.then((response) => response.json())
			.then((data) => {
			  console.log("Data:", data);
			  setStore({ contacts: data.contacts });
			})
			.catch((error) => {
			  console.log("Error:", error);
			  alert(`Hubo un problema al cargar los contactos: ${error.message}`);
			});
		},
  
		// Agregar un nuevo contacto
		addNewContact: (data) => {
		  return fetch("https://playground.4geeks.com/contact/agendas/nico/contacts", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		  })
			.then((response) => {
			  if (!response.ok) {
				throw new Error(`Error al agregar el contacto. Status: ${response.status}`);
			  }
			  return response.json();
			})
			.then((data) => {
			  console.log("Contacto creado:", data);
			  getActions().getAllContacts(); // Actualiza la lista de contactos
			})
			.catch((error) => {
			  console.error("Error:", error);
			  alert(`Hubo un problema al agregar el contacto: ${error.message}`);
			});
		},
  
		// Eliminar un contacto
		deleteContact: (id) => {
		  const updatedContacts = getStore().contacts.filter(
			(contact) => contact.id !== id
		  );
  
		  return fetch(`https://playground.4geeks.com/contact/agendas/nico/contacts/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		  })
			.then((response) => {
			  if (!response.ok) {
				throw new Error(`Error al eliminar el contacto. Status: ${response.status}`);
			  }
			  console.log("Contacto borrado con éxito");
			  setStore({ contacts: updatedContacts });
			  getActions().getAllContacts(); // Vuelve a cargar los contactos actualizados
			})
			.catch((error) => {
			  console.error("Error:", error);
			  alert(`Hubo un problema al eliminar el contacto: ${error.message}`);
			});
		},
  
		editContact: async (id, updatedData) => {
			if (!id) {
				throw new Error("ID is missing, cannot edit contact.");
			}
		
			try {
				const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/nico/contacts/${id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedData),
					}
				);
		
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						`Error al editar el contacto. Status: ${response.status}, Detalles: ${JSON.stringify(
							errorData
						)}`
					);
				}
		
				console.log("Contacto editado con éxito");
				await getActions().getAllContacts();  // Actualizar la lista después de editar
		
			} catch (error) {
				console.error("Error:", error.message);
				alert(`Hubo un problema al editar el contacto: ${error.message}`);
			}
		},
		
	  },
	};
  };
  
  export default getState;
  