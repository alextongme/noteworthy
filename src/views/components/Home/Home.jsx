import React from "react";
import HeaderIntroContainer from "./HeaderIntro/HeaderIntroContainer";
import { Link } from 'react-router-dom';
import Typist from "react-typist";
// import logo from '../../../../app/assets/images/evernote-logo.png';
// import 'react-typist/dist/Typist.css';

// import Styles from 'css-loader?modules!./react-typist/dist/Typist.css';

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

            <ul className="home__snapContainer">
                {/* <li className="home__content home__content--first">
                    <section className="home__content--left">
                        <Typist className="home__h1--left">
                            Notes worthy 
                            <Typist.Delay ms={800} />
                            <br />
                            for any moment.
                        </Typist>
                        <h2 className="home__h2--left">
                            A new editor, made for the Kings and Queens of all the jungles. Share your notes, store your files, and work from anywhere. With Noteworthy, you'll never need a pen.
                        </h2>
                        
                        <Link to="/signup" className="home__signupButton">SIGN UP</Link>
                    
                    </section>
                    <section className="home__content--right">
                        <img src={window.lionHome} className="home__image--rick" />

                    </section>
                </li>

                <li className="home__content home__content--second">
                        <i class="fas fa-brain home__secondDiv__img"></i>

                        <h1 className="home__secondDiv__h1">
                            Focus on what matters most.
                        </h1>

                        <section className="home__secondDiv__section">
                            <h2 className="home__secondDiv__h2">
                                Manage everything from big projects to personal moments.
                            </h2>
                            <h2 className="home__secondDiv__h2">
                                Capture ideas and inspiration in notes, voice, and pictures.
                            </h2>
                            <h2 className="home__secondDiv__h2">
                                Never lose track of your tasks and deadlines.
                            </h2>
                        </section>
                </li>

                <li className="home__content home__content--third">
                    <i class="fas fa-shower home__thirdDiv__img" />

                    <h1 className="home__thirdDiv__h1">
                        At work, at home, and everywhere in between
                    </h1>

                    <h2 className="home__thirdDiv__h2">
                        Noteworthy's plans and pricing are designed to fit your needs.
                    </h2>
                </li>

                <li className="home__content home__content--fourth">
                    <h1 className="home__fourthDiv__h1">
                        How It Works
                    </h1>

                    <section className="home__fourthDiv__stepsContainer">
                        <div className="home__fourthDiv__steps home__fourthDiv__steps--1">
                            <img src={window.nLogo} className="home__fourthDiv__icons--logo" />
                            <h2 className="home__fourthDiv__h2">
                                SIGN UP
                            </h2>
                            <h3 className="home__fourthDiv__h3">
                                Create your free account and choose the plan that fits your needs.
                            </h3>
                        </div>
                        <div className="home__fourthDiv__steps home__fourthDiv__steps--2">
                            <i className="fas fa-pen-nib home__fourthDiv__icons" />
                            <h2 className="home__fourthDiv__h2">
                                ADD CONTENT
                            </h2>
                            <h3 className="home__fourthDiv__h3">
                                Type notes, add attachments, clip web pages, or record memos. All in one place.
                            </h3>
                        </div>
                        <div className="home__fourthDiv__steps home__fourthDiv__steps--3">
                            <i className="fab fa-searchengin home__fourthDiv__icons" />
                            <h2 className="home__fourthDiv__h2">
                                FIND EVERYTHING
                            </h2>
                            <h3 className="home__fourthDiv__h3">
                                Organize your notes, your way. Use notebooks, tags, or our powerful search to find everything you need quickly.
                            </h3>
                        </div>
                        <div className="home__fourthDiv__steps home__fourthDiv__steps--4">
                            <i className="fas fa-dumbbell home__fourthDiv__icons" />
                            <h2 className="home__fourthDiv__h2">
                                GET THINGS DONE
                            </h2>
                            <h3 className="home__fourthDiv__h3">
                                Manage projects, take meeting notes, set reminders, and edit documents.
                            </h3>
                        </div>
                    </section>
                </li> */}

                <li className="home__content home__content--fifth">
                    <section className="home__fifthDiv__section--left">
                        <h1 className="universal__h1 home__fifthDiv__h1">
                            Sign up for Noteworthy Today
                        </h1>
                        <h2 className="universal__h2 home__fifthDiv__h2">
                            Capture ideas and inspiration from anywhere and manage tasks with ease.
                        </h2>
                    </section>

                    <section className="home__fifthDiv__section--right">
                        <form // onSubmit={this.handleSubmit} 
                        className="home__fifthDiv__signupForm">
                            {/* Please {this.props.formType} or {this.props.navLink} */}
                            {/* {this.signup()} */}
                            <input 
                                type="text" 
                                className="universal__input home__signupForm__input" 
                                // value={this.state.username} 
                                // onChange={this.handleChange('username')} 
                                placeholder="New username" 
                            />
                            <input 
                                type="current-password" 
                                className="universal__input home__signupForm__input" 
                                //value={this.state.password} 
                                //onChange={this.handleChange('password')} 
                                placeholder="New password" 
                            />

                            <h3 className="universal__h3 home__fifthDiv__h3">
                                By clicking below, I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                            </h3>

                            {/* {this.renderErrors()} */}

                            <input 
                                type="submit" 
                                className="universal__button home__signupForm__button" 
                                //value={this.props.formType}
                            />
                        </form>

                        {/* {this.demoButton()} */}
                    </section>
                    
                </li>

                <li className="home__content home__content--footer">

                    
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
                </li>
            </ul>
        </div>
    );
}

export default Home;