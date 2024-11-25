import React, { useContext, useEffect } from "react";
import { Context } from "./../store/appContext";
import { Link } from "react-router-dom";

export const ContactCard = ({ name, address, phone, email, id, image }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllContacts();
    }, []);

    // Imagen predeterminada si no se proporciona una imagen
    const defaultImage = "https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/840_560.jpeg";  

    return (
        <div className="container contact-card my-3">
            <div className="row">
                {/* Imagen del contacto */}
                <div className="col-12 col-md-3 d-flex justify-content-center">
                    <img 
                        src={image || defaultImage}  
                        alt={`${name}'s avatar`}
                        className="img-fluid rounded-circle"  // img-fluid para que la imagen sea responsive
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                    />
                </div>

                <div className="col-12 col-md-9">
                    <div className="d-flex justify-content-between align-items-center name">
                        <h4>{name}</h4>
                        <div className="ms-auto me-2">
                            <span>
                                <Link className="edit-contact" to={`/editContact/${id}`}>
                                    <i className="fa-solid fa-user-pen me-4"></i>
                                </Link>
                                <i
                                    className="fa-solid fa-user-minus"
                                    onClick={() => {
                                        actions.deleteContact(id);
                                    }}
                                    style={{ transition: "color 0.3s" }} // Esto es para que el cambio de color sea suave
                                />
                            </span>
                        </div>
                    </div>
                    <div className="d-flex flex-column info">
                        <div className="p-1">
                            <i className="fa-solid fa-location-crosshairs"></i>
                            <span className="ms-3">{address}</span>
                        </div>
                        <div className="p-1">
                            <i className="fa-solid fa-mobile-screen-button"></i>
                            <span className="ms-3">{phone}</span>
                        </div>
                        <div className="p-1">
                            <i className="fa-solid fa-envelope-open-text"></i>
                            <span className="ms-3">{email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
