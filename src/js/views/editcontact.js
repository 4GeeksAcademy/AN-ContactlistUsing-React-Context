import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  // Importar el estilo CSS de la librería

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "", // Este campo será para el número de teléfono
    });

    useEffect(() => {
        const contact = store.contacts.find(contact => contact.id === parseInt(id));
        if (contact) {
            setFormData(contact);
        }
    }, [id, store.contacts]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value, // Usamos PhoneInput para actualizar el número de teléfono
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.editContact(id, formData);
        navigate("/"); // Redirigir a la página principal después de guardar
    };

    return (
        <div className="container new-contact">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="new-contact-title name text-center mb-4">
                    <h2>Edit Contact</h2>
                </div>
                <div className="col-12 input">
                    <label htmlFor="inputEditName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputEditName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12 input">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-12 input">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone
                    </label>
                    <PhoneInput
                        international
                        defaultCountry="ES" // Puedes ajustar el país predeterminado aquí
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="form-control"
                    />
                </div>
                <div className="col-12 input">
                    <label htmlFor="inputAddress" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="container d-flex col-12 justify-content-center input">
                    <button type="submit" className="btn">Save Changes</button>
                </div>
            </form>
        </div>
    );
};