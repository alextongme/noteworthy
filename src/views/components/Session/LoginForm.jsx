import React, { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

// export function LoginForm({lookForUser, login}) {
//     const [emailFound, setEmailFound] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     function handleChange(field) {
//         // return ((event) => {
//         //     this.setState({
//         //         [field]: event.currentTarget.value
//         //     });
//         // });
//     }

//     async function handleSubmit(event) {
//         event.preventDefault();

//         if(emailFound === false) {
//             await lookForUser(email);
//             setEmailFound(true);
//         } else {
//             const user = {
//                 "email": email,
//                 "password": password
//             };
//             login(user);
//         }
//     }

//     function loginAsDemoUser() {

//     }

//     function showPasswordField() {

//     }
// }

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailFound: false,
            email: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loginAsDemo = this.loginAsDemo.bind(this);
        this.showPasswordField = this.showPasswordField.bind(this)
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

        if(this.state.emailFound === false) {
            this.props.lookForUser(this.state.email).then(() => {
                return (this.setState({
                    emailFound: true
                }));
            })
        } else {
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            this.props.login(user);
        }
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

    showPasswordField() {
        if(this.state.emailFound === true) {
            return (
                <input 
                    type="password"
                    autoComplete="current-password"
                    className="universal__input sessionForm__input sessionForm__input--login" 
                    value={this.state.password} 
                    onChange={this.handleChange('password')} placeholder="Password" 
                >
                </input>
            )}
    }

    loginAsDemo() {
        const demo = {
            email: 'demo@gmail.com',
            password: '123456',
        };
        this.props.login(demo);
    }

    render() {
        return (
            <div className="sessionForm">
                <section className="sessionForm__section--form threed">
                    <section className="sessionForm__section--header">
                        <img src={window.nLogo} className="sessionForm__logo" />
                        <h1 className="sessionForm__h1">noteworthy</h1>
                        <h3 className="universal__h3 sessionForm__h3">Never miss a roar.</h3>
                    </section>

                    <div className="sessionForm__formContainer">
                        <form onSubmit={this.handleSubmit} className="sessionForm__form">
                            
                            <input 
                                type="text" 
                                className="universal__input sessionForm__input" 
                                value={this.state.email} 
                                onChange={this.handleChange('email')} placeholder="Email" 
                            />

                            {this.showPasswordField()}

                            {this.renderErrors()}

                            <input 
                                type="submit" 
                                className="universal__button sessionForm__button" 
                                value="LOG IN"
                            />

                        </form>

                        <button 
                            className="universal__button sessionForm__button sessionForm__button--demo" 
                            onClick={this.loginAsDemo}>
                            DEMO
                        </button>
                    </div>

                    <h2 className="universal__h3 sessionForm__h3--create">
                        Don't have an account?
                    </h2>
                    <NavLink 
                        to="/signup" 
                        className="universal__h2 sessionForm__signup">
                        Create Account
                    </NavLink>
                </section>
            </div>
        );
    }
}

export default LoginForm;