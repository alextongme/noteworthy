import React from "react";
import HeaderIntroContainer from "../HeaderIntro/HeaderIntroContainer";
import { Link } from 'react-router-dom';
// import logo from '../../../app/assets/images/evernote-logo.png';

const Home = () => {
    return (
        <div className="home">
            <nav className="home__navbar">
                <div className="home__navbar--left">
                    {/* <img src="../../../app/assets/images/evernote-logo.png" className="home-logo-pic" alt="logo"/> */}
                    <h1 className="home__logo">noteworthy</h1>
                </div>
                <HeaderIntroContainer className="home-authentication-component" />
            </nav>

            <div className="home__content">
                <section className="home__content--left">
                    <h2 className="home__text--left">Your notes. Organized. Effortless.</h2>
                    <Link to="/signup" className="home__signupButton">SIGN UP FOR FREE</Link>
                </section>
                <section className="home__content--right">
                    <h2>Put computer image here.</h2>
                </section>
            </div>

            <footer className="home__footer">
                <h1>sup</h1>
            </footer>
        </div>
    );
}

export default Home;