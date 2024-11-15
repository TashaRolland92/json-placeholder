import React from "react";
import { Link } from "react-router-dom";

export const MobileMenu = () => {

    function toggleMenu() {
        const menu = document.querySelector(".mobile-nav__btn-container");
        menu.classList.toggle('active');
    }

    return(
        <>
            <nav className="mobile-nav">
                <input type="checkbox" id="mobile-nav__toggle" className="mobile-nav__toggle" />
                <label className="mobile-nav__btn-container" htmlFor="mobile-nav__toggle" onClick={toggleMenu}>
                    <div className="mobile-nav__btn"></div>
                    <div className="mobile-nav__btn"></div>
                    <div className="mobile-nav__btn"></div>
                </label>
                <ul className="mobile-nav__menu">
                    <li className="mobile-nav__item">
                        <Link to="/posts" className="mobile-nav__link">Blog Posts</Link>
                    </li>
                    <li className="mobile-nav__item">
                        <Link to="/">Todos</Link>
                    </li>
                </ul>
            </nav>

        </>
    );
}