import React from "react";
import HeaderIntroContainer from "./HeaderIntro/HeaderIntroContainer";
import { NavLink } from 'react-router-dom';
import Typist from "react-typist";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field) {
        return ((event) => {
            this.setState({
                [field]: event.currentTarget.value
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user);
    }

    renderErrors() {
        return (
            <>
                {this.props.errors.map((error, idx) => {
                    return (
                        <p key={idx} className="universal__h3 home__errors">{error}</p>
                    );
                })}
            </>
        );
    }

    render() {
        return (
            <div className="home">
                <nav className="home__navbar">
                    <div className="home__navbar--left">
                        <NavLink exact to="/">
                            <img src={window.nLogo} className="home__image--logo" />
                        </NavLink>

                        <h1 className="home__h1--logo">noteworthy</h1>
                    </div>
                    <HeaderIntroContainer className="home-authentication-component" />
                </nav>

                <ul className="home__snapContainer">
                    <li className="home__content home__content--first">
                        <section className="home__content--left">
                            <Typist className="home__h1--left">
                                Notes<Typist.Delay ms={300} />
                                <br />
                                worthy 
                                <Typist.Delay ms={300} />
                                <br />
                                for any moment.
                            </Typist>
                            <h2 className="home__h2--left universal__h2">
                                A new editor, made for the Kings and Queens of all the jungles. Share your notes, store your files, and work from anywhere. With Noteworthy, you'll never need a pen.
                            </h2>
                            
                            <NavLink to="/signup" className="home__signupButton universal__button">SIGN UP</NavLink>
                        
                        </section>
                        <section className="home__content--right">
                            <img src={window.lionHome} className="home__image--rick" />

                        </section>
                    </li>

                    <li className="home__content home__content--second">
                            <i className="fas fa-brain home__secondDiv__img"></i>

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
                        <i className="fas fa-shower home__thirdDiv__img" />

                        <h1 className="home__thirdDiv__h1">
                            At work, at home, and everywhere in between
                        </h1>

                        <h2 className="home__thirdDiv__h2">
                            Noteworthy's plans and pricing are designed to fit everyone's needs, because there are <strong>none</strong>. Noteworthy is and will always be free and accessible to everyone.
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
                    </li>

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
                            <form onSubmit={this.handleSubmit} 
                            className="home__fifthDiv__signupForm">
                                <input 
                                    type="text" 
                                    className="universal__input home__signupForm__input" 
                                    value={this.state.email} 
                                    onChange={this.handleChange('email')} 
                                    placeholder="Email" 
                                />
                                <input 
                                    type="password" 
                                    className="universal__input home__signupForm__input" 
                                    value={this.state.password} 
                                    onChange={this.handleChange('password')} 
                                    placeholder="New password: 6 characters minimum" 
                                />

                                <h3 className="universal__h3 home__fifthDiv__h3">
                                    By clicking below, I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                                </h3>

                                {this.renderErrors()}

                                <input 
                                    type="submit" 
                                    className="universal__button home__signupForm__button" 
                                    value="SIGN UP"
                                />
                            </form>
                        </section>
                        
                    </li>

                    <li className="home__content home__content--footer">
                        <section className="home__footer--left">
                            <img src={window.nLogo} className="footer__image--logo"/>
                            <h1 className="universal__h1 footer__h1--logo">noteworthy</h1>
                        </section>

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

                        <hr className="home__content--secondHR"></hr>

                        <h3 className="universal__h3 home__footer--copyright">© 2020 noteworthy Corporation. All rights reserved.</h3>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Home;