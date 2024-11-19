import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light mb-3">
            <div className="container-fluid">
                <Link className="btn btn-success ms-auto" to="/addContact">
                    Añadir nuevo contacto
                </Link>
            </div>
        </nav>
    );
};
