import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
;
import "../../styles/index.css";
import { ContactCard } from "../component/contactcard";


export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllContacts()
	 }, [])

	return (
		
		
			<div className="container mx-5 px-5">
				<div className="text-center mt-5">
					<h1 className="grey-qo-regular">Contact list</h1>
				</div>
				<div>
					<>
						{store.contacts && store.contacts.map((contact) => {
							return (
								<ContactCard name={contact.name} key={contact.id} id={contact.id} address={contact.address} phone={contact.phone} email={contact.email} />
							)
						})}
					</>
				</div>
			</div>
		
	)
};