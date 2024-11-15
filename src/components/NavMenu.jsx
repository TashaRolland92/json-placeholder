import React from "react";
import { Link } from "react-router-dom";

export const NavMenu = () => {
    return(
        <nav className="nav">
            <ul className="nav__menu">
                <li className="nav__item">
                    <Link to="/posts" className="nav__link">Blog Posts</Link>
                </li>
                <li className="nav__item">
                    <Link to="/">Todos</Link>
                </li>
            </ul>
        </nav>
    );
}