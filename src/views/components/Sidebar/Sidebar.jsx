import React from "react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <nav className="home__navbar">
                <div className="home__navbar--left">
                    {/* <img src="../../../app/assets/images/evernote-logo.png" className="home-logo-pic" alt="logo"/> */}
                    <h1 className="home__logo">noteworthy</h1>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;