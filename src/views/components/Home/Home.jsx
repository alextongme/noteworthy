import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';
import Typist from "react-typist";

import HeaderIntro from "./HeaderIntro/HeaderIntro";
import { detectMobile } from "../utils/utils";
import { signup } from '../../../state/actions/session';

export default function Home() {
    // Redux selectors
    const currentUser = useSelector((state) => state.session.id );
    const errors = useSelector((state) => state.errors.session );

    // Redux dispatch
    const dispatch = useDispatch();

    // State vars
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    let signupSheet;
    let errorOutputs;

    const mapper = {
        "email" : setEmail,
        "password" : setPassword
    }

    function handleChange(field) {
        return ((event) => {
            mapper[field](event.currentTarget.value);
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const user = {
            "email": email,
            "password": password
        };
        dispatch(signup(user));
    }

    errorOutputs = (
        <>
            {errors.map((error, idx) => 
                <p key={idx} className="universal__h3 home__errors">{error}</p> 
            )}
        </>
    );


    if (!currentUser) {
        signupSheet = (<li className="home__content home__content--fifth">
            <section className="home__fifthDiv__section--left">
                <h1 className="universal__h1 home__fifthDiv__h1">
                    Sign up for Noteworthy Today
                </h1>
                <h2 className="universal__h2 home__fifthDiv__h2">
                    Capture ideas and inspiration from anywhere and manage tasks with ease.
                </h2>
            </section>

            <section className="home__fifthDiv__section--right">
                <form onSubmit={handleSubmit} 
                className="home__fifthDiv__signupForm">
                    <input 
                        type="text" 
                        className="universal__input home__signupForm__input" 
                        value={email} 
                        onChange={handleChange('email')} 
                        placeholder="Email" 
                    />
                    <input 
                        type="password" 
                        className="universal__input home__signupForm__input" 
                        value={password} 
                        onChange={handleChange('password')} 
                        placeholder="New password: 6 characters minimum" 
                    />

                    <h3 className="universal__h3 home__fifthDiv__h3">
                        By clicking below, I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
                    </h3>

                    {errorOutputs}

                    <input 
                        type="submit" 
                        className="universal__button home__signupForm__button" 
                        value="SIGN UP"
                    />
                </form>
            </section>

            <footer className="home__fifthDiv__footer">
                <div className="home__fifthDiv__footerLeft">
                    <img src={window.nLogo} className="home__fifthDiv__footerLogo" />
                    <span className="home__fifthDiv__footerName">noteworthy</span>
                </div>
                <div className="home__fifthDiv__footerRight">
                    <a href='http://www.alextong.me'>
                        <img src="/images/count_circle.png" alt='website' className="home__button home__button--avatar" />
                    </a>
                    <a href='http://www.github.com/alextongme'>
                        <img src={window.github} alt='github' className="home__button" />
                    </a>
                </div>
            </footer>
        </li>)
    } else {
        signupSheet = (<li className="home__content home__content--fifth">
            <footer className="home__fifthDiv__footer">
                <div className="home__fifthDiv__footerLeft">
                    <img src={window.nLogo} className="home__fifthDiv__footerLogo" />
                    <span className="home__fifthDiv__footerName">noteworthy</span>
                </div>
                <div className="home__fifthDiv__footerRight">
                    <a href='http://www.alextong.me'>
                        <img src="/images/count_circle.png" alt='website' className="home__button home__button--avatar" />
                    </a>
                    <a href='http://www.github.com/alextongme'>
                        <img src={window.github} alt='github' className="home__button" />
                    </a>
                </div>
            </footer>
        </li>)
    }

    return (
        detectMobile() ? (<h1>Sorry! This app currently does not work on mobile browsers. Please view this on a desktop.</h1>) :
        ( 
            <div className="home">
                <nav className="home__navbar">
                    <div className="home__navbar--left">
                        <NavLink exact to="/">
                            <img src={window.nLogo} className="home__image--logo" />
                        </NavLink>

                        <h1 className="home__h1--logo">noteworthy</h1>
                    </div>
                    <HeaderIntro className="home-authentication-component" />
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
                                <div className="home__secondDiv__quote">
                                    <p className="home__secondDiv__quoteText">
                                        "I once took the red pill AND the blue pill. Turns out they were both just Noteworthy tabs. Whoa."
                                    </p>
                                    <div className="home__secondDiv__quoteAuthor">
                                        <i className="fas fa-star home__secondDiv__starIcon" />
                                        <span>Keanu Reeves</span>
                                    </div>
                                </div>
                                <div className="home__secondDiv__quote">
                                    <p className="home__secondDiv__quoteText">
                                        "I am once again asking you, the American people, to try out Noteworthy. It is free. It has always been free."
                                    </p>
                                    <div className="home__secondDiv__quoteAuthor">
                                        <i className="fas fa-star home__secondDiv__starIcon" />
                                        <span>Bernie Sanders</span>
                                    </div>
                                </div>
                                <div className="home__secondDiv__quote">
                                    <p className="home__secondDiv__quoteText">
                                        "Let me be clear — if you like your notes, you can keep your notes. Especially on Noteworthy. Yes we can."
                                    </p>
                                    <div className="home__secondDiv__quoteAuthor">
                                        <i className="fas fa-star home__secondDiv__starIcon" />
                                        <span>Barack Obama</span>
                                    </div>
                                </div>
                            </section>

                            <section className="home__secondDiv__stats">
                                <div className="home__secondDiv__stat">
                                    <h2 className="home__secondDiv__statNumber">3.2x</h2>
                                    <p className="home__secondDiv__statLabel">faster note organization</p>
                                </div>
                                <div className="home__secondDiv__stat">
                                    <h2 className="home__secondDiv__statNumber">47%</h2>
                                    <p className="home__secondDiv__statLabel">more productive workflow</p>
                                </div>
                                <div className="home__secondDiv__stat">
                                    <h2 className="home__secondDiv__statNumber">10M+</h2>
                                    <p className="home__secondDiv__statLabel">notes created worldwide</p>
                                </div>
                            </section>
                    </li>

                    <li className="home__content home__content--third">
                        <section className="home__thirdDiv__top">
                            <i className="fas fa-chart-line home__thirdDiv__img" />
                            <h1 className="home__thirdDiv__h1">
                                At work, at home, and everywhere in between
                            </h1>
                            <h2 className="home__thirdDiv__h2">
                                Noteworthy is and will always be <strong>free</strong>. No plans, no pricing, no catch. Just notes.
                            </h2>
                        </section>

                        <section className="home__thirdDiv__graphs">
                            <div className="home__thirdDiv__graph">
                                <h3 className="home__thirdDiv__graphTitle">Ideas forgotten per day</h3>
                                <div className="home__thirdDiv__bars">
                                    <div className="home__thirdDiv__barGroup">
                                        <div className="home__thirdDiv__bar home__thirdDiv__bar--tall"></div>
                                        <span className="home__thirdDiv__barLabel">Without</span>
                                    </div>
                                    <div className="home__thirdDiv__barGroup">
                                        <div className="home__thirdDiv__bar home__thirdDiv__bar--short home__thirdDiv__bar--green"></div>
                                        <span className="home__thirdDiv__barLabel">With Noteworthy</span>
                                    </div>
                                </div>
                                <p className="home__thirdDiv__graphStat">70% fewer lost ideas</p>
                            </div>

                            <div className="home__thirdDiv__graph">
                                <h3 className="home__thirdDiv__graphTitle">Time spent searching for notes</h3>
                                <div className="home__thirdDiv__bars">
                                    <div className="home__thirdDiv__barGroup">
                                        <div className="home__thirdDiv__bar home__thirdDiv__bar--medium"></div>
                                        <span className="home__thirdDiv__barLabel">Sticky notes</span>
                                    </div>
                                    <div className="home__thirdDiv__barGroup">
                                        <div className="home__thirdDiv__bar home__thirdDiv__bar--tiny home__thirdDiv__bar--green"></div>
                                        <span className="home__thirdDiv__barLabel">Noteworthy</span>
                                    </div>
                                </div>
                                <p className="home__thirdDiv__graphStat">5x faster retrieval</p>
                            </div>

                            <div className="home__thirdDiv__graph">
                                <h3 className="home__thirdDiv__graphTitle">Weekly productivity score</h3>
                                <div className="home__thirdDiv__sparkline">
                                    <svg viewBox="0 0 200 60" className="home__thirdDiv__svg">
                                        <polyline
                                            points="0,50 30,45 60,48 90,35 120,25 150,15 180,10 200,5"
                                            fill="none"
                                            stroke="#01A82D"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <polyline
                                            points="0,50 30,50 60,52 90,48 120,50 150,49 180,51 200,48"
                                            fill="none"
                                            stroke="rgba(253,246,228,0.25)"
                                            strokeWidth="2"
                                            strokeDasharray="4,4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="home__thirdDiv__sparkLabels">
                                        <span>Week 1</span>
                                        <span>Week 8</span>
                                    </div>
                                </div>
                                <p className="home__thirdDiv__graphStat"><span style={{color: '#01A82D'}}>Noteworthy users</span> vs <span style={{opacity: 0.4}}>non-users</span></p>
                            </div>
                        </section>
                    </li>

                    <li className="home__content home__content--fourth">
                        <h1 className="home__fourthDiv__h1">
                            How It Works
                        </h1>
                        <p className="home__fourthDiv__subtitle">Get started in under 60 seconds. No credit card, no downloads, no nonsense.</p>

                        <section className="home__fourthDiv__stepsContainer">
                            <div className="home__fourthDiv__steps home__fourthDiv__steps--1">
                                <div className="home__fourthDiv__stepNumber">1</div>
                                <img src={window.nLogo} className="home__fourthDiv__icons--logo" />
                                <h2 className="home__fourthDiv__h2">
                                    SIGN UP
                                </h2>
                                <h3 className="home__fourthDiv__h3">
                                    Create your free account in seconds. No credit card required — just an email and a password.
                                </h3>
                            </div>
                            <div className="home__fourthDiv__steps home__fourthDiv__steps--2">
                                <div className="home__fourthDiv__stepNumber">2</div>
                                <i className="fas fa-pen-nib home__fourthDiv__icons" />
                                <h2 className="home__fourthDiv__h2">
                                    ADD CONTENT
                                </h2>
                                <h3 className="home__fourthDiv__h3">
                                    Type notes with rich formatting, embed YouTube videos, add code snippets, or just jot down quick thoughts.
                                </h3>
                            </div>
                            <div className="home__fourthDiv__steps home__fourthDiv__steps--3">
                                <div className="home__fourthDiv__stepNumber">3</div>
                                <i className="fab fa-searchengin home__fourthDiv__icons" />
                                <h2 className="home__fourthDiv__h2">
                                    STAY ORGANIZED
                                </h2>
                                <h3 className="home__fourthDiv__h3">
                                    Group notes into notebooks, tag them for cross-referencing, and find anything instantly with powerful search.
                                </h3>
                            </div>
                            <div className="home__fourthDiv__steps home__fourthDiv__steps--4">
                                <div className="home__fourthDiv__stepNumber">4</div>
                                <i className="fas fa-dumbbell home__fourthDiv__icons" />
                                <h2 className="home__fourthDiv__h2">
                                    GET THINGS DONE
                                </h2>
                                <h3 className="home__fourthDiv__h3">
                                    Manage projects, track meeting notes, set up workflows, and crush your to-do list like a pro.
                                </h3>
                            </div>
                        </section>
                    </li>

                    {signupSheet}
                </ul>
            </div>
        )
    );
}