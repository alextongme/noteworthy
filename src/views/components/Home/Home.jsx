import React from "react";
import HeaderIntroContainer from "./HeaderIntro/HeaderIntroContainer";
import { Link } from 'react-router-dom';
// import logo from '../../../../app/assets/images/evernote-logo.png';


const Home = () => {
    return (
        <div className="home">
            <nav className="home__navbar">
                <div className="home__navbar--left">
                    <img src={window.nLogo} className="home__image--logo" />
                    <h1 className="home__h1--logo">noteworthy</h1>
                </div>
                <HeaderIntroContainer className="home-authentication-component" />
            </nav>

            <div className="home__content">
                <section className="home__content--left">
                    <h2 className="home__h2--left">
                        Notes worthy for any moment.
                    </h2>
                    <p className="home__p--left">
                        A new editor, made for the kings and queens of all jungles. Share your notes, store your files, and work from anywhere. With noteworthy, you'll never need a pen.
                    </p>
                    {/* <div class="home__signupButtonContainer"> */}
                        <Link to="/signup" className="home__signupButton">SIGN UP FOR FREE</Link>
                    {/* </div> */}
                </section>
                <section className="home__content--right">
                    <img src={window.lionHome} className="home__image--rick" />

                </section>
            </div>

            <footer className="home__footer">
                <section className="home__footer--right">
                    <a href='http://www.tongsalex.com' className ="home__link--personalWeb">
                        aT
                    </a>
                    <a href='http://www.github.com/tongsalex'>
                        <img src={window.github} alt='github' className="home__button" />
                    </a>
                    <a href='http://www.linkedin.com/in/tongsalex'>
                        <img src={window.linkedin} alt='linkedin' className="home__button" />
                    </a>
                </section>
                {/* <hr className"home__divider"></hr> */}
            </footer>
        </div>
    );
}

export default Home;