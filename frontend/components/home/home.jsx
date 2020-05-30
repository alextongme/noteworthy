import React from "react";
import AuthenticationContainer from "../authentication/authentication_container";
import { Link } from 'react-router-dom';
// import logo from '../../../app/assets/images/evernote-logo.png';

const Home = () => {
    return (
        <div className="home">
            <nav className="home-nav">
                <div className="home-logo-container">
                    {/* <img src="../../../app/assets/images/evernote-logo.png" className="home-logo-pic" alt="logo"/> */}
                    <h1 className="home-logo-text">noteworthy</h1>
                </div>
                <AuthenticationContainer className="home-authentication-component" />
            </nav>

            <div className="home-content">
                <section className="home-content-left">
                    <h2 className="home-content-left-text">Your notes. Organized. Effortless.</h2>
                    <Link to="/signup" className="home-content-left-signup-button">SIGN UP FOR FREE</Link>
                </section>
                <section className="home-content-right">
                    <h2>Put computer image here.</h2>
                </section>
            </div>

            <footer className="home-footer">
                <h1>sup</h1>
            </footer>
        </div>
    );
}

export default Home;