import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';  

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "", 
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

    
  const handleCancel = () => {
    navigate('/');
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.editContact(id, formData);
        navigate("/"); 
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
                        defaultCountry="ES"
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
                <div className="d-flex justify-content-center mt-3">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancel</button>
                        </div>
            </form>
        </div>
    );
};
