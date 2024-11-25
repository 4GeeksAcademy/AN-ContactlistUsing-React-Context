import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; 

export const Addcontact = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "", 
    });

    const [emailError, setEmailError] = useState(""); // Estado para errores de email
    const [phoneError, setPhoneError] = useState(""); // Estado para errores de teléfono

    // Expresión regular para validar el email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value, // Usamos PhoneInput para actualizar el número de teléfono
        });
    };

    // Función para validar el correo electrónico
    const validateEmail = (email) => {
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return false;
        }
        setEmailError(""); // Si el email es válido, limpiar el error
        return true;
    };

    // Función para validar el teléfono
    const validatePhone = (phone) => {
        if (!phone || !isValidPhoneNumber(phone)) {
            setPhoneError("Please enter a valid phone number.");
            return false;
        }
        setPhoneError(""); // Si el teléfono es válido, limpiar el error
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validamos el correo y el teléfono antes de proceder
        if (!validateEmail(formData.email) || !validatePhone(formData.phone)) {
            return; // No enviamos el formulario si hay errores de validación
        }

        actions.addNewContact(formData); // Llamar la acción para agregar el nuevo contacto
        actions.getAllContacts(); // Obtener la lista de contactos actualizada
        navigate("/"); // Redirigir a la página principal después de agregar el contacto
    };

    // Verificar si todos los campos están llenos y son válidos
    const isFormValid = () => {
        return formData.name && formData.email && formData.phone && formData.address && !emailError && !phoneError;
    };

    useEffect(() => {
        actions.getAllContacts(); // Obtener todos los contactos cuando el componente se monta
    }, []);

    return (
            <div className="container new-contact">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="new-contact-title name text-center mb-4">
                        <h2>Add New Contact</h2>
                    </div>
                    <div className="col-12 input">
                        <label htmlFor="inputFullName" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputFullName"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            id="inputEmail4"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={() => validateEmail(formData.email)} // Validar cuando el campo pierde foco
                            required
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
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
                            className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                            onBlur={() => validatePhone(formData.phone)} // Validar cuando el campo pierde foco
                            required
                        />
                        {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                    </div>
                    <div className="col-12 input">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Apartment, studio, or floor"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="container d-flex col-12 justify-content-center input">
                        {/* Botón de guardar con estilo */}
                        <button 
                            type="submit" 
                            className={`btn ${isFormValid() ? 'btn-primary' : 'btn-secondary'}`} 
                            disabled={!isFormValid()}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                transition: 'background-color 0.3s ease, transform 0.2s',
                                cursor: isFormValid() ? 'pointer' : 'not-allowed',
                                opacity: isFormValid() ? 1 : 0.6,
                            }}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
    );
};
