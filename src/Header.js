import React from 'react';
import { Link } from 'react-router-dom';
// import { MdSearch } from "react-icons/md";

export const Header = () => {
    return (
        <nav className="navbar">
            <Link className="text-decoration-none text-reset " to="/"><h1 className="fw-bold p-2">McDonald's</h1></Link>
        </nav>
    )
}
