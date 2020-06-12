import React from 'react';
import {NavLink} from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginAsDemo = this.loginAsDemo.bind(this);
    }

    componentWillUnmount() {
        this.props.clearSessionErrors();
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

    loginAsDemo() {
        const demo = {
            email: 'demo@gmail.com',
            password: '123456',
        };
        this.props.login(demo);
    }

    renderErrors() {
        return (
            <>
                {this.props.errors.map((error, idx) => {
                    return (
                        <p key={idx} className="sessionForm__errors">{error}</p>
                    );
                })}
            </>
        );
    }

    render() {
        return (
            <div className="sessionForm">
                <section className="sessionForm__section--form threed">
                    <section className="sessionForm__section--header">
                        <img src={window.nLogo} className="sessionForm__logo" />
                        <h1 className="sessionForm__h1">noteworthy</h1>
                        <h2 className="universal__h3 sessionForm__h3">You can always edit a bad page. You can’t edit a blank page.</h2>
                    </section>

                    <div className="sessionForm__formContainer">
                        <form onSubmit={this.handleSubmit} className="sessionForm__form">
                            <input
                                type="text" 
                                className="universal__input sessionForm__input" 
                                value={this.state.email} 
                                onChange={this.handleChange('email')} placeholder="Email"
                            />
                            <input 
                                type="password"
                                autoComplete="current-password"
                                className="universal__input sessionForm__input" 
                                value={this.state.password} 
                                onChange={this.handleChange('password')} placeholder="New password: 6 characters minimum" 
                            />

                            {this.renderErrors()}

                            <input 
                                type="submit" 
                                className="universal__button sessionForm__button" 
                                value="SIGN UP"
                            />

                        </form>

                        <button 
                            className="universal__button sessionForm__button sessionForm__button--demo"  
                            onClick={this.loginAsDemo}>
                            DEMO
                        </button>
                    </div>

                    <h2 className="universal__h3 sessionForm__h3--create">
                        Already have an account?
                    </h2>
                    <NavLink 
                            to="/login" 
                            className="universal__h2 sessionForm__signup">
                            Login
                    </NavLink>
                </section>
            </div>
        );
    }
}

export default SignupForm;